import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AgendaService } from '../../servicios/agenda.service';
import { RutinasService } from '../../servicios/rutinas.service';
import { PerfilService, Perfil } from '../../../../main/perfiles/servicios/perfil.service';
import { AgendaItem } from '../../interfaces/agenda.interface';
import { Subscription } from 'rxjs';
import { SonidoService } from '../../../../shared/servicios/sonido.service';

@Component({
  selector: 'app-agenda-crear-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, DragDropModule, AsyncPipe],
  templateUrl: './agenda-crear-page.component.html',
  styleUrl: './agenda-crear-page.component.css'
})
export class AgendaCrearPageComponent implements OnInit {
  itemsDisponibles: AgendaItem[] = [];
  pasosRutina: (AgendaItem | null)[] = [null, null, null, null, null, null, null, null, null, null]; 
  perfilActual: Perfil | null = null;
  private perfilSub?: Subscription;

  
  toast: { mensaje: string; tipo: 'exito' | 'error' } | null = null;
  private toastTimeout: any;

  private agendaService = inject(AgendaService);
  private rutinasService = inject(RutinasService);
  private perfilService = inject(PerfilService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); 
  sonidoService = inject(SonidoService);

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
        this.cdr.detectChanges(); 
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
    } 
    
    else if (event.previousContainer.id.startsWith('slot-')) {
      const sourceIndex = event.previousContainer.data as number;
      const targetIndex = event.container.data as number;
      
      
      const temp = this.pasosRutina[targetIndex];
      this.pasosRutina[targetIndex] = this.pasosRutina[sourceIndex];
      this.pasosRutina[sourceIndex] = temp;
    }
    this.cdr.detectChanges();
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

  guardarResultado() {
    
    const pasosLlenos = this.pasosRutina.filter(p => p !== null) as AgendaItem[];

    if (pasosLlenos.length === 0) {
      this.mostrarToast('Añade al menos un pictograma a la rutina.', 'error');
      this.toastTimeout = setTimeout(() => this.ocultarToast(), 3000);
      return;
    }

    const idPerfil = this.perfilActual!._id!;

    
    this.rutinasService.contRutinasByPerfil(idPerfil).subscribe({
      next: ({ count }) => {
        const nombreAuto = `Rutina ${count + 1}`;
        const nuevaRutina = {
          nombre: nombreAuto,
          idPerfil,
          pasos: pasosLlenos
        };

        this.rutinasService.addRutina(nuevaRutina).subscribe({
          next: () => {
            this.mostrarToast(`✓ ${nombreAuto} creada con éxito`, 'exito');
            this.toastTimeout = setTimeout(() => {
              this.ocultarToast();
              this.router.navigate(['/agenda']);
            }, 1500);
          },
          error: (err) => {
            console.error('Error guardando rutina', err);
            this.mostrarToast('Error al guardar la rutina', 'error');
            this.toastTimeout = setTimeout(() => this.ocultarToast(), 3000);
          }
        });
      },
      error: (err) => {
        console.error('Error contando rutinas', err);
        this.mostrarToast('Error al conectar con el servidor', 'error');
        this.toastTimeout = setTimeout(() => this.ocultarToast(), 3000);
      }
    });
  }
}
