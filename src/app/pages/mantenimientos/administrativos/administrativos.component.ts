import { Component, OnInit } from '@angular/core';
import { Administrativo } from 'src/app/models/administrativo.model';
import { AdministrativoService } from 'src/app/services/administrativo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.component.html',
  styles: [
  ]
})
export class AdministrativosComponent implements OnInit {

  public administrativos: Administrativo[] = [];
  public cargando: boolean = true;;

  constructor(private administrativoService: AdministrativoService) { }

  ngOnInit(): void {
    this.cargarAdministrativos();
  }

  cargarAdministrativos(){
    
    this.cargando = true;
    this.administrativoService.cargarAdministrativos()
    .subscribe(administrativos =>{
      this.cargando = false;
      this.administrativos = administrativos;
    })
  }

  guardarCambios( administrativo: Administrativo ){
    this.administrativoService.actualizarAdministrativo( administrativo._id, administrativo.idUsuario, administrativo.nombre, administrativo.fecha,
                                    administrativo.hora_ent, administrativo.hora_sld )
                                    .subscribe( resp => {
                                      Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Actualizado',
                                        text: 'Datos actualizados ' + administrativo.nombre,
                                        showConfirmButton: false,
                                        timer: 1600
                                      })
                                    })
  }

  eliminarAdmint( administrativo: Administrativo ){
    
    Swal.fire({
      title: 'Borrar administrativo',
      text: `Eliminar a ${administrativo.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        this.administrativoService.eliminarAdministrativo( administrativo._id )
        .subscribe( resp =>{
          this.cargarAdministrativos();
          Swal.fire(
            'Administrativo eliminado.',
            `${administrativo.nombre} ha sido eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  async abrirAlert(){
    const valor = await Swal.fire({
      title: 'Crear administrativo',
      input: 'text',
      inputLabel: 'Datos del administrativo',
      inputPlaceholder: 'Nombre del administrativo',
      showCancelButton: true,
    })
    
    console.log(valor)
  }

}
