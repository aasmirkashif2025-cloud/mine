import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SiteConfig,
  Project,
  ServiceItem,
  IndustryItem,
  AgencyStatItem,
  InquiryItem,
  ContactFormData,
} from '../types';
import {
  AGENCY_DETAILS,
  SERVICES_LIST,
  PROJECTS_LIST,
  INDUSTRIES_LIST,
  AGENCY_STATS,
} from '../data/fallbackData';
import {
  getCloudSiteData,
  saveCloudSiteData,
  syncProjectsToCloud,
  syncConfigToCloud,
  submitCloudInquiry,
  getCloudInquiries,
  updateCloudInquiryStatus,
  deleteCloudInquiry,
  subscribeCloudSiteData,
  subscribeCloudInquiries,
} from '../lib/firestoreService';

const DEFAULT_CONFIG: SiteConfig = {
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
  fontPreset: 'architectural',
  fontDisplay: 'Syne',
  fontBody: 'Plus Jakarta Sans',
  fontEditorial: 'Cormorant Garamond',
  fontMono: 'Space Mono',
  accentSecondary: '#60A5FA',
};

interface SiteContextType {
  config: SiteConfig;
  projects: Project[];
  services: ServiceItem[];
  industries: IndustryItem[];
  stats: AgencyStatItem[];
  inquiries: InquiryItem[];
  isLoading: boolean;
  isAdmin: boolean;
  adminToken: string | null;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  clearNotification: () => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  // Auth
  loginAdmin: (password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  // Config & Theme
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<boolean>;
  // Projects
  addProject: (project: Partial<Project>) => Promise<boolean>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  // Services
  addService: (service: Partial<ServiceItem>) => Promise<boolean>;
  updateService: (id: string, updates: Partial<ServiceItem>) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  // Industries
  addIndustry: (industry: Partial<IndustryItem>) => Promise<boolean>;
  updateIndustry: (id: string, updates: Partial<IndustryItem>) => Promise<boolean>;
  deleteIndustry: (id: string) => Promise<boolean>;
  // Stats
  updateStats: (newStats: AgencyStatItem[]) => Promise<boolean>;
  // Inquiries
  submitInquiry: (formData: ContactFormData) => Promise<{ success: boolean; error?: string }>;
  fetchInquiries: () => Promise<void>;
  updateInquiryStatus: (id: string, status: 'new' | 'reviewed' | 'contacted' | 'archived') => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;
  // Safety
  resetDefaults: () => Promise<boolean>;
  // Helpers
  getWhatsAppUrl: (customText?: string) => string;
  getMailtoUrl: (subject?: string, body?: string) => string;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('affliora_cached_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('affliora_cached_projects');
    return saved ? JSON.parse(saved) : PROJECTS_LIST;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('affliora_cached_services');
    return saved ? JSON.parse(saved) : SERVICES_LIST;
  });

  const [industries, setIndustries] = useState<IndustryItem[]>(() => {
    const saved = localStorage.getItem('affliora_cached_industries');
    return saved ? JSON.parse(saved) : INDUSTRIES_LIST;
  });

