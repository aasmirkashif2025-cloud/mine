import { ProcessStage } from '../types';

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    name: 'DISCOVER',
    tagline: 'Deep immersion, strategic auditing & commercial alignment',
    duration: 'Week 1',
    description: 'We begin by deconstructing your business objectives, target buyer psychology, market landscape, and competitive gaps. We identify what will truly move the commercial needle for your company.',
    activities: [
      'Executive stakeholder interviews',
      'Target client persona and decision journey mapping',
      'Competitor visual and technical auditing',
      'Technical architecture and integration review',
      'Core conversion metric definitions'
    ],
    deliverables: ['Strategic Creative Brief', 'Technical Scope Document', 'Project Architecture Blueprint']
  },
  {
    number: '02',
    name: 'DEFINE',
    tagline: 'Information architecture, wireframes & user choreography',
    duration: 'Week 2',
    description: 'Structuring the digital narrative before a single pixel of final styling is applied. We design the wireframes and user flow hierarchies to ensure frictionless navigation and irresistible conversion pathways.',
    activities: [
      'Sitemap and content choreography',
      'Low-fidelity and medium-fidelity wireframing',
      'Conversion funnel engineering',
      'Micro-copy and editorial content structure',
      'Interactive prototype validation'
    ],
    deliverables: ['Clickable Wireframe Prototype', 'Content Hierarchy Map', 'SEO Architecture Schema']
  },
  {
    number: '03',
    name: 'DESIGN',
    tagline: 'Bespoke art direction, typography hierarchy & luxury styling',
    duration: 'Weeks 3 – 4',
    description: 'Where our agency aesthetic comes alive. We establish a tailor-made design system combining razor-sharp typography, cinematic dark atmosphere, precise spatial balance, and restrained electric accents.',
    activities: [
      'Art direction and bespoke moodboard generation',
      'Custom typography and mathematical scale definition',
      'High-fidelity component and screen design',
      'Interactive motion and hover choreography exploration',
      'Mobile-responsive layout choreography'
    ],
    deliverables: ['Complete High-Fidelity UI System in Figma', 'Motion Choreography Specs', 'Design Token Library']
  },
  {
    number: '04',
    name: 'DEVELOP',
    tagline: 'Modern React & TypeScript engineering with pixel precision',
    duration: 'Weeks 4 – 6',
    description: 'We translate design into high-velocity production code. Clean, modular TypeScript and modern React components backed by hardware-accelerated animations and strict architectural standards.',
    activities: [
      'Component-driven modern React & TypeScript architecture',
      'Tailwind CSS styling and responsive viewport tuning',
      'Subtle motion and scroll-triggered parallax implementation',
      'API routing, database connections, and webhook wiring',
      'Cross-browser and multi-device QA validation'
    ],
    deliverables: ['Production-Ready Web Application', 'Clean Modular Codebase', 'API Integration Layer']
  },
  {
    number: '05',
    name: 'REFINE',
    tagline: 'Performance tuning, Core Web Vitals audit & security checks',
    duration: 'Week 7',
    description: 'Obsessive optimization. We eliminate render-blocking assets, optimize image delivery pipelines, enforce WCAG accessibility standards, and ensure 95+ scores on Google PageSpeed Insights.',
    activities: [
      'Lighthouse & Core Web Vitals sub-second tuning',
      'Asset compression and lazy-loading validation',
      'Semantic SEO tag and JSON-LD structured data verification',
      'Form security and client-side sanitization validation',
      'Real-device responsive touch-target stress tests'
    ],
    deliverables: ['Lighthouse 95+ Audit Certificate', 'Security & Accessibility Compliance Report', 'Staging Test Approval']
  },
  {
    number: '06',
    name: 'LAUNCH',
    tagline: 'Seamless deployment, analytics setup & strategic evolution',
    duration: 'Week 8 & Ongoing',
    description: 'We orchestrate zero-downtime deployment, connect domain DNS, configure conversion analytics, and provide client training so your team can move forward with total autonomy.',
    activities: [
      'Zero-downtime production deployment',
      'Google Analytics 4 & Meta Pixel event verification',
      'Search Console sitemap submission and index request',
      'Client team handoff and documentation walk-through',
      'Ongoing post-launch performance monitoring'
    ],
    deliverables: ['Live Production Deployment', 'Handoff Video Tutorials', 'Post-Launch 30-Day Support Period']
  }
];
