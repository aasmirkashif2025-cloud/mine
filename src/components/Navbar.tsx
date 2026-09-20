import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowUpRight, Shield, Lock, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string; number: string }[] = [
  { id: 'home', label: 'HOME', number: '01' },
  { id: 'about', label: 'ABOUT', number: '02' },
  { id: 'services', label: 'SERVICES', number: '03' },
  { id: 'work', label: 'WORK', number: '04' },
  { id: 'industries', label: 'INDUSTRIES', number: '05' },
  { id: 'process', label: 'PROCESS', number: '06' },
  { id: 'contact', label: 'CONTACT', number: '07' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { config, isAdmin } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(() => sound.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  const handleNavClick = (page: PageId) => {
    sound.playClick();
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050608]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Monogram & Name / Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
            aria-label={`${config.name} Home`}
          >
            {config.logoUrl && config.logoType === 'image' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center"
              >
                <img
                  src={config.logoUrl}
                  alt={config.name || 'Affliora Digital Logo'}
                  style={{ height: `${config.logoHeight || 36}px` }}
                  className="object-contain max-w-[220px] filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                />
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center gap-3.5"
              >
                {/* Elegant Minimal Monogram */}
                <div className="w-8 h-8 relative flex items-center justify-center border border-white/20 bg-white/[0.04] backdrop-blur-md transition-colors group-hover:border-white/40 shadow-inner">
                  <span className="font-display font-bold text-sm tracking-wider text-white transition-colors">
                    {config.logoText ? config.logoText.charAt(0) : (config.name ? config.name.charAt(0) : 'A')}
                  </span>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 shadow-[0_0_8px_var(--color-primary-light,#3b82f6)]"
                    style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
                  />
                </div>

                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-sm md:text-base tracking-[0.2em] text-white uppercase transition-colors group-hover:text-white/90">
                    {config.logoText || config.name || 'AFFLIORA DIGITAL'}
                  </span>
                </div>
              </motion.div>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative py-1.5 transition-colors duration-200 cursor-pointer focus:outline-none ${
                    isActive ? 'text-white font-semibold' : 'hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px]"
                      style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Admin Portal link in desktop navigation */}
            <button
              id="nav-link-admin"
              onClick={() => handleNavClick('admin')}
              onMouseEnter={() => sound.playHover()}
              className={`relative py-1.5 transition-colors duration-200 cursor-pointer focus:outline-none flex items-center gap-1.5 ${
                currentPage === 'admin' ? 'text-white' : 'hover:text-white text-white/50'
              }`}
              title="Admin Portal"
            >
              {isAdmin ? (
                <Shield className="w-3 h-3 text-emerald-400" />
              ) : (
                <Lock className="w-3 h-3 text-white/40" />
              )}
              <span>ADMIN</span>
            </button>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="navbar-sound-toggle-btn"
              onClick={handleToggleSound}
              onMouseEnter={() => sound.playHover()}
              className="p-2 border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.06] text-white/50 hover:text-white transition-all cursor-pointer"
              title={soundActive ? 'Sound FX Active (Click to mute)' : 'Sound FX Muted (Click to enable)'}
              aria-label="Toggle Sound Effects"
            >
              {soundActive ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
              )}
            </button>
            <button
              id="desktop-start-project-btn"
              onClick={() => handleNavClick('contact')}
              onMouseEnter={() => sound.playHover()}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-white border hover:border-white hover:bg-white/5 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              />
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Actions */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Quick sound toggle on mobile */}
            <button
              onClick={handleToggleSound}
              className="p-1.5 border border-white/10 bg-white/5 text-white/60"
              aria-label="Toggle Sound"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-white/40" />}
            </button>
            <button
              id="mobile-start-project-quick"
              onClick={() => handleNavClick('contact')}
              className="px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-white border border-white/20 bg-white/5"
            >
              PROJECT
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-white hover:text-white/80 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Subtle thin horizontal divider line */}
        <div className="w-full h-[1px] bg-white/[0.08] mt-4 md:mt-5" />
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#08090b]/98 backdrop-blur-2xl flex flex-col justify-between px-8 pt-28 pb-12 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              <span
                className="text-[10px] uppercase font-mono tracking-[0.25em]"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              >
                NAVIGATION DIRECTORY
              </span>

              <nav className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.id)}
                      className="flex items-center justify-between text-left py-2 border-b border-white/10 group cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="text-xs font-mono"
                          style={{ color: config.primaryColorLight || '#3B82F6' }}
                        >
                          {item.number}
                        </span>
                        <span
                          className={`text-2xl font-bold tracking-tight uppercase ${
                            isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    </motion.button>
                  );
                })}

                {/* Admin Mobile Link */}
                <motion.button
                  id="mobile-nav-admin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center justify-between text-left py-2 border-b border-white/10 group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-emerald-400">08</span>
                    <span className="text-2xl font-bold tracking-tight uppercase text-white/60 group-hover:text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <span>ADMIN CMS</span>
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </motion.button>
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <button
                id="mobile-menu-cta-project"
                onClick={() => handleNavClick('contact')}
                style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                className="w-full py-3.5 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-white/50 pt-2 font-mono">
                <span>{config.city}, {config.country}</span>
                <a
                  href={`mailto:${config.email}`}
                  className="text-white hover:underline transition-colors"
                >
                  {config.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
