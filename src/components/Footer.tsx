import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  MessageSquare,
  Mail,
  MapPin,
  Shield,
  Lock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Globe2,
  Sparkles,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { config, getWhatsAppUrl, getMailtoUrl, isAdmin, submitInquiry } = useSite();

  // World Clocks State
  const [lahoreTime, setLahoreTime] = useState<string>('');
  const [londonTime, setLondonTime] = useState<string>('');
  const [newYorkTime, setNewYorkTime] = useState<string>('');
  const [dubaiTime, setDubaiTime] = useState<string>('');

  // Newsletter form state
  const [quickEmail, setQuickEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const updateWorldClocks = () => {
      const now = new Date();

      const formatClock = (tz: string) => {
        try {
          return new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(now);
        } catch {
          return now.toLocaleTimeString();
        }
      };

      setLahoreTime(formatClock('Asia/Karachi'));
      setDubaiTime(formatClock('Asia/Dubai'));
      setLondonTime(formatClock('Europe/London'));
      setNewYorkTime(formatClock('America/New_York'));
    };

    updateWorldClocks();
    const interval = setInterval(updateWorldClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email || 'afflioradigital@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleQuickSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail || !quickEmail.includes('@')) return;
    setIsSubmitting(true);
    await submitInquiry({
      name: 'Executive Subscriber',
      email: quickEmail,
      phone: '',
      company: 'Studio Dispatch Subscriber',
      projectType: 'Architectural Intelligence Briefing',
      budget: 'N/A',
      timeline: 'Immediate',
      message: 'Subscribed to Affliora Digital studio dispatch briefing.',
    });
    setIsSubmitting(false);
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setQuickEmail('');
    }, 4000);
  };

  const accentColor = config.primaryColorLight || '#3B82F6';
  const brandPrimary = config.primaryColor || '#2563EB';

  return (
    <footer
      id="agency-footer"
      className="relative bg-[#000000] text-white border-t border-white/15 pt-20 md:pt-28 pb-12 overflow-hidden select-none"
    >
      {/* 1. Atmospheric Ambient Lighting Glows */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20 transition-colors duration-700"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="absolute bottom-10 left-1/6 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-15 transition-colors duration-700"
        style={{ backgroundColor: brandPrimary }}
      />

      {/* 2. Massive Architectural Background Brand Watermark */}
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
        <span
          className="text-[14vw] font-display font-extrabold uppercase tracking-tight text-white whitespace-nowrap leading-none"
          style={{ letterSpacing: '-0.04em' }}
        >
          {config.logoText || config.name || 'AFFLIORA'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* ========================================================= */}
        {/* ROW 1: LIVE STUDIO RADAR & WORLD CLOCKS */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-16 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: accentColor }}
              />
            </span>
            <span className="tracking-widest uppercase text-white/80 font-semibold">
              SYSTEMS NOMINAL // ACCEPTING SELECT COMMISSIONS
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/50">
            <div className="flex items-center gap-2">
              <span className="text-white/30">LHR:</span>
              <span className="text-white/90 font-medium">{lahoreTime || '05:30:00 PM'} PKT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/30">DXB:</span>
              <span className="text-white/80 font-medium">{dubaiTime || '04:30:00 PM'} GST</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-white/30">LDN:</span>
              <span className="text-white/80">{londonTime || '12:30:00 PM'} GMT</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-white/30">NYC:</span>
              <span className="text-white/80">{newYorkTime || '07:30:00 AM'} EST</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 2: MASSIVE EDITORIAL CALL TO ACTION (ARCHITECTURAL GLASS) */}
        {/* ========================================================= */}
        <div className="pb-20 md:pb-28 border-b border-white/10">
          <div className="relative p-8 sm:p-12 md:p-16 border border-white/15 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Subtle atmospheric interior radial light */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
              style={{ backgroundColor: brandPrimary }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/[0.06] backdrop-blur-md border border-white/20 text-[11px] font-mono tracking-[0.25em] uppercase">
                  <Sparkles className="w-3 h-3 text-white" style={{ color: accentColor }} />
                  <span className="text-white/90">HIGH-CRAFT DIGITAL FLAGSHIPS</span>
                </div>

                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white font-display leading-[0.92]">
                  LET’S BUILD <br />
                  <span className="font-editorial italic font-normal text-white/90 lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
                    something
                  </span>{' '}
                  EXTRAORDINARY.
                </h2>

                <p className="text-white/65 text-sm md:text-base max-w-2xl font-light font-sans leading-relaxed">
                  Partner with our engineering and design studio to architect an authoritative web presence that commands market respect, accelerates enterprise velocity, and outclasses competition.
                </p>
              </div>

              {/* Magnetic Action Group */}
              <div className="lg:col-span-4 flex flex-col gap-3.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="footer-initiate-commission-btn"
                  onClick={() => handleNav('contact')}
                  style={{
                    backgroundColor: brandPrimary,
                    boxShadow: `0 14px 38px ${config.primaryColorGlow || 'rgba(37, 99, 235, 0.4)'}`,
                  }}
                  className="group w-full py-4.5 px-6 text-white text-xs md:text-sm uppercase tracking-[0.2em] font-bold flex items-center justify-between transition-all duration-300 cursor-pointer border border-white/20 shadow-xl"
                >
                  <span>INITIATE COMMISSION</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  id="footer-whatsapp-concierge-btn"
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-3.5 px-6 bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl text-white/90 hover:text-white border border-white/20 text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-between transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WHATSAPP EXECUTIVE CONCIERGE</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                </motion.a>

                <div className="flex items-center justify-between px-2 pt-1 text-[11px] font-mono text-white/40">
                  <span>ESTIMATED RESPONSE: &lt; 2 HOURS</span>
                  <span className="text-white/20">•</span>
                  <span>CONFIDENTIALITY GUARANTEED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 3: BENTO COLUMNS (BRAND, DIRECTORY, DISCIPLINE, CONTACT) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 py-16 border-b border-white/10">
          {/* Column 1: Studio Identity & Newsletter (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3.5 text-left focus:outline-none cursor-pointer group"
            >
              {config.logoUrl && config.logoType === 'image' ? (
                <img
                  src={config.logoUrl}
                  alt={config.name || 'Affliora Digital'}
                  style={{ height: `${config.logoHeight || 36}px` }}
                  className="object-contain max-w-[220px] filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative flex items-center justify-center border border-white/25 bg-white/[0.04] backdrop-blur-md transition-colors group-hover:border-white/50 shadow-inner">
                    <span className="font-display font-bold text-base tracking-wider text-white">
                      {config.logoText ? config.logoText.charAt(0) : config.name ? config.name.charAt(0) : 'A'}
                    </span>
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-2 h-2 shadow-[0_0_8px_#3B82F6]"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                  <span className="font-display font-bold text-base md:text-lg tracking-[0.2em] text-white uppercase group-hover:text-white/90">
                    {config.logoText || config.name || 'AFFLIORA DIGITAL'}
                  </span>
                </div>
              )}
            </button>

            <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed max-w-sm font-sans">
              {config.tagline || 'We build digital experiences that move business.'} Engineering bespoke digital flagships, high-velocity web platforms, and authoritative brand identities for global leaders.
            </p>

            {/* Studio Location & Status Badge */}
            <div className="flex items-center gap-3 text-xs font-mono text-white/70 border border-white/15 bg-white/[0.03] backdrop-blur-md px-4 py-2.5 max-w-sm shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" style={{ color: accentColor }} />
              <span>31.5204° N, 74.3587° E • {config.city || 'Lahore'}, PK</span>
            </div>

            {/* Executive Newsletter Dispatch */}
            <div className="pt-2">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/50 block mb-2 font-semibold">
                ARCHITECTURAL DISPATCH & BRIEFINGS
              </span>
              <form onSubmit={handleQuickSubscribe} className="flex items-center max-w-sm bg-white/[0.03] border border-white/15 p-1 backdrop-blur-md transition-all focus-within:border-white/40">
                <input
                  type="email"
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  placeholder="Enter executive email..."
                  className="bg-transparent px-3.5 py-2 text-xs text-white placeholder-white/35 focus:outline-none flex-1 font-mono"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || subscribed}
                  className="px-4 py-2 text-white text-xs font-mono uppercase transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 font-bold"
                  style={{ backgroundColor: subscribed ? '#10B981' : brandPrimary }}
                >
                  {subscribed ? (
                    <>
                      <span>CONFIRMED</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>JOIN</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Spatial Directory (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase block font-bold"
              style={{ color: accentColor }}
            >
              SPATIAL DIRECTORY
            </span>
            <ul className="space-y-3 text-xs tracking-[0.16em] uppercase text-white/70 font-mono">
              {[
                { id: 'home' as PageId, label: '01 // Home Overview' },
                { id: 'about' as PageId, label: '02 // Agency Heritage' },
                { id: 'services' as PageId, label: '03 // Services Matrix' },
                { id: 'work' as PageId, label: '04 // Selected Work' },
                { id: 'industries' as PageId, label: '05 // Industry Sectors' },
                { id: 'process' as PageId, label: '06 // Five-Stage Protocol' },
                { id: 'contact' as PageId, label: '07 // Direct Scoping' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="hover:text-white transition-all cursor-pointer text-left hover:translate-x-1.5 inline-block transform duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-white text-white/50 transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  {isAdmin ? <Shield className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-white/40" />}
                  <span>08 // Administrative Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Disciplines & Craft Standards (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase block font-bold"
              style={{ color: accentColor }}
            >
              CRAFT DISCIPLINES
            </span>
            <ul className="space-y-2.5 text-xs text-white/60 font-light font-sans">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>Bespoke Web Flagships & Design</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>React 19 & Next-Gen TypeScript</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>Sub-Second Speeds (0.8s Vitals)</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>Kinetic Physics & WebGL Canvases</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>Headless Luxury Commerce</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>Enterprise AI Operational Automation</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>Zero Generic Templates Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Scoping Direct Line (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase block font-bold"
              style={{ color: accentColor }}
            >
              STUDIO CONTACT
            </span>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                  OFFICIAL DISPATCH
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={getMailtoUrl()}
                    className="text-white/90 hover:text-white transition-colors break-all font-mono"
                  >
                    {config.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {config.phone && (
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                    DIRECT VOICE / CELL
                  </span>
                  <a
                    href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-white/80 hover:text-white transition-colors font-mono"
                  >
                    {config.phone}
                  </a>
                </div>
              )}

              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                  OFFICE LOCATION
                </span>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  {config.location || `${config.city}, ${config.country}`}
                </p>
                <p className="text-[10px] text-white/40 mt-0.5">
                  Strategic workshops & global commissions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 4: FINAL ANCHOR BAR (COPYRIGHT, SOCIAL, BACK TO TOP) */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-6">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {config.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline">HIGH-CRAFT PRODUCTION READY</span>
          </div>

          {/* Social Platforms */}
          <div className="flex items-center gap-4 text-white/60">
            {['LinkedIn', 'GitHub', 'X / Twitter', 'Instagram', 'Dribbble'].map((net) => (
              <a
                key={net}
                href={
                  net === 'LinkedIn'
                    ? 'https://linkedin.com'
                    : net === 'GitHub'
                    ? 'https://github.com'
                    : net === 'Instagram'
                    ? 'https://instagram.com'
                    : '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                {net}
              </a>
            ))}
          </div>

          {/* Back to Top Floating Trigger */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-1.5 transition-all cursor-pointer shadow-sm group"
          >
            <span className="tracking-widest uppercase text-[10px]">BACK TO TOP</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
