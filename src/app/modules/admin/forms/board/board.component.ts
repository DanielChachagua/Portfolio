import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../../core/auth/token/token.service';
import { Router } from '@angular/router';
import { BoardCreate } from '../../../../core/models/board/boardCreate';
import { BoardService } from '../../../../core/services/board/board.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  boardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    private tokenService: TokenService,
    private router: Router
  ){}

  ngOnInit(){
    this.boardForm = this.formBuilder.group({
      name: [''],
      description: [''],
      intialListBoard: [false]
    });
  }

  onSend(){
    if(this.boardForm.valid){
      const board = this.boardForm.getRawValue() as BoardCreate;
      console.log("register: ", board);
      console.log(this.boardForm);
  
      this.boardService.createBoard(board).subscribe({
        next: (response) => {
          console.log('registro exitoso:', response);
          // this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Error al registrarse:', error);
        },
        complete: () => {
          console.log('Operación completada');
        }
      });

      // es mejor usar switchmap
      // this.userService.returnUser().pipe(
      //   switchMap((user) => {
      //     const username = user.name ?? '';
      //     return this.mascotasServices.listMascotas(username);
      //   })
      // ).subscribe( mascotas => {
      //   this.mascotas = mascotas;
      // });
      // declarar variable mascotas$: Observable<Mascotas>
      // this.mascotas$ = this.userService.returnUser().pipe(
      //   switchMap((user) => {
      //     const username = user.name ?? '';
      //     return this.mascotasServices.listMascotas(username);
      //   })
      // );

      // this.userService.returnUser(). subscribe(result => {
      //   const username = result.name;
      //   this.mascotasServices.listMascotas(username).subscribe(result => {
      //     this.mascotas= result;
      //   })
      // });

    } else {
      alert('Verifica el formulario');
    }
  }

  // validatePassword(control: AbstractControl){
  //   const value = control.value as string;
  //   const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  //   if(regex.test(value)){
  //     return null;
  //   }
  //   return {passValid: true}
  // }

  // validatePasswordRepeat(control: AbstractControl){
  //   const password = control?.parent?.get('password')?.value;
  
  //   if (!password || !control.value) {
  //     return null;
  //   }
  //   if (control.value !== password) {
  //     return { passwordsNotMatch: true }; 
  //   }
  //   return null; 
  // }

  // existsUser(){
  //   return (control: AbstractControl) => {
  //     return control.valueChanges.pipe(
  //       switchMap((username) => 
  //         this.userService.validUserName(username)
  //       ), 
  //       map((existe) => (existe ? {invalidUsername: true} : null)),
  //       first()

  //   );
  //   }
  // }

  // existsEmail(){
  //   return (control: AbstractControl) => {
  //     return control.valueChanges.pipe(
  //       switchMap((email) => 
  //         this.userService.validEmail(email)
  //       ),
  //       map((existe) => (existe ? {invalidEmail: true} : null)),
  //       first()

  //   );
  //   }
  // }

  // userEmailValidator(formGroup: FormGroup){
  //   const username = formGroup.get('username')?.value ?? '';
  //   const email = formGroup.get('email')?.value ?? '';

  //   if(username.trim()+email.trim()){
  //     return username !== email ? null : {inputsEquals : true};
  //   }

  //   return null;
  // }
}
