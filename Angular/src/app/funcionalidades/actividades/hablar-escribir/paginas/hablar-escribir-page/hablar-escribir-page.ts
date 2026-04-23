import { Component } from '@angular/core';
import { HablarEscribir } from '../../componentes/hablar-escribir/hablar-escribir';

@Component({
  selector: 'app-hablar-escribir-page',
  standalone: true,
  imports: [HablarEscribir],
  templateUrl: './hablar-escribir-page.html',
  styleUrl: './hablar-escribir-page.css'
})
export class HablarEscribirPageComponent {

}
