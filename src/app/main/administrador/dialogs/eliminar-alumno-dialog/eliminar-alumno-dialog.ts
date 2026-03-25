import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-eliminar-alumno-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './eliminar-alumno-dialog.html',
  styleUrl: './eliminar-alumno-dialog.css'
})
export class EliminarAlumnoDialog {
  public dialogRef = inject<MatDialogRef<EliminarAlumnoDialog>>(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  selectedIndex: number | null = null;

  onSubmit() {
    if (this.selectedIndex !== null) {
      this.dialogRef.close(this.selectedIndex);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
