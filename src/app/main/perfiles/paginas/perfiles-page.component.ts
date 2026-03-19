import { Component } from '@angular/core';
import { PerfilesComponent } from '../componentes/perfiles.component';

@Component({
    selector: 'app-perfiles-page',
    standalone: true,
    imports: [PerfilesComponent],
    templateUrl: './perfiles-page.component.html',
    styleUrl: './perfiles-page.component.css'
})
export class PerfilesPageComponent {

}
