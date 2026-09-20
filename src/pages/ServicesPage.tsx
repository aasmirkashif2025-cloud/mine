import React, { useState } from 'react';
import { PageId } from '../types';
import { ArrowRight, Check, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services, config } = useSite();
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || '');

  const currentService = services.find((s) => s.id === activeServiceId) || services[0];

  return (
    <div id="services-page" className="relative w-full bg-[#08090b] text-[#e2e4e9] pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* Ambient Floating Glass Glows */}
      <div
        className="absolute top-20 right-10 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20 animate-float"
        style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
      />
      <div
        className="absolute bottom-40 left-10 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-15 animate-float-delayed"
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
            03
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
            CAPABILITIES & DISCIPLINES
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight text-white font-display leading-[0.95]"
          >
            OUR SPECIALIZED <br />
            SERVICES.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-2xl font-sans"
          >
            Specialized digital capabilities engineered by {config.name} to elevate brand authority, accelerate transaction speed, and scale enterprise efficiency.
          </motion.p>
        </div>
      </section>

      {/* 2. Interactive Editorial Service Explorer */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Numbered Service Selector with Glass Look */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-2 divide-y divide-white/10 border-y border-white/10 bg-white/[0.015] backdrop-blur-md"
          >
            {services.map((service) => {
              const isSelected = (currentService?.id || '') === service.id;
              return (
                <button
                  key={service.id}
                  id={`service-select-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  style={{
                    borderLeftColor: isSelected ? config.primaryColorLight || '#3B82F6' : 'transparent',
                  }}
                  className={`w-full py-5 px-5 text-left flex items-center justify-between transition-all duration-300 cursor-pointer border-l-2 ${
                    isSelected
                      ? 'bg-white/[0.06] shadow-lg backdrop-blur-xl'
                      : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Small thumbnail icon/photo */}
                    {service.image && (
                      <div className="w-10 h-10 rounded-sm overflow-hidden shrink-0 border border-white/15 bg-black/40">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="font-mono text-xs transition-colors"
                          style={{
                            color: isSelected ? config.primaryColorLight || '#3B82F6' : 'rgba(255, 255, 255, 0.4)',
                          }}
                        >
                          {service.number}
                        </span>
                      </div>
                      <span
                        className={`font-bold uppercase tracking-tight text-base sm:text-lg transition-colors font-display block ${
                          isSelected ? 'text-white' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                  </div>
                  <span
                    className="font-mono text-xs transition-transform duration-200"
                    style={{
                      transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                      color: config.primaryColorLight || '#3B82F6',
                    }}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Right Column: Detailed Editorial Deep Dive with Featured Service Image */}
          <div className="lg:col-span-7">
            {currentService && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 md:p-10 bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] space-y-8"
                >
                  {/* Service Visual Photo Showcase */}
                  {currentService.image && (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-56 sm:h-72 overflow-hidden border border-white/20 shadow-2xl group"
                    >
                      <img
                        src={currentService.image}
                        alt={currentService.title}
                        className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Floating overlay badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-white uppercase flex items-center gap-2 shadow-lg">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
                        />
                        <span>DISCIPLINE SPEC // {currentService.number}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                        <span className="bg-white/10 backdrop-blur-md px-2.5 py-1 border border-white/10 uppercase">
                          {currentService.title}
                        </span>
                        <span className="hidden sm:inline-block text-white/60">AFFLIORA STUDIO SPEC</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Header */}
                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
                      {currentService.title}
                    </h2>
                    <p className="text-lg font-editorial italic text-white/90 font-normal lowercase">
                      "{currentService.highlight}"
                    </p>
                    <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base font-sans">
                      {currentService.longDesc}
                    </p>
                  </div>

                  {/* Capabilities List */}
                  <div className="space-y-4 border-t border-white/10 pt-6">
                    <span
                      className="text-xs font-mono tracking-[0.2em] uppercase block font-semibold"
                      style={{ color: config.primaryColorLight || '#3B82F6' }}
                    >
                      CORE CAPABILITIES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentService.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85 font-sans">
                          <Check
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: config.primaryColorLight || '#3B82F6' }}
                          />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables & Technologies */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                        Client Deliverables
                      </span>
                      <ul className="space-y-1.5 text-xs text-white/70 font-light font-sans">
                        {currentService.deliverables.map((del, idx) => (
                          <li key={idx}>• {del}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                        Tech & Frameworks
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentService.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-[11px] font-mono bg-white/[0.04] backdrop-blur-md border border-white/15 text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct Action Button */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-white/50 font-light font-sans">
                      Commission an audit or build for this discipline.
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate('contact')}
                      style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                      className="w-full sm:w-auto px-6 py-3 text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg hover:opacity-90"
                    >
                      <span>INQUIRE ABOUT {currentService.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Service List Grid with Dedicated Visual Images */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-t border-white/10 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white font-display"
            >
              ALL DISCIPLINES AT A GLANCE
            </motion.h3>
            <p className="text-xs text-white/50 mt-1 font-mono">
              CLICK ANY CAPABILITY TO EXPAND FULL SPECIFICATIONS & PRICING SCOPES
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, sIndex) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                type: 'spring',
                bounce: 0.3,
                duration: 0.8,
                delay: sIndex * 0.07,
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => {
                setActiveServiceId(srv.id);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="glass-card overflow-hidden cursor-pointer flex flex-col justify-between group relative"
            >
              {/* Service Picture Header */}
              {srv.image && (
                <div className="h-36 w-full relative overflow-hidden bg-black/50 border-b border-white/10">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-85 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/30" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-md text-[10px] font-mono text-white border border-white/20">
                    {srv.number}
                  </div>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold uppercase tracking-tight text-white text-base sm:text-lg mb-2 font-display group-hover:text-blue-400 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed font-sans line-clamp-3">
                    {srv.shortDesc}
                  </p>
                </div>

                <div
                  className="pt-4 mt-4 border-t border-white/10 text-[11px] font-mono flex items-center justify-between"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  <span className="tracking-widest uppercase">VIEW SPECS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
