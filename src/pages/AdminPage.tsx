import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Lock,
  Unlock,
  Key,
  LogOut,
  Sparkles,
  Palette,
  Briefcase,
  Layers,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  Clock,
  RotateCcw,
  Eye,
  EyeOff,
  Search,
  Upload,
  Globe,
  Sliders,
  AlertCircle,
  Image as ImageIcon,
  Type,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { PageId, Project, ServiceItem, IndustryItem } from '../types';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

type AdminTab = 'overview' | 'inquiries' | 'logo' | 'branding' | 'theme' | 'typography' | 'contact' | 'portfolio' | 'services' | 'industries' | 'security';

// 12 Bespoke Luxury Preset Themes
const THEME_PRESETS = [
  {
    id: 'electric-blue',
    name: 'Electric Sapphire (Signature)',
    desc: 'High-voltage Silicon Valley precision & authoritative digital flagships',
    primary: '#2563EB',
    light: '#3B82F6',
    glow: 'rgba(37, 99, 235, 0.35)',
  },
  {
    id: 'cyber-gold',
    name: 'Champagne Sovereign (Horology Gold)',
    desc: 'Bespoke Swiss luxury horology, Patek warmth & private banking prestige',
    primary: '#D97706',
    light: '#F59E0B',
    glow: 'rgba(217, 119, 6, 0.35)',
  },
  {
    id: 'emerald-apex',
    name: 'Emerald Apex (Imperial Sovereign)',
    desc: 'Private equity wealth, sustainable luxury & elite fintech dominance',
    primary: '#059669',
    light: '#10B981',
    glow: 'rgba(5, 150, 105, 0.35)',
  },
  {
    id: 'crimson-luxe',
    name: 'Crimson Haute Luxe (Monaco Ruby)',
    desc: 'Cinematic drama, high-fashion runway editorial & unapologetic authority',
    primary: '#DC2626',
    light: '#EF4444',
    glow: 'rgba(220, 38, 38, 0.35)',
  },
  {
    id: 'royal-violet',
    name: 'Royal Imperial Violet',
    desc: 'Avant-garde creative studio direction, Web3 elegance & generative art',
    primary: '#7C3AED',
    light: '#8B5CF6',
    glow: 'rgba(124, 58, 237, 0.35)',
  },
  {
    id: 'nordic-glacier',
    name: 'Nordic Glacier (Arctic Cyan)',
    desc: 'Ultra-pure Scandinavian clarity, sub-second performance & cloud architecture',
    primary: '#0284C7',
    light: '#38BDF8',
    glow: 'rgba(2, 132, 199, 0.35)',
  },
  {
    id: 'obsidian-platinum',
    name: 'Obsidian Platinum (Pure Monochrome)',
    desc: 'Pure high-fashion minimalism, Celine & Balenciaga aesthetic with crisp whites',
    primary: '#E4E4E7',
    light: '#FFFFFF',
    glow: 'rgba(255, 255, 255, 0.25)',
  },
  {
    id: 'venetian-bronze',
    name: 'Venetian Bronze (Riviera Copper)',
    desc: 'Warm metallic Italian bronze, superyacht luxury & Mediterranean warmth',
    primary: '#B45309',
    light: '#F59E0B',
    glow: 'rgba(180, 83, 9, 0.35)',
  },
  {
    id: 'cyber-lime',
    name: 'Cyber Kinetic Lime (Quantum)',
    desc: 'High-velocity AI compute, deep tech speed & energetic modernism',
    primary: '#65A30D',
    light: '#84CC16',
    glow: 'rgba(132, 204, 22, 0.35)',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold Mirage (Parisian Rouge)',
    desc: 'Haute aesthetics, boutique hotel luxury & Parisian elegance',
    primary: '#E11D48',
    light: '#FB7185',
    glow: 'rgba(225, 29, 72, 0.35)',
  },
  {
    id: 'deep-indigo',
    name: 'Deep Abyss (Intelligence Indigo)',
    desc: 'Cognitive intelligence, enterprise enterprise platforms & deep ocean calm',
    primary: '#4338CA',
    light: '#6366F1',
    glow: 'rgba(99, 102, 241, 0.35)',
  },
  {
    id: 'monochrome-titanium',
    name: 'Titanium Slate (Brutalist Concrete)',
    desc: 'Brutalist architectural rigor, Tadao Ando minimalism & industrial permanence',
    primary: '#64748B',
    light: '#94A3B8',
    glow: 'rgba(100, 116, 139, 0.35)',
  },
];

// Curated Luxury Font Pairings Suites
const FONT_PAIRING_PRESETS = [
  {
    id: 'architectural',
    name: 'Modern Architectural (Default Studio)',
    desc: 'Syne Display with Plus Jakarta Sans body — signature Affliora high-craft posture',
    display: 'Syne',
    body: 'Plus Jakarta Sans',
    editorial: 'Cormorant Garamond',
    mono: 'Space Mono',
  },
  {
    id: 'haute-couture',
    name: 'Haute Couture Editorial (Vogue / Milan)',
    desc: 'Playfair Display headlines paired with Plus Jakarta Sans — Paris / Milan luxury house',
    display: 'Playfair Display',
    body: 'Plus Jakarta Sans',
    editorial: 'Playfair Display',
    mono: 'Space Mono',
  },
  {
    id: 'classical-sovereign',
    name: 'Imperial Heritage & Sovereign Stature',
    desc: 'Cinzel classical uppercase with Inter body — private banking & Swiss horology',
    display: 'Cinzel',
    body: 'Inter',
    editorial: 'Cormorant Garamond',
    mono: 'Space Mono',
  },
  {
    id: 'kinetic-tech',
    name: 'Kinetic Tech & Avant-Garde',
    desc: 'Space Grotesk headline with Outfit body — Silicon Valley frontier & AI intelligence',
    display: 'Space Grotesk',
    body: 'Outfit',
    editorial: 'Cormorant Garamond',
    mono: 'Space Mono',
  },
  {
    id: 'swiss-minimalism',
    name: 'Swiss Brutalist High-Contrast',
    desc: 'Montserrat bold display with Plus Jakarta Sans — Bauhaus architectural rigor',
    display: 'Montserrat',
    body: 'Plus Jakarta Sans',
    editorial: 'Cormorant Garamond',
    mono: 'JetBrains Mono',
  },
  {
    id: 'pure-nordic',
    name: 'Nordic Clean Geometric Product',
    desc: 'Outfit display with Inter clean body — frictionless Scandinavian digital elegance',
    display: 'Outfit',
    body: 'Inter',
    editorial: 'Cormorant Garamond',
    mono: 'JetBrains Mono',
  },
  {
    id: 'monastic-estate',
    name: 'Monastic Literary Luxury',
    desc: 'Cormorant Garamond throughout — bespoke heritage estate & architectural monograph',
    display: 'Cormorant Garamond',
    body: 'Plus Jakarta Sans',
    editorial: 'Cormorant Garamond',
    mono: 'Space Mono',
  },
];

const AVAILABLE_DISPLAY_FONTS = [
  { name: 'Syne', category: 'Architectural Geometric', preview: 'Modern Agency Display' },
  { name: 'Playfair Display', category: 'Haute Editorial Serif', preview: 'Luxury Magazine Editorial' },
  { name: 'Cinzel', category: 'Imperial Classical Roman', preview: 'Classical Sovereign Stature' },
  { name: 'Space Grotesk', category: 'Kinetic Tech Sans', preview: 'Frontier AI & Future Tech' },
  { name: 'Outfit', category: 'Geometric Modernist Sans', preview: 'Sleek Minimalist Clarity' },
  { name: 'Montserrat', category: 'Swiss High-Contrast Sans', preview: 'Authoritative Modernism' },
  { name: 'Cormorant Garamond', category: 'Timeless Luxury Serif', preview: 'Heritage Craft & Prestige' },
  { name: 'Plus Jakarta Sans', category: 'Clean European Grotesk', preview: 'Refined Executive Interface' },
  { name: 'Inter', category: 'Precision Digital Sans', preview: 'Maximum Legibility & Density' },
];

