import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaMemoria } from '../../interfaz/juego-memoria.interface';

@Component({
    selector: 'app-juego-memoria',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './juego-memoria.component.html',
    styleUrls: ['./juego-memoria.component.css']
})
export class JuegoMemoriaComponent {
    @Input() cartas: CartaMemoria[] = [];
    @Output() cartaClickeada = new EventEmitter<CartaMemoria>();

    seleccionarCarta(carta: CartaMemoria) {
        if (!carta.volteada && !carta.emparejada) {
            this.cartaClickeada.emit(carta);
        }
    }
}
