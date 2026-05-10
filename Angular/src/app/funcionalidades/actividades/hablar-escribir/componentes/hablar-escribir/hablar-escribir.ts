import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hablar-escribir',
  imports: [MatIconModule, RouterModule],
  templateUrl: './hablar-escribir.html',
  styleUrl: './hablar-escribir.css',
})
export class HablarEscribir {
  private router = inject(Router);
  private location = inject(Location);

  volver(): void {
    this.location.back();
  }

  iniciarJuego(): void {
    this.router.navigate(['/hablar-escribir/juego1-hablar-escribir']);
  }

  iniciarJuegoSilabas(): void {
    this.router.navigate(['/hablar-escribir/juego-silabas']);
  }
}