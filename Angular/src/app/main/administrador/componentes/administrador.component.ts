import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlumnoDialogComponent } from '../dialogs/alumno-dialog/alumno-dialog.component';
import { EliminarAlumnoDialog } from '../dialogs/eliminar-alumno-dialog/eliminar-alumno-dialog';
import { ActualizarAlumnoDialog } from '../dialogs/actualizar-alumno-dialog/actualizar-alumno-dialog';
import { PerfilService } from '../../perfiles/servicios/perfil.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  private dialog = inject(MatDialog);
  private perfilService = inject(PerfilService);
  private snackBar = inject(MatSnackBar);

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
          next: () => {
            this.snackBar.open('¡Perfil añadido con éxito!', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error añadiendo', err);
            this.snackBar.open('Error al añadir el perfil', 'Cerrar', { duration: 3000, panelClass: 'error-snackbar' });
          }
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
              next: () => {
                this.snackBar.open('¡Perfil eliminado con éxito!', 'Cerrar', { duration: 3000 });
              },
              error: (err) => {
                console.error('Error eliminando', err);
                this.snackBar.open('Error al eliminar el perfil', 'Cerrar', { duration: 3000, panelClass: 'error-snackbar' });
              }
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
              next: () => {
                this.snackBar.open('¡Perfil actualizado con éxito!', 'Cerrar', { duration: 3000 });
              },
              error: (err) => {
                console.error('Error actualizando', err);
                this.snackBar.open('Error al actualizar el perfil', 'Cerrar', { duration: 3000, panelClass: 'error-snackbar' });
              }
            });
          }
        }
      });
    });
  }
}
