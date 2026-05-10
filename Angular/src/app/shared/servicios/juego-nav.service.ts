import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

export type CategoriaJuego = 'actividades-diarias' | 'estimulacion-cognitiva';

const RUTAS: Record<CategoriaJuego, string[]> = {
  'actividades-diarias': [
    '/actividades-diarias/juego1-actividades-diarias',
    '/actividades-diarias/juego-accion-objeto'
  ],
  'estimulacion-cognitiva': [
    '/juegos-mente/juego-memoria',
    '/juegos-mente/juego-intrusos'
  ]
};

@Injectable({ providedIn: 'root' })
export class JuegoNavService {
  private router = inject(Router);

  /** Navega al siguiente juego de la misma categoría (excluye la ruta actual) */
  siguienteJuego(categoria: CategoriaJuego): void {
    const rutas = RUTAS[categoria];
    const actual = this.router.url;
    const otras = rutas.filter(r => !actual.startsWith(r));
    const destino = otras[Math.floor(Math.random() * otras.length)];
    this.router.navigate([destino]);
  }
}
