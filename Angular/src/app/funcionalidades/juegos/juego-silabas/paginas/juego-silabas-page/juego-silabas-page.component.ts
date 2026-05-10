import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { SonidoService } from '../../../../../shared/servicios/sonido.service';

export interface PalabraMusica {
  id: number;
  palabra: string;
  imagen: string;
  silaba: string;
}

@Component({
  selector: 'app-juego-silabas-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, AsyncPipe],
  templateUrl: './juego-silabas-page.component.html',
  styleUrls: ['./juego-silabas-page.component.css']
})
export class JuegoSilabasPageComponent implements OnInit {

  sonidoService = inject(SonidoService);
  private router = inject(Router);
  private cdRef = inject(ChangeDetectorRef);

  readonly TOTAL_POR_RONDA = 4;

  // Base de datos de todas las palabras
  readonly todasLasPalabras: Omit<PalabraMusica, 'id'>[] = [
    { palabra: 'acordeón', imagen: '/hablar-escribir/musica/acordeon.png', silaba: 'cor' },
    { palabra: 'armónica', imagen: '/hablar-escribir/musica/armonica.png', silaba: 'ca' },
    { palabra: 'bajo',     imagen: '/hablar-escribir/musica/bajo.png',     silaba: 'ba' },
    { palabra: 'flauta',   imagen: '/hablar-escribir/musica/flauta.png',   silaba: 'ta' },
    { palabra: 'guitarra', imagen: '/hablar-escribir/musica/guitarra.png', silaba: 'rra' },
    { palabra: 'contrabajo', imagen: '/hablar-escribir/musica/contrabajo.png', silaba: 'jo' },
    { palabra: 'pandereta', imagen: '/hablar-escribir/musica/pandereta.png', silaba: 'pan' },
    { palabra: 'piano',    imagen: '/hablar-escribir/musica/piano.png',    silaba: 'no' },
    { palabra: 'saxofón',  imagen: '/hablar-escribir/musica/saxofon.png',  silaba: 'fon' },
    { palabra: 'tambor',   imagen: '/hablar-escribir/musica/tambor.png',   silaba: 'tam' },
    { palabra: 'teclado',  imagen: '/hablar-escribir/musica/teclado.png',  silaba: 'cla' },
    { palabra: 'triángulo', imagen: '/hablar-escribir/musica/triangulo.png', silaba: 'lo' },
    { palabra: 'trompeta', imagen: '/hablar-escribir/musica/trompeta.png', silaba: 'pe' },
    { palabra: 'violín',   imagen: '/hablar-escribir/musica/violin.png',   silaba: 'vi' },
    { palabra: 'xilófono', imagen: '/hablar-escribir/musica/xilofono.png', silaba: 'no' },
  ];

  // Estado del juego
  palabrasRonda: PalabraMusica[] = [];
  silabasRonda: PalabraMusica[] = []; // sílabas barajadas por separado
  silabaSeleccionada: PalabraMusica | null = null;
  conexiones = new Map<number, number>(); // silabaId -> imagenId
  estadoTarjetas = new Map<number, 'seleccionada' | 'correcta' | 'incorrecta' | 'neutro'>();
  estadoImagenes = new Map<number, 'correcta' | 'incorrecta' | 'destacada' | 'neutro'>();
  aciertos = 0;
  juegoTerminado = false;
  private procesando = false;

  ngOnInit(): void {
    this.iniciarRonda();
  }

  iniciarRonda(): void {
    // Barajar y coger 4 palabras aleatorias
    const mezcladas = [...this.todasLasPalabras]
      .sort(() => Math.random() - 0.5)
      .slice(0, this.TOTAL_POR_RONDA)
      .map((p, i) => ({ ...p, id: i }));

    this.palabrasRonda = mezcladas;
    // Barajar las sílabas por separado (copia con el mismo id)
    this.silabasRonda = [...mezcladas].sort(() => Math.random() - 0.5);

    // Inicializar mapas de estado
    this.estadoTarjetas = new Map(mezcladas.map(p => [p.id, 'neutro']));
    this.estadoImagenes = new Map(mezcladas.map(p => [p.id, 'neutro']));
    this.conexiones = new Map();
    this.silabaSeleccionada = null;
    this.aciertos = 0;
    this.juegoTerminado = false;
    this.procesando = false;
    this.cdRef.detectChanges();
  }

