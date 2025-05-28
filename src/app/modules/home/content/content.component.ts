import { Component, Input } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { InitialComponent } from '../initial/initial.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ThemeService } from '../../../core/services/theme/theme.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, InitialComponent, HeaderComponent, FooterComponent, AboutComponent, ProjectComponent, ContactComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  @Input() activeSection = "home"
  @Input() leftSidebarOpen = true
  @Input() rightSidebarOpen = true

  constructor(public themeService: ThemeService) {}
}
