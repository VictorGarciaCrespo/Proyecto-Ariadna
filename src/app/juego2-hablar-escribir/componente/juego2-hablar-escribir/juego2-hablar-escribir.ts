import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego2-hablar-escribir',
  imports: [],
  templateUrl: './juego2-hablar-escribir.html',
  styleUrl: './juego2-hablar-escribir.css',
})
export class Juego2HablarEscribir {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/juego1-hablar-escribir']);
  }

  finalizar(): void {
    this.router.navigate(['/menu-principal']);
  }
}
