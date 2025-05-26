import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../../../core/services/skill/skill.service';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
    createForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillService,
    private dialogRef: MatDialogRef<CreateComponent>
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.minLength(1), Validators.required, Validators.maxLength(50)]],
    });
  }

  onCreate() {
    if (this.createForm.valid) {
      const create = this.createForm.getRawValue() as { name: string };
      console.log("🚀 ~ CreateComponent ~ onRegister ~ create:", create)
      console.log(this.createForm);

      this.skillService.createSkill(create).subscribe({
        next: (response: any) => {
          console.log('registro exitoso:', response);
        },
        error: (error) => {
          console.error('Error al registrarse:', error);
        },
        complete: () => {
          console.log('Operación completada');
        }
      });
    } else {
      alert('Verifica el formulario');
    }
  }

  closePopup() {
    this.dialogRef.close();
  }
}
