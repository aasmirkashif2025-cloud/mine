import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { PageId } from '../types';
import { useSite } from '../context/SiteContext';
import { sound } from '../utils/audio';

interface HeroProps {
  onNavigate: (page: PageId) => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    image: '/assets/images/agency_hero_workspace_1789562025645.jpg',
    label: 'STUDIO WORKSPACE // 01',
    context: 'CREATIVE & DIGITAL LAB',
    location: 'LAHORE HQ',
  },
  {
    id: 2,
    image: '/assets/images/luxe_homes_study_1789562049003.jpg',
    label: 'ARCHITECTURAL RESIDENCES // 02',
    context: 'LUXURY DIGITAL FLAGSHIPS',
    location: 'GLOBAL CLIENTS',
  },
  {
    id: 3,
    image: '/assets/images/studio_minimalist_1789562065344.jpg',
    label: 'MINIMALIST DESIGN LAB // 03',
    context: 'EDITORIAL ART DIRECTION',
    location: 'TYPOGRAPHY SYSTEMS',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
    label: 'EXECUTIVE STRATEGY SUITE // 04',
    context: 'COMMERCIAL ENTERPRISE SCALING',
    location: 'CROSS-BORDER ADVISORY',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop',
    label: 'NEXT-GEN TECH LAB // 05',
    context: 'FULL-STACK CLOUD & AI SYSTEMS',
    location: 'HIGH VELOCITY TECH',
  },
];

