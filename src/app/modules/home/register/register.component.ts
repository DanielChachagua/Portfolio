import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { UserService } from '../../../core/services/user/user.service';
import { Register } from '../../../core/models/user/register';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)], [this.existsUser()]],
      email: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(50), Validators.email], [this.existsEmail()]],
      password: ['', [Validators.required, this.validatePassword]],
      passwordRepeat: ['', [Validators.required, this.validatePasswordRepeat]],
      rol: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)]],
      firstName: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(20)]]
    },{
      validators: [this.userEmailValidator]
    });
  }

  onRegister(){
    if(this.registerForm.valid){
      const register = this.registerForm.getRawValue() as Register;
      console.log("register: ", register);
      console.log(this.registerForm);
  
      this.userService.registerUser(register).subscribe({
        next: (response) => {
          console.log('registro exitoso:', response);
          this.router.navigate(['login']);
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

  validatePassword(control: AbstractControl){
    const value = control.value as string;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if(regex.test(value)){
      return null;
    }
    return {passValid: true}
  }

  validatePasswordRepeat(control: AbstractControl){
    const password = control?.parent?.get('password')?.value;
  
    if (!password || !control.value) {
      return null;
    }
    if (control.value !== password) {
      return { passwordsNotMatch: true }; 
    }
    return null; 
  }

  existsUser(){
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((username) => 
          this.userService.validUserName(username)
        ), 
        map((existe) => (existe ? {invalidUsername: true} : null)),
        first()

    );
    }
  }

  existsEmail(){
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((email) => 
          this.userService.validEmail(email)
        ),
        map((existe) => (existe ? {invalidEmail: true} : null)),
        first()

    );
    }
  }

  userEmailValidator(formGroup: FormGroup){
    const username = formGroup.get('username')?.value ?? '';
    const email = formGroup.get('email')?.value ?? '';

    if(username.trim()+email.trim()){
      return username !== email ? null : {inputsEquals : true};
    }

    return null;
  }
}
