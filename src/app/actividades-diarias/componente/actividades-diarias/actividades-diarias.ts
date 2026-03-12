import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades-diarias',
  imports: [],
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
    this.router.navigate(['/juego1-actividades-diarias']);
  }
}
