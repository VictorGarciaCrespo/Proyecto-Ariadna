import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SonidoService } from '../../../../../shared/servicios/sonido.service';

export interface ImagenIntruso {
  nombre: string;
  ruta: string;
  esIntrusa: boolean;
}

export interface RondaIntruso {
  ronda: number;
  titulo: string;
  imagenes: ImagenIntruso[];
}

@Component({
  selector: 'app-juego-intrusos-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, AsyncPipe],
  templateUrl: './juego-intrusos-page.component.html',
  styleUrls: ['./juego-intrusos-page.component.css']
})
export class JuegoIntrusosPageComponent implements OnInit {

  private cdRef = inject(ChangeDetectorRef);
  sonidoService = inject(SonidoService);

  rondas: RondaIntruso[] = [
    {
      ronda: 1,
      titulo: 'Vehículos',
      imagenes: [
        { nombre: 'Grúa', ruta: '/intrusos/grua.jpg', esIntrusa: false },
        { nombre: 'Remolques', ruta: '/intrusos/Remolques.jpg', esIntrusa: false },
        { nombre: 'Plátano', ruta: '/intrusos/platano.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 2,
      titulo: 'Insectos',
      imagenes: [
        { nombre: 'Mariposas', ruta: '/intrusos/Mariposas.jpg', esIntrusa: false },
        { nombre: 'Polillas', ruta: '/intrusos/Polillas.jpg', esIntrusa: false },
        { nombre: 'Maíz', ruta: '/intrusos/maiz.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 3,
      titulo: 'Camping',
      imagenes: [
        { nombre: 'Saco de dormir', ruta: '/intrusos/saco_dormir.jpg', esIntrusa: false },
        { nombre: 'Tienda de campaña', ruta: '/intrusos/tienda_campana.jpg', esIntrusa: false },
        { nombre: 'Dátil', ruta: '/intrusos/datil.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 4,
      titulo: 'Frutas y Verduras',
      imagenes: [
        { nombre: 'Lechugas', ruta: '/intrusos/Lechugas.jpg', esIntrusa: true },
        { nombre: 'Fresas', ruta: '/intrusos/Fresas.jpg', esIntrusa: false },
        { nombre: 'Cerezas', ruta: '/intrusos/Cerezas.jpg', esIntrusa: false }
      ]
    }
  ];

  rondaActualIndex: number = 0;
  juegoTerminado: boolean = false;
  imagenSeleccionadaIndex: number | null = null;
  estadoSeleccion: 'correcto' | 'incorrecto' | null = null;
  bloqueado: boolean = false;

  get rondaActual(): RondaIntruso {
    return this.rondas[this.rondaActualIndex];
  }

  get totalRondas(): number {
    return this.rondas.length;
  }

  ngOnInit(): void {
    this.mezclarRondas();
    this.reiniciarEstado();
  }

  mezclarRondas(): void {
    // Mezclar el orden de las rondas
    for (let i = this.rondas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.rondas[i], this.rondas[j]] = [this.rondas[j], this.rondas[i]];
    }
    // Mezclar también el orden de las imágenes dentro de cada ronda
    this.rondas.forEach(ronda => {
      for (let i = ronda.imagenes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ronda.imagenes[i], ronda.imagenes[j]] = [ronda.imagenes[j], ronda.imagenes[i]];
      }
    });
  }

  reiniciarEstado(): void {
    this.imagenSeleccionadaIndex = null;
    this.estadoSeleccion = null;
    this.bloqueado = false;
  }

  seleccionarImagen(imagen: ImagenIntruso, index: number): void {
    // Bloquear solo si ya se acertó y se está avanzando de ronda
    if (this.bloqueado && this.estadoSeleccion === 'correcto') return;

    this.imagenSeleccionadaIndex = index;
    this.sonidoService.hablar(imagen.nombre);

    if (imagen.esIntrusa) {
      // Correcto: mostrar ✅ 500ms y avanzar
      this.estadoSeleccion = 'correcto';
      this.bloqueado = true;
      this.cdRef.detectChanges(); // forzar pintado del ✅ antes del timeout
      setTimeout(() => {
        this.avanzarRonda();
        this.cdRef.detectChanges(); // Asegurar actualización visual tras avanzar
      }, 500);
    } else {
      // Incorrecto: mostrar ❌ 500ms y dejar reintentar
      this.estadoSeleccion = 'incorrecto';
      this.cdRef.detectChanges(); // forzar pintado del ❌ antes del timeout
      setTimeout(() => {
        this.reiniciarEstado();
        this.cdRef.detectChanges(); // Asegurar borrado de la X
      }, 500);
    }
  }

  avanzarRonda(): void {
    if (this.rondaActualIndex < this.totalRondas - 1) {
      this.rondaActualIndex++;
      this.reiniciarEstado();
    } else {
      this.juegoTerminado = true;
    }
  }

  reiniciarJuego(): void {
    this.rondaActualIndex = 0;
    this.juegoTerminado = false;
    this.mezclarRondas();
    this.reiniciarEstado();
  }

  getClaseImagen(index: number): { 'imagen-correcta': boolean; 'imagen-incorrecta': boolean } {
    return {
      'imagen-correcta': this.imagenSeleccionadaIndex === index && this.estadoSeleccion === 'correcto',
      'imagen-incorrecta': this.imagenSeleccionadaIndex === index && this.estadoSeleccion === 'incorrecto'
    };
  }
}
