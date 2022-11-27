export interface Config {
  organization: string;
  projects: Project[];
}

export interface Project {
  title: string;
  url: string;
  icon: string;
  git: string;
  vercel: string;
  links: Link[];
}

export interface Link {
  name: string;
  url: string;
}
