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

  projects: Project[] = [
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
    {
      id: "a12kuj3hiu12u8i123iu",
      title: "super project",
      description: "this is a super project",
      link: "www.superproject.com",
      urlImage: "www.superproject.com/image.png",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    },
  ]

  constructor(private dialog: MatDialog, private projectService: ProjectService) {
    // this.projectService.getAllProjects().subscribe({
    //   next: (projects) => {
    //     console.log("🚀 ~ HomeComponent ~ this.projectService.getAllProjects ~ projects:", projects)
    //     this.projects = projects.body;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching projects:', error);
    //   }
    // });
  }

  // projects!: Project[];

  // constructor(private projectService: ProjectService) {
  //   this.projectService.getAllProjects().subscribe({
  //     next: (projects) => {
  //       console.log("🚀 ~ HomeComponent ~ this.projectService.getAllProjects ~ projects:", projects)
  //       this.projects = projects.body;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching projects:', error);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  // }

  // Other component methods and properties can go here

  createProject() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      height: '500px',
    });
  }

  updateProject(project: Project) {
    this.dialog.open(UpdateComponent, {
      width: '500px',
      height: '500px',
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
        this.projects = this.projects.filter(p => p.id !== id);
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      }
    });
  }

}
