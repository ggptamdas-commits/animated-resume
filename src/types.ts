export interface SkillItem {
  id: string;
  number: string;
  name: string;
  description: string;
  iconName: string;
}

export interface ExperienceCardItem {
  id: string;
  number: string;
  title: string;
  company: string;
  date: string;
  description: string;
  link?: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
}

export interface EducationItem {
  institution: string;
  credential: string;
}
