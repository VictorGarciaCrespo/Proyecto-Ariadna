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
    this.router.navigate(['/juego1-actividades-diarias']);
  }
}
