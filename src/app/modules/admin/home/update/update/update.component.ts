import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../core/services/project/project.service';
import { ProjectUpdate } from '../../../../../core/models/project/project';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  updateForm!: FormGroup;
  id: string = 'a12';

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateComponent>
  ){
    console.log("🚀 ~ UpdateComponent ~ data:", data)
  }

  ngOnInit(){
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(50), Validators.email]],
      link: ['', [Validators.required]],
      listId: this.formBuilder.array([
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
    const listIdArray = this.updateForm.get('listId') as FormArray;
    listIdArray.clear();
    if (Array.isArray(this.data.project.listId)) {
      this.data.project.listId.forEach((item: string) => {
        listIdArray.push(this.formBuilder.control(item, [Validators.minLength(2), Validators.required, Validators.maxLength(20)]));
      });
    }
  }
  }

  onUpdate(){
    if(this.updateForm.valid){
      const update = this.updateForm.getRawValue() as ProjectUpdate;
      console.log("🚀 ~ UpdatewComponent ~ onRegister ~ update:", update)
      console.log(this.updateForm);
  
      this.projectService.updateProject(this.id, update).subscribe({
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
    return this.updateForm.get('listId') as FormArray;
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
}