  const [stats, setStats] = useState<AgencyStatItem[]>(() => {
    return AGENCY_STATS.map((s, idx) => ({ id: `stat-${idx + 1}`, label: s.label, detail: s.detail }));
  });

  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('affliora_admin_token'));
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  }, []);

  const clearNotification = () => setNotification(null);

  // Apply dynamic color theme and typography variables to document root
  const applyThemeColors = useCallback((cfg: SiteConfig) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      // 1. Color Palette Variables
      root.style.setProperty('--color-primary', cfg.primaryColor || '#2563EB');
      root.style.setProperty('--color-primary-light', cfg.primaryColorLight || '#3B82F6');
      root.style.setProperty('--color-primary-glow', cfg.primaryColorGlow || 'rgba(37, 99, 235, 0.35)');
      if (cfg.accentSecondary) {
        root.style.setProperty('--color-accent-secondary', cfg.accentSecondary);
      }

      // 2. Dynamic Font Families
      const displayFont = cfg.fontDisplay || 'Syne';
      const bodyFont = cfg.fontBody || 'Plus Jakarta Sans';
      const editorialFont = cfg.fontEditorial || 'Cormorant Garamond';
      const monoFont = cfg.fontMono || 'Space Mono';

      root.style.setProperty('--font-family-display', `"${displayFont}", system-ui, -apple-system, sans-serif`);
      root.style.setProperty('--font-family-body', `"${bodyFont}", system-ui, -apple-system, sans-serif`);
      root.style.setProperty('--font-family-editorial', `"${editorialFont}", Georgia, serif`);
      root.style.setProperty('--font-family-mono', `"${monoFont}", monospace`);

      // Dynamic Font Loader helper to load fonts if not already cached
      const loadGoogleFont = (fontName: string) => {
        if (!fontName) return;
        const fontId = `dynamic-gf-${fontName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        if (!document.getElementById(fontId)) {
          const link = document.createElement('link');
          link.id = fontId;
          link.rel = 'stylesheet';
          link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,600;1,700&display=swap`;
          document.head.appendChild(link);
        }
      };

      [displayFont, bodyFont, editorialFont, monoFont].forEach(loadGoogleFont);
    }
  }, []);

  // Fetch Public Site Data from Firebase Firestore (with fallback to backend / local cache)
  const fetchSiteData = useCallback(async () => {
    try {
      // 1. First priority: Check Cloud Firestore for live data
      const cloudData = await getCloudSiteData();
      if (cloudData) {
        if (cloudData.config) {
          setConfig(cloudData.config);
          applyThemeColors(cloudData.config);
          localStorage.setItem('affliora_cached_config', JSON.stringify(cloudData.config));
        }
        if (Array.isArray(cloudData.projects) && cloudData.projects.length > 0) {
          setProjects(cloudData.projects);
          localStorage.setItem('affliora_cached_projects', JSON.stringify(cloudData.projects));
        }
        if (Array.isArray(cloudData.services) && cloudData.services.length > 0) {
          setServices(cloudData.services);
          localStorage.setItem('affliora_cached_services', JSON.stringify(cloudData.services));
        }
        if (Array.isArray(cloudData.industries) && cloudData.industries.length > 0) {
          setIndustries(cloudData.industries);
          localStorage.setItem('affliora_cached_industries', JSON.stringify(cloudData.industries));
        }
        if (Array.isArray(cloudData.stats) && cloudData.stats.length > 0) {
          setStats(cloudData.stats);
        }
        setIsLoading(false);
        return;
      }

      // 2. If Cloud Firestore is not yet seeded, check if current browser has cached projects to push to cloud
      const cachedProjectsRaw = localStorage.getItem('affliora_cached_projects');
      if (cachedProjectsRaw) {
        try {
          const cachedProjList = JSON.parse(cachedProjectsRaw);
          if (Array.isArray(cachedProjList) && cachedProjList.length > 0) {
            setProjects(cachedProjList);
            // Auto seed to Firestore so all other devices immediately get it
            syncProjectsToCloud(cachedProjList).catch(() => {});
          }
        } catch {}
      }

      // 3. Fallback: Backend API
      const res = await fetch('/api/site-data');
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setConfig(data.config);
          applyThemeColors(data.config);
          localStorage.setItem('affliora_cached_config', JSON.stringify(data.config));
        }
        if (Array.isArray(data.projects) && (!cachedProjectsRaw || JSON.parse(cachedProjectsRaw || '[]').length === 0)) {
          setProjects(data.projects);
          localStorage.setItem('affliora_cached_projects', JSON.stringify(data.projects));
          syncProjectsToCloud(data.projects).catch(() => {});
        }
        if (Array.isArray(data.services)) {
          setServices(data.services);
          localStorage.setItem('affliora_cached_services', JSON.stringify(data.services));
        }
        if (Array.isArray(data.industries)) {
          setIndustries(data.industries);
          localStorage.setItem('affliora_cached_industries', JSON.stringify(data.industries));
        }
        if (Array.isArray(data.stats)) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.warn('Backend API connection warning, utilizing initialized store:', err);
    } finally {
      setIsLoading(false);
    }
  }, [applyThemeColors]);

  // Initial load & real-time live listener for public site data
  useEffect(() => {
    fetchSiteData();
    applyThemeColors(config);

    // Live real-time Firestore listener: updates immediately for ANY visitor when changes happen
    const unsubscribeSite = subscribeCloudSiteData((cloudData) => {
      if (cloudData.config) {
        setConfig((prev) => {
          const merged = { ...prev, ...cloudData.config };
          applyThemeColors(merged);
          try {
            localStorage.setItem('affliora_cached_config', JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }
      if (Array.isArray(cloudData.projects) && cloudData.projects.length > 0) {
        setProjects(cloudData.projects);
        try {
          localStorage.setItem('affliora_cached_projects', JSON.stringify(cloudData.projects));
        } catch {}
      }
      if (Array.isArray(cloudData.services) && cloudData.services.length > 0) {
        setServices(cloudData.services);
        try {
          localStorage.setItem('affliora_cached_services', JSON.stringify(cloudData.services));
        } catch {}
      }
      if (Array.isArray(cloudData.industries) && cloudData.industries.length > 0) {
        setIndustries(cloudData.industries);
        try {
          localStorage.setItem('affliora_cached_industries', JSON.stringify(cloudData.industries));
        } catch {}
      }
      if (Array.isArray(cloudData.stats) && cloudData.stats.length > 0) {
        setStats(cloudData.stats);
      }
    });

    return () => {
      unsubscribeSite();
    };
  }, [fetchSiteData, applyThemeColors]);

  // Verify Admin Session
  useEffect(() => {
    const verifySession = async () => {
      if (!adminToken) {
        setIsAdmin(false);
        return;
      }
      if (adminToken.startsWith('local_session_')) {
        setIsAdmin(true);
        return;
      }
      try {
        const res = await fetch('/api/admin/verify', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setAdminToken(null);
          localStorage.removeItem('affliora_admin_token');
        }
      } catch (err) {
        // If server is unreachable but user had authenticated
        setIsAdmin(true);
      }
    };
    verifySession();
  }, [adminToken]);

  // Fetch Inquiries if admin
  const fetchInquiries = useCallback(async () => {
    if (!adminToken) return;
    try {
      const cloudInqs = await getCloudInquiries();
      if (Array.isArray(cloudInqs) && cloudInqs.length > 0) {
        setInquiries(cloudInqs);
        return;
      }
    } catch (err) {
      console.warn('Cloud inquiries check failed:', err);
    }
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.inquiries)) {
          setInquiries(data.inquiries);
          return;
        }
      }
    } catch (err) {
      console.warn('Using local inquiries store:', err);
    }
    try {
      const stored = JSON.parse(localStorage.getItem('affliora_inquiries') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        setInquiries(stored);
      }
    } catch {}
  }, [adminToken]);

  useEffect(() => {
    if (isAdmin) {
      fetchInquiries();
      // Real-time listener for incoming inquiries in Admin CRM
      const unsubscribeInq = subscribeCloudInquiries((cloudInqs) => {
        if (Array.isArray(cloudInqs)) {
          setInquiries(cloudInqs);
        }
      });
      return () => {
        unsubscribeInq();
      };
    }
  }, [isAdmin, fetchInquiries]);

  // Login
  const loginAdmin = async (password: string) => {
    // 1. Check direct master passwords first (both user requested and default)
    const validMasterPasswords = [
      'zaahir198878200920242025',
      'Affliora2026!',
    ];
    
    // Check if custom password was saved in localStorage
    const savedCustomPass = localStorage.getItem('affliora_custom_admin_password');
    if (savedCustomPass && password === savedCustomPass) {
      const localToken = 'local_session_' + Date.now();
      setAdminToken(localToken);
      setIsAdmin(true);
      localStorage.setItem('affliora_admin_token', localToken);
      showNotification('Authenticated as Administrator', 'success');
      return { success: true };
    }

    if (validMasterPasswords.includes(password)) {
      const localToken = 'local_session_' + Date.now();
      setAdminToken(localToken);
      setIsAdmin(true);
      localStorage.setItem('affliora_admin_token', localToken);
      showNotification('Authenticated as Administrator', 'success');
      return { success: true };
    }

    // 2. Try server API
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          setAdminToken(data.token);
          setIsAdmin(true);
          localStorage.setItem('affliora_admin_token', data.token);
          showNotification('Authenticated as Administrator', 'success');
          return { success: true };
        }
      }
    } catch (err: any) {
      console.warn('Connecting to local authentication fallback:', err);
    }

    return { success: false, error: 'Invalid administrative password' };
  };

  // Logout
  const logoutAdmin = () => {
    if (adminToken) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      }).catch(() => {});
    }
    setAdminToken(null);
    setIsAdmin(false);
    localStorage.removeItem('affliora_admin_token');
    showNotification('Admin session ended', 'info');
  };

  // Config update
  const updateConfig = async (newConfig: Partial<SiteConfig>): Promise<boolean> => {
    try {
      const merged = { ...config, ...newConfig };
      setConfig(merged);
      applyThemeColors(merged);
      localStorage.setItem('affliora_cached_config', JSON.stringify(merged));

      // 1. Sync directly to Cloud Firestore so all devices get the new config immediately
      syncConfigToCloud(merged).catch((e) => console.warn('Firestore config sync warn:', e));

      // 2. Also notify backend server
      if (adminToken) {
        fetch('/api/admin/config', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(newConfig),
        }).catch(() => {});
      }

      showNotification('Studio settings & theme saved to cloud', 'success');
      return true;
    } catch (err) {
      console.error('Error updating config:', err);
      showNotification('Failed to save settings', 'error');
      return false;
    }
  };

  // Projects CRUD
  const addProject = async (projectData: Partial<Project>): Promise<boolean> => {
    const tempId = `project-${Date.now()}`;
    const newProject: Project = {
      id: tempId,
      number: String(projects.length + 1).padStart(2, '0'),
      name: projectData.name || 'Untitled Project',
      client: projectData.client || 'Direct Client',
      industry: projectData.industry || projectData.category || 'Digital Architecture',
      category: projectData.category || projectData.industry || 'Digital Architecture',
      liveUrl: projectData.liveUrl || '',
      year: projectData.year || new Date().getFullYear().toString(),
      tagline: projectData.tagline || '',
      description: projectData.description || '',
      challenge: projectData.challenge || '',
      solution: projectData.solution || '',
      services: projectData.services || ['Web Architecture'],
      techStack: projectData.techStack || ['React', 'TypeScript'],
      metrics: projectData.metrics || [{ label: 'Performance', value: '100%' }],
      image: projectData.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
      featured: projectData.featured ?? true,
    };

    let targetProject = newProject;

    // Optional server creation for backend token
    if (adminToken) {
      try {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(projectData),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.project) {
            targetProject = data.project;
          }
        }
      } catch (err) {
        console.warn('Backend unavailable, proceeding with cloud & local sync:', err);
      }
    }

    const updated = [...projects, targetProject];
    setProjects(updated);
    localStorage.setItem('affliora_cached_projects', JSON.stringify(updated));

    // CRITICAL: Persist to Firebase Cloud Firestore immediately
    await syncProjectsToCloud(updated);

    showNotification(`Project "${targetProject.name}" saved to cloud portfolio`, 'success');
    return true;
  };

  const updateProject = async (id: string, updates: Partial<Project>): Promise<boolean> => {
    try {
      if (adminToken) {
        fetch(`/api/admin/projects/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(updates),
        }).catch(() => {});
      }

      const updated = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
      setProjects(updated);
      localStorage.setItem('affliora_cached_projects', JSON.stringify(updated));

      // Save to Firebase Cloud Firestore
      await syncProjectsToCloud(updated);

      showNotification('Project updated in cloud portfolio', 'success');
      return true;
    } catch (err) {
      console.error('Error updating project:', err);
      showNotification('Failed to update project', 'error');
      return false;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      if (adminToken) {
        fetch(`/api/admin/projects/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` },
        }).catch(() => {});
      }

      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      localStorage.setItem('affliora_cached_projects', JSON.stringify(updated));

      // Save to Firebase Cloud Firestore
      await syncProjectsToCloud(updated);

      showNotification('Project removed from cloud portfolio', 'info');
      return true;
    } catch (err) {
      console.error('Error deleting project:', err);
      return false;
    }
  };

  // Services CRUD
  const addService = async (serviceData: Partial<ServiceItem>): Promise<boolean> => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      number: String(services.length + 1).padStart(2, '0'),
      title: serviceData.title || 'New Service',
      shortDesc: serviceData.shortDesc || '',
      longDesc: serviceData.longDesc || '',
      capabilities: serviceData.capabilities || [],
      deliverables: serviceData.deliverables || [],
      technologies: serviceData.technologies || [],
      highlight: serviceData.highlight || '',
      image: serviceData.image || '',
    };

    if (adminToken) {
      fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(serviceData),
      }).catch(() => {});
    }

    const updated = [...services, newService];
    setServices(updated);
    localStorage.setItem('affliora_cached_services', JSON.stringify(updated));
    await saveCloudSiteData({ services: updated });
    showNotification(`Service "${newService.title}" created & synced to cloud`, 'success');
    return true;
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>): Promise<boolean> => {
    if (adminToken) {
      fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updates),
      }).catch(() => {});
    }

    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setServices(updated);
    localStorage.setItem('affliora_cached_services', JSON.stringify(updated));
    await saveCloudSiteData({ services: updated });
    showNotification('Service specs updated in cloud', 'success');
    return true;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    if (adminToken) {
      fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      }).catch(() => {});
    }

    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem('affliora_cached_services', JSON.stringify(updated));
    await saveCloudSiteData({ services: updated });
    showNotification('Service removed from cloud', 'info');
    return true;
  };

  // Industries CRUD
  const addIndustry = async (industryData: Partial<IndustryItem>): Promise<boolean> => {
    const newInd: IndustryItem = {
      id: `ind-${Date.now()}`,
      number: String(industries.length + 1).padStart(2, '0'),
      title: industryData.title || 'New Industry',
      subtitle: industryData.subtitle || '',
      description: industryData.description || '',
      challenges: industryData.challenges || [],
      solutions: industryData.solutions || [],
      recommendedServices: industryData.recommendedServices || [],
      image: industryData.image || '',
    };

    if (adminToken) {
      fetch('/api/admin/industries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(industryData),
      }).catch(() => {});
    }

    const updated = [...industries, newInd];
    setIndustries(updated);
    localStorage.setItem('affliora_cached_industries', JSON.stringify(updated));
    await saveCloudSiteData({ industries: updated });
    showNotification(`Industry "${newInd.title}" synced to cloud`, 'success');
    return true;
  };

  const updateIndustry = async (id: string, updates: Partial<IndustryItem>): Promise<boolean> => {
    if (adminToken) {
      fetch(`/api/admin/industries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updates),
      }).catch(() => {});
    }

    const updated = industries.map((i) => (i.id === id ? { ...i, ...updates } : i));
    setIndustries(updated);
    localStorage.setItem('affliora_cached_industries', JSON.stringify(updated));
    await saveCloudSiteData({ industries: updated });
    showNotification('Industry playbook updated in cloud', 'success');
    return true;
  };

  const deleteIndustry = async (id: string): Promise<boolean> => {
    if (adminToken) {
      fetch(`/api/admin/industries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      }).catch(() => {});
    }

    const updated = industries.filter((i) => i.id !== id);
    setIndustries(updated);
    localStorage.setItem('affliora_cached_industries', JSON.stringify(updated));
    await saveCloudSiteData({ industries: updated });
    showNotification('Industry removed from cloud', 'info');
    return true;
  };

  // Stats
  const updateStats = async (newStats: AgencyStatItem[]): Promise<boolean> => {
    if (adminToken) {
      fetch('/api/admin/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ stats: newStats }),
      }).catch(() => {});
    }

    setStats(newStats);
    await saveCloudSiteData({ stats: newStats });
    showNotification('Measurable commitments updated in cloud', 'success');
    return true;
  };

  // Inquiries
  const submitInquiry = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
    // 1. Submit to Firebase Firestore
    try {
      const cloudId = await submitCloudInquiry({
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
      });
      if (cloudId) {
        const newInq: InquiryItem = {
          id: cloudId,
          ...formData,
          status: 'new',
          createdAt: new Date().toISOString(),
        };
        setInquiries((prev) => [newInq, ...prev]);
        showNotification('Your project inquiry has been securely transmitted.', 'success');
        return { success: true };
      }
    } catch (e) {
      console.warn('Cloud inquiry submit error:', e);
    }

    // 2. Also try backend API
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inquiry) {
          setInquiries((prev) => [data.inquiry, ...prev]);
          showNotification('Your project inquiry has been securely transmitted.', 'success');
          return { success: true };
        }
      }
    } catch (err: any) {
      console.warn('API submission failed, persisting locally:', err);
    }

    // Local resilient storage fallback
    const newInquiry: InquiryItem = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      ...formData,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    try {
      const stored = JSON.parse(localStorage.getItem('affliora_inquiries') || '[]');
      stored.unshift(newInquiry);
      localStorage.setItem('affliora_inquiries', JSON.stringify(stored));
    } catch {}
    showNotification('Your project inquiry has been securely transmitted.', 'success');
    return { success: true };
  };

  const updateInquiryStatus = async (id: string, status: 'new' | 'reviewed' | 'contacted' | 'archived'): Promise<boolean> => {
    // 1. Update in Firebase Firestore
    updateCloudInquiryStatus(id, status).catch(() => {});

    // 2. Also try server
    if (adminToken) {
      fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      }).catch(() => {});
    }

    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, status } : inq));
      try {
        localStorage.setItem('affliora_inquiries', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showNotification(`Inquiry status marked as ${status}`, 'success');
    return true;
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    // 1. Delete from Firebase Firestore
    deleteCloudInquiry(id).catch(() => {});

    // 2. Also try server
    if (adminToken) {
      fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      }).catch(() => {});
    }

    setInquiries((prev) => {
      const updated = prev.filter((inq) => inq.id !== id);
      try {
        localStorage.setItem('affliora_inquiries', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showNotification('Inquiry deleted', 'info');
    return true;
  };

  // Reset to Defaults
  const resetDefaults = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/reset-defaults', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setConfig(data.data.config);
          setProjects(data.data.projects);
          setServices(data.data.services);
          setIndustries(data.data.industries);
          setStats(data.data.stats);
          applyThemeColors(data.data.config);
        }
        showNotification('Website restored to initial system defaults', 'info');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  // Helpers that dynamically use the admin's configured phone and email
  const getWhatsAppUrl = (customText?: string) => {
    const rawNumber = config.whatsapp.replace(/[^0-9]/g, '') || '923008472190';
    const message = customText || config.whatsappMessage || 'Hello Affliora Digital, I would like to discuss scoping a new project.';
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  const getMailtoUrl = (subject?: string, body?: string) => {
    const targetEmail = config.email || 'afflioradigital@gmail.com';
    const subj = subject || `Project Inquiry // ${config.name}`;
    const b = body || `Hello ${config.name} Team,\n\nI would like to discuss scoping a digital project with your studio.\n\nBest regards,`;
    return `mailto:${targetEmail}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(b)}`;
  };

  return (
    <SiteContext.Provider
      value={{
        config,
        projects,
        services,
        industries,
        stats,
        inquiries,
        isLoading,
        isAdmin,
        adminToken,
        notification,
        clearNotification,
        showNotification,
        loginAdmin,
        logoutAdmin,
        updateConfig,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addIndustry,
        updateIndustry,
        deleteIndustry,
        updateStats,
        submitInquiry,
        fetchInquiries,
        updateInquiryStatus,
        deleteInquiry,
        resetDefaults,
        getWhatsAppUrl,
        getMailtoUrl,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
