import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  activeTab = "profile"

  skills: Skill[] = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Angular", level: 80 },
    { name: "React", level: 75 },
    { name: "TypeScript", level: 70 },
    { name: "Node.js", level: 65 },
    { name: "UI/UX Design", level: 60 },
  ]

  experiences: Experience[] = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description:
        "Lead frontend development for enterprise applications, mentoring junior developers and implementing best practices.",
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2018 - 2021",
      description:
        "Developed responsive websites and web applications for various clients using React and modern CSS frameworks.",
    },
    {
      title: "Junior Web Developer",
      company: "Startup Hub",
      period: "2016 - 2018",
      description:
        "Built and maintained websites for small businesses, focusing on responsive design and performance optimization.",
    },
  ]

  education: Education[] = [
    {
      degree: "Master's in Computer Science",
      institution: "Tech University",
      period: "2014 - 2016",
      description: "Specialized in web technologies and user interface design.",
    },
    {
      degree: "Bachelor's in Software Engineering",
      institution: "State University",
      period: "2010 - 2014",
      description: "Focused on programming fundamentals, algorithms, and software development methodologies.",
    },
  ]

  setActiveTab(tab: string) {
    this.activeTab = tab
  }
}
