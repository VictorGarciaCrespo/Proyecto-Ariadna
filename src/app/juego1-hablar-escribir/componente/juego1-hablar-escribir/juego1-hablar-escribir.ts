import { Component, inject, OnInit } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VocalJuegoService } from '../../servicio/vocal-juego.service';
import { CartaVocal } from '../../interfaz/vocal-juego.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-juego1-hablar-escribir',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './juego1-hablar-escribir.html',
  styleUrl: './juego1-hablar-escribir.css',
})
export class Juego1HablarEscribir implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  private vocalService = inject(VocalJuegoService);

  vocalSeleccionada: string | null = null;
  vocales: string[] = ['A', 'E', 'I', 'O', 'U'];
  cartas: CartaVocal[] = [];
  aciertos: number = 0;
  juegoTerminado: boolean = false;

  ngOnInit(): void {
    this.iniciarJuegoAleatorio();
  }

  iniciarJuegoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * this.vocales.length);
    this.vocalSeleccionada = this.vocales[indiceAleatorio];
    this.iniciarJuego(this.vocalSeleccionada);
  }

  seleccionarVocal(vocal: string) {
    this.vocalSeleccionada = vocal;
    this.iniciarJuego(vocal);
  }

  iniciarJuego(vocal: string) {
    this.cartas = this.vocalService.generarPartida(vocal);
    this.aciertos = 0;
    this.juegoTerminado = false;
  }

  seleccionarCarta(carta: CartaVocal) {
    if (this.juegoTerminado || carta.seleccionada) return;

    carta.seleccionada = true;

    if (carta.esCorrecta) {
      this.aciertos++;
      if (this.aciertos === 5) {
        this.juegoTerminado = true;
      }
    }
  }

  volverAJugar() {
    this.reiniciar();
    this.iniciarJuegoAleatorio();
  }

  reiniciar() {
    this.juegoTerminado = false;
  }

  volver(): void {
    this.location.back();
  }

  siguiente(): void {
    this.router.navigate(['/menu-principal']);
  }
}
