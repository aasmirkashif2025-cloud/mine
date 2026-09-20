import React from 'react';
import { Project, PageId } from '../types';
import { X as CloseIcon, ArrowRight as ArrowIcon, Layers as LayersIcon, Sparkles as SparklesIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onNavigate }) => {
  const { config } = useSite();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#0d0f14] border border-white/15 text-white max-h-[90vh] overflow-y-auto z-10 my-auto shadow-2xl"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-[#0d0f14]/95 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              >
                {project.number}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
              />
              <span className="text-xs tracking-[0.2em] uppercase text-white/60 font-mono">
                {project.industry}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/30"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            {/* Title & Headline */}
            <div>
              <span
                className="text-xs font-mono uppercase tracking-widest block mb-2"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              >
                CASE STUDY ARCHIVE
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white font-display mb-3">
                {project.name}
              </h2>
              <p className="text-lg md:text-2xl font-editorial italic text-white/85 font-normal lowercase">
                "{project.tagline}"
              </p>
            </div>

            {/* High-Impact Visual Banner */}
            <div className="relative w-full h-64 md:h-[420px] overflow-hidden border border-white/10 bg-black">
              <img
                src={project.image}
                alt={project.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 flex flex-wrap items-center justify-between gap-4">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white/80">
                  Client: {project.client} • {project.year}
                </div>
              </div>
            </div>

            {/* Key Outcome Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/10 py-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-white/50 mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Problem / Solution Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-white/50 tracking-widest">
                  <LayersIcon
                    className="w-4 h-4"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  />
                  <span>The Strategic Challenge</span>
                </div>
                <p className="text-white/70 leading-relaxed text-sm md:text-base font-light font-sans">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-white/50 tracking-widest">
                  <SparklesIcon
                    className="w-4 h-4"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  />
                  <span>The {config.name} Solution</span>
                </div>
                <p className="text-white/70 leading-relaxed text-sm md:text-base font-light font-sans">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Services & Technology Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.02] border border-white/10 p-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-3">
                  Scope of Services
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-3">
                  Engineering Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs border font-mono"
                      style={{
                        backgroundColor: config.primaryColorGlow || 'rgba(59, 130, 246, 0.1)',
                        borderColor: config.primaryColorLight || 'rgba(59, 130, 246, 0.3)',
                        color: config.primaryColorLight || '#60a5fa',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA within Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/60 font-light">
                Ready to engineer a similar digital experience for your brand?
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('contact');
                }}
                style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-white text-xs font-semibold tracking-widest uppercase transition-colors shadow-lg hover:opacity-90"
              >
                <span>INITIATE SIMILAR PROJECT</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
