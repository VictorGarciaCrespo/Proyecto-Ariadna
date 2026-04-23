import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-juegos-mente',
  imports: [MatIconModule],
  templateUrl: './juegos-mente.html',
  styleUrl: './juegos-mente.css',
})
export class JuegosMente {
  private router = inject(Router);
  private location = inject(Location);

  volver(): void {
    this.router.navigate(['/menu-principal']);
  }

  iniciarJuego(): void {
    this.router.navigate(['/juegos-mente/juego-memoria']);
  }
  finalizar(): void {
    this.router.navigate(['/menu-principal']);
  }
}