import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface PalabraMusica {
  id: number;
  palabra: string;
  imagen: string;
  silaba: string;
}

@Injectable({
  providedIn: 'root'
})
export class JuegoSilabasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/palabras-silabas';

  getPalabras(): Observable<PalabraMusica[]> {
    return this.http.get<{ data: PalabraMusica[] }>(this.apiUrl).pipe(
      map(res => res.data || []),
      catchError(err => {
        console.error('Error al obtener palabras silabas:', err);
        return of([]);
      })
    );
  }
}
