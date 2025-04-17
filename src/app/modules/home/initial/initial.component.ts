import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {
  skills = ["React", "Angular", "TypeScript", "Node.js", "Tailwind CSS"]
}
