import { Injectable } from '@angular/core';
import { OpcionPerfil } from '../interfaz/opcion-perfil.interface';

@Injectable({
    providedIn: 'root'
})
export class PerfilesService {
    constructor() { }

    obtenerOpciones(): OpcionPerfil[] {
        return [
            { titulo: 'Mi Perfil', ruta: '/perfiles/mi-perfil' },
            { titulo: 'Configuración', ruta: '/perfiles/configuracion' },
            { titulo: 'Historial', ruta: '/perfiles/historial' }
        ];
    }
}
