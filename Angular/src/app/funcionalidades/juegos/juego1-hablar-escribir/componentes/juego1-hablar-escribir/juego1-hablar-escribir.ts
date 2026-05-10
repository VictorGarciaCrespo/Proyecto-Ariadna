import { Component, inject, OnInit } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VocalJuegoService } from '../../servicios/vocal-juego.service';
import { CartaVocal } from '../../interfaces/vocal-juego.interface';
import { MatIconModule } from '@angular/material/icon';
import { SonidoService } from '../../../../../shared/servicios/sonido.service';
import { JuegoNavService } from '../../../../../shared/servicios/juego-nav.service';

@Component({
  selector: 'app-juego1-hablar-escribir',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './juego1-hablar-escribir.html',
  styleUrl: './juego1-hablar-escribir.css',
})
export class Juego1HablarEscribir implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  private vocalService = inject(VocalJuegoService);
  private juegoNavService = inject(JuegoNavService);
  sonidoService = inject(SonidoService);

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

    this.sonidoService.hablar(carta.palabra);
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
    this.router.navigate(['/hablar-escribir']);
  }

  siguiente(): void {
    this.juegoNavService.siguienteJuego('hablar-escribir');
  }
}
