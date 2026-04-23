import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumno-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './alumno-dialog.component.html',
  styleUrl: './alumno-dialog.component.css'
})
export class AlumnoDialogComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject<MatDialogRef<AlumnoDialogComponent>>(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  capacidades = [
    { label: 'Pictogramas', value: 'pictogramas', selected: false },
    { label: 'Sonido', value: 'sonido', selected: false },
    { label: 'Texto explicativo', value: 'texto_explicativo', selected: false }
  ];

  alumnoForm = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    imagen: [null as string | null] 
  });

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.alumnoForm.patchValue({ imagen: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onCapacidadChange(event: any, index: number) {
    this.capacidades[index].selected = event.checked;
  }

  onSubmit() {
    if (this.alumnoForm.valid) {
      const result = {
        ...this.alumnoForm.value,
        capacidades: this.capacidades.filter(c => c.selected).map(c => c.value)
      };
      this.dialogRef.close(result);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
