import { Component, OnInit } from '@angular/core';
import { ModalFormService } from 'src/app/services/modal-form.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent implements OnInit {

  

  constructor( public modalFormService: ModalFormService ) { }

  ngOnInit(): void {
  }

  cerrarModalFormulario(){
    this.modalFormService.cerrarModalFormulario();
  }

}
