import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego1-juegos-mente',
  imports: [],
  templateUrl: './juego1-juegos-mente.html',
  styleUrl: './juego1-juegos-mente.css',
})
export class Juego1JuegosMente {
  private location = inject(Location);
  private router = inject(Router);

  volver(): void {
    this.location.back();
  }

  siguiente(): void {
    this.router.navigate(['/juego2-juegos-mente']);
  }
}
