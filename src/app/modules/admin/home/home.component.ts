import { Component } from '@angular/core';
import { ProjectService } from '../../../core/services/project/project.service';
import { Observable } from 'rxjs';
import { Project } from '../../../core/models/project/project';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create/create.component';
import { UpdateComponent } from './update/update/update.component';
import { SkillComponent } from './skill/skill.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SkillComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  projects: Observable<Project[]>;

  constructor(private dialog: MatDialog, private projectService: ProjectService) {
    this.projects = this.projectService.projects$;
  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(); 
  }

  createProject() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      height: '600px',
    });
  }

  updateProject(project: Project) {
    this.dialog.open(UpdateComponent, {
      width: '500px',
      height: '600px',
      data: { project: project }
    });
  }

  deleteProject(id: string) {
    const confirmed = window.confirm('¿Realmente quieres eliminar este proyecto?');
    if (!confirmed) {
      return;
    }
    this.projectService.deleteProject(id).subscribe({
      next: (response) => {
        console.log("🚀 ~ HomeComponent ~ deleteProject ~ response:", response)
        this.projectService.getAllProjects().subscribe();
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      }
    });
  }

}
