import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hablar-escribir',
  imports: [],
  templateUrl: './hablar-escribir.html',
  styleUrl: './hablar-escribir.css',
})
export class HablarEscribir {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/']);
  }

  iniciarJuego(): void {
    this.router.navigate(['/juego1-hablar-escribir']);
  }
}