import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { UserToken } from '../../../../core/models/user/userToken';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() activeSection = "home"
  @Input() rightSidebarOpen = true

  @Output() sectionChange = new EventEmitter<string>()
  @Output() toggleRightSidebar = new EventEmitter<void>()

  sections = ["home", "about", "projects", "contact"]

  onSectionChange(section: string) {
    this.sectionChange.emit(section)
  }

  onToggleRightSidebar() {
    this.toggleRightSidebar.emit()
  }

}
