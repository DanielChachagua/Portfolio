import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../core/services/project/project.service';
import { ProjectUpdate } from '../../../../../core/models/project/project';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateComponent as CreateSkill } from '../../skill/create/create.component';
import { Observable } from 'rxjs';
import { Skill } from '../../../../../core/models/skill/skill';
import { SkillService } from '../../../../../core/services/skill/skill.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  updateForm!: FormGroup;
  skills: Observable<Skill[]>;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private dialog: MatDialog,
    private skillService: SkillService
  ) {
    console.log("🚀 ~ UpdateComponent ~ data:", data)
    this.skills = this.skillService.skills$;
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.minLength(1)]],
      link: ['', [Validators.required]],
      favorite: [false, [Validators.required]],
      listId: this.formBuilder.array([])
    });

    if (this.data?.project) {
      this.updateForm.patchValue({
        title: this.data.project.title,
        description: this.data.project.description,
        link: this.data.project.link,
        favorite: this.data.project.favorite
      });

      // Asignar valores al FormArray
      const skillsArray = this.updateForm.get('listId') as FormArray;
      skillsArray.clear();
      if (Array.isArray(this.data.project.skills)) {
        this.data.project.skills.forEach((item: Skill) => {
          skillsArray.push(this.formBuilder.control(item.id, [Validators.minLength(1)]));
        });
      }
    }
  }

  onUpdate() {
    if (!this.updateForm.valid) {
      // Recorre todos los controles y muestra sus errores
      Object.keys(this.updateForm.controls).forEach(key => {
        const controlErrors = this.updateForm.get(key)?.errors;
        if (controlErrors) {
          console.error(`Errores en el campo "${key}":`, controlErrors);
        }
      });

      // Si tienes FormArrays, revisa también sus controles
      const listIdArray = this.updateForm.get('listId') as FormArray;
      listIdArray.controls.forEach((ctrl, idx) => {
        if (ctrl.errors) {
          console.error(`Errores en listId[${idx}]:`, ctrl.errors);
        }
      });

      alert('Verifica el formulario');
      return;
    }
    const update = this.updateForm.getRawValue() as ProjectUpdate;
    console.log("🚀 ~ UpdateComponent ~ onUpdate ~ update:", update);
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('image', this.selectedFile as Blob); // this.selectedFile es un File de un input type="file"
      formData.append('title', this.updateForm.value.title);
      formData.append('description', this.updateForm.value.description);
      formData.append('link', this.updateForm.value.link);
      formData.append('favorite', this.updateForm.value.favorite ? 'true' : 'false');

      // Si tienes un array de skills_id:
      for (const skillId of this.updateForm.value.listId) {
        formData.append('skills_id', skillId);
      }

      this.projectService.updateProject(this.data.project.id, formData).subscribe({
        next: (response: any) => {
          console.log('registro exitoso:', response);
          this.projectService.getAllProjects().subscribe();
          this.closePopup();
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

  addSkillPopup() {
    this.dialog.open(CreateSkill, {
      width: '300px',
      height: '400px',
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  get listId(): FormArray {
    return this.updateForm.get('listId') as FormArray;
  }

  onSkillCheckboxChange(event: Event, skillId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.listId.push(this.formBuilder.control(skillId));
    } else {
      const index = this.listId.controls.findIndex(x => x.value === skillId);
      if (index !== -1) {
        this.listId.removeAt(index);
      }
    }
  }

  isSkillSelected(skillId: string): boolean {
    return this.listId.value.includes(skillId);
  }
}
