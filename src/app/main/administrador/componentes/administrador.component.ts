import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlumnoDialogComponent } from '../dialogs/alumno-dialog/alumno-dialog.component';
import { EliminarAlumnoDialog } from '../dialogs/eliminar-alumno-dialog/eliminar-alumno-dialog';
import { ActualizarAlumnoDialog } from '../dialogs/actualizar-alumno-dialog/actualizar-alumno-dialog';
import { PerfilService } from '../../perfiles/servicios/perfil.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  private dialog = inject(MatDialog);
  private perfilService = inject(PerfilService);

  abrirDialogoAlumno(): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
      if (result) {
        console.log('Datos del alumno form:', result);
        this.perfilService.agregarPerfil(result);
      }
    });
  }

  abrirDialogoEliminar(): void {
    const dialogRef = this.dialog.open(EliminarAlumnoDialog, {
      width: '400px',
      data: { perfiles: this.perfilService.obtenerPerfiles() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.perfilService.eliminarPerfil(result);
      }
    });
  }

  abrirDialogoActualizar(): void {
    const dialogRef = this.dialog.open(ActualizarAlumnoDialog, {
      width: '500px',
      data: { perfiles: this.perfilService.obtenerPerfiles() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.perfilService.actualizarPerfil(result.index, result.perfil);
      }
    });
  }
}
