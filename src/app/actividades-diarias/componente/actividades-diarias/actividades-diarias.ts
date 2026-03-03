import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades-diarias',
  imports: [],
  templateUrl: './actividades-diarias.html',
  styleUrl: './actividades-diarias.css',
})
export class ActividadesDiarias {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/']); // or previous page
  }

  iniciarJuego(): void {
    this.router.navigate(['/juego1-actividades-diarias']);
  }
}
