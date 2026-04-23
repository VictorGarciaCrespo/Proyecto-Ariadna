import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilService, Perfil } from '../servicios/perfil.service';

@Component({
    selector: 'app-perfiles',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './perfiles.component.html',
    styleUrl: './perfiles.component.css'
})
export class PerfilesComponent implements OnInit {
    private router = inject(Router);
    private perfilService = inject(PerfilService);

    perfiles: Perfil[] = [];

    private cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.perfilService.obtenerPerfiles().subscribe({
            next: (datos) => {
                console.log('Perfiles recibidos en Angular:', datos);
                this.perfiles = datos;
                this.cdr.detectChanges(); // Forzar actualización de la vista
            },
            error: (err) => {
                console.error('Error al cargar perfiles en Angular:', err);
            }
        });
    }

    get disposicionClase(): string {
        const num = this.perfiles.length;
        if (num >= 1 && num <= 3) return 'disposicion-fila';
        if (num >= 4 && num <= 6) return 'disposicion-dos-filas';
        return 'disposicion-rejilla';
    }

    seleccionarPerfil(perfil: Perfil): void {
        console.log('Perfil seleccionado:', perfil.nombre);
        this.perfilService.setPerfil(perfil);
        this.router.navigate(['/menu-principal']);
    }

    entrarComoInvitado(): void {
        console.log('Entrando como invitado');
        this.perfilService.setPerfil(null);
        this.router.navigate(['/menu-principal']);
    }


}
