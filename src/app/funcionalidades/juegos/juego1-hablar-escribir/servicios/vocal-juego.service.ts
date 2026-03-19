import { Injectable } from '@angular/core';
import { CartaVocal } from '../interfaces/vocal-juego.interface';

@Injectable({
    providedIn: 'root'
})
export class VocalJuegoService {

    private bancoPalabras: CartaVocal[] = [
        // A
        { id: 'a1', palabra: 'Árbol', rutaImagen: '/hablar-escribir/a/arbol.png', vocalInicial: 'A' },
        { id: 'a2', palabra: 'Avión', rutaImagen: '/hablar-escribir/a/avion.png', vocalInicial: 'A' },
        { id: 'a3', palabra: 'Abeja', rutaImagen: '/hablar-escribir/a/abeja.png', vocalInicial: 'A' },
        { id: 'a4', palabra: 'Araña', rutaImagen: '/hablar-escribir/a/arana.png', vocalInicial: 'A' },
        { id: 'a5', palabra: 'Anillo', rutaImagen: '/hablar-escribir/a/anillo.png', vocalInicial: 'A' },
        { id: 'a6', palabra: 'Ardilla', rutaImagen: '/hablar-escribir/a/ardilla.png', vocalInicial: 'A' },
        { id: 'a7', palabra: 'Agua', rutaImagen: '/hablar-escribir/a/agua.png', vocalInicial: 'A' },
        { id: 'a8', palabra: 'Azul', rutaImagen: '/hablar-escribir/a/azul.png', vocalInicial: 'A' },
        // E
        { id: 'e1', palabra: 'Elefante', rutaImagen: '/hablar-escribir/e/elefante.png', vocalInicial: 'E' },
        { id: 'e2', palabra: 'Estrella', rutaImagen: '/hablar-escribir/e/estrella.png', vocalInicial: 'E' },
        { id: 'e3', palabra: 'Espejo', rutaImagen: '/hablar-escribir/e/espejo.png', vocalInicial: 'E' },
        { id: 'e4', palabra: 'Enchufe', rutaImagen: '/hablar-escribir/e/enchufe.png', vocalInicial: 'E' },
        { id: 'e5', palabra: 'Escarabajo', rutaImagen: '/hablar-escribir/e/escarabajo.png', vocalInicial: 'E' },
        { id: 'e6', palabra: 'Edificio', rutaImagen: '/hablar-escribir/e/edificio.png', vocalInicial: 'E' },
        { id: 'e7', palabra: 'Escoba', rutaImagen: '/hablar-escribir/e/escoba.png', vocalInicial: 'E' },
        { id: 'e8', palabra: 'Erizo', rutaImagen: '/hablar-escribir/e/erizo.png', vocalInicial: 'E' },
        // I
        { id: 'i1', palabra: 'Isla', rutaImagen: '/hablar-escribir/i/isla.png', vocalInicial: 'I' },
        { id: 'i2', palabra: 'Iglú', rutaImagen: '/hablar-escribir/i/iglu.png', vocalInicial: 'I' },
        { id: 'i3', palabra: 'Imán', rutaImagen: '/hablar-escribir/i/iman.png', vocalInicial: 'I' },
        { id: 'i4', palabra: 'Iceberg', rutaImagen: '/hablar-escribir/i/iceberg.png', vocalInicial: 'I' },
        { id: 'i5', palabra: 'Iglesia', rutaImagen: '/hablar-escribir/i/iglesia.png', vocalInicial: 'I' },
        { id: 'i6', palabra: 'Iguana', rutaImagen: '/hablar-escribir/i/iguana.png', vocalInicial: 'I' },
        { id: 'i7', palabra: 'Idea', rutaImagen: '/hablar-escribir/i/idea.png', vocalInicial: 'I' },
        // O
        { id: 'o1', palabra: 'Ojo', rutaImagen: '/hablar-escribir/o/ojo.png', vocalInicial: 'O' },
        { id: 'o2', palabra: 'Oso', rutaImagen: '/hablar-escribir/o/oso.png', vocalInicial: 'O' },
        { id: 'o3', palabra: 'Oveja', rutaImagen: '/hablar-escribir/o/oveja.png', vocalInicial: 'O' },
        { id: 'o4', palabra: 'Oreja', rutaImagen: '/hablar-escribir/o/oreja.png', vocalInicial: 'O' },
        { id: 'o6', palabra: 'Ocho', rutaImagen: '/hablar-escribir/o/ocho.png', vocalInicial: 'O' },
        { id: 'o7', palabra: 'Ovni', rutaImagen: '/hablar-escribir/o/ovni.png', vocalInicial: 'O' },
        { id: 'o8', palabra: 'Ola', rutaImagen: '/hablar-escribir/o/ola.png', vocalInicial: 'O' },
        // U
        { id: 'u1', palabra: 'Uva', rutaImagen: '/hablar-escribir/u/uva.png', vocalInicial: 'U' },
        { id: 'u2', palabra: 'Uno', rutaImagen: '/hablar-escribir/u/uno.png', vocalInicial: 'U' },
        { id: 'u3', palabra: 'Unicornio', rutaImagen: '/hablar-escribir/u/unicornio.png', vocalInicial: 'U' },
        { id: 'u4', palabra: 'Uña', rutaImagen: '/hablar-escribir/u/una.png', vocalInicial: 'U' },
        { id: 'u5', palabra: 'Universo', rutaImagen: '/hablar-escribir/u/universo.png', vocalInicial: 'U' }
    ];

    constructor() { }

    generarPartida(vocalObjetivo: string): CartaVocal[] {
        // Filtrar palabras de la vocal objetivo
        let palabrasObjetivo = this.bancoPalabras.filter(p => p.vocalInicial === vocalObjetivo);
        // Mezclar y coger 5
        palabrasObjetivo = this.mezclarArreglo(palabrasObjetivo).slice(0, 5);

        // Marcar como correctas
        palabrasObjetivo = palabrasObjetivo.map(p => ({ ...p, esCorrecta: true, seleccionada: false }));

        // Filtrar palabras de otras vocales
        let otrasPalabras = this.bancoPalabras.filter(p => p.vocalInicial !== vocalObjetivo);
        // Mezclar y coger 3
        otrasPalabras = this.mezclarArreglo(otrasPalabras).slice(0, 3);

        // Marcar como incorrectas
        otrasPalabras = otrasPalabras.map(p => ({ ...p, esCorrecta: false, seleccionada: false }));

        // Juntar y mezclar de nuevo
        let partida = [...palabrasObjetivo, ...otrasPalabras];
        return this.mezclarArreglo(partida);
    }

    private mezclarArreglo(arreglo: any[]): any[] {
        let currentIndex = arreglo.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arreglo[currentIndex], arreglo[randomIndex]] = [
                arreglo[randomIndex], arreglo[currentIndex]];
        }
        return arreglo;
    }
}
