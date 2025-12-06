export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  type: 'Work' | 'Project';
}

export interface Education {
  course: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Skill {
  name: string;
  category: 'Tech' | 'Soft' | 'Industry';
}
