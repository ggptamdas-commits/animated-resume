export interface SkillItem {
  id: string;
  number: string;
  name: string;
  description: string;
}

export interface ExperienceCardItem {
  id: string;
  number: string;
  category: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  additionalBullets?: string[];
  link?: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
}
