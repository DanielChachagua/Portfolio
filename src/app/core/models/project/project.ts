import { Skill } from "../skill/skill";

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  url_image: string;
  skills: Skill[];
  created_at: Date;
  updated_at: Date;
}

export interface ProjectCreate {
  title: string;
  description: string;
  link: string;
}

export interface ProjectUpdate {
  title: string;
  description: string;
  link: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  link: string;
  url_image: string;
  skills: Skill[];
  created_at: Date;
  updated_at: Date;
}
