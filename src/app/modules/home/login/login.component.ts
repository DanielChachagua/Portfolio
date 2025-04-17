import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  onLogin(): void {
    console.log(this.email, this.password)
    // this.authService.auth(this.email, this.password).subscribe((result) => {
    //   console.log(result);
    // }, (error) => {
    //   console.log(error);
    // })
    this.authService.auth(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Autenticación exitosa:', response);
        // this.userService.saveToken(response.token);
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.error('Error de autenticación:', error);
        this.errorMessage = "Credenciales incorrectas"
      },
      complete: () => {
        console.log('Operación completada');
      }
    });
    
  }

}


