import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JuegoNavService } from '../../../../../shared/servicios/juego-nav.service';
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
  nivel?: number;
}

@Component({
  selector: 'app-juego-intrusos-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './juego-intrusos-page.component.html',
  styleUrls: ['./juego-intrusos-page.component.css']
})
export class JuegoIntrusosPageComponent implements OnInit {

  private cdRef = inject(ChangeDetectorRef);
  sonidoService = inject(SonidoService);
  private juegoNavService = inject(JuegoNavService);

  rondasNivel3: RondaIntruso[] = [
    {
      ronda: 1,
      titulo: 'Vehículos',
      imagenes: [
        { nombre: 'Grúa', ruta: '/intrusos/3/grua.jpg', esIntrusa: false },
        { nombre: 'Remolques', ruta: '/intrusos/3/Remolques.jpg', esIntrusa: false },
        { nombre: 'Plátano', ruta: '/intrusos/3/platano.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 2,
      titulo: 'Insectos',
      imagenes: [
        { nombre: 'Mariposas', ruta: '/intrusos/3/Mariposas.jpg', esIntrusa: false },
        { nombre: 'Polillas', ruta: '/intrusos/3/Polillas.jpg', esIntrusa: false },
        { nombre: 'Maíz', ruta: '/intrusos/3/maiz.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 3,
      titulo: 'Camping',
      imagenes: [
        { nombre: 'Saco de dormir', ruta: '/intrusos/3/saco_dormir.jpg', esIntrusa: false },
        { nombre: 'Tienda de campaña', ruta: '/intrusos/3/tienda_campana.jpg', esIntrusa: false },
        { nombre: 'Dátil', ruta: '/intrusos/3/datil.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 4,
      titulo: 'Frutas y Verduras',
      imagenes: [
        { nombre: 'Lechugas', ruta: '/intrusos/3/Lechugas.jpg', esIntrusa: true },
        { nombre: 'Fresas', ruta: '/intrusos/3/Fresas.jpg', esIntrusa: false },
        { nombre: 'Cerezas', ruta: '/intrusos/3/Cerezas.jpg', esIntrusa: false }
      ]
    }
  ];

  rondasNivel4: RondaIntruso[] = [
    {
      ronda: 1,
      titulo: 'Bolsos',
      imagenes: [
        { nombre: 'Bolso', ruta: '/intrusos/4/bolso.jpg', esIntrusa: false },
        { nombre: 'Mochila', ruta: '/intrusos/4/Mochila.jpg', esIntrusa: false },
        { nombre: 'Bolsa de tela', ruta: '/intrusos/4/bolsa_tela.jpg', esIntrusa: false },
        { nombre: 'Bote de cristal', ruta: '/intrusos/4/bote_cristal.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 2,
      titulo: 'Jerseys',
      imagenes: [
        { nombre: 'Jersey', ruta: '/intrusos/4/Jersey.jpg', esIntrusa: false },
        { nombre: 'Sudadera', ruta: '/intrusos/4/Sudadera.jpg', esIntrusa: false },
        { nombre: 'Polo de manga larga', ruta: '/intrusos/4/polo_manga_larga.jpg', esIntrusa: false },
        { nombre: 'Gafas', ruta: '/intrusos/4/Gafas.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 3,
      titulo: 'Bebidas',
      imagenes: [
        { nombre: 'Horchata', ruta: '/intrusos/4/Horchata.jpg', esIntrusa: false },
        { nombre: 'Limonada', ruta: '/intrusos/4/Limonadas.jpg', esIntrusa: false },
        { nombre: 'Naranjada', ruta: '/intrusos/4/Naranjada.jpg', esIntrusa: false },
        { nombre: 'Café con leche', ruta: '/intrusos/4/cafe_con_leche.jpg', esIntrusa: true }
      ]
    },
    {
      ronda: 4,
      titulo: 'Camiones',
      imagenes: [
        { nombre: 'Camiones', ruta: '/intrusos/4/Camiones.jpg', esIntrusa: false },
        { nombre: 'Camión de basura', ruta: '/intrusos/4/camion_basura.jpg', esIntrusa: false },
        { nombre: 'Camión de butano', ruta: '/intrusos/4/camion_butano.jpg', esIntrusa: false },
        { nombre: 'Submarino', ruta: '/intrusos/4/Submarinos.jpg', esIntrusa: true }
      ]
    }
  ];

  rondas: RondaIntruso[] = [];
  nivelActual: number = 3;
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
    this.seleccionarNivel();
    this.mezclarRondas();
    this.reiniciarEstado();
  }

  seleccionarNivel(): void {
    
    this.nivelActual = Math.random() < 0.5 ? 3 : 4;
    
    const rondasFuente = this.nivelActual === 3 ? this.rondasNivel3 : this.rondasNivel4;
    
    this.rondas = rondasFuente.map(ronda => ({
      ...ronda,
      imagenes: [...ronda.imagenes]
    }));
  }

  mezclarRondas(): void {
    
    for (let i = this.rondas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.rondas[i], this.rondas[j]] = [this.rondas[j], this.rondas[i]];
    }
    
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
    
    if (this.bloqueado && this.estadoSeleccion === 'correcto') return;

    this.imagenSeleccionadaIndex = index;
    this.sonidoService.hablar(imagen.nombre);

    if (imagen.esIntrusa) {
      
      this.estadoSeleccion = 'correcto';
      this.bloqueado = true;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.avanzarRonda();
        this.cdRef.detectChanges();
      }, 500);
    } else {
      
      this.estadoSeleccion = 'incorrecto';
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.reiniciarEstado();
        this.cdRef.detectChanges();
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

  siguienteJuego(): void { 
    if (this.juegoNavService.esUltimoJuego('estimulacion-cognitiva')) {
      this.juegoNavService.irAlMenuPrincipal();
    } else {
      this.juegoNavService.siguienteJuego('estimulacion-cognitiva'); 
    }
  }

  get esUltimo(): boolean {
    return this.juegoNavService.esUltimoJuego('estimulacion-cognitiva');
  }

  reiniciarJuego(): void {
    this.rondaActualIndex = 0;
    this.juegoTerminado = false;
    this.seleccionarNivel();
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
