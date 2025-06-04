import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../../../core/models/user/userDTO';
import { UserService } from '../../../core/services/user/user.service';

interface Skill {
  name: string
  level: number
}

interface Experience {
  title: string
  company: string
  period: string
  description: string
}

interface Education {
  degree: string
  institution: string
  period: string
  description: string
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  user!: UserDTO;

  constructor(private userService: UserService) {

    this.userService.getUser().subscribe((user) => {
      console.log("🚀 ~ AboutComponent ~ this.userService.getUser ~ user:", user);
      this.user = user.body as UserDTO;
      console.log("🚀 ~ AboutComponent ~ this.userService.getUser ~ user:", this.user)
    });
  }

  ngOnInit() {
  }
}
