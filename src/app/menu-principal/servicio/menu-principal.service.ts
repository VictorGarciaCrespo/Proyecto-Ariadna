import { Injectable } from '@angular/core';
import { OpcionMenu } from '../interfaz/opcion-menu.interface';

@Injectable({
    providedIn: 'root'
})
export class MenuPrincipalService {
    constructor() { }

    obtenerOpcionesPrincipales(): OpcionMenu[] {
        return [
            { titulo: 'Actividades Diarias', ruta: '/actividades-diarias' },
            { titulo: 'Juegos de la Mente', ruta: '/juegos' },
            { titulo: 'Hablar y Escribir', ruta: '/hablar' }
        ];
    }
}
