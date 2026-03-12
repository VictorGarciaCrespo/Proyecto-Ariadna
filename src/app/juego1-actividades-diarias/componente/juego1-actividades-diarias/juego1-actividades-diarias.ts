import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego1-actividades-diarias',
  imports: [],
  templateUrl: './juego1-actividades-diarias.html',
  styleUrl: './juego1-actividades-diarias.css',
})
export class Juego1ActividadesDiarias {
  private location = inject(Location);
  private router = inject(Router);

  volver(): void {
    this.location.back();
  }

  finalizar(): void {
    this.router.navigate(['/menu-principal']);
  }
}
