import { Component, inject, OnInit, signal } from '@angular/core';
import { Location, NgClass, NgIf, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { JuegoAccionObjetoService } from '../../servicios/juego-accion-objeto.service';
import { ParejasAccionObjeto, TarjetaJuego } from '../../interfaces/juego-accion-objeto.interface';
import { SonidoService } from '../../../../../shared/servicios/sonido.service';

@Component({
  selector: 'app-juego-accion-objeto',
  imports: [MatIconModule, NgClass, NgIf, NgFor, RouterLink],
  templateUrl: './juego-accion-objeto.html',
  styleUrl: './juego-accion-objeto.css',
})
export class JuegoAccionObjetoComponent implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  private service = inject(JuegoAccionObjetoService);
  sonidoService = inject(SonidoService);

  // Estado
  cargando = signal(true);
  error = signal(false);
  juegoTerminado = signal(false);

  acciones = signal<TarjetaJuego[]>([]);
  objetos = signal<TarjetaJuego[]>([]);
  parejasCorrectas = signal(0);
  readonly TOTAL_PAREJAS = 4;

  // Conexiones confirmadas: { accionId -> objetoId }
  conexiones = signal<Map<number, number>>(new Map());

  seleccionadaAccion: TarjetaJuego | null = null;
  private procesando = false;
  private todasLasParejas: ParejasAccionObjeto[] = [];

  ngOnInit() {
    this.service.getParejas().subscribe({
      next: (parejas) => {
        this.todasLasParejas = parejas;
        this.cargando.set(false);
        this.iniciarRonda();
      },
      error: () => {
        this.cargando.set(false);
        this.error.set(true);
      }
    });
  }

  iniciarRonda() {
    const seleccionadas = this.mezclar([...this.todasLasParejas]).slice(0, this.TOTAL_PAREJAS);

    const acc: TarjetaJuego[] = [];
    const obj: TarjetaJuego[] = [];

    seleccionadas.forEach((pareja, parejaId) => {
      acc.push({ id: parejaId * 2,     imagen: pareja.accion, tipo: 'accion', parejaId, estado: 'neutro' });
      obj.push({ id: parejaId * 2 + 1, imagen: pareja.objeto, tipo: 'objeto', parejaId, estado: 'neutro' });
    });

    this.acciones.set(this.mezclar(acc));
    this.objetos.set(this.mezclar(obj));
    this.conexiones.set(new Map());
    this.parejasCorrectas.set(0);
    this.juegoTerminado.set(false);
    this.seleccionadaAccion = null;
    this.procesando = false;
  }

  /** El usuario toca una tarjeta de la columna IZQUIERDA (acción) */
  seleccionarAccion(tarjeta: TarjetaJuego) {
    if (tarjeta.estado === 'correcta') return;

    const nombre = tarjeta.imagen.replace('.png', '').replace(/-/g, ' ');
    this.sonidoService.hablar(nombre);

    // Deseleccionar si se toca la misma
    if (this.seleccionadaAccion?.id === tarjeta.id) {
      this.actualizarAccion(tarjeta.id, 'neutro');
      this.seleccionadaAccion = null;
      return;
    }

    // Deseleccionar la anterior si la había
    if (this.seleccionadaAccion) {
      this.actualizarAccion(this.seleccionadaAccion.id, 'neutro');
    }

    this.actualizarAccion(tarjeta.id, 'seleccionada');
    this.seleccionadaAccion = tarjeta;
  }

  /** El usuario toca una tarjeta de la columna DERECHA (objeto) */
  seleccionarObjeto(tarjeta: TarjetaJuego) {
    if (!this.seleccionadaAccion || this.procesando) return;
    if (tarjeta.estado === 'correcta') return;

    const nombre = tarjeta.imagen.replace('.png', '').replace(/-/g, ' ');
    this.sonidoService.hablar(nombre);

    this.procesando = true;
    const accion = this.seleccionadaAccion;

    if (accion.parejaId === tarjeta.parejaId) {
      // ✅ Correcto
      setTimeout(() => {
        this.actualizarAccion(accion.id, 'correcta');
        this.actualizarObjeto(tarjeta.id, 'correcta');

        // Guardar conexión confirmada
        const mapa = new Map(this.conexiones());
        mapa.set(accion.id, tarjeta.id);
        this.conexiones.set(mapa);

        const nuevas = this.parejasCorrectas() + 1;
        this.parejasCorrectas.set(nuevas);
        this.seleccionadaAccion = null;
        this.procesando = false;

        if (nuevas >= this.TOTAL_PAREJAS) {
          setTimeout(() => this.juegoTerminado.set(true), 500);
        }
      }, 300);
    } else {
      // ❌ Incorrecto
      this.actualizarAccion(accion.id, 'incorrecta');
      this.actualizarObjeto(tarjeta.id, 'incorrecta');
      setTimeout(() => {
        this.actualizarAccion(accion.id, 'neutro');
        this.actualizarObjeto(tarjeta.id, 'neutro');
        this.seleccionadaAccion = null;
        this.procesando = false;
      }, 900);
    }
  }

  estaConectadaAccion(accionId: number): boolean {
    return this.conexiones().has(accionId);
  }

  irAJuegoActividades() {
    this.router.navigate(['/actividades-diarias/juego1-actividades-diarias']);
  }

  volver(): void {
    this.router.navigate(['/actividades-diarias']);
  }

  private actualizarAccion(id: number, estado: TarjetaJuego['estado']) {
    this.acciones.set(this.acciones().map(t => t.id === id ? { ...t, estado } : t));
  }

  private actualizarObjeto(id: number, estado: TarjetaJuego['estado']) {
    this.objetos.set(this.objetos().map(t => t.id === id ? { ...t, estado } : t));
  }

  private mezclar<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
