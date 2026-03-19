import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hablar-escribir',
  imports: [MatIconModule],
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
    this.router.navigate(['/juego1-hablar-escribir']);
  }
}