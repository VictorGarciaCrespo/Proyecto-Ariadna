import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego1-hablar-escribir',
  imports: [],
  templateUrl: './juego1-hablar-escribir.html',
  styleUrl: './juego1-hablar-escribir.css',
})
export class Juego1HablarEscribir {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/hablar-escribir']);
  }

  finalizar(): void {
    this.router.navigate(['/']);
  }
}
