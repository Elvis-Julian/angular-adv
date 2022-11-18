import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalFormService {

  private _ocultarModalFormulario: boolean = true;

  get ocultarModalFormulario(){
    return this._ocultarModalFormulario;
  }

  abrirModalFormulario(){
    this._ocultarModalFormulario = false;
  }

  cerrarModalFormulario(){
    this._ocultarModalFormulario = true;
  }

  constructor() { }
}
