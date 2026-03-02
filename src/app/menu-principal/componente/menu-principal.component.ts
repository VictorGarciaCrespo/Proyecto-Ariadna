import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuPrincipalService } from '../servicio/menu-principal.service';
import { OpcionMenu } from '../interfaz/opcion-menu.interface';

@Component({
    selector: 'app-menu-principal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './menu-principal.component.html',
    styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit {
    opciones: OpcionMenu[] = [];
    private menuService = inject(MenuPrincipalService);
    private router = inject(Router);

    ngOnInit(): void {
        this.opciones = this.menuService.obtenerOpcionesPrincipales();
    }

    navegarA(ruta: string): void {
        console.log('Navegando a:', ruta);
        this.router.navigate([ruta]);
    }

    abrirAgenda(): void {
        console.log('Abriendo agenda');
    }
}
