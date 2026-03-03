import { Component } from '@angular/core';
import { JuegosMente } from '../../componente/juegos-mente/juegos-mente';

@Component({
  selector: 'app-juegos-mente-page',
  standalone: true,
  imports: [JuegosMente],
  templateUrl: './juegos-mente-page.html',
  styleUrl: './juegos-mente-page.css'
})
export class JuegosMentePageComponent {

}
