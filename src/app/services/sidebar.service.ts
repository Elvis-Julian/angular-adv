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
        { titulo: 'Principal', url: '/' },
        { titulo: 'Control de asistencias', url: 'control-asistencias' },
        { titulo: 'Grafica', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
        // { titulo: 'Incidencias', url: '/' },
        // { titulo: 'Reportes', url: '/' },
      ]
    },

    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Administrativos', url: 'administrativos' },
        { titulo: 'Docentes', url: 'docentes ' },
      ]
    },
  ];
  constructor(){}
}
