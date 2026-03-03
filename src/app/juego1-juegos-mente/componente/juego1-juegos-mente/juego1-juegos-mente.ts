import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego1-juegos-mente',
  imports: [],
  templateUrl: './juego1-juegos-mente.html',
  styleUrl: './juego1-juegos-mente.css',
})
export class Juego1JuegosMente {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/juegos-mente']);
  }

  finalizar(): void {
    this.router.navigate(['/']);
  }
}
