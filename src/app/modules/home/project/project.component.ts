import { CommonModule } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { ProjectService } from '../../../core/services/project/project.service';
import { Observable } from 'rxjs';
import { ProjectResponse } from '../../../core/models/project/project';
import { SkillService } from '../../../core/services/skill/skill.service';
import { Skill } from '../../../core/models/skill/skill';

@Pipe({ name: 'linkify' })
export class LinkifyPipe implements PipeTransform {
  transform(text: string): string {
    if (!text) return '';
    const urlRegex = /((https?:\/\/)[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer"  class="linkify-link">$1</a>');
  }
}

@Component({
  selector: 'app-project',
  imports: [CommonModule, LinkifyPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  projects: Observable<ProjectResponse[]>;
  skills: Observable<Skill[]>

  front: Skill[] = [];
  back: Skill[] = [];
  tools: Skill[] = [];

  orderedSkills(skills: Skill[]) {
    this.front = skills.filter(p => p.area === 'front');
    this.back = skills.filter(p => p.area === 'back');
    this.tools = skills.filter(p => p.area === 'tool');
  }
  constructor(
    private projectService: ProjectService,
    private skillService: SkillService
  ) {
    this.projects = this.projectService.projects$;
    this.skills = this.skillService.skills$
  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe();
    this.skillService.getAllSkills().subscribe({
      next: (response) => {
        console.log("🚀 ~ HomeComponent ~ deleteProject ~ response:", response)
        // this.skills = this.skills.filter(p => p.id !== id);
        this.orderedSkills(response.body);
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      }
    });
  }

}
