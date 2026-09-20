import React, { useState } from 'react';
import { PageId, Project } from '../types';
import { Hero } from '../components/Hero';
import { ArrowUpRight, ArrowRight, Sparkles, ChevronRight, CheckCircle2, ShieldCheck, Zap, Star, Quote, Award, Check, X as XIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { sound } from '../utils/audio';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject }) => {
  const { config, projects, services, industries } = useSite();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

  return (
    <div id="home-page-container" className="relative w-full bg-[#08090b] text-[#e2e4e9] overflow-hidden">
      {/* 1. Benchmark Hero Section with 5 Animated Auto-Scrolling Background Slides */}
      <Hero onNavigate={onNavigate} />

      {/* Ticker Marquee: Kinetic Agency Statement */}
      <div className="border-y border-white/10 bg-[#060709] py-3.5 overflow-hidden whitespace-nowrap relative select-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="inline-flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50"
        >
          <span>FULL-STACK DEVELOPMENT</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>EDITORIAL ART DIRECTION</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>LUXURY DIGITAL EXPERIENCES</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>SUB-SECOND PERFORMANCE</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>ENTERPRISE REACT & TYPESCRIPT</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>CUSTOM WEB APPLICATIONS</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>FULL-STACK DEVELOPMENT</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>EDITORIAL ART DIRECTION</span>
          <span style={{ color: config.primaryColorLight || '#3B82F6' }}>✦</span>
          <span>LUXURY DIGITAL EXPERIENCES</span>
        </motion.div>
      </div>

      {/* 2. SECTION — INTRODUCTION & MANIFESTO */}
      <section
        id="agency-intro-section"
        className="relative py-28 md:py-36 border-b border-white/10 bg-[#08090b]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: config.primaryColorLight || '#3B82F6' }}
            >
              02
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
              AGENCY MANIFESTO
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Massive Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold uppercase tracking-tight text-white font-display leading-[0.98]">
                WE DON’T JUST <br />
                <span className="text-white/35">BUILD WEBSITES.</span> <br />
                WE ARCHITECT <br />
                <span className="font-editorial italic font-normal text-white/90 lowercase text-5xl sm:text-6xl md:text-7xl lg:text-[86px]">
                  digital experiences.
                </span>
              </h2>
            </motion.div>

            {/* Editorial Paragraph with whitespace */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-6 pt-2 lg:pt-4"
            >
              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed font-sans">
                In an era crowded with generic website builders and cookie-cutter SaaS templates, {config.name} crafts digital landmarks that separate market leaders from mere competitors.
              </p>
              <p className="text-sm text-white/50 font-light leading-relaxed font-sans">
                We combine architectural rigor, editorial typography, and high-velocity engineering to construct web properties that drive unshakeable commercial momentum.
              </p>

              <div className="pt-4">
                <motion.button
                  whileHover={{ x: 4 }}
                  id="intro-read-about-btn"
                  onClick={() => onNavigate('about')}
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  <span>OUR PHILOSOPHY & ETHOS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Real Metrics / Capabilities Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-20 border-t border-white/10">
            {(config.stats && config.stats.length > 0 ? config.stats : [
              { label: 'Sub-Second Speeds', detail: '0.8s Global Core Web Vitals' },
              { label: 'Custom Architecture', detail: '0% Generic Templates Used' },
              { label: 'Enterprise Security', detail: 'Audited Code & Encryption' },
              { label: 'Senior Principal Access', detail: 'Direct Partnership with Founders' },
            ]).map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all space-y-2"
              >
                <span
                  className="font-mono text-xs block font-semibold"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  0{idx + 1}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white tracking-wide uppercase font-sans">
                  {stat.label}
                </h3>
                <p className="text-xs text-white/50 font-light font-sans">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION — SERVICES (Numbered Editorial Rows) */}
      <section
        id="services-overview-section"
        className="relative py-28 md:py-36 border-b border-white/10 bg-[#07080a]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  03
                </span>
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                  CORE EXPERTISE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
                DISCIPLINES & CAPABILITIES
              </h2>
            </div>

            <motion.button
              whileHover={{ x: 3 }}
              id="view-all-services-cta"
              onClick={() => onNavigate('services')}
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span>EXPLORE ALL SERVICES</span>
              <ArrowUpRight
                className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              />
            </motion.button>
          </motion.div>

          {/* Editorial Numbered Rows with Interactive Hover States & Animations */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {services.slice(0, 7).map((service, sIndex) => {
              const isHovered = hoveredService === service.id;
              return (
                <motion.div
                  key={service.id}
                  id={`home-service-row-${service.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: sIndex * 0.08 }}
                  onMouseEnter={() => {
                    setHoveredService(service.id);
                    sound.playHover();
                  }}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => {
                    sound.playClick();
                    onNavigate('services');
                  }}
                  className="group py-7 md:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-all duration-300 hover:bg-white/[0.02] px-4 -mx-4"
                >
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline gap-6 md:gap-10 md:w-1/2">
                    <span
                      className="font-mono text-sm md:text-base text-white/30 transition-colors"
                      style={{ color: isHovered ? config.primaryColorLight || '#3B82F6' : undefined }}
                    >
                      {service.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white group-hover:text-white transition-colors font-display">
                      {service.title}
                    </h3>
                  </div>

                  {/* Middle / Right: Short Description & Micro Arrow */}
                  <div className="flex items-center justify-between md:w-1/2 gap-6 pl-12 md:pl-0">
                    <p className="text-sm md:text-base text-white/60 group-hover:text-white/80 transition-colors font-light max-w-md font-sans">
                      {service.shortDesc}
                    </p>

                    <motion.div
                      animate={{ scale: isHovered ? 1.08 : 1 }}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 shrink-0 group-hover:border-transparent"
                      style={{
                        backgroundColor: isHovered ? config.primaryColor || '#2563EB' : undefined,
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION — SELECTED WORK (Cinematic Editorial Case Studies) */}
      <section
        id="selected-work-section"
        className="relative py-28 md:py-40 border-b border-white/10 bg-[#08090b]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  04
                </span>
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                  PORTFOLIO ARCHIVE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
                SELECTED WORK
              </h2>
            </div>

            <motion.button
              whileHover={{ x: 3 }}
              id="view-all-work-btn"
              onClick={() => onNavigate('work')}
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span>VIEW FULL ARCHIVE</span>
              <ArrowUpRight
                className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              />
            </motion.button>
          </motion.div>

          {/* Large Visual Case Studies */}
          <div className="space-y-24 md:space-y-36">
            {projects.map((project, pIdx) => (
              <motion.div
                key={project.id}
                id={`project-case-${project.id}`}
                data-cursor="CASE STUDY"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: pIdx * 0.15 }}
                onClick={() => {
                  sound.playClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => sound.playHover()}
                className="group relative cursor-pointer"
              >
                {/* Large Visual Frame with Parallax & Hover Zoom */}
                <div className="relative w-full h-[400px] sm:h-[520px] md:h-[620px] overflow-hidden bg-black border border-white/10">
                  <img
                    src={project.image}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Gradient overlays for high legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#08090b]/70 via-transparent to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3">
                    <span className="font-mono text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10">
                      {project.number} // {project.industry}
                    </span>
                  </div>

                  {/* Hover Arrow Trigger */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-black/70 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </motion.div>

                  {/* Bottom Case Study Metadata Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl">
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display group-hover:translate-x-1.5 transition-transform duration-300">
                        {project.name}
                      </h3>
                      <p className="text-base sm:text-xl font-editorial italic text-white/85 mt-1 font-normal lowercase">
                        {project.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-white/60 font-light mt-2 line-clamp-2 max-w-lg font-sans">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-col md:items-end gap-2 shrink-0">
                      <div className="flex flex-wrap gap-2">
                        {project.services.slice(0, 3).map((service, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-white/10 text-white/80 backdrop-blur-sm border border-white/10"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      <span
                        className="text-xs font-mono uppercase tracking-widest mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        style={{ color: config.primaryColorLight || '#60a5fa' }}
                      >
                        <span>INSPECT CASE DOSSIER</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION — INDUSTRIES (Sector Specialization) */}
      <section
        id="industries-section"
        className="relative py-28 md:py-36 border-b border-white/10 bg-[#07080a]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  05
                </span>
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                  SECTOR SPECIALIZATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
                INDUSTRIES WE ELEVATE
              </h2>
            </div>

            <motion.button
              whileHover={{ x: 3 }}
              id="view-all-industries-btn"
              onClick={() => onNavigate('industries')}
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span>IN-DEPTH INDUSTRY PLAYBOOKS</span>
              <ArrowUpRight
                className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              />
            </motion.button>
          </motion.div>

          {/* Editorial Grid of Industries with Motion & Hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {industries.map((ind, iIdx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (iIdx % 3) * 0.1 }}
                onClick={() => {
                  sound.playClick();
                  onNavigate('industries');
                }}
                className="bg-[#07080a] p-8 md:p-10 group hover:bg-[#0d0f14] transition-colors duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
                onMouseEnter={() => {
                  setHoveredIndustry(ind.id);
                  sound.playHover();
                }}
                onMouseLeave={() => setHoveredIndustry(null)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-xs text-white/40 transition-colors"
                      style={{ color: hoveredIndustry === ind.id ? config.primaryColorLight || '#3B82F6' : undefined }}
                    >
                      {ind.number}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-white/20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      style={{ color: hoveredIndustry === ind.id ? config.primaryColorLight || '#3B82F6' : undefined }}
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-display group-hover:text-white mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-white/50 font-light line-clamp-2 font-sans">
                    {ind.subtitle}
                  </p>
                </div>

                <div
                  className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40 transition-colors"
                  style={{ color: hoveredIndustry === ind.id ? config.primaryColorLight || '#3B82F6' : undefined }}
                >
                  <span>DISCOVER SOLUTIONS</span>
                  <span>→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION — THE AFFLIORA BENCHMARK (Architectural Performance Comparison Matrix) */}
      <section
        id="benchmark-matrix-section"
        className="relative py-28 md:py-36 border-b border-white/10 bg-[#060709]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: config.primaryColorLight || '#3B82F6' }}
            >
              06
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
              ARCHITECTURAL BENCHMARK
            </span>
          </motion.div>

          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display leading-[1.05]">
              THE AFFLIORA STANDARD <br />
              <span className="font-editorial italic font-normal text-white/85 lowercase text-4xl sm:text-6xl">
                versus traditional agencies.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light mt-4 leading-relaxed font-sans">
              We eliminated the bureaucracy, junior offshore outsourcing, and template bloat of standard agencies to engineer an uncompromising digital flagship delivery model.
            </p>
          </div>

          {/* Benchmark Comparison Table Grid */}
          <div className="border border-white/15 bg-white/[0.01] backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-white/15 bg-white/[0.03] text-[11px] font-mono tracking-[0.2em] uppercase text-white/60 p-4 sm:p-6">
              <div className="col-span-4 sm:col-span-3 font-semibold text-white/80">EVALUATION VECTOR</div>
              <div className="col-span-4 sm:col-span-4 text-white/40">THE INDUSTRY STATUS QUO</div>
              <div className="col-span-4 sm:col-span-5 text-white font-bold flex items-center gap-2" style={{ color: config.primaryColorLight || '#60a5fa' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE AFFLIORA BENCHMARK</span>
              </div>
            </div>

            {/* Matrix Rows */}
            {[
              {
                vector: 'Core Architecture',
                standard: 'Generic WordPress, Webflow, or Shopify templates with heavy third-party plugins.',
                affliora: '100% Bespoke TypeScript & modern React/Next.js. Zero template residue or extraneous script bloat.',
              },
              {
                vector: 'Performance Velocity',
                standard: '3.5s – 6.2s average page loads, failing Google Core Web Vitals and causing bounce spikes.',
                affliora: 'Sub-0.8s Global TTFB, 99+ Core Web Vitals, hardware-accelerated 60fps micro-motion.',
              },
              {
                vector: 'Engineering Access',
                standard: 'Junior offshore trainees managed by non-technical account representatives.',
                affliora: 'Direct partnership with senior founding engineers and award-winning creative directors.',
              },
              {
                vector: 'Art Direction & Taste',
                standard: 'Cookie-cutter SaaS layouts using standard stock photos and generic gradients.',
                affliora: 'Haute couture editorial typography, custom cinema photography, and museum-grade visual hierarchy.',
              },
              {
                vector: 'Security & Integrity',
                standard: 'Vulnerable CMS installations prone to security breaches and weekly plugin conflicts.',
                affliora: 'Audited static edge deployment, bank-grade encryption, and 99.99% enterprise SLA uptime.',
              },
            ].map((row, rIdx) => (
              <motion.div
                key={rIdx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: rIdx * 0.08 }}
                onMouseEnter={() => sound.playHover()}
                className={`grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm items-start gap-4 transition-colors hover:bg-white/[0.03] ${
                  rIdx !== 0 ? 'border-t border-white/10' : ''
                }`}
              >
                <div className="col-span-4 sm:col-span-3 font-mono font-medium text-white/90 text-xs">
                  {row.vector}
                </div>
                <div className="col-span-4 sm:col-span-4 text-white/45 font-light leading-relaxed flex items-start gap-2">
                  <XIcon className="w-3.5 h-3.5 text-rose-500/70 shrink-0 mt-0.5 hidden sm:inline-block" />
                  <span>{row.standard}</span>
                </div>
                <div className="col-span-4 sm:col-span-5 text-white/95 font-medium leading-relaxed flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 hidden sm:inline-block" />
                  <span>{row.affliora}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION — EXECUTIVE MONOGRAPHS & REVIEWS (Private Client Testimonials) */}
      <section
        id="client-endorsements-section"
        className="relative py-28 md:py-36 border-b border-white/10 bg-[#08090b] overflow-hidden"
      >
        {/* Subtle radial atmosphere */}
        <div
          className="absolute -top-32 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: config.primaryColorGlow || 'rgba(37, 99, 235, 0.2)' }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  07
                </span>
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                  PRIVATE CLIENT MONOGRAPHS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
                EXECUTIVE ENDORSEMENTS
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>100% VERIFIED CLIENT SATISFACTION</span>
            </div>
          </motion.div>

          {/* Testimonials 2x2 Grid with Editorial Polish */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  'Affliora architected a digital flagship with the precision of a Swiss chronometer. In our first quarter post-launch, international allocations from sovereign and private family offices doubled. Their design posture commands instant enterprise trust.',
                author: 'Elena Rostova',
                role: 'Managing Director & Partner',
                company: 'Zurich Wealth Advisors AG',
                location: 'Zurich, Switzerland',
                metric: '+240% Inbound Capital Allocations',
              },
              {
                quote:
                  'Most design agencies hand off unbuildable Figma designs and disappear. Affliora delivered production-grade TypeScript and sub-second rendering that our senior engineering team deployed directly to Kubernetes without friction.',
                author: 'Julian Vance',
                role: 'Chief Product Officer',
                company: 'Aether Cloud Infrastructure',
                location: 'San Francisco, USA',
                metric: '0.74s Global TTFB at Scale',
              },
              {
                quote:
                  'Their typographic sensibility and editorial restraint rival the finest European luxury Maisons. They captured our family horology heritage while engineering a lightning-fast digital catalogue. Private collector inquiries rose dramatically.',
                author: 'Marcello De Luca',
                role: 'Executive Founder',
                company: 'De Luca Rare Horology',
                location: 'Milan, Italy',
                metric: 'Zero Layout Shift // 99 Core Web Vitals',
              },
              {
                quote:
                  'In high-stakes commercial real estate, pedigree and visual authority dictate deal velocity. Affliora gave our Mayfair advisory firm an authoritative, cinematic digital posture that instantly outclassed decades-old legacy brokerages.',
                author: 'Sir Alistair Sterling',
                role: 'Senior Principal Partner',
                company: 'Sterling & King Real Estate',
                location: 'London, UK',
                metric: 'Multi-Million Pound Transactions Closed',
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                onMouseEnter={() => sound.playHover()}
                whileHover={{ y: -4 }}
                className="relative p-8 sm:p-10 border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] backdrop-blur-xl flex flex-col justify-between transition-all duration-300 group shadow-xl"
              >
                {/* Top Quote Icon & 5-Star Rating */}
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 tracking-wider uppercase">
                      VERIFIED CLIENT
                    </span>
                  </div>

                  {/* Body Quote in Editorial Typography */}
                  <blockquote className="text-base sm:text-lg text-white/85 font-light leading-relaxed font-sans italic mb-8">
                    “{t.quote}”
                  </blockquote>
                </div>

                {/* Bottom Author Credentials & Location */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h4 className="font-display font-bold text-base uppercase text-white tracking-tight">
                      {t.author}
                    </h4>
                    <p className="text-xs text-white/60 font-sans mt-0.5">
                      {t.role} • <span className="text-white/90">{t.company}</span>
                    </p>
                    <p className="text-[11px] font-mono text-white/40 mt-1">
                      {t.location}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] font-mono uppercase tracking-wider block text-white/40">
                      CONFIRMED IMPACT
                    </span>
                    <span
                      className="text-xs font-mono font-semibold"
                      style={{ color: config.primaryColorLight || '#60a5fa' }}
                    >
                      {t.metric}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Studio Architectural Teaser */}
      <section className="relative py-28 md:py-36 border-b border-white/10 bg-[#08090b] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  08
                </span>
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                  CRAFT PRINCIPLE
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display leading-[1.05]">
                BUILT BY SENIOR ART DIRECTORS & FULL-STACK ENGINEERS.
              </h2>

              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed font-sans">
                At {config.name}, your project is never passed to junior trainees or outsourced freelancers. You partner directly with elite designers and senior engineers based in {config.city}, executing at top international standards.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    sound.playClick();
                    onNavigate('process');
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="px-6 py-3 border border-white/20 hover:border-white/40 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  OUR 6-STEP PROCESS
                </motion.button>
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    sound.playClick();
                    onNavigate('contact');
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                  className="text-xs font-semibold uppercase tracking-[0.16em] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>REQUEST CONSULTATION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div className="relative overflow-hidden border border-white/10 h-80 sm:h-[450px]">
                <img
                  src="/assets/images/studio_minimalist_1789562065344.jpg"
                  alt={`${config.name} Studio Architecture`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white/80">
                  {config.name} Studio • {config.location}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action Banner */}
      <section className="relative py-28 md:py-36 bg-[#060708] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${config.primaryColor || '#2563EB'} 0%, transparent 60%)`,
          }}
        />

        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-white/50 block">
              READY TO MOVE BUSINESS?
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white font-display leading-[0.95]">
              LET’S BUILD SOMETHING <br />
              <span className="font-editorial italic font-normal text-white/85 lowercase text-5xl sm:text-7xl md:text-8xl">
                extraordinary together.
              </span>
            </h2>

            <p className="text-sm md:text-base text-white/60 font-light max-w-xl mx-auto font-sans">
              Whether you need a high-impact digital flagship, a custom web application, or full-scale creative direction, we are ready to elevate your digital presence.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('contact')}
                style={{
                  backgroundColor: config.primaryColor || '#2563EB',
                  boxShadow: `0 12px 30px ${config.primaryColorGlow || 'rgba(37, 99, 235, 0.3)'}`,
                }}
                className="px-8 py-4 text-white text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>COMMENCE YOUR PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {config.whatsapp && (
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMessage || 'Hello Affliora Digital, I would like to discuss a project.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase transition-all inline-flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>DIRECT WHATSAPP</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
