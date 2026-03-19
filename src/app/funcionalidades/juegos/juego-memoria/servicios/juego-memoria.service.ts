import { Injectable } from '@angular/core';
import { ElementoMemoria } from '../interfaces/juego-memoria.interface';

@Injectable({
    providedIn: 'root'
})
export class JuegoMemoriaService {

    private elementos: ElementoMemoria[] = [
        {
            id: '1',
            nombre: 'Perro',
            rutaImagen: '/memori/perro.png'
        },
        {
            id: '2',
            nombre: 'Gato',
            rutaImagen: '/memori/gato.png'
        },
        {
            id: '3',
            nombre: 'Pájaro',
            rutaImagen: '/memori/pajaro.png'
        },
        {
            id: '4',
            nombre: 'Vaca',
            rutaImagen: '/memori/vaca.png'
        },
        {
            id: '5',
            nombre: 'Caballo',
            rutaImagen: '/memori/caballo.png'
        },
        {
            id: '6',
            nombre: 'Oveja',
            rutaImagen: '/memori/oveja.png'
        }
    ];

    constructor() { }

    obtenerElementos(): ElementoMemoria[] {
        return this.elementos;
    }
}
