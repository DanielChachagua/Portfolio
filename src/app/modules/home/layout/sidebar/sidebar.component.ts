import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SectionState {
  [key: string]: boolean
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() activeSection = "home"
  @Input() side: "left" | "right" = "left"
  @Input() isMobile = false

  @Output() sectionChange = new EventEmitter<string>()

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
}
