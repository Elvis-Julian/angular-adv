import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public formularioPosteado = false;
  FormularioLogin: FormGroup;
  

  

  constructor( private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService 
    ) {  
      this.FormularioLogin = this.fb.group({
        email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
        password: ['', Validators.required],
        recordar: [ false ]
      });
    }

  login(){
    this.usuarioService.login( this.FormularioLogin.value )
        .subscribe( resp => {

          if ( this.FormularioLogin.get('recordar')?.value ){
            localStorage.setItem('email', this.FormularioLogin.get('email')?.value)
          }  else {
            localStorage.removeItem('email');
          }

          // Navegar al dashboard
          this.router.navigateByUrl('/');
          
        }, (err) => {
          // Mensaje de error
          Swal.fire('Error', err.error.msg, 'error');
        } );
    // console.log( this.FormularioLogin.value )
    // this.router.navigateByUrl('/');
  }

}
