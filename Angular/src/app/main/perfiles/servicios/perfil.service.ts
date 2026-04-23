import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Perfil {
    _id?: string; // IMPORTANTE: Agregado el ID de Mongo
    nombre: string;
    apellidos: string;
    fechaNacimiento: Date | string;
    imagen: string | File;
    capacidades: string[];
}

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/perfiles';

    private perfilActualSubject = new BehaviorSubject<Perfil | null>(null);
    perfilActual$ = this.perfilActualSubject.asObservable();

    obtenerPerfiles(): Observable<Perfil[]> {
        return this.http.get<{data: Perfil[], message: string}>(this.apiUrl).pipe(
            map(response => response.data)
        );
    }

    agregarPerfil(perfil: Perfil): Observable<any> {
        return this.http.post(this.apiUrl, perfil);
    }

    eliminarPerfil(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    actualizarPerfil(id: string, perfil: Perfil): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, perfil);
    }

    setPerfil(perfil: Perfil | null): void {
        this.perfilActualSubject.next(perfil);
    }

    getPerfil(): Perfil | null {
        return this.perfilActualSubject.value;
    }
}
