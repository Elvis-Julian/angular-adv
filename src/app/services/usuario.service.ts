import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

import { FormularioRegistro } from '../interfaces/register-form.interface';
import { FormularioLogin } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http:HttpClient,
    private  router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true ),
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

  login( formData: FormularioLogin ) {
    
    return this.http.post( `${ base_url }/login`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token)
                })
              );
  }

}
