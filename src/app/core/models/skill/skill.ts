export interface Skill {
  id: string;
  name: string;
  area: string;
  url_image: string;
}

export interface SkillCreate {
  name: string;
  area: string;
}