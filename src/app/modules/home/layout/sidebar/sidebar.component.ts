import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SectionState {
  [key: string]: boolean
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() activeSection = "home"
  @Input() side: "left" | "right" = "left"
  @Input() isMobile = false
  @Input() leftSidebarOpen = true

  @Output() sectionChange = new EventEmitter<string>()
  @Output() toggleLeftSidebar = new EventEmitter<void>()

  openSections: SectionState = {
    navigation: true,
    projects: true,
    components: false,
  }

  ngOnInit() {
  }

  toggleSection(section: string) {
    this.openSections[section] = !this.openSections[section]
  }

  onSectionClick(section: string) {
    this.sectionChange.emit(section)
  }

  onToggleLeftSidebar() {
    this.toggleLeftSidebar.emit()
  }
}
