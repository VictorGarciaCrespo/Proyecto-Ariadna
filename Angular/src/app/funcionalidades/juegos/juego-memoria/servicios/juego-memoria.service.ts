import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ElementoMemoria } from '../interfaces/juego-memoria.interface';

@Injectable({
    providedIn: 'root'
})
export class JuegoMemoriaService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/elementos-memoria';

    obtenerElementos(): Observable<ElementoMemoria[]> {
        return this.http.get<{ data: ElementoMemoria[] }>(this.apiUrl).pipe(
            map(res => res.data || []),
            catchError(err => {
                console.error('Error al obtener elementos de memoria:', err);
                return of([]);
            })
        );
    }
}
