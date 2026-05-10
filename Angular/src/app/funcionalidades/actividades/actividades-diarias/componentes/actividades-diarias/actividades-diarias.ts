import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-actividades-diarias',
  imports: [MatIconModule],
  templateUrl: './actividades-diarias.html',
  styleUrl: './actividades-diarias.css',
})
export class ActividadesDiarias {
  private router = inject(Router);
  private location = inject(Location);

  volver(): void {
    this.location.back();
  }

  iniciarJuego(): void {
    // Elegir aleatoriamente entre los dos juegos de actividades diarias
    const juegos = [
      '/actividades-diarias/juego1-actividades-diarias',
      '/actividades-diarias/juego-accion-objeto'
    ];
    const ruta = juegos[Math.floor(Math.random() * juegos.length)];
    this.router.navigate([ruta]);
  }
}
