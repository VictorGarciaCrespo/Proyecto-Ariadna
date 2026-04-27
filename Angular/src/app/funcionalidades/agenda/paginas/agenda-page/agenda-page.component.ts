import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RutinasService } from '../../servicios/rutinas.service';
import { PerfilService, Perfil } from '../../../../main/perfiles/servicios/perfil.service';
import { Rutina } from '../../interfaces/rutina.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda-page',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './agenda-page.component.html',
  styleUrl: './agenda-page.component.css'
})
export class AgendaPageComponent implements OnInit {
  rutinas: Rutina[] = [];
  perfilActual: Perfil | null = null;
  private perfilSub?: Subscription;

  private rutinasService = inject(RutinasService);
  private perfilService = inject(PerfilService);
  private router = inject(Router);

  ngOnInit(): void {
    this.perfilSub = this.perfilService.perfilActual$.subscribe(perfil => {
      if (perfil) {
        this.perfilActual = perfil;
        this.cargarRutinas();
      } else {
        // Si no hay perfil, volver a inicio
        this.router.navigate(['/']);
      }
    });
  }

  cargarRutinas() {
    this.rutinasService.getRutinas().subscribe({
      next: (response) => {
        // Filtrar por perfil actual
        this.rutinas = response.data.filter(r => r.idPerfil === this.perfilActual?._id);
      },
      error: (err) => console.error('Error cargando rutinas', err)
    });
  }

  volver() {
    this.router.navigate(['/menu-principal']);
  }

  nuevaRutina() {
    this.router.navigate(['/agenda/crear']);
  }
}
