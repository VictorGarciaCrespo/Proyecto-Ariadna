import { Component } from '@angular/core';
import { AdministradorComponent } from '../componentes/administrador.component';

@Component({
  selector: 'app-administrador-page',
  standalone: true,
  imports: [AdministradorComponent],
  templateUrl: './administrador-page.component.html',
  styleUrl: './administrador-page.component.css'
})
export class AdministradorPageComponent {

}
