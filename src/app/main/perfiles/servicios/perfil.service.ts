import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Perfil {
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
  private perfilActualSubject = new BehaviorSubject<Perfil | null>(null);
  perfilActual$ = this.perfilActualSubject.asObservable();

  private perfilesKey = 'ariadna_perfiles';
  
  private defaultPerfiles: Perfil[] = [
      { nombre: 'Mateo', apellidos: 'Pérez', fechaNacimiento: '2010-05-12', imagen: 'Perfiles/chico.png', capacidades: ['pictogramas'] },
      { nombre: 'Endrick', apellidos: 'García', fechaNacimiento: '2011-08-20', imagen: 'Perfiles/chico_2.png', capacidades: ['sonido'] },
      { nombre: 'Whang', apellidos: 'Li', fechaNacimiento: '2012-01-15', imagen: 'Perfiles/chino.png', capacidades: ['texto_explicativo'] },
      { nombre: 'Marta', apellidos: 'López', fechaNacimiento: '2010-11-30', imagen: 'Perfiles/chica.png', capacidades: ['pictogramas', 'sonido'] },
  ];

  obtenerPerfiles(): Perfil[] {
      const saved = localStorage.getItem(this.perfilesKey);
      if (saved) {
          return JSON.parse(saved);
      }
      this.guardarPerfiles(this.defaultPerfiles);
      return this.defaultPerfiles;
  }

  agregarPerfil(perfil: Perfil): void {
      const perfiles = this.obtenerPerfiles();
      perfiles.push(perfil);
      this.guardarPerfiles(perfiles);
  }

  private guardarPerfiles(perfiles: Perfil[]): void {
      localStorage.setItem(this.perfilesKey, JSON.stringify(perfiles));
  }

    setPerfil(perfil: Perfil): void {
        this.perfilActualSubject.next(perfil);
    }
    
    getPerfil(): Perfil | null {
        return this.perfilActualSubject.value;
    }
}
