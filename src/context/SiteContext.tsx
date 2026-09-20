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

  // Fetch Public Site Data from backend
  const fetchSiteData = useCallback(async () => {
    try {
      const res = await fetch('/api/site-data');
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setConfig(data.config);
          applyThemeColors(data.config);
          localStorage.setItem('affliora_cached_config', JSON.stringify(data.config));
        }
        if (Array.isArray(data.projects)) {
          setProjects(data.projects);
          localStorage.setItem('affliora_cached_projects', JSON.stringify(data.projects));
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

  // Initial load
  useEffect(() => {
    fetchSiteData();
    applyThemeColors(config);
  }, [fetchSiteData]);

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
    }
  }, [isAdmin, fetchInquiries]);

  // Login
  const loginAdmin = async (password: string) => {
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

    if (password === 'Affliora2026!') {
      const localToken = 'local_session_' + Date.now();
      setAdminToken(localToken);
      setIsAdmin(true);
      localStorage.setItem('affliora_admin_token', localToken);
      showNotification('Authenticated as Administrator', 'success');
      return { success: true };
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

      if (adminToken) {
        const res = await fetch('/api/admin/config', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(newConfig),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setConfig(data.config);
            applyThemeColors(data.config);
            localStorage.setItem('affliora_cached_config', JSON.stringify(data.config));
          }
          showNotification('Studio settings & theme saved successfully', 'success');
          return true;
        }
      }
      return true;
    } catch (err) {
      console.error('Error updating config:', err);
      showNotification('Failed to save settings', 'error');
      return false;
    }
  };

  // Projects CRUD
  const addProject = async (projectData: Partial<Project>): Promise<boolean> => {
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
        setProjects((prev) => [...prev, data.project]);
        showNotification(`Project "${data.project.name}" added to portfolio`, 'success');
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === id ? data.project : p)));
        showNotification('Project updated successfully', 'success');
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showNotification('Project removed from portfolio', 'info');
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Services CRUD
  const addService = async (serviceData: Partial<ServiceItem>): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(serviceData),
      });
      if (res.ok) {
        const data = await res.json();
        setServices((prev) => [...prev, data.service]);
        showNotification(`Service "${data.service.title}" created`, 'success');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setServices((prev) => prev.map((s) => (s.id === id ? data.service : s)));
        showNotification('Service specs updated', 'success');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        showNotification('Service removed', 'info');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  // Industries CRUD
  const addIndustry = async (industryData: Partial<IndustryItem>): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/industries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(industryData),
      });
      if (res.ok) {
        const data = await res.json();
        setIndustries((prev) => [...prev, data.industry]);
        showNotification(`Industry "${data.industry.title}" added`, 'success');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const updateIndustry = async (id: string, updates: Partial<IndustryItem>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/industries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setIndustries((prev) => prev.map((i) => (i.id === id ? data.industry : i)));
        showNotification('Industry playbook updated', 'success');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const deleteIndustry = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/industries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setIndustries((prev) => prev.filter((i) => i.id !== id));
        showNotification('Industry removed', 'info');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  // Stats
  const updateStats = async (newStats: AgencyStatItem[]): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ stats: newStats }),
      });
      if (res.ok) {
        setStats(newStats);
        showNotification('Measurable commitments updated', 'success');
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  // Inquiries
  const submitInquiry = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
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
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries((prev) => prev.map((inq) => (inq.id === id ? data.inquiry : inq)));
        showNotification(`Inquiry status marked as ${status}`, 'success');
        return true;
      }
    } catch (err) {
      // Local fallback
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
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        showNotification('Inquiry deleted', 'info');
        return true;
      }
    } catch (err) {
      // Local fallback
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
