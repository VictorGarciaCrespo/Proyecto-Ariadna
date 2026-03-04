import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego2-juegos-mente',
  imports: [],
  templateUrl: './juego2-juegos-mente.html',
  styleUrl: './juego2-juegos-mente.css',
})
export class Juego2JuegosMente {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/juegos-mente']);
  }

  finalizar(): void {
    this.router.navigate(['/']);
  }
}
