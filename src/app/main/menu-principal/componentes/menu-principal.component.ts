import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuPrincipalService } from '../servicios/menu-principal.service';
import { OpcionMenu } from '../interfaces/opcion-menu.interface';
import { PerfilService, Perfil } from '../../perfiles/servicios/perfil.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-menu-principal',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './menu-principal.component.html',
    styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit, OnDestroy {
    opciones: OpcionMenu[] = [];
    perfilActual: Perfil | null = null;
    private perfilSub?: Subscription;
    
    private menuService = inject(MenuPrincipalService);
    private router = inject(Router);
    private perfilService = inject(PerfilService);

    ngOnInit(): void {
        this.opciones = this.menuService.obtenerOpcionesPrincipales();
        this.perfilSub = this.perfilService.perfilActual$.subscribe(perfil => {
            if (perfil) {
                this.perfilActual = perfil;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.perfilSub) {
            this.perfilSub.unsubscribe();
        }
    }

    navegarA(ruta: string): void {
        console.log('Navegando a:', ruta);
        this.router.navigate([ruta]);
    }

    abrirAgenda(): void {
        console.log('Abriendo agenda');
    }

    salir(): void {
        this.router.navigate(['/']);
    }
}
