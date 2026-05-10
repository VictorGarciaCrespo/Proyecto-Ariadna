import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JuegoNavService {
  private router = inject(Router);

  // Diccionario con las rutas de los juegos por categoría
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

  /**
   * Navega a un juego aleatorio dentro de la misma categoría,
   * asegurándose de no repetir el juego actual.
   */
  siguienteJuego(categoria: 'estimulacion-cognitiva' | 'actividades-diarias' | 'hablar-escribir'): void {
    const juegosDisponibles = this.RUTAS[categoria];
    if (!juegosDisponibles || juegosDisponibles.length === 0) return;

    const rutaActual = this.router.url.split('?')[0]; // Ignorar query params si los hay
    
    // Filtrar para no ir al mismo juego en el que estamos
    const rutasPosibles = juegosDisponibles.filter(ruta => ruta !== rutaActual);

    // Si solo hay un juego en total, ir a ese
    if (rutasPosibles.length === 0) {
      this.router.navigate([juegosDisponibles[0]]);
      return;
    }

    // Elegir uno aleatorio de los posibles
    const indiceAleatorio = Math.floor(Math.random() * rutasPosibles.length);
    const rutaDestino = rutasPosibles[indiceAleatorio];

    // Navegar de forma forzada reutilizando el componente si es necesario
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([rutaDestino]);
    });
  }
}
