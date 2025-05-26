import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../../../../core/services/skill/skill.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateComponent } from '../../update/update/update.component';
import { Skill } from '../../../../../core/models/skill/skill';

@Component({
  selector: 'app-udpate',
  imports: [ReactiveFormsModule],
  templateUrl: './udpate.component.html',
  styleUrl: './udpate.component.css'
})
export class UdpateComponent {
    updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillService,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private dialogRef: MatDialogRef<UpdateComponent>
  ) {
    console.log("🚀 ~ UpdateComponent ~ data:", data)
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.minLength(1), Validators.required, Validators.maxLength(50)]],
    });

    if (this.data) {
      this.updateForm.patchValue({
        name: this.data.name
      });
    }
  }

  onUpdate() {
    if (this.updateForm.valid) {
      const update = this.updateForm.getRawValue() as { name: string };
      console.log("🚀 ~ UpdatewComponent ~ onRegister ~ update:", update)
      console.log(this.updateForm);

      this.skillService.updateSkill(this.data.id, update).subscribe({
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
