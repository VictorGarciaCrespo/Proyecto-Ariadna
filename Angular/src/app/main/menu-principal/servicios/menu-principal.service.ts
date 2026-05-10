import { Injectable } from '@angular/core';
import { OpcionMenu } from '../interfaces/opcion-menu.interface';

@Injectable({
    providedIn: 'root'
})
export class MenuPrincipalService {
    constructor() { }

    obtenerOpcionesPrincipales(): OpcionMenu[] {
        return [
            { titulo: 'Actividades Diarias', ruta: '/actividades-diarias' },
            { titulo: 'Estimulación Cognitiva', ruta: '/juegos-mente' },
            { titulo: 'Hablar y Escribir', ruta: '/hablar-escribir' }
        ];
    }
}
