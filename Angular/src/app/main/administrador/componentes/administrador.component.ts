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
        this.perfilService.agregarPerfil(result).subscribe({
          next: () => console.log('Perfil añadido a BD'),
          error: (err) => console.error('Error añadiendo', err)
        });
      }
    });
  }

  abrirDialogoEliminar(): void {
    // Primero obtenemos los perfiles asíncronamente
    this.perfilService.obtenerPerfiles().subscribe(perfiles => {
      const dialogRef = this.dialog.open(EliminarAlumnoDialog, {
        width: '400px',
        data: { perfiles: perfiles }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined && result !== null) {
          const id = perfiles[result]?._id;
          if (id) {
            this.perfilService.eliminarPerfil(id).subscribe({
              next: () => console.log('Perfil eliminado de BD'),
              error: (err) => console.error('Error eliminando', err)
            });
          }
        }
      });
    });
  }

  abrirDialogoActualizar(): void {
    // Primero obtenemos los perfiles asíncronamente
    this.perfilService.obtenerPerfiles().subscribe(perfiles => {
      const dialogRef = this.dialog.open(ActualizarAlumnoDialog, {
        width: '500px',
        data: { perfiles: perfiles }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const id = perfiles[result.index]?._id;
          if (id) {
            this.perfilService.actualizarPerfil(id, result.perfil).subscribe({
              next: () => console.log('Perfil actualizado en BD'),
              error: (err) => console.error('Error actualizando', err)
            });
          }
        }
      });
    });
  }
}
