import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos-mente',
  imports: [],
  templateUrl: './juegos-mente.html',
  styleUrl: './juegos-mente.css',
})
export class JuegosMente {
  private router = inject(Router);
  private location = inject(Location);

  volver(): void {
    this.location.back();
  }

  iniciarJuego(): void {
    this.router.navigate(['/juego-memoria']);
  }
  finalizar(): void {
    this.router.navigate(['/menu-principal']);
  }
}