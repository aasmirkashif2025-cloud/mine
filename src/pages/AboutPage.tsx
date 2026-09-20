import React from 'react';
import { PageId } from '../types';
import { ArrowRight, Shield, Target, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { config } = useSite();

  const stats = config.stats && config.stats.length > 0 ? config.stats : [
    { label: 'Sub-Second Speeds', detail: '0.8s Global Core Web Vitals' },
    { label: 'Custom Architecture', detail: '0% Generic Templates Used' },
    { label: 'Enterprise Security', detail: 'Audited Code & End-to-End Encryption' },
    { label: 'Senior Principal Access', detail: 'Direct Partnership with Founders' },
  ];

  return (
    <div id="about-page" className="relative w-full bg-[#08090b] text-[#e2e4e9] pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* 1. About Hero Section with Staggered Entrance */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
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
            01
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
            AGENCY OVERVIEW
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight text-white font-display leading-[0.94]"
          >
            WE DESIGN <br />
            DIGITAL <br />
            EXPERIENCES <br />
            <span className="font-editorial italic font-normal text-white/85 lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              with purpose.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mt-10 max-w-2xl font-sans"
          >
            {config.name} is an independent creative and technology studio founded in {config.city}, {config.country}, partnering with ambitious companies worldwide to architect high-impact digital experiences.
          </motion.p>
        </div>
      </section>

      {/* 2. Studio Architecture Photo Banner with Parallax Zoom */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 mb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-[360px] sm:h-[480px] md:h-[600px] overflow-hidden border border-white/10"
        >
          <img
            src="/assets/images/studio_minimalist_1789562065344.jpg"
            alt={`${config.name} Studio Atmosphere`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="bg-black/70 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white/80">
              Creative Direction & Engineering Studio • {config.location}
            </div>
            <div className="text-xs font-mono text-white/50 tracking-wider">
              PHYSICAL STUDIO // GLOBAL HORIZONS
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Who We Are & What We Believe */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            <span
              className="font-mono text-xs uppercase tracking-widest block"
              style={{ color: config.primaryColorLight || '#3B82F6' }}
            >
              OUR BELIEF SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
              THE COMMERCIAL IMPACT OF UNCOMPROMISING CRAFT.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-white/70 font-light text-base md:text-lg leading-relaxed font-sans"
          >
            <p>
              Most agencies treat digital design as surface decoration. At {config.name}, we treat it as an instrument of business dominance. Every layout, typography scale, micro-interaction, and millisecond of load performance directly influences how your audience perceives your company’s market standing.
            </p>
            <p className="text-white/60 text-base">
              When a prospective high-value client lands on your website, they form an unshakeable opinion in under 50 milliseconds. A generic, bloated template signals hesitation and mediocrity. A custom, cinematic, ultra-responsive digital flagship communicates immediate institutional strength and commanding luxury.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Core Pillars */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span
            className="font-mono text-xs uppercase tracking-widest block mb-2"
            style={{ color: config.primaryColorLight || '#3B82F6' }}
          >
            MEASURABLE COMMITMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
            WHAT WE STAND BEHIND
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.3)' }}
              className="p-8 bg-white/[0.02] border border-white/10 space-y-4 transition-all"
            >
              <span
                className="font-mono text-xs font-semibold block"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              >
                0{idx + 1}
              </span>
              <h3 className="text-lg font-bold uppercase tracking-wider text-white font-display">
                {stat.label}
              </h3>
              <p className="text-sm text-white/50 font-light leading-relaxed font-sans">
                {stat.detail}. Built with intentional code, zero bloat, and enterprise-grade accessibility.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. How We Work & What Makes Us Different */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            <span
              className="font-mono text-xs uppercase tracking-widest block"
              style={{ color: config.primaryColorLight || '#3B82F6' }}
            >
              STUDIO ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
              HOW {config.name.toUpperCase()} WORKS DIFFERENTLY.
            </h2>
            <p className="text-sm text-white/60 font-light leading-relaxed font-sans">
              We engineered our studio specifically to eliminate the traditional agency dysfunctions that frustrate founders and business leaders.
            </p>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {[
              {
                icon: Shield,
                title: 'Direct Principal Engagement',
                desc: 'You work directly with senior art directors and experienced full-stack engineers. No middlemen, no account executives playing telephone, and zero junior handoffs.',
              },
              {
                icon: Target,
                title: 'Clean-Slate Architecture',
                desc: 'We write clean modern code tailored specifically to your exact operations. We never force your business into bloated pre-packaged WordPress themes or restrictive templates.',
              },
              {
                icon: Zap,
                title: 'Radical Performance Standards',
                desc: 'We benchmark against Google Core Web Vitals and international sub-second latency targets. Your pages load instantly on any network anywhere in the world.',
              },
            ].map((adv, aIdx) => (
              <motion.div
                key={aIdx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: aIdx * 0.12 }}
                whileHover={{ x: 4 }}
                className="p-6 bg-white/[0.02] border border-white/10 space-y-2 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <adv.icon
                    className="w-5 h-5"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  />
                  <h4 className="font-bold text-white uppercase tracking-wider text-sm font-sans">
                    {adv.title}
                  </h4>
                </div>
                <p className="text-sm text-white/60 font-light pl-8 font-sans">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Studio Call to Action */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-10 md:p-14 bg-gradient-to-r from-[#0e121a] to-[#08090b] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white font-display">
              HAVE AN AMBITIOUS PROJECT IN MIND?
            </h3>
            <p className="text-sm text-white/60 font-light font-sans">
              We review proposals and scope initial consultations within 24 hours.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('contact')}
            style={{ backgroundColor: config.primaryColor || '#2563EB' }}
            className="px-8 py-4 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-3 transition-colors shrink-0 cursor-pointer shadow-lg hover:opacity-90"
          >
            <span>START A CONVERSATION</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};
