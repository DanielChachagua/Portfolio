import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../../../core/services/skill/skill.service';
import { SkillCreate } from '../../../../../core/models/skill/skill';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
    createForm!: FormGroup;
    selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillService,
    private dialogRef: MatDialogRef<CreateComponent>
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.minLength(1), Validators.required, Validators.maxLength(50)]],
      area: ['', [Validators.minLength(1), Validators.required, Validators.maxLength(50)]]
    });
  }

  onCreate() {
    if (this.createForm.valid) {
      const create = this.createForm.getRawValue() as SkillCreate;
      console.log("🚀 ~ CreateComponent ~ onRegister ~ create:", create)
      console.log(this.createForm);

      const formData = new FormData();
      formData.append('image', this.selectedFile as Blob); // this.selectedFile es un File de un input type="file"
      formData.append('name', this.createForm.value.name);
      formData.append('area', this.createForm.value.area);

      this.skillService.createSkill(formData).subscribe({
        next: (response: any) => {
          console.log('registro exitoso:', response);
          this.skillService.getAllSkills().subscribe();
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
