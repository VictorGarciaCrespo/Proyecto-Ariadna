import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-mente',
  imports: [],
  templateUrl: './juegos-mente.html',
  styleUrl: './juegos-mente.css',
})
export class JuegosMente {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/']);
  }

  iniciarJuego(): void {
    this.router.navigate(['/juego1-juegos-mente']);
  }
}