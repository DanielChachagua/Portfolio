import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../core/services/project/project.service';
import { ProjectCreate } from '../../../../../core/models/project/project';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../../../core/services/skill/skill.service';
import { Skill } from '../../../../../core/models/skill/skill';
import { CommonModule } from '@angular/common';
import { CreateComponent as CreateSkill} from '../../skill/create/create.component';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  createForm!: FormGroup;
  skills!: Skill[];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private skillServie: SkillService,
    private dialogRef: MatDialogRef<CreateComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(50), Validators.email]],
      link: ['', [Validators.required]],
      listId: this.formBuilder.array([
        this.formBuilder.control('', [Validators.minLength(2), Validators.required, Validators.maxLength(20)])
      ])
    });

    this.skillServie.getAllSkills().subscribe({
      next: (skills) => {
        console.log("🚀 ~ CreateComponent ~ ngOnInit ~ skills:", skills);
        this.skills = skills.body || [];
      },
      error: (error) => {
        console.error("Error fetching skills:", error);
      }
    });
  }

  onCreate() {
    if (this.createForm.valid) {
      const create = this.createForm.getRawValue() as ProjectCreate;
      console.log("🚀 ~ CreateComponent ~ onRegister ~ create:", create)
      console.log(this.createForm);

      this.projectService.createProject(create).subscribe({
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

  get listId() {
    return this.createForm.get('listId') as FormArray;
  }

  // Método para agregar un nuevo campo a la lista
  addListId() {
    this.listId.push(this.formBuilder.control('', [Validators.minLength(2), Validators.required, Validators.maxLength(20)]));
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
      height: '300px',
    })
  }
}
