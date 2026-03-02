import { Component } from '@angular/core';
import { MenuPrincipalComponent } from '../componente/menu-principal.component';

@Component({
    selector: 'app-menu-principal-page',
    standalone: true,
    imports: [MenuPrincipalComponent],
    templateUrl: './menu-principal-page.component.html',
    styleUrl: './menu-principal-page.component.css'
})
export class MenuPrincipalPageComponent {

}
