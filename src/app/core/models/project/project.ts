export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  urlImage: string;
  createdAt: Date;
  updatedAt: Date;
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
  urlImage: string;
  createdAt: Date;
  updatedAt: Date;
}
