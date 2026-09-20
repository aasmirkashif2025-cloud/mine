import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Mail, Shield, ChevronUp, ChevronDown, X, Phone, Lock } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { PageId } from '../types';

interface FloatingConciergeProps {
  onNavigate: (page: PageId) => void;
  currentPage: PageId;
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({ onNavigate, currentPage }) => {
  const { config, getWhatsAppUrl, getMailtoUrl, isAdmin } = useSite();
  const [isOpen, setIsOpen] = useState(false);

  // If on admin page, don't show the concierge widget
  if (currentPage === 'admin') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 bg-[#090b0e]/95 backdrop-blur-xl border border-white/20 p-4 shadow-2xl space-y-3 text-white"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/70">
                  STUDIO CONCIERGE
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
                aria-label="Close concierge"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-white/60 font-light leading-relaxed">
              Connect directly with {config.name} executive partners via direct encrypted channels:
            </p>

            {/* Direct WhatsApp Action */}
            <a
              id="concierge-direct-whatsapp"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-2.5 bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-xs font-mono text-emerald-300 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold uppercase tracking-wider">Direct WhatsApp</span>
              </div>
              <span className="text-[10px] text-emerald-400/80 group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            {/* Direct Email Action */}
            <a
              id="concierge-direct-email"
              href={getMailtoUrl()}
              className="group flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="font-semibold uppercase tracking-wider">Direct Email</span>
              </div>
              <span className="text-[10px] text-white/50 group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            {/* Admin Portal Shortcut */}
            <button
              id="concierge-admin-portal"
              onClick={() => {
                setIsOpen(false);
                onNavigate('admin');
              }}
              className="w-full flex items-center justify-between p-2 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-colors border-t border-white/10 pt-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <Shield className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Lock className="w-3 h-3 text-white/40" />
                )}
                <span>{isAdmin ? 'Admin Dashboard (Active)' : 'Admin Control Panel'}</span>
              </div>
              <span>⚙</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        id="concierge-toggle-trigger"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: config.primaryColor || '#2563EB',
          boxShadow: `0 8px 30px ${config.primaryColorGlow || 'rgba(37, 99, 235, 0.4)'}`,
        }}
        className="px-4 py-3 text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2.5 border border-white/25 transition-colors cursor-pointer"
        aria-label="Toggle Studio Concierge"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold">STUDIO CONNECT</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </motion.button>
    </div>
  );
};
