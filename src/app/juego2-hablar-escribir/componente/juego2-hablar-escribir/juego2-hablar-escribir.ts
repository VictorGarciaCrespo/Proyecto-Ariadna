import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego2-hablar-escribir',
  imports: [],
  templateUrl: './juego2-hablar-escribir.html',
  styleUrl: './juego2-hablar-escribir.css',
})
export class Juego2HablarEscribir {
  private location = inject(Location);
  private router = inject(Router);

  volver(): void {
    this.location.back();
  }

  finalizar(): void {
    this.router.navigate(['/menu-principal']);
  }
}
