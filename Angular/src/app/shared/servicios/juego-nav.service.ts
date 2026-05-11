import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JuegoNavService {
  private router = inject(Router);

  
  private readonly RUTAS: Record<string, string[]> = {
    'estimulacion-cognitiva': [
      '/juegos-mente/juego-memoria',
      '/juegos-mente/juego-intrusos'
    ],
    'actividades-diarias': [
      '/actividades-diarias/juego1-actividades-diarias',
      '/actividades-diarias/juego-accion-objeto'
    ],
    'hablar-escribir': [
      '/hablar-escribir/juego1-hablar-escribir',
      '/hablar-escribir/juego-silabas'
    ]
  };

  
  irAlMenuPrincipal(): void {
    this.router.navigate(['/menu-principal']);
  }

  
  esUltimoJuego(categoria: string): boolean {
    const juegos = this.RUTAS[categoria];
    if (!juegos) return false;
    const rutaActual = this.router.url.split('?')[0];
    return juegos[juegos.length - 1] === rutaActual;
  }

  
  siguienteJuego(categoria: 'estimulacion-cognitiva' | 'actividades-diarias' | 'hablar-escribir'): void {
    const juegos = this.RUTAS[categoria];
    if (!juegos || juegos.length === 0) return;

    const rutaActual = this.router.url.split('?')[0];
    const indiceActual = juegos.indexOf(rutaActual);

    
    
    const siguienteIndice = (indiceActual + 1) % juegos.length;
    const rutaDestino = juegos[siguienteIndice];

    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([rutaDestino]);
    });
  }
}
