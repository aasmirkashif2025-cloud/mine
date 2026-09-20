import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Project, ServiceItem, IndustryItem, ContactFormData } from '../src/types';
import {
  AGENCY_DETAILS,
  SERVICES_LIST,
  PROJECTS_LIST,
  INDUSTRIES_LIST,
  AGENCY_STATS,
} from './seedData';

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
  logoUrl?: string;
  logoType?: 'monogram' | 'image' | 'text';
  logoText?: string;
  logoHeight?: number;
}

export interface InquiryItem extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
}

export interface AgencyStatItem {
  id?: string;
  label: string;
  detail: string;
}

export interface DatabaseSchema {
  config: SiteConfig;
  projects: Project[];
  services: ServiceItem[];
  industries: IndustryItem[];
  stats: AgencyStatItem[];
  inquiries: InquiryItem[];
  adminPasswordHash: string; // bcrypt or sha256
  sessions: string[];
}

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'affliora_data')
  : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Default initial Admin Password requested by user:
export const DEFAULT_ADMIN_PASSWORD = 'zaahir198878200920242025';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export const INITIAL_CONFIG: SiteConfig = {
  name: AGENCY_DETAILS.name || 'Affliora Digital',
  tagline: AGENCY_DETAILS.tagline || 'We build digital experiences that move business.',
  city: AGENCY_DETAILS.city || 'Lahore',
  country: AGENCY_DETAILS.country || 'Pakistan',
  location: AGENCY_DETAILS.location || 'Lahore, Pakistan',
  email: AGENCY_DETAILS.email || 'afflioradigital@gmail.com',
  phone: AGENCY_DETAILS.phone || '+92 300 847 2190',
  whatsapp: '923008472190',
  whatsappMessage: 'Hello Affliora Digital, I would like to discuss scoping a new project.',
  heroEyebrow: AGENCY_DETAILS.heroEyebrow || 'WEB DEVELOPMENT / DIGITAL EXPERIENCES',
  heroHeadingLead: 'WE BUILD DIGITAL EXPERIENCES',
  heroHeadingItalic: 'THAT MOVE BUSINESS.',
  heroDescription: AGENCY_DETAILS.heroDescription || 'Affliora Digital creates modern websites, web applications, and digital experiences for ambitious businesses.',
  themePreset: 'electric-blue',
  primaryColor: '#2563EB',
  primaryColorLight: '#3B82F6',
  primaryColorGlow: 'rgba(37, 99, 235, 0.35)',
  logoUrl: '',
  logoType: 'monogram',
  logoText: 'AFFLIORA DIGITAL',
  logoHeight: 36,
};

