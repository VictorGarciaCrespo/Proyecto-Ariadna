import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AgendaService } from '../../servicios/agenda.service';
import { RutinasService } from '../../servicios/rutinas.service';
import { PerfilService, Perfil } from '../../../../main/perfiles/servicios/perfil.service';
import { AgendaItem } from '../../interfaces/agenda.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda-crear-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, DragDropModule],
  templateUrl: './agenda-crear-page.component.html',
  styleUrl: './agenda-crear-page.component.css'
})
export class AgendaCrearPageComponent implements OnInit {
  itemsDisponibles: AgendaItem[] = [];
  pasosRutina: (AgendaItem | null)[] = [null, null, null, null, null, null, null, null, null, null]; // 10 espacios fijos
  perfilActual: Perfil | null = null;
  private perfilSub?: Subscription;

  private agendaService = inject(AgendaService);
  private rutinasService = inject(RutinasService);
  private perfilService = inject(PerfilService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // <-- Para forzar la actualización de la pantalla

  ngOnInit(): void {
    this.perfilSub = this.perfilService.perfilActual$.subscribe(perfil => {
      if (perfil) {
        this.perfilActual = perfil;
        this.cargarItemsAgenda();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  get allSlotIds(): string[] {
    return this.pasosRutina.map((_, i) => 'slot-' + i);
  }

  cargarItemsAgenda() {
    this.agendaService.getAgendaItems().subscribe({
      next: (res) => {
        this.itemsDisponibles = res.data;
        this.cdr.detectChanges(); // <-- Soluciona que no aparezcan hasta tocar la pantalla
      },
      error: (err) => console.error('Error cargando items de agenda', err)
    });
  }

  volver() {
    this.router.navigate(['/agenda']);
  }

  irInicio() {
    this.router.navigate(['/menu-principal']);
  }

  quitarPaso(index: number) {
    this.pasosRutina[index] = null;
    this.cdr.detectChanges();
  }

  agregarPasoClick(item: AgendaItem) {
    // Busca el primer espacio vacío
    const index = this.pasosRutina.findIndex(p => p === null);
    if (index !== -1) {
      this.pasosRutina[index] = { ...item };
      this.cdr.detectChanges();
    }
  }

  dropInSlot(event: CdkDragDrop<any>) {
    // Si viene de la lista de abajo (Cosas para hacer)
    if (event.previousContainer.id === 'listaDisponibles') {
      const item = event.item.data as AgendaItem;
      const targetIndex = event.container.data as number;
      
      // Coloca el pictograma en ese espacio específico
      this.pasosRutina[targetIndex] = { ...item };
    } 
    // Si viene de otro espacio de arriba (reordenando)
    else if (event.previousContainer.id.startsWith('slot-')) {
      const sourceIndex = event.previousContainer.data as number;
      const targetIndex = event.container.data as number;
      
      // Intercambia las posiciones
      const temp = this.pasosRutina[targetIndex];
      this.pasosRutina[targetIndex] = this.pasosRutina[sourceIndex];
      this.pasosRutina[sourceIndex] = temp;
    }
    this.cdr.detectChanges();
  }

  guardarResultado() {
    // Filtra los espacios vacíos
    const pasosLlenos = this.pasosRutina.filter(p => p !== null) as AgendaItem[];
    
    if (pasosLlenos.length === 0) {
      alert('Añade al menos un pictograma a la rutina.');
      return;
    }

    const nombre = prompt('Introduce un nombre para la rutina:');
    if (nombre && nombre.trim() !== '') {
      const nuevaRutina = {
        nombre: nombre.trim(),
        idPerfil: this.perfilActual!._id!,
        pasos: pasosLlenos
      };

      this.rutinasService.addRutina(nuevaRutina).subscribe({
        next: () => {
          alert('Rutina creada con éxito');
          this.router.navigate(['/agenda']);
        },
        error: (err) => console.error('Error guardando rutina', err)
      });
    }
  }
}
