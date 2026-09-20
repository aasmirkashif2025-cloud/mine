export type PageId = 'home' | 'about' | 'services' | 'work' | 'industries' | 'process' | 'contact' | 'admin';

export interface SiteConfig {
  name: string;
  tagline: string;
  city: string;
  country: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  heroEyebrow: string;
  heroHeadingLead: string;
  heroHeadingItalic: string;
  heroDescription: string;
  themePreset: string;
  primaryColor: string;
  primaryColorLight: string;
  primaryColorGlow: string;
  // LOGO EDIT/ADD/REMOVE
  logoUrl?: string;
  logoType?: 'monogram' | 'image' | 'text';
  logoText?: string;
  logoHeight?: number;
  // DYNAMIC TYPOGRAPHY SUITE
  fontPreset?: string;
  fontDisplay?: string;
  fontBody?: string;
  fontEditorial?: string;
  fontMono?: string;
  accentSecondary?: string;
  stats?: AgencyStatItem[];
}

export interface AgencyStatItem {
  id?: string;
  label: string;
  detail: string;
}

export interface InquiryItem extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
}

export interface Project {
  id: string;
  number: string;
  name: string;
  client: string;
  industry: string;
  category?: string;
  liveUrl?: string;
  year: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  image: string;
  featured?: boolean;
}

export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
  highlight: string;
  image?: string;
}

export interface IndustryItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  challenges: string[];
  solutions: string[];
  recommendedServices: string[];
  image?: string;
}

export interface ProcessStage {
  number: string;
  name: string;
  tagline: string;
  duration: string;
  description: string;
  activities: string[];
  deliverables: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}