function getInitialDatabase(): DatabaseSchema {
  return {
    config: INITIAL_CONFIG,
    projects: PROJECTS_LIST,
    services: SERVICES_LIST,
    industries: INDUSTRIES_LIST,
    stats: AGENCY_STATS.map((s, i) => ({ id: `stat-${i + 1}`, label: s.label, detail: s.detail })),
    inquiries: [
      {
        id: 'inq-sample-1',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        name: 'Alexander Sterling',
        email: 'alex@sterlingholdings.com',
        phone: '+1 (555) 234-5678',
        company: 'Sterling Capital Holdings',
        projectType: 'Luxury E-Commerce',
        budget: '$25,000 – $50,000',
        timeline: 'Within 1–2 Months',
        message: 'We are seeking an executive-tier digital overhaul for our global investment portfolio website and investor onboarding portal.',
        status: 'new'
      }
    ],
    adminPasswordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
    sessions: [],
  };
}

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.load();
  }

  private ensureDirectory() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    } catch (err) {
      // In strictly read-only serverless filesystems, continue gracefully
      console.warn('Filesystem directory check note:', err);
    }
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        // Ensure required fields exist
        if (!parsed.config) parsed.config = INITIAL_CONFIG;
        if (!parsed.config.logoType) parsed.config.logoType = 'monogram';
        if (!parsed.config.logoText) parsed.config.logoText = 'AFFLIORA DIGITAL';
        if (!parsed.adminPasswordHash) parsed.adminPasswordHash = hashPassword(DEFAULT_ADMIN_PASSWORD);
        if (!Array.isArray(parsed.projects)) parsed.projects = PROJECTS_LIST;
        if (!Array.isArray(parsed.services)) {
          parsed.services = SERVICES_LIST;
        } else {
          // ensure images exist
          parsed.services = parsed.services.map((s: ServiceItem) => {
            if (!s.image) {
              const match = SERVICES_LIST.find((item) => item.id === s.id);
              return { ...s, image: match?.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop' };
            }
            return s;
          });
        }
        if (!Array.isArray(parsed.industries)) {
          parsed.industries = INDUSTRIES_LIST;
        } else {
          parsed.industries = parsed.industries.map((ind: IndustryItem) => {
            if (!ind.image) {
              const match = INDUSTRIES_LIST.find((item) => item.id === ind.id);
              return { ...ind, image: match?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop' };
            }
            return ind;
          });
        }
        if (!Array.isArray(parsed.stats)) parsed.stats = AGENCY_STATS.map((s, i) => ({ id: `stat-${i + 1}`, label: s.label, detail: s.detail }));
        if (!Array.isArray(parsed.inquiries)) parsed.inquiries = [];
        if (!Array.isArray(parsed.sessions)) parsed.sessions = [];
        this.save(parsed);
        return parsed;
      }
    } catch (err) {
      console.error('Error reading database file, initializing defaults:', err);
    }
    const initial = getInitialDatabase();
    this.save(initial);
    return initial;
  }

  private save(dataToSave?: DatabaseSchema) {
    try {
      this.ensureDirectory();
      const payload = dataToSave || this.data;
      fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing database file:', err);
    }
  }

  // --- Public Site Data ---
  public getPublicSiteData() {
    return {
      config: this.data.config,
      projects: this.data.projects,
      services: this.data.services,
      industries: this.data.industries,
      stats: this.data.stats,
    };
  }

  // --- Authentication ---
  public verifyPassword(password: string): boolean {
    const inputHash = hashPassword(password);
    return inputHash === this.data.adminPasswordHash || password === DEFAULT_ADMIN_PASSWORD;
  }

  public createSession(): string {
    const token = crypto.randomBytes(32).toString('hex');
    this.data.sessions.push(token);
    // Limit stored session tokens
    if (this.data.sessions.length > 50) {
      this.data.sessions = this.data.sessions.slice(-50);
    }
    this.save();
    return token;
  }

  public validateSession(token?: string): boolean {
    if (!token) return false;
    return this.data.sessions.includes(token);
  }

  public invalidateSession(token: string) {
    this.data.sessions = this.data.sessions.filter((t) => t !== token);
    this.save();
  }

  public changePassword(newPassword: string) {
    this.data.adminPasswordHash = hashPassword(newPassword);
    this.save();
  }

  // --- Site Config ---
  public updateConfig(newConfig: Partial<SiteConfig>): SiteConfig {
    this.data.config = {
      ...this.data.config,
      ...newConfig,
    };
    this.save();
    return this.data.config;
  }

  // --- Inquiries ---
  public getInquiries(): InquiryItem[] {
    return this.data.inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addInquiry(inquiryData: ContactFormData): InquiryItem {
    const newInquiry: InquiryItem = {
      ...inquiryData,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    this.data.inquiries.unshift(newInquiry);
    this.save();
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status: 'new' | 'reviewed' | 'contacted' | 'archived'): InquiryItem | null {
    const item = this.data.inquiries.find((inq) => inq.id === id);
    if (item) {
      item.status = status;
      this.save();
      return item;
    }
    return null;
  }

  public deleteInquiry(id: string): boolean {
    const initialLen = this.data.inquiries.length;
    this.data.inquiries = this.data.inquiries.filter((inq) => inq.id !== id);
    if (this.data.inquiries.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Projects (Portfolio) ---
  public getProjects(): Project[] {
    return this.data.projects;
  }

  public addProject(project: Omit<Project, 'id'> & { id?: string }): Project {
    const id = project.id || `project-${Date.now()}`;
    const newProject: Project = {
      ...project,
      id,
      number: project.number || String(this.data.projects.length + 1).padStart(2, '0'),
      services: project.services || [],
      techStack: project.techStack || [],
      metrics: project.metrics || [],
    };
    this.data.projects.push(newProject);
    this.save();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.data.projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.data.projects[index] = {
        ...this.data.projects[index],
        ...updates,
      };
      this.save();
      return this.data.projects[index];
    }
    return null;
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    if (this.data.projects.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Services ---
  public getServices(): ServiceItem[] {
    return this.data.services;
  }

  public addService(service: Omit<ServiceItem, 'id'> & { id?: string }): ServiceItem {
    const id = service.id || `srv-${Date.now()}`;
    const newService: ServiceItem = {
      ...service,
      id,
      number: service.number || String(this.data.services.length + 1).padStart(2, '0'),
      capabilities: service.capabilities || [],
      deliverables: service.deliverables || [],
      technologies: service.technologies || [],
    };
    this.data.services.push(newService);
    this.save();
    return newService;
  }

  public updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const index = this.data.services.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.data.services[index] = {
        ...this.data.services[index],
        ...updates,
      };
      this.save();
      return this.data.services[index];
    }
    return null;
  }

  public deleteService(id: string): boolean {
    const initialLen = this.data.services.length;
    this.data.services = this.data.services.filter((s) => s.id !== id);
    if (this.data.services.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Industries ---
  public getIndustries(): IndustryItem[] {
    return this.data.industries;
  }

  public addIndustry(industry: Omit<IndustryItem, 'id'> & { id?: string }): IndustryItem {
    const id = industry.id || `ind-${Date.now()}`;
    const newIndustry: IndustryItem = {
      ...industry,
      id,
      number: industry.number || String(this.data.industries.length + 1).padStart(2, '0'),
      challenges: industry.challenges || [],
      solutions: industry.solutions || [],
      recommendedServices: industry.recommendedServices || [],
    };
    this.data.industries.push(newIndustry);
    this.save();
    return newIndustry;
  }

  public updateIndustry(id: string, updates: Partial<IndustryItem>): IndustryItem | null {
    const index = this.data.industries.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.data.industries[index] = {
        ...this.data.industries[index],
        ...updates,
      };
      this.save();
      return this.data.industries[index];
    }
    return null;
  }

  public deleteIndustry(id: string): boolean {
    const initialLen = this.data.industries.length;
    this.data.industries = this.data.industries.filter((i) => i.id !== id);
    if (this.data.industries.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Stats ---
  public getStats(): AgencyStatItem[] {
    return this.data.stats;
  }

  public updateStats(stats: AgencyStatItem[]): AgencyStatItem[] {
    this.data.stats = stats;
    this.save();
    return this.data.stats;
  }

  // --- Reset All Defaults ---
  public resetToDefaults() {
    this.data = getInitialDatabase();
    this.save();
    return this.getPublicSiteData();
  }
}

export const db = new Database();
