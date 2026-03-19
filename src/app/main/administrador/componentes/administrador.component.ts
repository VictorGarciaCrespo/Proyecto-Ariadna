import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlumnoDialogComponent } from '../dialogs/alumno-dialog/alumno-dialog.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  private dialog = inject(MatDialog);

  abrirDialogoAlumno(): void {
    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
      if (result) {
        console.log('Datos del alumno form:', result);
        // Aquí puedes hacer la llamada a un servicio para guardar al alumno
      }
    });
  }
}
