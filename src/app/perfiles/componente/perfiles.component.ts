import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-perfiles',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './perfiles.component.html',
    styleUrl: './perfiles.component.css'
})
export class PerfilesComponent {
    private router = inject(Router);

    perfiles = [
        { nombre: 'Perfil 1', ruta: '/menu-principal' },
        { nombre: 'Perfil 2', ruta: '/menu-principal' },
        { nombre: 'Perfil 3', ruta: '/menu-principal' },
        { nombre: 'Perfil 4', ruta: '/menu-principal' },
    ];

    seleccionarPerfil(ruta: string): void {
        console.log('Perfil seleccionado, navegando a:', ruta);
        this.router.navigate([ruta]);
    }
}
