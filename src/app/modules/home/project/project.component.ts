import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  title: string
  description: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  projects: Project[] = [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
      tags: ["Angular", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing my work and skills.",
      tags: ["Angular", "TypeScript", "SCSS"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Task Management App",
      description: "A task management application with drag-and-drop functionality and user authentication.",
      tags: ["Angular", "Firebase", "NgRx"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A weather dashboard that displays current weather and forecasts for multiple locations.",
      tags: ["Angular", "OpenWeather API", "Chart.js"],
      demoUrl: "#",
      repoUrl: "#",
    },
  ]
}
