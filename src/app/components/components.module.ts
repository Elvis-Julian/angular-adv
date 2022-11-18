import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalFormComponent } from './modal-form/modal-form.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalFormComponent
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
