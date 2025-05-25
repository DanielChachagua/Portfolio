import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserToken } from '../../../../core/models/user/userToken';
import { ThemeToggleComponent } from '../../../home/layout/header/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // user$: Observable<UserToken>;

  constructor(
    private userService: UserService,
    private router: Router
  ){
    // this.user$ = this.userService.getUserSubject();
  }

  logout(){
    this.userService.deleteToken();
    this.router.navigate(['login']);
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  
  ngAfterViewInit() {
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }
  
  ngOnDestroy() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }
  
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-perfil')) {
      this.closeDropdown();
    }
  }

  // getInitials(){
  //   return this.user$.pipe(
  //     map(user => {
  //       if (user) {
  //         const first = user.firstName?.charAt(0) ?? '';
  //         const last = user.lastName?.charAt(0) ?? '';
  //         return first + last;
  //       }
  //       return '';
  //     })
  //   );
  // }
}
