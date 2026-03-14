import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego1-hablar-escribir',
  imports: [],
  templateUrl: './juego1-hablar-escribir.html',
  styleUrl: './juego1-hablar-escribir.css',
})
export class Juego1HablarEscribir {
  private location = inject(Location);
  private router = inject(Router);

  volver(): void {
    this.location.back();
  }

  siguiente(): void {
    this.router.navigate(['/menu-principal']);
  }
}
