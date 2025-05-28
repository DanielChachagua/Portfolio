import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { UserToken } from '../../../../core/models/user/userToken';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { ThemeService } from '../../../../core/services/theme/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.initTheme()
  }

  toggleTheme() {
    this.themeService.toggleTheme()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    this.isMenuOpen = false
  }

}
