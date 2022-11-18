import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Administrativo } from '../models/administrativo.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  constructor(private http: HttpClient) {}

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarAdministrativos(): Observable<Administrativo[]>{

    const url = `${ base_url }/administrativos`;
    return this.http.get<{ ok: boolean, administrativos: Administrativo[] }>( url, this.headers )
    .pipe(
      map( (resp: { ok: boolean, administrativos: Administrativo[] }) => resp.administrativos )
    );
    
  }

  crearAdministrativo( idUsuario: string, nombre: string,
                          fecha: string, hora_ent: string, hora_sld: string ){

    const url = `${ base_url }/administrativos`;
    return this.http.post( url, { idUsuario, nombre, fecha, hora_ent, hora_sld }, this.headers );
    
  }

  actualizarAdministrativo( _id: string, idUsuario: string, nombre: string,
                              fecha: string, hora_ent: string, hora_sld: string ){

    const url = `${ base_url }/administrativos/${ _id }`;
    return this.http.put( url, { idUsuario, nombre, fecha, hora_ent, hora_sld }, this.headers );
}

eliminarAdministrativo( _id: string ){

const url = `${ base_url }/administrativos/${ _id }`;
return this.http.delete( url, this.headers );
}

}
