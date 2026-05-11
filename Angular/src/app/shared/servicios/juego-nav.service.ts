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
   * Navega al menú principal
   */
  irAlMenuPrincipal(): void {
    this.router.navigate(['/menu-principal']);
  }

  /**
   * Determina si el juego actual es el último de su categoría
   */
  esUltimoJuego(categoria: string): boolean {
    const juegos = this.RUTAS[categoria];
    if (!juegos) return false;
    const rutaActual = this.router.url.split('?')[0];
    return juegos[juegos.length - 1] === rutaActual;
  }

  /**
   * Navega a un juego aleatorio dentro de la misma categoría,
   * asegurándose de no repetir el juego actual.
   */
  siguienteJuego(categoria: 'estimulacion-cognitiva' | 'actividades-diarias' | 'hablar-escribir'): void {
    const juegos = this.RUTAS[categoria];
    if (!juegos || juegos.length === 0) return;

    const rutaActual = this.router.url.split('?')[0];
    const indiceActual = juegos.indexOf(rutaActual);

    // Si no se encuentra el juego actual o es el último, ir al primero (o al menú principal si se prefiere)
    // Pero como esUltimoJuego se usa antes, aquí simplemente buscamos el siguiente.
    const siguienteIndice = (indiceActual + 1) % juegos.length;
    const rutaDestino = juegos[siguienteIndice];

    // Navegar de forma forzada reutilizando el componente si es necesario
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([rutaDestino]);
    });
  }
}
