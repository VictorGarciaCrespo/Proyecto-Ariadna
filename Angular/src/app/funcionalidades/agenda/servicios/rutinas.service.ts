import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutina } from '../interfaces/rutina.interface';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {
  private apiUrl = 'http://localhost:3000/api/rutinas';
  private http = inject(HttpClient);

  getRutinas(): Observable<{ data: Rutina[], message: string }> {
    return this.http.get<{ data: Rutina[], message: string }>(this.apiUrl);
  }

  addRutina(rutina: Rutina): Observable<{ data: Rutina, message: string }> {
    return this.http.post<{ data: Rutina, message: string }>(this.apiUrl, rutina);
  }

  deleteRutina(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateRutina(id: string, rutina: Rutina): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, rutina);
  }
}
