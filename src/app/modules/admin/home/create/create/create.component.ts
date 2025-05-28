import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../core/services/project/project.service';
import { ProjectCreate } from '../../../../../core/models/project/project';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../../../core/services/skill/skill.service';
import { Skill } from '../../../../../core/models/skill/skill';
import { CommonModule } from '@angular/common';
import { CreateComponent as CreateSkill} from '../../skill/create/create.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  createForm!: FormGroup;
  skills: Observable<Skill[]>;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private skillService: SkillService,
    private dialogRef: MatDialogRef<CreateComponent>,
    private dialog: MatDialog
  ) { 
    this.skills = this.skillService.skills$;
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.minLength(1), Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.minLength(1), Validators.required]],
      link: ["", [Validators.required]],
      favorite: [false, [Validators.required]],
      listId: this.formBuilder.array([])
    });
  }

  onCreate() {
    if (this.createForm.valid) {
      const create = this.createForm.getRawValue() as ProjectCreate;
      console.log("🚀 ~ CreateComponent ~ onCreate ~ create:", create)

      const formData = new FormData();
      formData.append('image', this.selectedFile as Blob); // this.selectedFile es un File de un input type="file"
      formData.append('title', this.createForm.value.title);
      formData.append('description', this.createForm.value.description);
      formData.append('link', this.createForm.value.link);
      formData.append('favorite', this.createForm.value.favorite ? 'true' : 'false');

      // Si tienes un array de skills_id:
      for (const skillId of this.createForm.value.listId) {
        formData.append('skills_id', skillId);
      }

      console.log("🚀 ~ CreateComponent ~ onCreate ~ formData:", formData)

      this.projectService.createProject(formData).subscribe({
        next: (response: any) => {
          console.log('registro exitoso:', response);
          this.projectService.getAllProjects().subscribe();
          this.dialogRef.close();
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  get listId(): FormArray {
    return this.createForm.get('listId') as FormArray;
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

  // Método para agregar un nuevo campo a la lista
  addListId() {
    this.listId.push(this.formBuilder.control('', [Validators.minLength(1), Validators.required, Validators.maxLength(20)]));
  }

  // Método para eliminar un campo de la lista
  removeListId(index: number) {
    this.listId.removeAt(index);
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
}
