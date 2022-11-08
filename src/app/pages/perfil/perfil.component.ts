import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  // @ts-ignore
  public formularioPerfil: FormGroup;
  // @ts-ignore
  public usuario: Usuario;
  // @ts-ignore
  public imagenSubir: File; 
  
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService ) {

      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {

    this.formularioPerfil = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.formularioPerfil.value)
      .subscribe( resp => {
        const { nombre, email } = this.formularioPerfil.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos actualizados',
          showConfirmButton: false,
          timer: 1200
        })
      }, (err) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: err.error.msg,
          showConfirmButton: false,
          timer: 2000
        })
      });
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;
    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return; // solucion de error de metodo

  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid || '' )
    .then( img => {
      this.usuario.img = img;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Icono actualizado',
        showConfirmButton: false,
        timer: 1200
      })
    }).catch( err => {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: "Error al subir la imagen",
        showConfirmButton: false,
        timer: 2000
      })
    });
  }

}
