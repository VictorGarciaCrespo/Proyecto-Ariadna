import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AgendaService } from '../../servicios/agenda.service';
import { RutinasService } from '../../servicios/rutinas.service';
import { PerfilService } from '../../../../main/perfiles/servicios/perfil.service';
import { AgendaItem } from '../../interfaces/agenda.interface';
import { Rutina } from '../../interfaces/rutina.interface';
import { SonidoService } from '../../../../shared/servicios/sonido.service';

@Component({
  selector: 'app-agenda-detalle-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, DragDropModule, AsyncPipe],
  templateUrl: './agenda-detalle-page.component.html',
  styleUrl: './agenda-detalle-page.component.css'
})
export class AgendaDetallePageComponent implements OnInit {
  rutina: Rutina | null = null;
  itemsDisponibles: AgendaItem[] = [];
  pasosRutina: (AgendaItem | null)[] = Array(10).fill(null);

  
  toast: { mensaje: string; tipo: 'exito' | 'error' } | null = null;
  private toastTimeout: any;

  private agendaService = inject(AgendaService);
  private rutinasService = inject(RutinasService);
  private perfilService = inject(PerfilService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  sonidoService = inject(SonidoService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/agenda']); return; }

    
    this.rutinasService.getRutinaById(id).subscribe({
      next: (res) => {
        this.rutina = res.data;
        
        const pasos = res.data.pasos ?? [];
        for (let i = 0; i < 10; i++) {
          this.pasosRutina[i] = pasos[i] ?? null;
        }
        this.cdr.detectChanges();
      },
      error: () => this.router.navigate(['/agenda'])
    });

    this.agendaService.getAgendaItems().subscribe({
      next: (res) => {
        this.itemsDisponibles = res.data;
        this.cdr.detectChanges();
      }
    });
  }

  get allSlotIds(): string[] {
    return this.pasosRutina.map((_, i) => 'slot-' + i);
  }

  quitarPaso(index: number) {
    this.pasosRutina[index] = null;
    this.cdr.detectChanges();
  }

  agregarPasoClick(item: AgendaItem) {
    const index = this.pasosRutina.findIndex(p => p === null);
    if (index !== -1) {
      this.pasosRutina[index] = { ...item };
      this.cdr.detectChanges();
    }
  }

  dropInSlot(event: CdkDragDrop<any>) {
    if (event.previousContainer.id === 'listaDisponibles') {
      const item = event.item.data as AgendaItem;
      const targetIndex = event.container.data as number;
      this.pasosRutina[targetIndex] = { ...item };
    } else if (event.previousContainer.id.startsWith('slot-')) {
      const sourceIndex = event.previousContainer.data as number;
      const targetIndex = event.container.data as number;
      const temp = this.pasosRutina[targetIndex];
      this.pasosRutina[targetIndex] = this.pasosRutina[sourceIndex];
      this.pasosRutina[sourceIndex] = temp;
    }
    this.cdr.detectChanges();
  }

  guardarCambios() {
    const pasosLlenos = this.pasosRutina.filter(p => p !== null) as AgendaItem[];
    if (pasosLlenos.length === 0) {
      this.mostrarToast('Añade al menos un pictograma a la rutina.', 'error');
      this.toastTimeout = setTimeout(() => this.ocultarToast(), 3000);
      return;
    }

    const rutinaActualizada: Rutina = {
      ...this.rutina!,
      pasos: pasosLlenos
    };

    this.rutinasService.updateRutina(this.rutina!._id!, rutinaActualizada).subscribe({
      next: () => {
        this.mostrarToast('✓ Rutina guardada con éxito', 'exito');
        this.toastTimeout = setTimeout(() => {
          this.ocultarToast();
          this.router.navigate(['/agenda']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error guardando rutina', err);
        this.mostrarToast('Error al guardar los cambios', 'error');
        this.toastTimeout = setTimeout(() => this.ocultarToast(), 3000);
      }
    });
  }

  eliminarRutina() {
    if (!this.rutina?._id) return;
    this.rutinasService.deleteRutina(this.rutina._id).subscribe({
      next: () => {
        this.mostrarToast('Rutina eliminada', 'error');
        this.toastTimeout = setTimeout(() => {
          this.ocultarToast();
          this.router.navigate(['/agenda']);
        }, 1200);
      },
      error: (err) => {
        console.error('Error eliminando rutina', err);
        this.mostrarToast('Error al eliminar la rutina', 'error');
        this.toastTimeout = setTimeout(() => this.ocultarToast(), 3000);
      }
    });
  }

  mostrarToast(mensaje: string, tipo: 'exito' | 'error') {
    clearTimeout(this.toastTimeout);
    this.toast = { mensaje, tipo };
    this.cdr.detectChanges();
  }

  ocultarToast() {
    this.toast = null;
    this.cdr.detectChanges();
  }

  volver() {
    this.router.navigate(['/agenda']);
  }
}
