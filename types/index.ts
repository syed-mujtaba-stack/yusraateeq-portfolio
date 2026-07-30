export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  level?: number;
  category: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readingTime: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
}
