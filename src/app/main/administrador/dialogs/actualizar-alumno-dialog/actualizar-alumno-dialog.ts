import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-alumno-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './actualizar-alumno-dialog.html',
  styleUrl: './actualizar-alumno-dialog.css'
})
export class ActualizarAlumnoDialog {
  private fb = inject(FormBuilder);
  public dialogRef = inject<MatDialogRef<ActualizarAlumnoDialog>>(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  selectedIndex: number | null = null;
  alumnoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    imagen: [null as string | null]
  });

  capacidadesTemplate = [
    { label: 'Pictogramas', value: 'pictogramas', selected: false },
    { label: 'Sonido', value: 'sonido', selected: false },
    { label: 'Texto explicativo', value: 'texto_explicativo', selected: false }
  ];

  capacidades = JSON.parse(JSON.stringify(this.capacidadesTemplate));

  onProfileSelect() {
    if (this.selectedIndex !== null) {
      const per = this.data.perfiles[this.selectedIndex];

      let dob = per.fechaNacimiento;
      if (typeof dob === 'string') {
        dob = new Date(dob);
      }

      this.alumnoForm.patchValue({
        nombre: per.nombre,
        apellidos: per.apellidos,
        fechaNacimiento: dob,
        imagen: per.imagen
      });

      this.capacidades = JSON.parse(JSON.stringify(this.capacidadesTemplate));
      if (per.capacidades) {
        this.capacidades.forEach((c: any) => {
          c.selected = per.capacidades.includes(c.value);
        });
      }
    }
  }

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
    if (this.alumnoForm.valid && this.selectedIndex !== null) {
      const result = {
        index: this.selectedIndex,
        perfil: {
          ...this.alumnoForm.value,
          capacidades: this.capacidades.filter((c: any) => c.selected).map((c: any) => c.value)
        }
      };
      this.dialogRef.close(result);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
