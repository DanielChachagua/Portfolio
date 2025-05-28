import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectService } from '../../../core/services/project/project.service';
import { Observable } from 'rxjs';
import { ProjectResponse } from '../../../core/models/project/project';

interface Project {
  title: string
  description: string
  tech: string[]
  link: string
}

interface SkillCategory {
  name: string
  items: string[]
}

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  isMenuOpen = false

  projects: Project[] = [
    {
      title: "E-commerce Platform",
      description: "Plataforma completa de comercio electrónico con Angular y Node.js",
      tech: ["Angular", "Node.js", "MongoDB", "Stripe", "Node.js", "MongoDB", "Stripe"],
      link: "#",
    },
    {
      title: "Task Management App",
      description: "Aplicación de gestión de tareas con funcionalidades avanzadas",
      tech: ["Angular", "TypeScript", "Firebase", "RxJS"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Dashboard del clima con visualización de datos en tiempo real",
      tech: ["Angular", "Chart.js", "API Integration"],
      link: "#",
    },
    {
      title: "E-commerce Platform",
      description: "Plataforma completa de comercio electrónico con Angular y Node.js",
      tech: ["Angular", "Node.js", "MongoDB", "Stripe"],
      link: "#",
    },
    {
      title: "Task Management App",
      description: "Aplicación de gestión de tareas con funcionalidades avanzadas",
      tech: ["Angular", "TypeScript", "Firebase", "RxJS"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Dashboard del clima con visualización de datos en tiempo real",
      tech: ["Angular", "Chart.js", "API Integration"],
      link: "#",
    },
  ]

  skills: SkillCategory[] = [
    { name: "Frontend", items: ["Angular", "React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Stripe"] },
    { name: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
    { name: "Tools", items: ["Git", "Docker", "AWS", "Figma"] },
  ]
}
