import React, { useState } from 'react';
import { PageId, ContactFormData } from '../types';
import { ArrowRight, Mail, MapPin, Phone, MessageSquare, CheckCircle2, Sparkles, Send, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

const PROJECT_TYPES = [
  'Custom Web Design',
  'Web Development (React/Next)',
  'Full-Stack Web App',
  'Luxury E-Commerce',
  'UI/UX Design System',
  'AI Integration / Workflow',
  'Core Web Vitals Optimization',
  'Complete Digital Rebrand'
];

const BUDGET_RANGES = [
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000+'
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { config, submitInquiry, getWhatsAppUrl, getMailtoUrl } = useSite();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: PROJECT_TYPES[0],
    budget: BUDGET_RANGES[1],
    timeline: 'Within 1–2 Months',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const res = await submitInquiry(formData);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(res.error || 'Failed to submit inquiry. Please retry or contact directly via WhatsApp.');
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = `Hello ${config.name},\n\nI am contacting you from your website.\nName: ${formData.name || 'Prospective Client'}\nCompany: ${formData.company || 'N/A'}\nProject: ${formData.projectType}\nBudget: ${formData.budget}\nMessage: ${formData.message || 'I would like to discuss scoping a new digital project.'}`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div id="contact-page" className="relative w-full bg-[#08090b] text-[#e2e4e9] pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* 1. Header with Staggered Entrance */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-xs font-semibold" style={{ color: config.primaryColorLight || '#3B82F6' }}>
            07
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
            INITIATE COMMISSION
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight text-white font-display leading-[0.95]"
          >
            LET’S BUILD <br />
            SOMETHING <br />
            <span className="font-editorial italic font-normal text-white/85 lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              that matters.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mt-8 max-w-2xl font-sans"
          >
            Whether you are launching a transformative venture or repositioning an established enterprise, we engineer digital experiences that separate category leaders from ordinary contenders.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Studio Dossier */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-4">
              <span
                className="text-xs font-mono tracking-[0.2em] uppercase block"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              >
                {config.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-display">
                DIRECT STUDIO ACCESS
              </h2>
              <p className="text-sm text-white/60 font-light leading-relaxed font-sans">
                We accept a strictly limited number of commissions per quarter to ensure senior principal attention on every project.
              </p>
            </div>

            {/* Coordinates & Contact Cards with Motion Hover */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 4 }}
                className="p-6 bg-white/[0.02] border border-white/10 space-y-1 transition-all"
              >
                <div
                  className="flex items-center gap-2 text-xs font-mono uppercase"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Physical Headquarters</span>
                </div>
                <p className="text-base font-medium text-white font-sans">
                  {config.location}
                </p>
                <p className="text-xs text-white/50 font-light font-sans">
                  {config.city}, {config.country} & Worldwide Client Commissions
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="p-6 bg-white/[0.02] border border-white/10 space-y-1 transition-all"
              >
                <div
                  className="flex items-center gap-2 text-xs font-mono uppercase"
                  style={{ color: config.primaryColorLight || '#3B82F6' }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Electronic Mail</span>
                </div>
                <a
                  href={getMailtoUrl()}
                  className="text-base font-mono text-white hover:underline transition-colors block"
                >
                  {config.email}
                </a>
                <p className="text-xs text-white/50 font-light font-sans">
                  Direct inbox monitored by creative directors
                </p>
              </motion.div>

              {config.phone && (
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-6 bg-white/[0.02] border border-white/10 space-y-1 transition-all"
                >
                  <div
                    className="flex items-center gap-2 text-xs font-mono uppercase"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Telephone Line</span>
                  </div>
                  <a
                    href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-base font-mono text-white hover:underline transition-colors block"
                  >
                    {config.phone}
                  </a>
                  <p className="text-xs text-white/50 font-light font-sans">
                    Voice inquiries & executive consultations
                  </p>
                </motion.div>
              )}

              {/* Instant WhatsApp Concierge */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-6 border space-y-3 bg-[#0d121c]/70 transition-all"
                style={{ borderColor: config.primaryColorGlow || 'rgba(37, 99, 235, 0.3)' }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-2 text-xs font-mono uppercase"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Instant Messaging</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                    ONLINE NOW
                  </span>
                </div>
                <p className="text-sm text-white/80 font-light font-sans">
                  Need a rapid scoping discussion or preliminary ballpark? Message our principals directly on WhatsApp.
                </p>
                <button
                  onClick={handleWhatsAppRedirect}
                  style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                  className="w-full py-3 px-4 text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg hover:opacity-90"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>START WHATSAPP CHAT</span>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: High-End Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 md:p-14 bg-white/[0.02] border space-y-6 text-center"
                style={{ borderColor: config.primaryColorGlow || 'rgba(37, 99, 235, 0.4)' }}
              >
                <div
                  className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto"
                  style={{
                    backgroundColor: config.primaryColorGlow || 'rgba(37, 99, 235, 0.1)',
                    borderColor: config.primaryColorLight || '#3B82F6',
                    color: config.primaryColorLight || '#3B82F6',
                  }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span
                    className="text-xs font-mono uppercase tracking-widest block"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  >
                    TRANSMISSION RECORDED // STORED IN SECURE CRM
                  </span>
                  <h3 className="text-3xl font-extrabold uppercase text-white font-display">
                    THANK YOU, {formData.name || 'VALUED PARTNER'}.
                  </h3>
                  <p className="text-base text-white/70 font-light max-w-md mx-auto leading-relaxed font-sans">
                    Our creative directors at {config.name} have received your project dossier. We will review your requirements and respond directly to <span className="font-mono text-white">{formData.email}</span> within 24 hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleWhatsAppRedirect}
                    style={{ backgroundColor: config.primaryColor || '#2563EB' }}
                    className="w-full sm:w-auto px-6 py-3 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>EXPEDITE VIA DIRECT WHATSAPP</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        projectType: PROJECT_TYPES[0],
                        budget: BUDGET_RANGES[1],
                        timeline: 'Within 1–2 Months',
                        message: ''
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3 border border-white/20 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              </motion.div>
            ) : (
              <form
                id="agency-project-inquiry-form"
                onSubmit={handleSubmit}
                className="p-8 md:p-12 bg-white/[0.02] border border-white/10 space-y-8"
              >
                <div>
                  <span
                    className="text-xs font-mono uppercase tracking-[0.2em] block mb-2"
                    style={{ color: config.primaryColorLight || '#3B82F6' }}
                  >
                    CONFIDENTIAL DOSSIER // DIRECT DATABASE SYNC
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">
                    TELL US ABOUT YOUR PROJECT
                  </h3>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                      YOUR NAME *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marcus Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/15 focus:outline-none focus:border-white/40 text-white text-sm placeholder-white/20 font-light"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                      BUSINESS EMAIL *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. marcus@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/15 focus:outline-none focus:border-white/40 text-white text-sm placeholder-white/20 font-light"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                      PHONE / WHATSAPP NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +92 300 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/15 focus:outline-none focus:border-white/40 text-white text-sm placeholder-white/20 font-light"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                      COMPANY / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sterling Holdings"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/15 focus:outline-none focus:border-white/40 text-white text-sm placeholder-white/20 font-light"
                    />
                  </div>
                </div>

                {/* Project Type Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                    PROJECT SCOPE / TYPE
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          style={{
                            backgroundColor: isSelected ? config.primaryColor || '#2563EB' : undefined,
                            borderColor: isSelected ? config.primaryColor || '#2563EB' : undefined,
                          }}
                          className={`px-3.5 py-2.5 text-xs text-left font-sans transition-all cursor-pointer ${
                            isSelected
                              ? 'text-white font-medium border shadow-md'
                              : 'bg-black/40 text-white/60 hover:text-white border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Bracket */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                    ANTICIPATED INVESTMENT BRACKET
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGET_RANGES.map((b) => {
                      const isSelected = formData.budget === b;
                      return (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          style={{
                            backgroundColor: isSelected ? config.primaryColor || '#2563EB' : undefined,
                            borderColor: isSelected ? config.primaryColor || '#2563EB' : undefined,
                          }}
                          className={`px-3 py-2 text-xs font-mono text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'text-white border shadow-md'
                              : 'bg-black/40 text-white/60 hover:text-white border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message / Strategic Objectives */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                    COMMERCIAL OBJECTIVES & DETAILS *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your brand vision, key challenges, target launch date, or existing website URL..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/15 focus:outline-none focus:border-white/40 text-white text-sm placeholder-white/20 font-light resize-none leading-relaxed font-sans"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="submit-project-inquiry-btn"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: config.primaryColor || '#2563EB',
                    boxShadow: `0 10px 25px ${config.primaryColorGlow || 'rgba(37, 99, 235, 0.25)'}`,
                  }}
                  className="w-full py-4 px-8 text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer disabled:opacity-50 hover:opacity-90"
                >
                  {isSubmitting ? (
                    <span>RECORDING ENCRYPTED DOSSIER...</span>
                  ) : (
                    <>
                      <span>TRANSMIT PROJECT INQUIRY</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                <p className="text-[11px] font-mono text-white/40 text-center">
                  Strict client confidentiality guaranteed under mutual non-disclosure agreement.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 3. Global Studio Headquarters Map Section with Marked Location */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-6 md:p-10 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div
                className="flex items-center gap-2 text-xs font-mono mb-2"
                style={{ color: config.primaryColorLight || '#3B82F6' }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: config.primaryColorLight || '#3B82F6' }}
                />
                <span className="uppercase tracking-widest font-semibold">
                  LIVE STUDIO LOCATION // ADMIN MARKED
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-display">
                {config.location || `${config.city}, ${config.country}`}
              </h3>
              <p className="text-xs text-white/60 font-mono mt-1">
                COORDINATES: {config.city}, {config.country} • VISITORS WELCOMED BY EXECUTIVE APPOINTMENT
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.location || `${config.city}, ${config.country}` || 'Lahore, Pakistan')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Frame */}
          <div className="relative w-full h-80 sm:h-96 md:h-[440px] rounded overflow-hidden border border-white/15 bg-black/70 shadow-2xl">
            <iframe
              title={`Map marking ${config.location || config.name}`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(115%) brightness(90%)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(config.location || `${config.city}, ${config.country}` || 'Lahore, Pakistan')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />

            {/* Custom Luxury Floating Pin Badge */}
            <div className="absolute top-4 left-4 p-4 bg-black/90 backdrop-blur-xl border border-white/25 shadow-2xl pointer-events-none hidden sm:block max-w-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white font-display uppercase tracking-tight">
                  {config.name} HEADQUARTERS
                </span>
              </div>
              <p className="text-[12px] text-white/80 font-sans leading-snug">
                {config.location}
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>LOCATION STATUS: ACTIVE</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
