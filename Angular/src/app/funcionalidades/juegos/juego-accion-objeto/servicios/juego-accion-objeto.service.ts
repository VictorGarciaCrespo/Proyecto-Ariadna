import { environment } from '../../../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParejasAccionObjeto } from '../interfaces/juego-accion-objeto.interface';

@Injectable({
  providedIn: 'root'
})
export class JuegoAccionObjetoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/acciones-objetos`;

  getParejas(): Observable<ParejasAccionObjeto[]> {
    return this.http.get<{ data: ParejasAccionObjeto[] }>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }
}
