export interface SkillItem {
  id: string;
  number: string;
  name: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: {
    title: string;
    description: string;
    link?: string;
  }[];
}

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  images?: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  link?: string;
}
