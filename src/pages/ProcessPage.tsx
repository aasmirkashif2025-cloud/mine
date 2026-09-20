import React from 'react';
import { PageId } from '../types';
import { PROCESS_STAGES } from '../data/processStages';
import { ArrowRight, Clock, CheckSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface ProcessPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const { config } = useSite();

  return (
    <div id="process-page" className="relative w-full bg-[#08090b] text-[#e2e4e9] pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* 1. Header with Staggered Entrance */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 border-b border-white/10">
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
            06
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
            ENGINEERING & ARTISTRY TIMELINE
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight text-white font-display leading-[0.95]"
          >
            THE 6-PHASE <br />
            PROCESS.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-2xl font-sans"
          >
            A disciplined, predictable framework engineered by {config.name} to transform complex commercial ambitions into world-class digital realities without guesswork or missed deadlines.
          </motion.p>
        </div>
      </section>

      {/* 2. Cinematic Process Timeline with Scroll Stagger */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="space-y-16 md:space-y-24 relative">
          <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-[1px] bg-white/10" />

          {PROCESS_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.number}
              id={`process-stage-${stage.number}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start"
            >
              {/* Left Column: Massive Stage Number with Pin */}
              <div className="flex items-center gap-6 md:w-48 shrink-0">
                <div className="w-20 h-20 bg-[#0d0f14] border border-white/20 flex items-center justify-center relative z-10">
                  <span
                    className="font-mono text-2xl font-bold"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  >
                    {stage.number}
                  </span>
                </div>
                <div className="md:hidden">
                  <span className="text-xs font-mono text-white/40 block">{stage.duration}</span>
                  <span className="text-xl font-bold uppercase text-white font-display">{stage.name}</span>
                </div>
              </div>

              {/* Right Column: Stage Dossier */}
              <div className="flex-1 bg-white/[0.02] border border-white/10 p-8 md:p-12 space-y-6 hover:border-white/25 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-display">
                      {stage.number} // {stage.name}
                    </h2>
                    <p className="text-base font-editorial italic text-white/80 font-normal mt-1 lowercase">
                      "{stage.tagline}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 bg-white/5 px-3 py-1.5 border border-white/10">
                    <Clock
                      className="w-3.5 h-3.5"
                      style={{ color: config.primaryColorLight || '#3B82F6' }}
                    />
                    <span>TIMELINE: {stage.duration}</span>
                  </div>
                </div>

                <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base font-sans">
                  {stage.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {/* Key Activities */}
                  <div className="space-y-3">
                    <span
                      className="text-xs font-mono uppercase tracking-widest block"
                      style={{ color: config.primaryColorLight || '#3B82F6' }}
                    >
                      Core Operations
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-white/60 font-light font-sans">
                      {stage.activities.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <CheckSquare
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: config.primaryColorLight || '#3B82F6' }}
                          />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Concrete Deliverables */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                      Concrete Deliverables
                    </span>
                    <div className="space-y-2">
                      {stage.deliverables.map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="px-3 py-2 bg-white/5 border border-white/10 text-xs font-mono text-white/90"
                        >
                          {del}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-10 bg-[#0d0f14] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">
              READY TO COMMENCE PHASE 01?
            </h3>
            <p className="text-sm text-white/60 font-light font-sans">
              We schedule discovery consultations within 2 business days.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('contact')}
            style={{ backgroundColor: config.primaryColor || '#2563EB' }}
            className="px-8 py-4 text-white text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors cursor-pointer shadow-lg hover:opacity-90"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};
