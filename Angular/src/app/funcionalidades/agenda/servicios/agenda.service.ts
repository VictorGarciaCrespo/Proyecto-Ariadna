import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgendaItem } from '../interfaces/agenda.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = 'http://localhost:3000/api/agenda';
  private http = inject(HttpClient);

  getAgendaItems(): Observable<{ data: AgendaItem[], message: string }> {
    return this.http.get<{ data: AgendaItem[], message: string }>(this.apiUrl);
  }

  addAgendaItem(item: AgendaItem): Observable<{ data: AgendaItem, message: string }> {
    return this.http.post<{ data: AgendaItem, message: string }>(this.apiUrl, item);
  }

  deleteAgendaItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateAgendaItem(id: string, item: AgendaItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }
}
