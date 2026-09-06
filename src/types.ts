export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  actionText: string;
  link?: string;
}

export interface ServiceStage {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
}