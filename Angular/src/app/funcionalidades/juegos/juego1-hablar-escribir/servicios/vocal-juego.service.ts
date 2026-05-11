import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CartaVocal } from '../interfaces/vocal-juego.interface';

@Injectable({
    providedIn: 'root'
})
export class VocalJuegoService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/palabras-vocales';

    getPalabras(): Observable<CartaVocal[]> {
        return this.http.get<{ data: CartaVocal[] }>(this.apiUrl).pipe(
            map(res => {
                console.log('Datos recibidos de la API (Vocales):', res.data);
                return res.data || [];
            }),
            catchError(err => {
                console.error('Error al obtener palabras vocales:', err);
                return of([]);
            })
        );
    }

    generarPartida(vocalObjetivo: string, bancoPalabras: CartaVocal[]): CartaVocal[] {
        const objetivo = vocalObjetivo.trim().toUpperCase();
        console.log('Generando partida para vocal:', objetivo);
        console.log('Banco de palabras disponible:', bancoPalabras.length);

        // Filtro robusto que acepta vocalInicial o vocalinicial (por si acaso)
        let palabrasObjetivo = bancoPalabras.filter(p => {
            const v = (p.vocalInicial || (p as any).vocalinicial || '').toString().trim().toUpperCase();
            return v === objetivo;
        });
        console.log('Palabras encontradas para la vocal:', palabrasObjetivo.length);

        palabrasObjetivo = this.mezclarArreglo(palabrasObjetivo).slice(0, 5);
        palabrasObjetivo = palabrasObjetivo.map(p => ({ ...p, esCorrecta: true, seleccionada: false }));

        let otrasPalabras = bancoPalabras.filter(p => {
            const v = (p.vocalInicial || (p as any).vocalinicial || '').toString().trim().toUpperCase();
            return v !== objetivo;
        });
        otrasPalabras = this.mezclarArreglo(otrasPalabras).slice(0, 3);

        otrasPalabras = otrasPalabras.map(p => ({ ...p, esCorrecta: false, seleccionada: false }));

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
