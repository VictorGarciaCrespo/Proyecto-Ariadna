import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Location, NgClass, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Juego1ActividadesDiariasService } from '../../servicios/juego1-actividades-diarias.service';
import { ActividadDiaria, PictogramaJuego } from '../../interfaces/juego1-actividades-diarias.interface';

@Component({
  selector: 'app-juego1-actividades-diarias',
  imports: [MatIconModule, NgClass, NgIf, NgFor],
  templateUrl: './juego1-actividades-diarias.html',
  styleUrl: './juego1-actividades-diarias.css',
})
export class Juego1ActividadesDiarias implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  private service = inject(Juego1ActividadesDiariasService);

  // Estado del juego
  actividades: ActividadDiaria[] = [];
  actividadActual = signal<ActividadDiaria | null>(null);
  pictogramasJuego = signal<PictogramaJuego[]>([]);
  acertados = signal(0);
  juegoTerminado = signal(false);
  cargando = signal(true);
  error = signal(false);

  ngOnInit() {
    this.service.getActividades().subscribe({
      next: (actividades) => {
        this.actividades = actividades;
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
    if (this.actividades.length === 0) return;

    // Elegir actividad aleatoria
    const idx = Math.floor(Math.random() * this.actividades.length);
    const actividad = this.actividades[idx];
    this.actividadActual.set(actividad);
    this.acertados.set(0);
    this.juegoTerminado.set(false);

    // Mezclar objetos correctos + distractores y elegir 6 en total (3 correctos + 3 distractores aleatorios)
    const correctos = this.mezclar([...actividad.objetosCorrectos]).slice(0, 3);
    const distractoresDisponibles = this.mezclar([...actividad.distractores]);
    const distractores = distractoresDisponibles.slice(0, 3);

    const todos: PictogramaJuego[] = [
      ...correctos.map(r => ({ ruta: r + '.png', correcto: true, estado: 'neutro' as const })),
      ...distractores.map(r => ({ ruta: r + '.png', correcto: false, estado: 'neutro' as const }))
    ];

    this.pictogramasJuego.set(this.mezclar(todos));
  }

  seleccionar(index: number) {
    const lista = [...this.pictogramasJuego()];
    const item = lista[index];

    // Ignorar si ya fue seleccionado
    if (item.estado !== 'neutro') return;

    if (item.correcto) {
      lista[index] = { ...item, estado: 'correcto' };
      this.pictogramasJuego.set(lista);
      const nuevosAcertados = this.acertados() + 1;
      this.acertados.set(nuevosAcertados);

      if (nuevosAcertados >= 3) {
        // Pequeña pausa para mostrar el último tick antes del mensaje de fin
        setTimeout(() => this.juegoTerminado.set(true), 600);
      }
    } else {
      lista[index] = { ...item, estado: 'incorrecto' };
      this.pictogramasJuego.set(lista);

      // Restablecer el incorrecto después de 1 segundo
      setTimeout(() => {
        const l = [...this.pictogramasJuego()];
        l[index] = { ...l[index], estado: 'neutro' };
        this.pictogramasJuego.set(l);
      }, 1000);
    }
  }

  reiniciar() {
    this.iniciarRonda();
  }

  volver(): void {
    this.location.back();
  }

  private mezclar<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
