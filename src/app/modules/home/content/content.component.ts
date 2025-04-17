import { Component, Input } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { InitialComponent } from '../initial/initial.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  imports: [InitialComponent, ProjectComponent, ContactComponent, AboutComponent, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  @Input() activeSection = "home"
  @Input() leftSidebarOpen = true
  @Input() rightSidebarOpen = true
}
