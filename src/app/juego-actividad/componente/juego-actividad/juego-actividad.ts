import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego-actividad',
  imports: [],
  templateUrl: './juego-actividad.html',
  styleUrl: './juego-actividad.css',
})
export class JuegoActividad {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/actividades-diarias']);
  }

  finalizar(): void {
    this.router.navigate(['/']);
  }
}
