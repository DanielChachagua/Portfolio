import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-properties',
  imports: [CommonModule, FormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  @Input() activeSection = "home"
  @Input() side: "left" | "right" = "right"
  @Input() isMobile = false

  // Estados para los controles
  showGrid = false
  snapToGrid = false
  width = 100
  height = 50
  padding = "16"
  margin = "0"
  theme = "system"
  font = "mono"
  color = "#0070f3"

  ngOnInit() {
  }
}
