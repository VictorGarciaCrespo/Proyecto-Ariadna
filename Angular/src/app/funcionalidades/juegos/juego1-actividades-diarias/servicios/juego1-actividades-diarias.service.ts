import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActividadDiaria } from '../interfaces/juego1-actividades-diarias.interface';

@Injectable({
  providedIn: 'root'
})
export class Juego1ActividadesDiariasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/actividades-diarias';

  getActividades(): Observable<ActividadDiaria[]> {
    return this.http.get<{ data: ActividadDiaria[] }>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }
}
