import { environment } from '../../../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RondaIntruso } from '../paginas/juego-intrusos-page/juego-intrusos-page.component';

@Injectable({
  providedIn: 'root'
})
export class JuegoIntrusosService {
  private apiUrl = `${environment.apiUrl}/intrusos`;
  private http = inject(HttpClient);

  getIntrusos(): Observable<{ data: RondaIntruso[], message: string }> {
    return this.http.get<{ data: RondaIntruso[], message: string }>(this.apiUrl);
  }
}
