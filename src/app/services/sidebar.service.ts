import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Menu',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Prinipal', url: '/' },
        { titulo: 'Control de asistencias', url: 'control-asistencias' },
        { titulo: 'Grafica', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
        // { titulo: 'Incidencias', url: '/' },
        // { titulo: 'Reportes', url: '/' },
      ]
    },
  ];
  constructor(){}
}
