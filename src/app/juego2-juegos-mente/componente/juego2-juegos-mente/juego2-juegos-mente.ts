import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego2-juegos-mente',
  imports: [],
  templateUrl: './juego2-juegos-mente.html',
  styleUrl: './juego2-juegos-mente.css',
})
export class Juego2JuegosMente {
  private location = inject(Location);
  private router = inject(Router);

  volver(): void {
    this.location.back();
  }

  finalizar(): void {
    this.router.navigate(['/']);
  }
}
