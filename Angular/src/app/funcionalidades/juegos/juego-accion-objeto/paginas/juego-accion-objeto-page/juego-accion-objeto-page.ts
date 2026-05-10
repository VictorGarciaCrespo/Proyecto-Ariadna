import { Component } from '@angular/core';
import { JuegoAccionObjetoComponent } from '../../componentes/juego-accion-objeto/juego-accion-objeto';

@Component({
  selector: 'app-juego-accion-objeto-page',
  standalone: true,
  imports: [JuegoAccionObjetoComponent],
  template: `<app-juego-accion-objeto></app-juego-accion-objeto>`,
})
export class JuegoAccionObjetoPageComponent {}