  seleccionarSilaba(palabra: PalabraMusica): void {
    if (this.procesando) return;
    if (this.estadoTarjetas.get(palabra.id) === 'correcta') return;

    // Pronunciar la sílaba
    this.sonidoService.hablar(palabra.silaba);

    // Si ya estaba seleccionada, deseleccionar
    if (this.silabaSeleccionada?.id === palabra.id) {
      this.setEstadoTarjeta(palabra.id, 'neutro');
      this.silabaSeleccionada = null;
      this.actualizarDestacadoImagenes(false);
      return;
    }

    // Deseleccionar anterior
    if (this.silabaSeleccionada) {
      this.setEstadoTarjeta(this.silabaSeleccionada.id, 'neutro');
    }

    this.setEstadoTarjeta(palabra.id, 'seleccionada');
    this.silabaSeleccionada = palabra;
    this.actualizarDestacadoImagenes(true);
  }

  seleccionarImagen(palabra: PalabraMusica): void {
    if (!this.silabaSeleccionada || this.procesando) return;
    if (this.estadoImagenes.get(palabra.id) === 'correcta') return;

    this.procesando = true;
    const silaba = this.silabaSeleccionada;

    if (silaba.id === palabra.id) {
      // ✅ Correcto: pronunciar la palabra completa
      setTimeout(() => {
        this.sonidoService.hablar(palabra.palabra);
        this.setEstadoTarjeta(silaba.id, 'correcta');
        this.setEstadoImagen(palabra.id, 'correcta');

        const mapa = new Map(this.conexiones);
        mapa.set(silaba.id, palabra.id);
        this.conexiones = mapa;

        this.aciertos++;
        this.silabaSeleccionada = null;
        this.actualizarDestacadoImagenes(false);
        this.procesando = false;

        this.cdRef.detectChanges(); // Forzar actualización visual del tick

        if (this.aciertos >= this.TOTAL_POR_RONDA) {
          setTimeout(() => { 
            this.juegoTerminado = true; 
            this.cdRef.detectChanges(); // Forzar actualización a la pantalla de victoria
          }, 500);
        }
      }, 200);
    } else {
      // ❌ Incorrecto
      this.setEstadoTarjeta(silaba.id, 'incorrecta');
      this.setEstadoImagen(palabra.id, 'incorrecta');
      setTimeout(() => {
        this.setEstadoTarjeta(silaba.id, 'neutro');
        this.setEstadoImagen(palabra.id, 'neutro');
        this.silabaSeleccionada = null;
        this.actualizarDestacadoImagenes(false);
        this.procesando = false;
        this.cdRef.detectChanges();
      }, 800);
    }
  }

  volverAJugar(): void {
    this.iniciarRonda();
  }

  finalizar(): void {
    this.router.navigate(['/menu-principal']);
  }

  // ── Helpers ──────────────────────────────────────────
  getEstadoTarjeta(id: number): string {
    return this.estadoTarjetas.get(id) ?? 'neutro';
  }

  getEstadoImagen(id: number): string {
    return this.estadoImagenes.get(id) ?? 'neutro';
  }

  private setEstadoTarjeta(id: number, estado: 'seleccionada' | 'correcta' | 'incorrecta' | 'neutro') {
    this.estadoTarjetas = new Map(this.estadoTarjetas);
    this.estadoTarjetas.set(id, estado);
  }

  private setEstadoImagen(id: number, estado: 'correcta' | 'incorrecta' | 'destacada' | 'neutro') {
    this.estadoImagenes = new Map(this.estadoImagenes);
    this.estadoImagenes.set(id, estado);
  }

  private actualizarDestacadoImagenes(destacar: boolean) {
    const nuevo = new Map(this.estadoImagenes);
    this.palabrasRonda.forEach(p => {
      if (nuevo.get(p.id) !== 'correcta') {
        nuevo.set(p.id, destacar ? 'destacada' : 'neutro');
      }
    });
    this.estadoImagenes = nuevo;
  }
}
