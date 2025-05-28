import { Component } from '@angular/core';
import { SkillService } from '../../../../core/services/skill/skill.service';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../../core/models/skill/skill';
import { MatDialog } from '@angular/material/dialog';
import { UdpateComponent } from './udpate/udpate.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skill',
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {
  // skills!: Skill[];
  skills: Observable<Skill[]>; 
  languajes: Skill[] = [];
  tools: Skill[] = [];
  habilities: Skill[] = [];

  constructor(
    private skillService: SkillService,
    private dialog: MatDialog
  ) { 
    this.skills = this.skillService.skills$;
  }

  ngOnInit(): void {
    this.skillService.getAllSkills().subscribe();
    this.orderedSkills();
  }

  orderedSkills() {
    this.skills.subscribe((skills) => {
      this.languajes = skills.filter(skill => skill.area === 'languaje');
      this.tools = skills.filter(skill => skill.area === 'tool');
      this.habilities = skills.filter(skill => skill.area === 'hability');
    });
  }
  // ngOnInit(): void {
  //   this.skillService.getAllSkills().subscribe({
  //     next: (skills) => {
  //       console.log("🚀 ~ SkillComponent ~ ngOnInit ~ skills:", skills);
  //       this.skills = skills.body || [];
  //     },
  //     error: (error) => {
  //       console.error("Error fetching skills:", error);
  //     }
  //   });
  // }

  deleteSkill(id: string) {
    const confirmed = window.confirm('¿Realmente quieres eliminar esta skill?');
    if (!confirmed) {
      return;
    }
    this.skillService.deleteSkill(id).subscribe({
      next: (response) => {
        console.log("🚀 ~ HomeComponent ~ deleteProject ~ response:", response)
        // this.skills = this.skills.filter(p => p.id !== id);
        this.skillService.getAllSkills().subscribe();
        this.orderedSkills();
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      }
    });
  }

  udpateSkill(skill: Skill) {
    this.dialog.open(UdpateComponent, {
      width: '300px',
      height: '400px',
      data: skill
    });
  }

}