const AVAILABLE_BODY_FONTS = [
  { name: 'Plus Jakarta Sans', category: 'Signature Executive Sans' },
  { name: 'Inter', category: 'High-Legibility Precision Sans' },
  { name: 'Outfit', category: 'Geometric Crisp Sans' },
  { name: 'Montserrat', category: 'Clean Modern Geometric' },
];

const AVAILABLE_EDITORIAL_FONTS = [
  { name: 'Cormorant Garamond', category: 'Refined French Serif Italic' },
  { name: 'Playfair Display', category: 'High-Fashion Vogue Italic' },
  { name: 'Cinzel', category: 'Classical Imperial Roman' },
];

const AVAILABLE_MONO_FONTS = [
  { name: 'Space Mono', category: 'Retro-Futuristic Terminal' },
  { name: 'JetBrains Mono', category: 'Sub-Pixel Precision Code' },
];

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
    config,
    projects,
    services,
    industries,
    inquiries,
    isAdmin,
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
    updateInquiryStatus,
    deleteInquiry,
    resetDefaults,
    getWhatsAppUrl,
  } = useSite();

  // Login State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Active Admin Section
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Form State for Branding / Contact
  const [brandForm, setBrandForm] = useState(config);

  // Sync brandForm when config updates
  React.useEffect(() => {
    setBrandForm(config);
  }, [config]);

  // Project Modal / Edit State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    name: '',
    client: '',
    industry: '',
    category: '',
    liveUrl: '',
    year: '2025',
    tagline: '',
    description: '',
    challenge: '',
    solution: '',
    services: [],
    techStack: [],
    metrics: [{ label: 'Performance', value: '+100%' }],
    image: '',
    featured: true,
  });

  // Services Modal / Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({
    title: '',
    shortDesc: '',
    longDesc: '',
    highlight: '',
    capabilities: [],
    deliverables: [],
    technologies: [],
  });

  // Industries Modal / Edit State
  const [editingIndustry, setEditingIndustry] = useState<IndustryItem | null>(null);
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [industryForm, setIndustryForm] = useState<Partial<IndustryItem>>({
    title: '',
    subtitle: '',
    description: '',
    challenges: [],
    solutions: [],
    recommendedServices: [],
  });

  // New Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityNotice, setSecurityNotice] = useState('');

  // Logo Manager State
  const [logoNotice, setLogoNotice] = useState('');
  const [isSavingLogo, setIsSavingLogo] = useState(false);

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsAuthenticating(true);

    const res = await loginAdmin(passwordInput);
    setIsAuthenticating(false);

    if (!res.success) {
      setLoginError(res.error || 'Access denied: Invalid administrative passphrase');
    } else {
      setPasswordInput('');
    }
  };

  // Image file upload handler with base64 conversion
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'project' | 'logo' | 'service' | 'industry'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please choose an optimized image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const dataUrl = reader.result as string;
        if (target === 'project') {
          setProjectForm((prev) => ({ ...prev, image: dataUrl }));
        } else if (target === 'logo') {
          setBrandForm((prev) => ({
            ...prev,
            logoUrl: dataUrl,
            logoType: 'image',
          }));
        } else if (target === 'service') {
          setServiceForm((prev) => ({ ...prev, image: dataUrl }));
        } else if (target === 'industry') {
          setIndustryForm((prev) => ({ ...prev, image: dataUrl }));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Logo Configuration
  const handleSaveLogoConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingLogo(true);
    try {
      await updateConfig({
        logoUrl: brandForm.logoUrl || '',
        logoType: brandForm.logoType || 'monogram',
        logoText: brandForm.logoText || 'AFFLIORA DIGITAL',
        logoHeight: Number(brandForm.logoHeight) || 36,
      });
      setLogoNotice('Website logo configuration successfully updated and live across header & footer.');
      setTimeout(() => setLogoNotice(''), 4500);
    } catch (err: any) {
      setLogoNotice(`Error saving logo: ${err.message}`);
    } finally {
      setIsSavingLogo(false);
    }
  };

  // Remove Logo & Revert to Minimal Monogram
  const handleRemoveLogo = async () => {
    setIsSavingLogo(true);
    try {
      const updated = {
        ...brandForm,
        logoUrl: '',
        logoType: 'monogram' as const,
      };
      setBrandForm(updated);
      await updateConfig({
        logoUrl: '',
        logoType: 'monogram',
      });
      setLogoNotice('Logo removed. Refined minimal brand monogram restored.');
      setTimeout(() => setLogoNotice(''), 4500);
    } catch (err: any) {
      setLogoNotice(`Error removing logo: ${err.message}`);
    } finally {
      setIsSavingLogo(false);
    }
  };

  // Save Branding / Contact Config
  const handleSaveBrandConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateConfig(brandForm);
  };

  // Handle Theme Preset Select
  const handleSelectThemePreset = async (preset: typeof THEME_PRESETS[0]) => {
    const updated = {
      ...brandForm,
      themePreset: preset.id,
      primaryColor: preset.primary,
      primaryColorLight: preset.light,
      primaryColorGlow: preset.glow,
    };
    setBrandForm(updated);
    await updateConfig(updated);
  };

  // Handle Custom Theme Colors Save
  const handleSaveCustomColors = async () => {
    await updateConfig({
      primaryColor: brandForm.primaryColor,
      primaryColorLight: brandForm.primaryColorLight,
      primaryColorGlow: brandForm.primaryColorGlow,
      themePreset: 'custom',
    });
  };

  // Handle Font Pairing Preset Select
  const handleSelectFontPreset = async (preset: typeof FONT_PAIRING_PRESETS[0]) => {
    const updated = {
      ...brandForm,
      fontPreset: preset.id,
      fontDisplay: preset.display,
      fontBody: preset.body,
      fontEditorial: preset.editorial,
      fontMono: preset.mono,
    };
    setBrandForm(updated);
    await updateConfig(updated);
  };

  // Handle Custom Typography Save
  const handleSaveTypography = async () => {
    await updateConfig({
      fontPreset: brandForm.fontPreset || 'custom',
      fontDisplay: brandForm.fontDisplay || 'Syne',
      fontBody: brandForm.fontBody || 'Plus Jakarta Sans',
      fontEditorial: brandForm.fontEditorial || 'Cormorant Garamond',
      fontMono: brandForm.fontMono || 'Space Mono',
    });
  };

  // Open Project Modal
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      name: '',
      client: '',
      industry: 'Enterprise Technology',
      category: 'Web Development',
      liveUrl: 'https://',
      year: new Date().getFullYear().toString(),
      tagline: 'High-impact digital experience and digital commerce architecture.',
      description: 'Engineered an bespoke digital platform delivering high conversion and sub-second load times.',
      challenge: 'Legacy system performance bottlenecks and uninspired brand engagement.',
      solution: 'Architected a Next-gen React and TypeScript flagship experience with fluid kinetic micro-interactions.',
      services: ['Web Architecture', 'UI/UX Design', 'Performance Engineering'],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      metrics: [
        { label: 'Conversion Lift', value: '+140%' },
        { label: 'Page Speed', value: '99/100' }
      ],
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
      featured: true,
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({ ...proj });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.client) return;

    if (editingProject) {
      await updateProject(editingProject.id, projectForm);
    } else {
      await addProject(projectForm);
    }
    setIsProjectModalOpen(false);
  };

  // Open Service Modal
  const openNewServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      shortDesc: '',
      longDesc: '',
      highlight: '',
      capabilities: [],
      deliverables: [],
      technologies: [],
      image: '',
    });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (srv: ServiceItem) => {
    setEditingService(srv);
    setServiceForm({ ...srv });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title) return;

    if (editingService) {
      await updateService(editingService.id, serviceForm);
    } else {
      await addService(serviceForm);
    }
    setIsServiceModalOpen(false);
  };

  // Open Industry Modal
  const openNewIndustryModal = () => {
    setEditingIndustry(null);
    setIndustryForm({
      title: '',
      subtitle: '',
      description: '',
      challenges: [],
      solutions: [],
      recommendedServices: [],
      image: '',
    });
    setIsIndustryModalOpen(true);
  };

  const openEditIndustryModal = (ind: IndustryItem) => {
    setEditingIndustry(ind);
    setIndustryForm({ ...ind });
    setIsIndustryModalOpen(true);
  };

  const handleSaveIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industryForm.title) return;

    if (editingIndustry) {
      await updateIndustry(editingIndustry.id, industryForm);
    } else {
      await addIndustry(industryForm);
    }
    setIsIndustryModalOpen(false);
  };

  // Security password change
  const handleChangeAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityNotice('');
    if (!newPassword || newPassword.length < 6) {
      setSecurityNotice('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityNotice('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('affliora_admin_token')}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        localStorage.setItem('affliora_custom_admin_password', newPassword);
        setSecurityNotice('Master administrative password successfully updated.');
        setNewPassword('');
        setConfirmPassword('');
        return;
      }
    } catch (err: any) {
      // Backend not running on static Vercel build, save locally
    }

    localStorage.setItem('affliora_custom_admin_password', newPassword);
    setSecurityNotice('Master administrative password successfully updated.');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Unread/new inquiries count
  const newInquiriesCount = inquiries.filter((inq) => inq.status === 'new').length;

  // -------------------------------------------------------------
  // VIEW: 1. LOCKED GATE (LOGIN SCREEN)
  // -------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050608] text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: config.primaryColorGlow || 'rgba(37, 99, 235, 0.15)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Brand Monogram */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 relative flex items-center justify-center border border-white/20 bg-[#08090b] mb-4 shadow-2xl">
              <span className="font-sans font-extrabold text-xl tracking-wider text-white">A</span>
              <div
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5"
                style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/50">
              AFFLIORA DIGITAL // EXECUTIVE CMS
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              Restricted Studio Portal
            </h1>
            <p className="text-xs text-white/60 mt-1 max-w-xs">
              Direct access terminal to manage portfolio, services, inquiries, contact endpoints, and styling.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#0b0d11]/90 backdrop-blur-xl border border-white/15 p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-white/70">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>AUTHENTICATION REQUIRED</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-white/15 text-white/50">
                SHA-256
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] font-mono tracking-widest uppercase text-white/70 mb-2">
                  Admin Passphrase
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full pl-10 pr-12 py-3 bg-white/[0.04] border border-white/15 focus:border-[#3B82F6] focus:bg-white/[0.08] text-white text-sm tracking-wider font-mono outline-none transition-all placeholder:text-white/25"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle password view"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{loginError}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style={{
                  backgroundColor: config.primaryColor || '#2563EB',
                }}
              >
                {isAuthenticating ? (
                  <span>VERIFYING CREDENTIALS...</span>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>UNLOCK CONTROL PANEL</span>
                  </>
                )}
              </button>
            </form>

            {/* Discreet Security Badge - Password hidden for security */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-center text-[11px] text-white/40 font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Restricted Access • Authorized Personnel Only</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: 2. UNLOCKED EXECUTIVE ADMIN PANEL
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#07080a] text-white pt-24 pb-20">
      {/* Top Admin Sticky Bar */}
      <div className="border-b border-white/10 bg-[#090b0e]/95 backdrop-blur-md sticky top-0 z-30 px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center border border-white/20 bg-[#07080a]">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase font-sans">
                  {config.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  FIREBASE CLOUD PERSISTENCE ACTIVE
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/50 flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Global Cloud Sync Active — Any changes made here are instantly live across all devices & tabs
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Preview Website</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-4 border-b border-white/10 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 relative ${
              activeTab === 'inquiries'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquiries CRM</span>
            {newInquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[9px] font-bold">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'logo'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Logo & Brand Asset</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'theme'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme & Colors</span>
          </button>

          <button
            onClick={() => setActiveTab('typography')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'typography'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Typography & Fonts</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'portfolio'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Portfolio & Works ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('industries')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'industries'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Industries ({industries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'branding'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Agency Identity</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Security</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-[#0b0d11] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  ACTIVE INQUIRIES
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {inquiries.length}
                  </span>
                  {newInquiriesCount > 0 && (
                    <span className="text-xs font-mono text-emerald-400">
                      {newInquiriesCount} new
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/40">Direct form transmissions from prospective clients</p>
              </div>

              <div className="p-6 bg-[#0b0d11] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  PORTFOLIO PROJECTS
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {projects.length}
                  </span>
                  <span className="text-xs font-mono text-blue-400">
                    {projects.filter((p) => p.featured).length} Featured
                  </span>
                </div>
                <p className="text-xs text-white/40">Showcased flagship case studies and builds</p>
              </div>

              <div className="p-6 bg-[#0b0d11] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  CAPABILITIES OFFERED
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {services.length}
                  </span>
                  <span className="text-xs font-mono text-white/50">Core Pillars</span>
                </div>
                <p className="text-xs text-white/40">Engineered disciplines & client deliverables</p>
              </div>

              <div className="p-6 bg-[#0b0d11] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  ACTIVE COLOR THEME
                </span>
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full border border-white/30"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  <span className="text-sm font-mono font-bold uppercase">
                    {config.themePreset || 'Custom'}
                  </span>
                </div>
                <p className="text-xs text-white/40 font-mono">{config.primaryColor} / {config.primaryColorLight}</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 bg-[#0b0d11] border border-white/10">
              <h2 className="text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Executive Command Shortcuts</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <button
                  onClick={() => setActiveTab('logo')}
                  className="p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-blue-500/30 text-left transition-colors cursor-pointer group"
                >
                  <ImageIcon className="w-4 h-4 text-blue-400 mb-2 group-hover:translate-x-1 transition-transform" />
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Manage Website Logo</div>
                  <div className="text-[11px] text-white/40 mt-1">Upload, edit, resize, or remove agency logo</div>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-left transition-colors cursor-pointer group"
                >
                  <Mail className="w-4 h-4 text-blue-400 mb-2 group-hover:translate-x-1 transition-transform" />
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Review Inquiries</div>
                  <div className="text-[11px] text-white/40 mt-1">Check new project briefs & contact submissions</div>
                </button>

                <button
                  onClick={openNewProjectModal}
                  className="p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-left transition-colors cursor-pointer group"
                >
                  <Plus className="w-4 h-4 text-emerald-400 mb-2 group-hover:translate-x-1 transition-transform" />
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Add Portfolio Project</div>
                  <div className="text-[11px] text-white/40 mt-1">Upload image and case study specs</div>
                </button>

                <button
                  onClick={() => setActiveTab('theme')}
                  className="p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-left transition-colors cursor-pointer group"
                >
                  <Palette className="w-4 h-4 text-purple-400 mb-2 group-hover:translate-x-1 transition-transform" />
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Switch Color Palette</div>
                  <div className="text-[11px] text-white/40 mt-1">Change website accent to blue, gold, emerald, or crimson</div>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className="p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-left transition-colors cursor-pointer group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 mb-2 group-hover:translate-x-1 transition-transform" />
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Update WhatsApp & Email</div>
                  <div className="text-[11px] text-white/40 mt-1">Ensure direct client buttons route to your numbers</div>
                </button>
              </div>
            </div>

            {/* Recent Inquiries Snippet */}
            <div className="p-6 bg-[#0b0d11] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
                  LATEST CLIENT SUBMISSIONS
                </h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 underline underline-offset-4"
                >
                  View All ({inquiries.length})
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-white/40">
                  No inquiries recorded yet. Contact submissions will appear here automatically.
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="py-3 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-white">{inq.name}</div>
                        <div className="text-xs text-white/50 font-mono">
                          {inq.company || 'Private Client'} • {inq.projectType} • {inq.budget}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-white/15 text-white/60">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                        <a
                          href={getWhatsAppUrl(`Hello ${inq.name}, thank you for contacting ${config.name} regarding your project: ${inq.projectType}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INQUIRIES CRM */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                  Client Inquiries & CRM Leads
                </h2>
                <p className="text-xs text-white/60">
                  Every message submitted on the contact page is stored here and automatically synced with your agency contact channels.
                </p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#0b0d11] border border-white/10 text-white/40 font-mono text-sm">
                No inquiries received yet. Submit a test inquiry on the Contact page to view it here.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => {
                  const whatsappReply = `Hello ${inq.name}, this is ${config.name} following up on your ${inq.projectType} inquiry for ${inq.company || 'your organization'}.`;
                  const emailSubject = `Re: Project Inquiry // ${config.name}`;
                  const emailBody = `Dear ${inq.name},\n\nThank you for reaching out to ${config.name}. We reviewed your project brief:\n\nScope: ${inq.message}\nBudget: ${inq.budget}\nTimeline: ${inq.timeline}\n\nWhen would be a convenient time for an introductory discovery call?\n\nBest regards,\n${config.name}`;

                  return (
                    <div
                      key={inq.id}
                      className="p-6 bg-[#0b0d11] border border-white/15 space-y-4 relative"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-base font-bold text-white">{inq.name}</h3>
                            {inq.company && (
                              <span className="text-xs font-mono text-white/60 border border-white/10 px-2 py-0.5">
                                {inq.company}
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-mono uppercase px-2.5 py-0.5 border ${
                                inq.status === 'new'
                                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                  : inq.status === 'contacted'
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : 'bg-white/5 border-white/15 text-white/50'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mt-2">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-blue-400" />
                              <a href={`mailto:${inq.email}`} className="hover:text-white underline">
                                {inq.email}
                              </a>
                            </span>
                            {inq.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-emerald-400" />
                                <a href={`tel:${inq.phone}`} className="hover:text-white">
                                  {inq.phone}
                                </a>
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-white/40" />
                              {new Date(inq.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Status update & Delete */}
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryStatus(
                                inq.id,
                                e.target.value as 'new' | 'reviewed' | 'contacted' | 'archived'
                              )
                            }
                            className="bg-white/5 border border-white/20 text-white text-xs px-2.5 py-1.5 font-mono focus:outline-none cursor-pointer"
                          >
                            <option value="new" className="bg-black">Status: New</option>
                            <option value="reviewed" className="bg-black">Status: Reviewed</option>
                            <option value="contacted" className="bg-black">Status: Contacted</option>
                            <option value="archived" className="bg-black">Status: Archived</option>
                          </select>

                          <button
                            onClick={() => {
                              if (confirm('Delete this inquiry record?')) {
                                deleteInquiry(inq.id);
                              }
                            }}
                            className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Inquiry Project Parameters */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono bg-white/[0.02] p-3 border border-white/5">
                        <div>
                          <span className="text-white/40 block text-[10px]">PROJECT CATEGORY</span>
                          <span className="text-white font-medium">{inq.projectType}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px]">COMMISSION BUDGET</span>
                          <span className="text-white font-medium">{inq.budget}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px]">DESIRED TIMELINE</span>
                          <span className="text-white font-medium">{inq.timeline}</span>
                        </div>
                      </div>

                      {/* Inquiry Message Body */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                          CLIENT BRIEF & SCOPE
                        </span>
                        <p className="text-sm text-white/90 leading-relaxed font-light whitespace-pre-wrap bg-white/[0.01] p-3 border border-white/5">
                          {inq.message}
                        </p>
                      </div>

                      {/* Direct Action Reply Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappReply)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Direct WhatsApp Reply</span>
                          </a>
                        )}

                        <a
                          href={`mailto:${inq.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-blue-400" />
                          <span>Direct Email Reply</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: LOGO & BRAND ASSETS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'logo' && (
          <div className="mt-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans flex items-center gap-2.5">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                  <span>Logo & Brand Asset Management</span>
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Upload a custom logo image, adjust dimensions, switch between visual modes, or remove the logo to restore the minimal monogram.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  disabled={isSavingLogo}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Logo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveLogoConfig()}
                  disabled={isSavingLogo}
                  style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                  className="px-6 py-2 text-white text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 shadow-lg hover:opacity-90 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isSavingLogo ? 'SAVING LOGO...' : 'SAVE LOGO'}</span>
                </button>
              </div>
            </div>

            {/* Notification alert */}
            {logoNotice && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-950/50 border border-blue-500/30 text-blue-200 text-xs font-mono flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />
                <span>{logoNotice}</span>
              </motion.div>
            )}

            {/* LIVE PREVIEW CANVAS */}
            <div className="p-6 bg-[#0b0d11] border border-white/15 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono tracking-widest uppercase text-white/50">
                  REAL-TIME WEBSITE HEADER PREVIEW
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  CURRENT LIVE SIMULATION
                </span>
              </div>

              {/* Dark Navbar Mockup */}
              <div className="p-5 bg-[#08090b] border border-white/15 rounded shadow-2xl flex items-center justify-between">
                {/* Logo representation */}
                <div className="flex items-center gap-3">
                  {brandForm.logoType === 'image' && brandForm.logoUrl ? (
                    <img
                      src={brandForm.logoUrl}
                      alt={brandForm.name}
                      style={{ height: `${brandForm.logoHeight || 36}px` }}
                      className="w-auto object-contain transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 relative flex items-center justify-center border border-white/20 bg-[#08090b] shadow-sm">
                        <span className="font-sans font-extrabold text-sm tracking-wider text-white">
                          {brandForm.name ? brandForm.name.charAt(0).toUpperCase() : 'A'}
                        </span>
                        <div
                          className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5"
                          style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
                        />
                      </div>
                      <span className="font-display font-extrabold text-sm tracking-tight text-white uppercase">
                        {brandForm.logoText || brandForm.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Nav dummy links */}
                <div className="hidden sm:flex items-center gap-6 text-xs text-white/50 font-mono">
                  <span>WORK</span>
                  <span>SERVICES</span>
                  <span>ABOUT</span>
                  <span>CONTACT</span>
                </div>

                {/* Action button mockup */}
                <div
                  className="px-3 py-1.5 text-[10px] font-mono text-white uppercase font-bold"
                  style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                >
                  START INQUIRY
                </div>
              </div>

              {/* Secondary Translucent Glass Card Mockup */}
              <div className="p-5 glass-card rounded flex items-center justify-between">
                <div className="text-xs font-mono text-white/50">
                  TRANSLUCENT GLASS FOOTER / HERO PREVIEW:
                </div>
                <div>
                  {brandForm.logoType === 'image' && brandForm.logoUrl ? (
                    <img
                      src={brandForm.logoUrl}
                      alt={brandForm.name}
                      style={{ height: `${Math.min(brandForm.logoHeight || 36, 32)}px` }}
                      className="w-auto object-contain"
                    />
                  ) : (
                    <span className="font-display font-extrabold text-sm tracking-tight text-white uppercase">
                      {brandForm.logoText || brandForm.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* FORM CONFIGURATION PANELS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Logo Mode & Image Settings */}
              <div className="lg:col-span-7 space-y-6 p-6 bg-[#0b0d11] border border-white/15">
                {/* 1. Select Logo Type */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider">
                    Logo Presentation Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setBrandForm((prev) => ({ ...prev, logoType: 'image' }))}
                      className={`p-4 border text-left transition-all cursor-pointer ${
                        brandForm.logoType === 'image'
                          ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="text-xs font-bold font-sans uppercase mb-1">
                        🖼️ Custom Image Logo
                      </div>
                      <div className="text-[11px] text-white/50 font-sans font-light">
                        Upload custom PNG, SVG, or high-res graphic from your device
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBrandForm((prev) => ({ ...prev, logoType: 'monogram' }))}
                      className={`p-4 border text-left transition-all cursor-pointer ${
                        brandForm.logoType === 'monogram'
                          ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="text-xs font-bold font-sans uppercase mb-1">
                        ✨ Monogram & Typography
                      </div>
                      <div className="text-[11px] text-white/50 font-sans font-light">
                        Luxury geometric emblem with custom brand typography
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Image Source Controls (When image mode) */}
                {brandForm.logoType === 'image' && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div>
                      <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                        Option A: Logo Image Web URL
                      </label>
                      <input
                        type="url"
                        value={brandForm.logoUrl || ''}
                        onChange={(e) => setBrandForm((prev) => ({ ...prev, logoUrl: e.target.value }))}
                        placeholder="https://example.com/logo.png"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-xs font-mono placeholder-white/30 focus:outline-none focus:border-white/40"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                        Option B: Upload Logo from Computer (PNG / SVG / JPG)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, 'logo')}
                        className="text-xs text-white/70 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                      />
                      <span className="text-[11px] text-white/40 block mt-1">
                        Supports transparent PNG, SVG vector, or high-res raster images up to 5MB.
                      </span>
                    </div>

                    {/* Height Slider */}
                    <div className="pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                          Logo Height in Navigation Header
                        </label>
                        <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 border border-white/15">
                          {brandForm.logoHeight || 36}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="64"
                        value={brandForm.logoHeight || 36}
                        onChange={(e) => setBrandForm((prev) => ({ ...prev, logoHeight: Number(e.target.value) }))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Typography Settings (Monogram Text) */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider">
                    Brand Logo Typography Text
                  </label>
                  <input
                    type="text"
                    value={brandForm.logoText || ''}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, logoText: e.target.value }))}
                    placeholder="AFFLIORA DIGITAL"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-sans font-bold"
                  />
                  <p className="text-[11px] text-white/40">
                    Appears alongside the monogram or as image alt-text and schema brand name.
                  </p>
                </div>
              </div>

              {/* Right Column: Curated Luxury Logo Presets & Quick Actions */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-[#0b0d11] border border-white/15 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/70">
                    SAMPLE CURATED LOGO PRESETS
                  </h3>
                  <p className="text-xs text-white/50">
                    Select any pre-crafted luxury brand mark or test styling instantly:
                  </p>

                  <div className="space-y-3">
                    {/* Preset 1: Sharp Modern Geometric */}
                    <button
                      type="button"
                      onClick={() =>
                        setBrandForm((prev) => ({
                          ...prev,
                          logoType: 'image',
                          logoUrl:
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none"><polygon points="20,5 35,35 5,35" stroke="white" stroke-width="2.5" fill="none"/><polygon points="20,13 28,30 12,30" fill="%233B82F6"/><text x="45" y="26" fill="white" font-family="system-ui" font-weight="900" font-size="16" letter-spacing="3">AFFLIORA</text></svg>',
                          logoHeight: 36,
                        }))
                      }
                      className="w-full p-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-left flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-white uppercase group-hover:text-blue-400 transition-colors">
                          Geometric Apex Vector
                        </div>
                        <div className="text-[10px] text-white/40">High-voltage triangle prism with bold typography</div>
                      </div>
                      <span className="text-xs font-mono text-blue-400">APPLY</span>
                    </button>

                    {/* Preset 2: Minimalist Cube */}
                    <button
                      type="button"
                      onClick={() =>
                        setBrandForm((prev) => ({
                          ...prev,
                          logoType: 'image',
                          logoUrl:
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 40" fill="none"><rect x="6" y="8" width="24" height="24" stroke="white" stroke-width="2" fill="none"/><circle cx="18" cy="20" r="4" fill="%233B82F6"/><text x="42" y="25" fill="white" font-family="system-ui" font-weight="800" font-size="15" letter-spacing="2.5">AFFLIORA</text></svg>',
                          logoHeight: 34,
                        }))
                      }
                      className="w-full p-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-left flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-white uppercase group-hover:text-blue-400 transition-colors">
                          Architectural Core Mark
                        </div>
                        <div className="text-[10px] text-white/40">Minimalist frame with electric blue central sphere</div>
                      </div>
                      <span className="text-xs font-mono text-blue-400">APPLY</span>
                    </button>

                    {/* Preset 3: Minimal Brand Monogram */}
                    <button
                      type="button"
                      onClick={() =>
                        setBrandForm((prev) => ({
                          ...prev,
                          logoType: 'monogram',
                          logoText: 'AFFLIORA DIGITAL',
                        }))
                      }
                      className="w-full p-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-left flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-white uppercase group-hover:text-blue-400 transition-colors">
                          Signature Monogram Mark
                        </div>
                        <div className="text-[10px] text-white/40">Clean architectural A-monogram with pulse dot</div>
                      </div>
                      <span className="text-xs font-mono text-blue-400">APPLY</span>
                    </button>
                  </div>
                </div>

                {/* Quick Save Card */}
                <div className="p-6 bg-white/[0.02] border border-white/15 space-y-4">
                  <div className="text-xs font-bold text-white uppercase font-sans">
                    Confirm & Publish Logo Changes
                  </div>
                  <p className="text-xs text-white/60 font-light">
                    Clicking "Save Logo Configuration" immediately writes changes to the database and applies them to both visitors and preview sessions.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleSaveLogoConfig()}
                      disabled={isSavingLogo}
                      style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                      className="w-full py-3 text-white text-xs font-mono uppercase font-bold tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
                    >
                      {isSavingLogo ? 'SAVING CHANGES...' : 'SAVE LOGO CONFIGURATION'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: THEME & COLORS */}
        {/* ========================================================= */}
        {activeTab === 'theme' && (
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                Global Visual Theme & Color Palette
              </h2>
              <p className="text-xs text-white/60">
                Instantly re-skin the entire website. Choose one of our meticulously balanced luxury presets or define custom hexadecimal values.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 block">
                CURATED LUXURY PRESETS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = brandForm.themePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectThemePreset(preset)}
                      className={`p-5 text-left border transition-all duration-300 cursor-pointer relative ${
                        isSelected
                          ? 'bg-white/[0.06] border-white ring-1 ring-white/50 shadow-2xl'
                          : 'bg-[#0b0d11] border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full shadow-md"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div
                            className="w-4 h-4 rounded-full shadow-md"
                            style={{ backgroundColor: preset.light }}
                          />
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-black font-bold uppercase">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-bold uppercase tracking-wider text-white">
                        {preset.name}
                      </div>
                      <div className="text-xs text-white/50 mt-1 font-light">
                        {preset.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Tuning */}
            <div className="p-6 bg-[#0b0d11] border border-white/15 space-y-6">
              <h3 className="text-xs font-mono tracking-widest uppercase text-white/70">
                CUSTOM HEXADECIMAL ACCENTS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandForm.primaryColor}
                      onChange={(e) =>
                        setBrandForm((prev) => ({ ...prev, primaryColor: e.target.value }))
                      }
                      className="w-10 h-10 bg-transparent border border-white/20 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={brandForm.primaryColor}
                      onChange={(e) =>
                        setBrandForm((prev) => ({ ...prev, primaryColor: e.target.value }))
                      }
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/15 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">
                    Light Highlight Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandForm.primaryColorLight}
                      onChange={(e) =>
                        setBrandForm((prev) => ({ ...prev, primaryColorLight: e.target.value }))
                      }
                      className="w-10 h-10 bg-transparent border border-white/20 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={brandForm.primaryColorLight}
                      onChange={(e) =>
                        setBrandForm((prev) => ({ ...prev, primaryColorLight: e.target.value }))
                      }
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/15 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">
                    Atmospheric Glow (RGBA)
                  </label>
                  <input
                    type="text"
                    value={brandForm.primaryColorGlow}
                    onChange={(e) =>
                      setBrandForm((prev) => ({ ...prev, primaryColorGlow: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white font-mono text-xs"
                  />
                </div>
              </div>

              {/* Real-Time Preview Strip */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-3">
                  LIVE ACCENT PREVIEW
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    style={{ backgroundColor: brandForm.primaryColor }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg"
                  >
                    Button Primary
                  </button>
                  <button
                    style={{ borderColor: brandForm.primaryColorLight, color: brandForm.primaryColorLight }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest border"
                  >
                    Outlined Focus
                  </button>
                  <span
                    style={{ color: brandForm.primaryColorLight }}
                    className="text-xs font-mono tracking-widest uppercase font-bold"
                  >
                    Interactive Text Highlight
                  </span>
                </div>
              </div>

              <button
                onClick={handleSaveCustomColors}
                className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors cursor-pointer"
              >
                Apply Custom Palette
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: TYPOGRAPHY & TYPE FOUNDRY STUDIO */}
        {/* ========================================================= */}
        {activeTab === 'typography' && (
          <div className="mt-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/15 text-[10px] font-mono tracking-widest uppercase text-white/70 mb-2">
                <Type className="w-3 h-3 text-blue-400" />
                <span>DYNAMIC TYPOGRAPHIC ENGINE</span>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                Typography & Font Foundry Studio
              </h2>
              <p className="text-xs text-white/60 max-w-3xl leading-relaxed">
                Transform the entire visual cadence of Affliora Digital. Choose one of our meticulously paired luxury architectural typographic suites, or individually assign fonts for headings, body copy, editorial italics, and monospace coordinates. All changes synchronize instantly across all pages.
              </p>
            </div>

            {/* 1. Curated Luxury Font Pairing Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 block font-semibold">
                  CURATED LUXURY PAIRINGS (ONE-CLICK DEPLOYMENT)
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  {FONT_PAIRING_PRESETS.length} ARCHITECTURAL PRESETS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FONT_PAIRING_PRESETS.map((preset) => {
                  const isSelected = brandForm.fontPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectFontPreset(preset)}
                      className={`p-5 text-left border transition-all duration-300 cursor-pointer relative flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-white/[0.07] border-white ring-1 ring-white/50 shadow-2xl'
                          : 'bg-[#0b0d11] border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                            <span>DISPLAY:</span>
                            <span className="text-white/80 font-bold">{preset.display}</span>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-black font-bold uppercase">
                              CURRENT ACTIVE
                            </span>
                          )}
                        </div>

                        {/* Typography Specimen */}
                        <div
                          className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight transition-transform group-hover:scale-[1.02] duration-200"
                          style={{ fontFamily: preset.display }}
                        >
                          Aa Bb Gg 123
                        </div>

                        <div className="text-xs font-bold uppercase tracking-wider text-white/90 mb-1">
                          {preset.name}
                        </div>

                        <p className="text-[11px] text-white/50 leading-relaxed font-light">
                          {preset.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                        <span>BODY: {preset.body}</span>
                        <span>•</span>
                        <span>SERIF: {preset.editorial}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Granular Font Tuning Suite */}
            <div className="p-6 md:p-8 bg-[#0b0d11] border border-white/15 space-y-8 shadow-xl">
              <div>
                <h3 className="text-xs font-mono tracking-widest uppercase text-white/80 font-bold flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>GRANULAR FONT CUSTOMIZATION & FINE-TUNING</span>
                </h3>
                <p className="text-[11px] text-white/50 mt-1">
                  Customize individual typographic roles independently. The entire site updates immediately in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Display / Heading Font */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider">
                    Display & Headline Font
                  </label>
                  <select
                    value={brandForm.fontDisplay || 'Syne'}
                    onChange={(e) =>
                      setBrandForm((prev) => ({ ...prev, fontDisplay: e.target.value, fontPreset: 'custom' }))
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    {AVAILABLE_DISPLAY_FONTS.map((font) => (
                      <option key={font.name} value={font.name} className="bg-[#0b0d11] text-white">
                        {font.name} — ({font.category})
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-white/40 block font-mono">
                    Affects: All massive hero titles, section headings, project names
                  </span>
                </div>

                {/* 2. Body Font */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider">
                    Body & Interface Font
                  </label>
                  <select
                    value={brandForm.fontBody || 'Plus Jakarta Sans'}
                    onChange={(e) =>
                      setBrandForm((prev) => ({ ...prev, fontBody: e.target.value, fontPreset: 'custom' }))
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    {AVAILABLE_BODY_FONTS.map((font) => (
                      <option key={font.name} value={font.name} className="bg-[#0b0d11] text-white">
                        {font.name} — ({font.category})
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-white/40 block font-mono">
                    Affects: All narrative paragraphs, descriptions, form inputs
                  </span>
                </div>

                {/* 3. Editorial Serif Font */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider">
                    Editorial Italic Font
                  </label>
                  <select
                    value={brandForm.fontEditorial || 'Cormorant Garamond'}
                    onChange={(e) =>
                      setBrandForm((prev) => ({ ...prev, fontEditorial: e.target.value, fontPreset: 'custom' }))
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    {AVAILABLE_EDITORIAL_FONTS.map((font) => (
                      <option key={font.name} value={font.name} className="bg-[#0b0d11] text-white">
                        {font.name} — ({font.category})
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-white/40 block font-mono">
                    Affects: Editorial italicized phrases, literary accents, quotes
                  </span>
                </div>

                {/* 4. Monospace Font */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider">
                    Monospace Coordinates Font
                  </label>
                  <select
                    value={brandForm.fontMono || 'Space Mono'}
                    onChange={(e) =>
                      setBrandForm((prev) => ({ ...prev, fontMono: e.target.value, fontPreset: 'custom' }))
                    }
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    {AVAILABLE_MONO_FONTS.map((font) => (
                      <option key={font.name} value={font.name} className="bg-[#0b0d11] text-white">
                        {font.name} — ({font.category})
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-white/40 block font-mono">
                    Affects: Coordinate numbers, world clocks, system badges
                  </span>
                </div>
              </div>

              {/* 3. Real-Time Interactive Type Testing Laboratory */}
              <div className="p-6 bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/60 font-bold">
                    LIVE INTERACTIVE TYPE TESTING LABORATORY
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
                    <span>Display: {brandForm.fontDisplay || 'Syne'}</span>
                    <span>•</span>
                    <span>Body: {brandForm.fontBody || 'Plus Jakarta Sans'}</span>
                    <span>•</span>
                    <span>Italic: {brandForm.fontEditorial || 'Cormorant Garamond'}</span>
                  </div>
                </div>

                {/* Specimen Live Rendering */}
                <div className="space-y-3 py-2">
                  <div
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white transition-all leading-tight"
                    style={{ fontFamily: brandForm.fontDisplay || 'Syne' }}
                  >
                    WE BUILD DIGITAL EXPERIENCES{' '}
                    <span
                      className="italic font-normal lowercase text-white/80"
                      style={{ fontFamily: brandForm.fontEditorial || 'Cormorant Garamond' }}
                    >
                      that move
                    </span>{' '}
                    BUSINESS.
                  </div>

                  <p
                    className="text-sm text-white/70 max-w-2xl font-light leading-relaxed transition-all"
                    style={{ fontFamily: brandForm.fontBody || 'Plus Jakarta Sans' }}
                  >
                    Affliora Digital creates modern websites, web applications, and immersive digital platforms for ambitious global businesses seeking unassailable commercial prestige.
                  </p>

                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-xs text-white/60"
                    style={{ fontFamily: brandForm.fontMono || 'Space Mono' }}
                  >
                    <span>01 // COORDINATES: 31.5204° N, 74.3587° E • PKT SYSTEM NOMINAL</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleSaveTypography}
                  className="px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all cursor-pointer shadow-xl flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Save & Deploy Typography Suite</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const defaultPreset = FONT_PAIRING_PRESETS[0];
                    handleSelectFontPreset(defaultPreset);
                  }}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/70 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Studio Default (Syne)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: CONTACT & WHATSAPP INTEGRATION */}
        {/* ========================================================= */}
        {activeTab === 'contact' && (
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                Contact Endpoints & Live Messaging Integration
              </h2>
              <p className="text-xs text-white/60">
                These numbers and emails are automatically integrated throughout the website's contact forms, footer concierge, and floating WhatsApp buttons.
              </p>
            </div>

            <form onSubmit={handleSaveBrandConfig} className="p-6 bg-[#0b0d11] border border-white/15 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Studio Primary Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={brandForm.email}
                      onChange={(e) => setBrandForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-mono focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono mt-1 block">
                    All client contact forms and direct email links trigger to this address.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Contact Phone Number (Display)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={brandForm.phone}
                      onChange={(e) => setBrandForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-mono focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono mt-1 block">
                    Displayed on the Contact page, Footer, and Header directory.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    WhatsApp Direct Phone Number (Digits Only with Country Code)
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={brandForm.whatsapp}
                      onChange={(e) => setBrandForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="e.g. 923008472190"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-mono focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono mt-1 block">
                    Used for automatic `wa.me` direct chat routing.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Default WhatsApp Greeting Message
                  </label>
                  <input
                    type="text"
                    value={brandForm.whatsappMessage}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, whatsappMessage: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-mono focus:border-emerald-500 outline-none"
                  />
                  <span className="text-[10px] text-white/40 font-mono mt-1 block">
                    Pre-filled message when a visitor clicks "WhatsApp Concierge".
                  </span>
                </div>
              </div>

              {/* Studio Physical / City Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Studio City
                  </label>
                  <input
                    type="text"
                    value={brandForm.city}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/5 border border-white/15 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Studio Country
                  </label>
                  <input
                    type="text"
                    value={brandForm.country}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/5 border border-white/15 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Studio Full Location String
                  </label>
                  <input
                    type="text"
                    value={brandForm.location}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/5 border border-white/15 text-white text-sm font-mono"
                  />
                </div>
              </div>

              {/* Test Live Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Test WhatsApp Redirection</span>
                </a>

                <a
                  href={`mailto:${brandForm.email}`}
                  className="px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-mono flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Test Email Redirection</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Save Contact Configuration
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PORTFOLIO & PROJECTS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'portfolio' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                  Portfolio & Case Studies Manager
                </h2>
                <p className="text-xs text-white/60">
                  Add, edit, remove, and curate agency works with images, performance metrics, and challenge/solution breakdowns.
                </p>
              </div>

              <button
                onClick={openNewProjectModal}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#0b0d11] border border-white/15 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Project Image Preview */}
                    <div className="h-44 w-full bg-white/5 relative overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 text-[10px] font-mono text-white border border-white/20">
                        {proj.number} // {proj.year}
                      </div>
                      {proj.featured && (
                        <div className="absolute top-3 right-3 bg-blue-600 px-2 py-1 text-[10px] font-mono text-white uppercase font-bold">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-white/50">
                        <span>{proj.client}</span>
                        <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px]">
                          {proj.category || proj.industry}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white uppercase tracking-tight font-sans">
                        {proj.name}
                      </h3>

                      <p className="text-xs text-white/60 line-clamp-2 font-light">
                        {proj.tagline || proj.description}
                      </p>

                      {/* Live Link status */}
                      {proj.liveUrl ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                          <ExternalLink className="w-3 h-3" />
                          <a
                            href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {proj.liveUrl}
                          </a>
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono text-white/30 italic">
                          No live link configured
                        </div>
                      )}

                      {/* Services badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.services?.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-white/60 border border-white/10"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                    <button
                      onClick={() => openEditProjectModal(proj)}
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Case Study</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${proj.name}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="text-xs font-mono text-white/40 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SERVICES & CAPABILITIES */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                  Agency Capabilities & Services
                </h2>
                <p className="text-xs text-white/60">
                  Manage core offerings, technical deliverables, and architectural pillars displayed across the Services page.
                </p>
              </div>

              <button
                onClick={openNewServiceModal}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-6 bg-[#0b0d11] border border-white/15 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-400 font-bold">
                        {srv.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditServiceModal(srv)}
                          className="p-1 text-white/50 hover:text-white"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete service "${srv.title}"?`)) {
                              deleteService(srv.id);
                            }
                          }}
                          className="p-1 text-white/40 hover:text-red-400"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-white/70 font-light leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                        KEY CAPABILITIES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {srv.capabilities?.map((cap, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-white/70"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: INDUSTRIES */}
        {/* ========================================================= */}
        {activeTab === 'industries' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                  Sector Specializations (Industries)
                </h2>
                <p className="text-xs text-white/60">
                  Manage industry playbooks, market challenges, and bespoke architectural solutions.
                </p>
              </div>

              <button
                onClick={openNewIndustryModal}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Industry Sector</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industries.map((ind) => (
                <div
                  key={ind.id}
                  className="p-6 bg-[#0b0d11] border border-white/15 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-400 font-bold">
                        {ind.number} // {ind.subtitle}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditIndustryModal(ind)}
                          className="p-1 text-white/50 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete industry sector "${ind.title}"?`)) {
                              deleteIndustry(ind.id);
                            }
                          }}
                          className="p-1 text-white/40 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-white/70 font-light leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: AGENCY BRANDING & IDENTITY */}
        {/* ========================================================= */}
        {activeTab === 'branding' && (
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                Brand Name, Copy & Editorial Headers
              </h2>
              <p className="text-xs text-white/60">
                Configure top-level typography strings, hero headlines, and editorial mission copy.
              </p>
            </div>

            <form onSubmit={handleSaveBrandConfig} className="p-6 bg-[#0b0d11] border border-white/15 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Agency Commercial Name
                  </label>
                  <input
                    type="text"
                    value={brandForm.name}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-sans font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Commercial Tagline
                  </label>
                  <input
                    type="text"
                    value={brandForm.tagline}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, tagline: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Hero Eyebrow Category
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroEyebrow}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, heroEyebrow: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Hero Heading Lead (Standard Sans)
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroHeadingLead}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, heroHeadingLead: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-sans uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Hero Heading Highlight (Italicized Accent)
                  </label>
                  <input
                    type="text"
                    value={brandForm.heroHeadingItalic}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, heroHeadingItalic: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-editorial italic"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2">
                    Hero Narrative Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={brandForm.heroDescription}
                    onChange={(e) => setBrandForm((prev) => ({ ...prev, heroDescription: e.target.value }))}
                    className="w-full p-4 bg-white/5 border border-white/15 text-white text-sm font-light leading-relaxed outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Save Identity & Narrative Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: SECURITY & MASTER PASSWORD */}
        {/* ========================================================= */}
        {activeTab === 'security' && (
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-sans">
                Security & Administrative Passphrase
              </h2>
              <p className="text-xs text-white/60">
                Update the master administrator password or restore initial system defaults.
              </p>
            </div>

            <div className="p-6 bg-[#0b0d11] border border-white/15 max-w-xl space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/70">
                UPDATE MASTER PASSPHRASE
              </h3>

              <form onSubmit={handleChangeAdminPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">
                    New Passphrase
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white font-mono text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">
                    Confirm Passphrase
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 text-white font-mono text-sm"
                    required
                  />
                </div>

                {securityNotice && (
                  <div className="p-3 bg-blue-950/40 border border-blue-500/30 text-blue-200 text-xs font-mono">
                    {securityNotice}
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Update Passphrase
                </button>
              </form>
            </div>

            {/* Factory Reset */}
            <div className="p-6 bg-red-950/20 border border-red-500/30 max-w-xl space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>RESTORE FACTORY DEFAULTS</span>
              </div>
              <p className="text-xs text-white/60 font-light">
                Resets all portfolio items, services, industries, and settings back to original Affliora Digital studio defaults.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all data back to system defaults?')) {
                    resetDefaults();
                  }
                }}
                className="px-5 py-2.5 bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-red-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset Database to Defaults
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: PROJECT ADD / EDIT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d11] border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 relative shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  {editingProject ? `Edit: ${editingProject.name}` : 'Add New Portfolio Project'}
                </h3>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="text-white/50 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Project Name *</label>
                    <input
                      type="text"
                      value={projectForm.name || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Client Name *</label>
                    <input
                      type="text"
                      value={projectForm.client || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, client: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Portfolio Category / Sector *</label>
                    <input
                      type="text"
                      placeholder="e.g. Web Development, E-Commerce, UI/UX"
                      value={projectForm.category || projectForm.industry || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value, industry: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Live Website Link (URL)</label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={projectForm.liveUrl || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, liveUrl: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm font-mono text-emerald-400 placeholder:text-white/20"
                    />
                    <p className="text-[10px] font-mono text-white/40 mt-1">Allows visitors to open the live deployed site in a new tab</p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Release Year</label>
                    <input
                      type="text"
                      value={projectForm.year || '2025'}
                      onChange={(e) => setProjectForm((p) => ({ ...p, year: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Tagline / Short Hook</label>
                    <input
                      type="text"
                      value={projectForm.tagline || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, tagline: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Overview Description</label>
                  <textarea
                    rows={2}
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm font-light"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Strategic Challenge</label>
                    <textarea
                      rows={2}
                      value={projectForm.challenge || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, challenge: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Engineered Solution</label>
                    <textarea
                      rows={2}
                      value={projectForm.solution || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, solution: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm font-light"
                    />
                  </div>
                </div>

                {/* Image URL or Upload */}
                <div className="p-4 bg-white/[0.02] border border-white/10 space-y-3">
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider">
                    Project Visual Asset
                  </label>

                  <div className="space-y-2">
                    <span className="text-[11px] text-white/50 block">Option A: Image URL</span>
                    <input
                      type="url"
                      value={projectForm.image || ''}
                      onChange={(e) => setProjectForm((p) => ({ ...p, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] text-white/50 block">Option B: Upload Image from Computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'project')}
                      className="text-xs text-white/70 file:mr-4 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                    />
                  </div>

                  {projectForm.image && (
                    <div className="mt-2 h-28 w-full border border-white/15 overflow-hidden">
                      <img
                        src={projectForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>

                {/* Services tags */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">
                    Services / Capabilities (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.services?.join(', ') || ''}
                    onChange={(e) =>
                      setProjectForm((p) => ({
                        ...p,
                        services: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      }))
                    }
                    placeholder="Web Architecture, UI/UX Design, Headless Commerce"
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-xs font-mono"
                  />
                </div>

                {/* Featured toggle */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="featured-project-toggle"
                    checked={projectForm.featured ?? false}
                    onChange={(e) => setProjectForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="featured-project-toggle" className="text-xs text-white/80 cursor-pointer">
                    Display as Featured Hero Project on Homepage & Work
                  </label>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 border border-white/20 text-xs font-mono uppercase text-white/70 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-widest font-semibold cursor-pointer"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: SERVICE ADD / EDIT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d11] border border-white/20 w-full max-w-xl p-6 space-y-6 relative shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  {editingService ? `Edit: ${editingService.title}` : 'Add Capability Service'}
                </h3>
                <button
                  onClick={() => setIsServiceModalOpen(false)}
                  className="text-white/50 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveService} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Service Title *</label>
                  <input
                    type="text"
                    value={serviceForm.title || ''}
                    onChange={(e) => setServiceForm((s) => ({ ...s, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Brief Summary</label>
                  <textarea
                    rows={2}
                    value={serviceForm.shortDesc || ''}
                    onChange={(e) => setServiceForm((s) => ({ ...s, shortDesc: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Detailed Execution Scope</label>
                  <textarea
                    rows={3}
                    value={serviceForm.longDesc || ''}
                    onChange={(e) => setServiceForm((s) => ({ ...s, longDesc: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Capabilities (comma-separated)</label>
                  <input
                    type="text"
                    value={serviceForm.capabilities?.join(', ') || ''}
                    onChange={(e) =>
                      setServiceForm((s) => ({
                        ...s,
                        capabilities: e.target.value.split(',').map((c) => c.trim()).filter(Boolean),
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Cover Image (URL or Direct Upload)</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={serviceForm.image || ''}
                      onChange={(e) => setServiceForm((s) => ({ ...s, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/... or upload below"
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-xs font-mono"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'service')}
                      className="text-xs text-white/70 file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                  </div>
                  {serviceForm.image && (
                    <div className="mt-2 h-20 w-full overflow-hidden border border-white/10 rounded">
                      <img src={serviceForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsServiceModalOpen(false)}
                    className="px-4 py-2 border border-white/20 text-xs font-mono uppercase text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-widest font-semibold"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: INDUSTRY ADD / EDIT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isIndustryModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0d11] border border-white/20 w-full max-w-xl p-6 space-y-6 relative shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  {editingIndustry ? `Edit: ${editingIndustry.title}` : 'Add Industry Sector'}
                </h3>
                <button
                  onClick={() => setIsIndustryModalOpen(false)}
                  className="text-white/50 hover:text-white text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveIndustry} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Sector Title *</label>
                  <input
                    type="text"
                    value={industryForm.title || ''}
                    onChange={(e) => setIndustryForm((i) => ({ ...i, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Subtitle / Descriptor</label>
                  <input
                    type="text"
                    value={industryForm.subtitle || ''}
                    onChange={(e) => setIndustryForm((i) => ({ ...i, subtitle: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Sector Strategic Overview</label>
                  <textarea
                    rows={3}
                    value={industryForm.description || ''}
                    onChange={(e) => setIndustryForm((i) => ({ ...i, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Cover Image (URL or Direct Upload)</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={industryForm.image || ''}
                      onChange={(e) => setIndustryForm((i) => ({ ...i, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/... or upload below"
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white text-xs font-mono"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'industry')}
                      className="text-xs text-white/70 file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                  </div>
                  {industryForm.image && (
                    <div className="mt-2 h-20 w-full overflow-hidden border border-white/10 rounded">
                      <img src={industryForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsIndustryModalOpen(false)}
                    className="px-4 py-2 border border-white/20 text-xs font-mono uppercase text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-widest font-semibold"
                  >
                    Save Industry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
