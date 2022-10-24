import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ControlAsistenciasComponent } from './control-asistencias/control-asistencias.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent, data: { titulo:'Panel principal' }},
          { path: 'progress', component: ProgressComponent, data: { titulo:'Progress' } },
          { path: 'grafica1', component: Grafica1Component, data: { titulo:'Grafica' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo:'Configuración de cuenta' } },
          { path: 'control-asistencias', component: ControlAsistenciasComponent, data: { titulo:'Control de asistencia' } },
          { path: 'promesas', component: PromesasComponent },
          { path: 'rxjs', component: RxjsComponent },
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
