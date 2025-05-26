import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../core/services/project/project.service';
import { ProjectUpdate } from '../../../../../core/models/project/project';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateComponent as CreateSkill} from '../../skill/create/create.component';

@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private dialog: MatDialog
  ) {
    console.log("🚀 ~ UpdateComponent ~ data:", data)
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(50), Validators.email]],
      link: ['', [Validators.required]],
      skills: this.formBuilder.array([
        this.formBuilder.control('', [Validators.minLength(1), Validators.required, Validators.maxLength(20)])
      ])
    });

    if (this.data?.project) {
      this.updateForm.patchValue({
        title: this.data.project.title,
        description: this.data.project.description,
        link: this.data.project.link
      });

      // Asignar valores al FormArray
      const skillsArray = this.updateForm.get('skills') as FormArray;
      skillsArray.clear();
      if (Array.isArray(this.data.project.skills)) {
        this.data.project.skills.forEach((item: string) => {
          skillsArray.push(this.formBuilder.control(item, [Validators.minLength(1), Validators.required, Validators.maxLength(20)]));
        });
      }
    }
  }

  onUpdate() {
    if (this.updateForm.valid) {
      const update = this.updateForm.getRawValue() as ProjectUpdate;
      console.log("🚀 ~ UpdatewComponent ~ onRegister ~ update:", update)
      console.log(this.updateForm);

      this.projectService.updateProject(this.data.project.id, update).subscribe({
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

  get skills() {
    return this.updateForm.get('skills') as FormArray;
  }

  // Método para agregar un nuevo campo a la lista
  addSkills() {
    this.skills.push(this.formBuilder.control('', [Validators.minLength(1), Validators.required, Validators.maxLength(20)]));
  }

  // Método para eliminar un campo de la lista
  removeSkills(index: number) {
    this.skills.removeAt(index);
  }

  closePopup() {
    this.dialogRef.close();
  }

  addSkillPopup() {
      this.dialog.open(CreateSkill, {
        width: '300px',
        height: '300px',
      })
    }
}
