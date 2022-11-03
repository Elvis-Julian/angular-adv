import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent{

  public formularioPosteado = false;

  public FormularioRegistro = this.fb.group({
    nombre: [ 'Elvis', [ Validators.required, Validators.minLength(2) ] ],
    email: ['testq1@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private router: Router ) { }

  crearUsuario (){
    this.formularioPosteado = true;
    console.log(this.FormularioRegistro.value);

    if ( this.FormularioRegistro.invalid ) {
      return;
    } 

    // Realizar el posteo
    this.usuarioService.crearUsuario( this.FormularioRegistro.value )
            .subscribe( resp => {
              // Navegar al dashboard
              this.router.navigateByUrl('/');
            }, (err) => {
              // Mensaje de error
              Swal.fire('Error', err.error.msg, 'error');
            } );

  }

  campoNoValido( campo:string ): boolean {
    if ( this.FormularioRegistro.get( campo )?.invalid && this.formularioPosteado ) {
      return true;
    } else {
      return false;
    }
  }

  constrasenasNoValidas(){
    const pass1= this.FormularioRegistro.get('password')?.value;
    const pass2= this.FormularioRegistro.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formularioPosteado) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(){
    return !this.FormularioRegistro.get('terminos')?.value && this.formularioPosteado;
  }

  passwordIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }

}