const SLIDE_DURATION = 4500; // 4.5 seconds auto-scroll duration

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { config } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  // Cinematic parallax transforms
  const backgroundY = useTransform(scrollY, [0, 800], [0, 160]);
  const textY = useTransform(scrollY, [0, 800], [0, 80]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0.2]);

  const nextSlide = useCallback(() => {
    sound.playHover();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    sound.playHover();
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    sound.playClick();
    setCurrentSlide(index);
  };

  // Auto-scroll loop with 4.5s duration
  useEffect(() => {
    setIsLoaded(true);
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, currentSlide]);

  const handleScrollDown = () => {
    const introSection = document.getElementById('agency-intro-section');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen h-[100svh] overflow-hidden bg-[#08090b] flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. 5 Animated Background Pictures with Auto-Scroll Ken Burns and Cross-Fade */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] left-0 z-0 pointer-events-none"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.img
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 7, ease: 'easeOut' }}
              src={activeSlideData.image}
              alt={`${config.name} — ${activeSlideData.label}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.08]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Multi-Layer Dark Gradient Overlays for High Typography Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b]/95 via-[#08090b]/75 to-transparent/30" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#08090b]/90 via-[#08090b]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#08090b] via-[#08090b]/85 to-transparent" />

        {/* Subtle radial atmosphere accent on the right with dynamic glow */}
        <div
          className="absolute right-1/4 top-1/3 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: config.primaryColorGlow || 'rgba(37, 99, 235, 0.12)' }}
        />
      </motion.div>

      {/* Spacer to push content down below the fixed navigation bar */}
      <div className="h-24 md:h-32 w-full shrink-0 z-10" />

      {/* 2. Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full my-auto">
        <motion.div
          style={{ y: textY, opacity: opacityFade }}
          className="max-w-2xl lg:max-w-3xl"
        >
          {/* Subtle Eyebrow with Micro Indicator & Thin Line */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-5 md:mb-7"
          >
            <span
              className="font-mono text-xs md:text-sm font-semibold tracking-wider"
              style={{ color: config.primaryColorLight || '#3B82F6' }}
            >
              01
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-white/20" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
              {config.heroEyebrow || 'WEB DEVELOPMENT / DIGITAL EXPERIENCES'}
            </span>

            {/* Current Slide Label Tag */}
            <span className="hidden sm:inline-block ml-2 px-2.5 py-0.5 border border-white/10 bg-black/40 backdrop-blur-md text-[9px] font-mono text-white/50 uppercase tracking-widest">
              {activeSlideData.label}
            </span>
          </motion.div>

          {/* Massive Editorial Headline with Modern Display & Editorial Serif Fonts */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 md:space-y-2 mb-6 md:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[78px] leading-[0.93] tracking-tight font-extrabold uppercase text-white font-display">
              {config.heroHeadingLead || 'WE BUILD DIGITAL EXPERIENCES'}
            </h1>

            {/* High-Contrast Italic Editorial Serif Line */}
            <div className="pt-2 md:pt-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] leading-[1.02] tracking-normal font-normal text-white/85 font-editorial italic lowercase">
                {config.heroHeadingItalic || 'that move business.'}
              </h2>
            </div>
          </motion.div>

          {/* Refined Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-sm md:text-base lg:text-lg text-white/70 font-light max-w-xl leading-relaxed mb-8 md:mb-10 font-sans"
          >
            {config.heroDescription || `${config.name} creates modern websites, web applications, and digital experiences for ambitious businesses.`}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <motion.button
              id="hero-primary-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => {
                sound.playClick();
                onNavigate('contact');
              }}
              style={{
                backgroundColor: config.primaryColor || '#2563EB',
                boxShadow: `0 12px 30px ${config.primaryColorGlow || 'rgba(37, 99, 235, 0.3)'}`,
              }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-white text-xs md:text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.button>

            <motion.button
              id="hero-secondary-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => {
                sound.playClick();
                onNavigate('work');
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] text-white/90 hover:text-white border border-white/20 hover:border-white/40 text-xs md:text-sm font-medium tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer focus:outline-none backdrop-blur-sm"
            >
              <span>EXPLORE OUR WORK</span>
            </motion.button>

            {/* Quick WhatsApp Link in Hero */}
            {config.whatsapp && (
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMessage || 'Hello Affliora Digital, I would like to discuss a project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-3.5 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-mono tracking-wider transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CHAT ON WHATSAPP</span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Hero Bottom: Interactive 5-Slide Auto-Scroll Progress & Navigation */}
      <div className="relative z-10 w-full shrink-0 max-w-7xl mx-auto px-6 md:px-10 pb-6 md:pb-8 pt-4">
        {/* Animated 5-Segment Progress Line */}
        <div className="grid grid-cols-5 gap-2 md:gap-3 mb-5">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="group text-left py-1.5 focus:outline-none cursor-pointer"
                aria-label={`Jump to slide ${idx + 1}`}
              >
                <div className="w-full h-[2.5px] bg-white/15 relative overflow-hidden rounded-full">
                  {isActive ? (
                    <motion.div
                      key={`progress-${idx}-${currentSlide}`}
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '100%' : '100%' }}
                      transition={{
                        duration: isPaused ? 0.3 : SLIDE_DURATION / 1000,
                        ease: 'linear',
                      }}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
                    />
                  ) : (
                    <div
                      className={`h-full transition-all duration-300 ${
                        idx < currentSlide ? 'bg-white/50 w-full' : 'w-0'
                      }`}
                    />
                  )}
                </div>
                <div className="hidden lg:flex items-center justify-between mt-1 text-[9px] font-mono tracking-wider text-white/40 group-hover:text-white/80 transition-colors">
                  <span>0{idx + 1}</span>
                  <span className="truncate max-w-[90px]">{slide.label.split('//')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-white/50 font-mono tracking-widest uppercase">
          {/* Bottom Left: Minimal Scroll Indicator */}
          <button
            id="hero-scroll-indicator"
            onClick={handleScrollDown}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer group focus:outline-none"
            aria-label="Scroll to explore"
          >
            <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-white transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1.5 rounded-full"
                style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
              />
            </div>
            <span className="text-[10px] md:text-[11px] tracking-[0.25em]">SCROLL TO EXPLORE</span>
          </button>

          {/* Bottom Center: Slide Controller & Autoplay Status */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px]">
            <button
              onClick={prevSlide}
              className="p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-white/80 tracking-widest px-1">
              0{currentSlide + 1} <span className="text-white/30">/</span> 0{HERO_SLIDES.length}
            </span>

            <button
              onClick={nextSlide}
              className="p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="w-[1px] h-3 bg-white/20 mx-0.5" />

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              title={isPaused ? 'Click to auto-play' : 'Click to pause'}
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>

          {/* Bottom Right: Studio Location */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/40">
            <span>{config.city.toUpperCase()} PK</span>
            <span style={{ color: config.primaryColorLight || '#3B82F6' }}>•</span>
            <span>{activeSlideData.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
