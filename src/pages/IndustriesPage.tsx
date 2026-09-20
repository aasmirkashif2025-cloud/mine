import React, { useState } from 'react';
import { PageId } from '../types';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  const { industries, config } = useSite();
  const [expandedIndustry, setExpandedIndustry] = useState<string>(industries[0]?.id || '');

  const toggleIndustry = (id: string) => {
    setExpandedIndustry(expandedIndustry === id ? '' : id);
  };

  return (
    <div id="industries-page" className="relative w-full bg-[#08090b] text-[#e2e4e9] pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* Ambient Floating Glass Glows */}
      <div
        className="absolute top-32 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 animate-float"
        style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-15 animate-float-delayed"
        style={{ backgroundColor: config.primaryColor || '#2563EB' }}
      />

      {/* 1. Header with Staggered Entrance */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 border-b border-white/10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: config.primaryColorLight || '#3B82F6' }}
          >
            05
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
            SECTOR INTELLIGENCE
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight text-white font-display leading-[0.95]"
          >
            INDUSTRIES <br />
            WE ELEVATE.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-2xl font-sans"
          >
            We reject the idea that one generic template works for every business. Each sector operates under distinct buyer psychological triggers, operational bottlenecks, and trust markers.
          </motion.p>
        </div>
      </section>

      {/* 2. Industries Interactive Playbooks with High-Resolution Photography */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 relative z-10">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {industries.map((ind, idx) => {
            const isExpanded = expandedIndustry === ind.id;
            return (
              <motion.div
                key={ind.id}
                id={`industry-accordion-${ind.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  type: 'spring',
                  bounce: 0.25,
                  duration: 0.8,
                  delay: idx * 0.06,
                }}
                className={`transition-all duration-300 ${
                  isExpanded ? 'bg-white/[0.04] backdrop-blur-xl' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleIndustry(ind.id)}
                  className="w-full py-6 md:py-8 px-4 md:px-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                >
                  <div className="flex items-center gap-5 md:gap-8 md:w-3/4">
                    <span
                      className="font-mono text-sm md:text-base font-semibold shrink-0"
                      style={{ color: config.primaryColorLight || '#3B82F6' }}
                    >
                      {ind.number}
                    </span>

                    {/* Sector Preview Thumbnail */}
                    {ind.image && (
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded overflow-hidden shrink-0 border border-white/20 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={ind.image}
                          alt={ind.title}
                          className="w-full h-full object-cover filter brightness-90 group-hover:brightness-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white font-display group-hover:text-blue-400 transition-colors">
                        {ind.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/50 font-light mt-1 font-sans">
                        {ind.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-12 md:pl-0 self-end md:self-center">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 hidden sm:inline-block">
                      {isExpanded ? 'COLLAPSE PLAYBOOK' : 'EXPAND PLAYBOOK'}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                        isExpanded
                          ? 'border-white text-white bg-white/10'
                          : 'border-white/15 text-white/60 group-hover:border-white/40'
                      }`}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details with Dedicated Sector Banner & Playbook */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-12 pb-12 pt-4 bg-white/[0.02] border-t border-white/10 space-y-8">
                        {/* Large Sector Photographic Showcase */}
                        {ind.image && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden border border-white/20 shadow-2xl group"
                          >
                            <img
                              src={ind.image}
                              alt={ind.title}
                              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                            
                            {/* Glass Badge */}
                            <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-widest uppercase flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full animate-ping"
                                style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
                              />
                              <span>SECTOR BRIEF // {ind.number}</span>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                              <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-display tracking-tight">
                                  {ind.title}
                                </h3>
                                <p className="text-sm text-white/80 font-light max-w-xl font-sans mt-1">
                                  {ind.subtitle}
                                </p>
                              </div>
                              <span className="text-xs font-mono px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase self-start sm:self-auto">
                                AFFLIORA PLAYBOOK
                              </span>
                            </div>
                          </motion.div>
                        )}

                        <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-4xl font-sans">
                          {ind.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
                          {/* Industry Bottlenecks */}
                          <div className="space-y-3 p-5 bg-white/[0.015] border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400/90">
                              <AlertCircle className="w-4 h-4" />
                              <span>Common Industry Pitfalls</span>
                            </div>
                            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-light font-sans">
                              {ind.challenges.map((c, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-2.5">
                                  <span className="text-red-400 font-bold">•</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Affliora Strategic Solutions */}
                          <div className="space-y-3 p-5 bg-white/[0.025] border border-white/15 backdrop-blur-md">
                            <div
                              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
                              style={{ color: config.primaryColorLight || '#3B82F6' }}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{config.name} Strategic Solutions</span>
                            </div>
                            <ul className="space-y-2.5 text-xs sm:text-sm text-white/90 font-light font-sans">
                              {ind.solutions.map((s, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2.5">
                                  <span
                                    className="font-bold"
                                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                                  >
                                    ✓
                                  </span>
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Recommended Services & CTA */}
                        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono uppercase tracking-widest text-white/40 mr-2">
                              Recommended Disciplines:
                            </span>
                            {ind.recommendedServices.map((srv, srvIdx) => (
                              <span
                                key={srvIdx}
                                className="px-2.5 py-1 text-xs bg-white/[0.04] border border-white/15 text-white/80 font-mono backdrop-blur-md"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate('contact')}
                            style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                            className="inline-flex items-center gap-2 px-6 py-3 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg hover:opacity-90"
                          >
                            <span>CONSULT ON THIS SECTOR</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
