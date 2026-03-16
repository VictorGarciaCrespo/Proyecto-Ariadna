import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilService, Perfil } from '../servicio/perfil.service';

@Component({
    selector: 'app-perfiles',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './perfiles.component.html',
    styleUrl: './perfiles.component.css'
})
export class PerfilesComponent {
    private router = inject(Router);
    private perfilService = inject(PerfilService);

    perfiles: Perfil[] = [
        { nombre: 'Mateo', imagen: 'Perfiles/chico.png' },
        { nombre: 'Endrick', imagen: 'Perfiles/chico_2.png' },
        { nombre: 'Whang', imagen: 'Perfiles/chino.png' },
        { nombre: 'Marta', imagen: 'Perfiles/niña.png' },
    ];

    seleccionarPerfil(perfil: Perfil): void {
        console.log('Perfil seleccionado:', perfil.nombre);
        this.perfilService.setPerfil(perfil);
        this.router.navigate(['/menu-principal']);
    }
}
