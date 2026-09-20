import React, { useState, useMemo } from 'react';
import { PageId, Project } from '../types';
import { ArrowUpRight, Filter, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface WorkPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: Project) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate, onSelectProject }) => {
  const { projects, config } = useSite();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Derive categories dynamically from existing projects
  const categories = useMemo(() => {
    const uniqueIndustries: string[] = Array.from(
      new Set(projects.map((p) => p.industry).filter((i): i is string => Boolean(i)))
    );
    const list = [{ id: 'all', label: 'ALL PROJECTS' }];
    uniqueIndustries.forEach((ind: string) => {
      list.push({
        id: ind.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: ind.toUpperCase(),
      });
    });
    return list;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter((p) => {
      const slug = p.industry.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return slug === selectedFilter;
    });
  }, [projects, selectedFilter]);

  return (
    <div id="work-page" className="relative w-full bg-[#08090b] text-[#e2e4e9] pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* 1. Header with Staggered Entrance */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-20 border-b border-white/10">
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
            04
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
            CASE STUDY ARCHIVE
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight text-white font-display leading-[0.95]"
          >
            SELECTED <br />
            PROJECTS.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-2xl font-sans"
          >
            A curated archive of digital flagships, web applications, and commercial platforms engineered by {config.name} for ambitious clients worldwide.
          </motion.p>
        </div>

        {/* Filter Tabs with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mt-12 pt-8 border-t border-white/10"
        >
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFilter(cat.id)}
                style={{
                  backgroundColor: isActive ? config.primaryColor || '#2563EB' : undefined,
                  borderColor: isActive ? config.primaryColor || '#2563EB' : undefined,
                }}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white border shadow-md'
                    : 'bg-white/[0.02] text-white/60 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* 2. Project Rows (Large Visual Case Studies with Animations) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {filteredProjects.length === 0 ? (
          <div className="p-16 border border-white/10 text-center space-y-4">
            <p className="text-white/60 font-mono text-sm">NO CASE STUDIES FOUND IN THIS CATEGORY</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="px-4 py-2 border border-white/20 text-xs font-mono uppercase text-white hover:bg-white/5 transition-colors"
            >
              RESET TO ALL PROJECTS
            </button>
          </div>
        ) : (
          <div className="space-y-24 md:space-y-36">
            {filteredProjects.map((project, pIdx) => (
              <motion.div
                key={project.id}
                id={`work-item-${project.id}`}
                data-cursor="CASE STUDY"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (pIdx % 3) * 0.12 }}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer"
              >
                {/* Massive Image Showcase */}
                <div className="relative w-full h-[400px] sm:h-[500px] md:h-[620px] overflow-hidden border border-white/10 bg-black">
                  <img
                    src={project.image}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.88] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#08090b]/60 via-transparent to-transparent" />

                  {/* Floating Top Number & Industry */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8">
                    <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-xs font-mono text-white/90">
                      {project.number} // {project.industry}
                    </div>
                  </div>

                  {/* Arrow Action Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Editorial Project Details Row Under Image */}
                <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-6 space-y-2">
                    <span
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{ color: config.primaryColorLight || '#3B82F6' }}
                    >
                      {project.client} • {project.year}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display group-hover:text-white">
                      {project.name}
                    </h3>
                    <p className="text-lg font-editorial italic text-white/85 font-normal lowercase">
                      "{project.tagline}"
                    </p>
                  </div>

                  <div className="lg:col-span-4 space-y-4">
                    <p className="text-sm text-white/60 font-light leading-relaxed font-sans">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((srv, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 bg-white/5 border border-white/10 text-white/70"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex flex-col lg:items-end gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
                      >
                        <span>VISIT LIVE SITE</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] group-hover:text-white transition-colors"
                      style={{ color: config.primaryColorLight || '#60a5fa' }}
                    >
                      <span>VIEW DOSSIER</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
