import { Component } from '@angular/core';
import { SkillService } from '../../../../core/services/skill/skill.service';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../../core/models/skill/skill';
import { MatDialog } from '@angular/material/dialog';
import { UdpateComponent } from './udpate/udpate.component';

@Component({
  selector: 'app-skill',
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {
  skills!: Skill[];

  constructor(
    private skillService: SkillService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.skillService.getAllSkills().subscribe({
      next: (skills) => {
        console.log("🚀 ~ SkillComponent ~ ngOnInit ~ skills:", skills);
        this.skills = skills.body || [];
      },
      error: (error) => {
        console.error("Error fetching skills:", error);
      }
    });
  }

  deleteSkill(id: string) {
    const confirmed = window.confirm('¿Realmente quieres eliminar esta skill?');
    if (!confirmed) {
      return;
    }
    this.skillService.deleteSkill(id).subscribe({
      next: (response) => {
        console.log("🚀 ~ HomeComponent ~ deleteProject ~ response:", response)
        this.skills = this.skills.filter(p => p.id !== id);
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      }
    });
  }

  udpateSkill(skill: Skill) {
    this.dialog.open(UdpateComponent, {
      width: '300px',
      height: '300px',
      data: skill
    });
  }

}
