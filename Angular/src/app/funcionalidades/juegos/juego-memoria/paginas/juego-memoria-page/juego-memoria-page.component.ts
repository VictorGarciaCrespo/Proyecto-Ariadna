import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JuegoNavService } from '../../../../../shared/servicios/juego-nav.service';
import { JuegoMemoriaComponent } from '../../componentes/juego-memoria/juego-memoria.component';
import { JuegoMemoriaService } from '../../servicios/juego-memoria.service';
import { CartaMemoria, ElementoMemoria } from '../../interfaces/juego-memoria.interface';
import { MatIconModule } from '@angular/material/icon';
import { SonidoService } from '../../../../../shared/servicios/sonido.service';
import { PerfilService } from '../../../../../main/perfiles/servicios/perfil.service';

@Component({
    selector: 'app-juego-memoria-page',
    standalone: true,
    imports: [CommonModule, RouterModule, JuegoMemoriaComponent, MatIconModule, AsyncPipe],
    templateUrl: './juego-memoria-page.component.html',
    styleUrls: ['./juego-memoria-page.component.css']
})
export class JuegoMemoriaPageComponent implements OnInit {
    cartas: CartaMemoria[] = [];
    elementos: ElementoMemoria[] = [];
    primeraCarta: CartaMemoria | null = null;
    bloquearTablero: boolean = false;
    juegoTerminado: boolean = false;
    tieneTextoAlternativo: boolean = true; 

    private juegoMemoriaService = inject(JuegoMemoriaService);
    private cdRef = inject(ChangeDetectorRef);
    sonidoService = inject(SonidoService);
    private juegoNavService = inject(JuegoNavService);
    private perfilService = inject(PerfilService);

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

    ngOnInit(): void {
        
        const perfilActivo = this.perfilService.getPerfil();
        if (perfilActivo && perfilActivo.capacidades) {
            this.tieneTextoAlternativo = perfilActivo.capacidades.includes('texto_explicativo');
        }
        
        this.iniciarJuego();
    }

    iniciarJuego(): void {
        this.juegoMemoriaService.obtenerElementos().subscribe({
            next: (elementosTotales) => {
                this.elementos = elementosTotales;
                const elementosAleatorios = this.seleccionarElementosAleatorios([...elementosTotales], 4);
                this.cartas = this.generarCartas(elementosAleatorios);
                this.juegoTerminado = false;
                this.primeraCarta = null;
                this.bloquearTablero = false;
                this.cdRef.detectChanges();
            },
            error: (err) => {
                console.error('Error al obtener elementos de memoria', err);
            }
        });
    }

    seleccionarElementosAleatorios(elementos: ElementoMemoria[], cantidad: number): ElementoMemoria[] {
        for (let i = elementos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [elementos[i], elementos[j]] = [elementos[j], elementos[i]];
        }
        return elementos.slice(0, cantidad);
    }

    generarCartas(elementos: ElementoMemoria[]): CartaMemoria[] {
        let cartasGeneradas: CartaMemoria[] = [];

        elementos.forEach((elemento, index) => {
            
            cartasGeneradas.push({
                id: `img1-${index}`,
                elementoId: elemento.id,
                tipo: 'imagen',
                contenido: elemento.rutaImagen,
                volteada: false,
                emparejada: false
            });
            
            
            if (this.tieneTextoAlternativo) {
                
                cartasGeneradas.push({
                    id: `txt-${index}`,
                    elementoId: elemento.id,
                    tipo: 'texto',
                    contenido: elemento.nombre,
                    volteada: false,
                    emparejada: false
                });
            } else {
                
                cartasGeneradas.push({
                    id: `img2-${index}`,
                    elementoId: elemento.id,
                    tipo: 'imagen',
                    contenido: elemento.rutaImagen,
                    volteada: false,
                    emparejada: false
                });
            }
        });

        
        for (let i = cartasGeneradas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartasGeneradas[i], cartasGeneradas[j]] = [cartasGeneradas[j], cartasGeneradas[i]];
        }

        return cartasGeneradas;
    }

    manejarCartaClickeada(carta: CartaMemoria): void {
        if (this.bloquearTablero || carta === this.primeraCarta || carta.emparejada) {
            return;
        }

        carta.volteada = true;

        
        let nombre = '';
        if (carta.tipo === 'texto') {
            nombre = carta.contenido;
        } else {
            
            const elementoOriginal = this.elementos.find(e => e.id === carta.elementoId);
            nombre = elementoOriginal ? elementoOriginal.nombre : '';
        }
        
        if (nombre) {
            this.sonidoService.hablar(nombre);
        }

        if (!this.primeraCarta) {
            this.primeraCarta = carta;
            return;
        }

        this.verificarPareja(this.primeraCarta, carta);
    }

    verificarPareja(carta1: CartaMemoria, carta2: CartaMemoria): void {
        
        
        
        const esPareja = carta1.elementoId === carta2.elementoId;

        if (esPareja) {
            this.bloquearTablero = true;
            setTimeout(() => {
                this.deshabilitarCartas(carta1, carta2);
            }, 400);
        } else {
            this.desvoltearCartas(carta1, carta2);
        }
    }

    deshabilitarCartas(carta1: CartaMemoria, carta2: CartaMemoria): void {
        carta1.emparejada = true;
        carta2.emparejada = true;

        if (this.cartas.every(carta => carta.emparejada)) {
            this.verificarVictoria();
        } else {
            this.resetearTablero();
        }
    }

    desvoltearCartas(carta1: CartaMemoria, carta2: CartaMemoria): void {
        this.bloquearTablero = true;
        setTimeout(() => {
            carta1.volteada = false;
            carta2.volteada = false;
            this.resetearTablero();
        }, 600);
    }

    resetearTablero(): void {
        this.primeraCarta = null;
        this.bloquearTablero = false;
    }

    verificarVictoria(): void {
        setTimeout(() => {
            this.juegoTerminado = true;
            this.cdRef.detectChanges();
        }, 1000);
    }
}
