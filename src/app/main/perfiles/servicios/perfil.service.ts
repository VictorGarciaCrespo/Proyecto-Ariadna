import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Perfil {
  nombre: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfilActualSubject = new BehaviorSubject<Perfil | null>(null);
  perfilActual$ = this.perfilActualSubject.asObservable();

    setPerfil(perfil: Perfil): void {
        this.perfilActualSubject.next(perfil);
    }
    
    getPerfil(): Perfil | null {
        return this.perfilActualSubject.value;
    }
}
