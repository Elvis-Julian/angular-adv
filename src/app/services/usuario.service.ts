import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment.prod';

import { FormularioRegistro } from '../interfaces/register-form.interface';
import { FormularioLogin } from '../interfaces/login-form.interface';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interfaces';

import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // @ts-ignore
  public usuario: Usuario;

  constructor( private http:HttpClient,
    private  router: Router) { }

    get token(): string{
      return localStorage.getItem('token') || '';
    }

    get uid():string {
      return this.usuario.uid || '';
    }

    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, role, uid );
        localStorage.setItem('token', resp.token)
       return true;
      }),
      
      catchError(error => of(false))
    );
  }

  crearUsuario( formData: FormularioRegistro ) {
    
    return this.http.post( `${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token)
                })
              );

  }

  actualizarPerfil(data: {email: string, nombre: string, role: string }){
    

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, this.headers);
  }

  login( formData: FormularioLogin ) {
    
    return this.http.post( `${ base_url }/login`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token)
                })
              );
  }


  cargarUsuarios( desde: number = 0 ){

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<cargarUsuario> ( url, this.headers )
    .pipe(
      map( resp =>{
        const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, 
          user.email, '', user.img, user.role, user.uid) );
        return {
          total: resp.total, 
          usuarios
        };
      })
    )
  }

  eliminarUsuario( usuario: Usuario ){
    
    const url = `${ base_url }/usuarios/${usuario.uid}`;
    return this.http.delete( url, this.headers );
  }

  guardarUsuario( usuario: Usuario ){
    
    return this.http.put( `${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers);
  }

}
