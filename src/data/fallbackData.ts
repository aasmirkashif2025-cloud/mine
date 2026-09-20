import { Project, ServiceItem, IndustryItem } from '../types';

export const ASSETS = {
  heroWorkspace: '/assets/images/agency_hero_workspace_1789562025645.jpg',
  luxeHomes: '/assets/images/luxe_homes_study_1789562049003.jpg',
  studioMinimalist: '/assets/images/studio_minimalist_1789562065344.jpg',
  cosmetics: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop',
  consultancy: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
  roofing: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
  technova: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
  architectureInterior: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
};

export const AGENCY_DETAILS = {
  name: 'Affliora Digital',
  tagline: 'We build digital experiences that move business.',
  city: 'Lahore',
  country: 'Pakistan',
  location: 'Lahore, Pakistan',
  email: 'afflioradigital@gmail.com',
  phone: '+92 322 8951557',
  whatsappUrl: 'https://wa.me/923228951557?text=Hello%20Affliora%20Digital,%20I%20would%20like%20to%20discuss%20a%20new%20project.',
  heroEyebrow: 'WEB DEVELOPMENT / DIGITAL EXPERIENCES',
  heroDescription: 'Affliora Digital creates modern websites, web applications, and digital experiences for ambitious businesses.',
  logoUrl: '',
  logoType: 'monogram' as const,
  logoText: 'AFFLIORA DIGITAL',
  logoHeight: 36,
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    id: 'web-design',
    title: 'WEB DESIGN',
    shortDesc: 'Interfaces designed to communicate authority and command attention.',
    longDesc: 'We reject cookie-cutter templates. Every layout, typographic rhythm, and micro-interaction is custom engineered to reflect your brand prestige and guide user decision-making with effortless clarity.',
    capabilities: [
      'Bespoke Art Direction & Visual Identity',
      'Editorial Layout Systems & Micro-Typography',
      'High-Fidelity Interactive Prototypes',
      'Responsive Mobile-First Architecture',
      'Design Systems & UI Pattern Libraries'
    ],
    deliverables: ['Complete Figma Design System', 'Component Guidelines', 'Interactive Prototypes', 'Asset Production Library'],
    technologies: ['Figma', 'Design Systems', 'CSS Grid', 'Typography Engineering'],
    highlight: 'Authority-focused aesthetics that separate category leaders from ordinary competitors.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop'
  },
  {
    number: '02',
    id: 'web-development',
    title: 'WEB DEVELOPMENT',
    shortDesc: 'Fast, scalable and conversion-focused digital experiences.',
    longDesc: 'Clean, modern code engineered for sub-second load times, flawless responsiveness, and robust search indexing. We build with modern frameworks that scale seamlessly as your business expands.',
    capabilities: [
      'Custom React & Next.js Development',
      'Tailwind CSS Architecture & Strict Modular CSS',
      'Advanced Motion & Parallax Engineering',
      'Core Web Vitals & Sub-Second Page Speed Tuning',
      'Semantic Search Engine Optimization'
    ],
    deliverables: ['Production Codebase', 'Lighthouse 95+ Audit', 'SEO Schema Metadata', 'Cross-Browser Certified Build'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion Engine'],
    highlight: 'Rock-solid front-end execution with 99.9% uptime and instant interaction states.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop'
  },
  {
    number: '03',
    id: 'fullstack-apps',
    title: 'FULL-STACK APPLICATIONS',
    shortDesc: 'Custom software built around real business workflows.',
    longDesc: 'Beyond brochure websites, we architect high-performance internal tools, customer portals, custom dashboards, and business automation platforms that eliminate operational friction.',
    capabilities: [
      'Enterprise Web Applications & Dashboards',
      'REST & GraphQL API Engineering',
      'Database Architecture & Relational Modeling',
      'Secure User Authentication & RBAC Rules',
      'Third-Party Systems Integration'
    ],
    deliverables: ['Scalable Full-Stack Architecture', 'API Documentation', 'Automated Testing Suite', 'Cloud Infrastructure Setup'],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Cloud Infrastructure', 'REST/GraphQL'],
    highlight: 'Transform manual friction into automated, high-margin software workflows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop'
  },
  {
    number: '04',
    id: 'ecommerce',
    title: 'E-COMMERCE',
    shortDesc: 'Bespoke storefronts engineered for transactional speed and aesthetic prestige.',
    longDesc: 'We craft frictionless shopping experiences that mirror luxury flagship stores. From streamlined one-page checkouts to dynamic product visualizers, every touchpoint drives basket value.',
    capabilities: [
      'Custom Headless Commerce Architecture',
      'High-Conversion Product Pages & Cart Flow',
      'Real-time Inventory & Payment Gateway Sync',
      'Customer Retention & Subscription Engines',
      'Global Currency & Multi-Region Support'
    ],
    deliverables: ['Headless Storefront', 'Payment Gateway Integration', 'Inventory Management Bridge', 'Conversion Analytics Suite'],
    technologies: ['Stripe', 'Headless Commerce', 'Next.js', 'Tailwind', 'Redis'],
    highlight: 'Frictionless checkout psychology paired with luxury editorial product presentation.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop'
  },
  {
    number: '05',
    id: 'ui-ux-design',
    title: 'UI/UX DESIGN',
    shortDesc: 'Human-centered architectural design systems that make complexity intuitive.',
    longDesc: 'Deep behavioral research and user journey mapping transform complex user journeys into instinctual workflows. We design interfaces that require no onboarding manual to master.',
    capabilities: [
      'Customer Journey & Empathy Mapping',
      'Information Architecture & Navigation Hierarchies',
      'Usability Testing & Conversion Friction Audits',
      'Component Tokenization & Accessibility (WCAG AA)',
      'Multi-Platform Experience Continuity'
    ],
    deliverables: ['User Flow Blueprints', 'Wireframe Systems', 'Interactive Usability Reports', 'Tokenized Design Specs'],
    technologies: ['Figma', 'FigJam', 'WCAG AA Standards', 'Usability Telemetry'],
    highlight: 'Eradicate drop-off by aligning spatial logic with natural cognitive behaviors.',
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?q=80&w=1600&auto=format&fit=crop'
  },
  {
    number: '06',
    id: 'digital-experiences',
    title: 'DIGITAL EXPERIENCES',
    shortDesc: 'Immersive web environments with bespoke motion and storytelling.',
    longDesc: 'Award-grade creative technology combining cinematic transitions, fluid scroll choreography, dynamic canvas rendering, and spatial storytelling that leave an indelible impression on clients.',
    capabilities: [
      'Kinetic Typography & Staggered Reveal Choreography',
      'Hardware-Accelerated WebGL & Canvas Shaders',
      'Interactive Product Showcases & 3D Spatial Renders',
      'Sound Design & Audio Feedback Micro-Triggers',
      'Editorial Narrative Pacing'
    ],
    deliverables: ['Custom Motion Library', 'Shader Shaders & Canvas Pipelines', 'Asset Optimization Pipeline'],
    technologies: ['Motion API', 'Canvas API', 'SVG Interpolation', 'Audio Context'],
    highlight: 'Turn digital brand presence into an unforgettable cultural landmark.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop'
  },
  {
    number: '07',
    id: 'ai-solutions',
    title: 'AI-POWERED SOLUTIONS',
    shortDesc: 'Intelligent automation and generative AI integration for business workflows.',
    longDesc: 'We help modern businesses embed smart AI features into their digital products. From intelligent semantic search and AI customer concierges to automated document synthesis and content workflows.',
    capabilities: [
      'LLM Integration (Gemini, Claude, OpenAI)',
      'Intelligent Client Concierges & Conversational UI',
      'Automated Data Extraction & Document Analysis',
      'Vector Search & Domain Grounded Retrieval',
      'Smart Workflow Automation'
    ],
    deliverables: ['Trained AI Workflows', 'API Middleware Security Layer', 'Custom Chat/Query Interfaces'],
    technologies: ['Gemini 2.5/Flash', 'LangChain', 'Vector Stores', 'Edge Functions'],
    highlight: 'Real business utility from generative AI without gimmicks or latency.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1600&auto=format&fit=crop'
  },
  {
    number: '08',
    id: 'website-optimization',
    title: 'WEBSITE OPTIMIZATION & CONSULTING',
    shortDesc: 'Strategic performance tuning, SEO dominance, and commercial auditing.',
    longDesc: 'Diagnosing bottlenecks in digital infrastructure. We audit speed, accessibility, technical SEO, and conversion friction to guarantee that your digital investment yields maximum return.',
    capabilities: [
      'Core Web Vitals Diagnostic & Speed Acceleration',
      'Technical SEO Structure & Schema Architecture',
      'Conversion Rate Optimization (CRO) Roadmaps',
      'Legacy Code Modernization & Migration',
      'Digital Architecture Strategic Advisory'
    ],
    deliverables: ['Comprehensive Performance Audit', 'Actionable Execution Roadmap', 'Benchmarking Reports'],
    technologies: ['Lighthouse', 'Search Console Tools', 'Profiling Tools', 'PageSpeed Insights'],
    highlight: 'Transform underperforming digital assets into market-dominating revenue drivers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop'
  }
];

export const PROJECTS_LIST: Project[] = [
  {
    id: 'luxe-homes',
    number: '01',
    name: 'LUXE HOMES',
    client: 'Luxe Homes International',
    industry: 'Luxury Real Estate',
    year: '2026',
    tagline: 'Modern Living Redefined',
    description: 'An architectural digital flagship for ultra-luxury residential properties across prime metropolitan markets.',
    challenge: 'High-net-worth real estate buyers were bouncing from standard MLS-style listings that felt cluttered, slow, and uninspiring. The brand needed an experience that conveyed the tactile grandeur of a multimillion-dollar private villa.',
    solution: 'Affliora Digital engineered a full-viewport cinematic showcase featuring ambient evening lighting, fluid architectural floor-plan navigation, and curated property narratives designed to evoke immediate emotional desire.',
    services: ['Web Design', 'Web Development', 'Editorial Art Direction', 'Performance Tuning'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion Engine'],
    metrics: [
      { label: 'Session Duration', value: '+142%' },
      { label: 'Inquiry Quality', value: '3.8x' },
      { label: 'Page Load Speed', value: '0.68s' }
    ],
    image: ASSETS.luxeHomes,
    featured: true
  },
  {
    id: 'aasmir-cosmetics',
    number: '02',
    name: 'AASMIR COSMETICS',
    client: 'Aasmir Luxury Botanicals',
    industry: 'Retail & E-Commerce',
    year: '2026',
    tagline: 'Artisanal Botanical Formulations',
    description: 'A high-converting direct-to-consumer digital boutique and real-time inventory management platform for prestige botanical skincare.',
    challenge: 'Bridging the physical-to-digital gap in high-end cosmetic formulations while supporting rapid multi-warehouse inventory updates and high-surge flash sales.',
    solution: 'We engineered a dark luxury editorial storefront with zero checkout friction, ingredient provenance interactive cards, and automated inventory sync across global fulfillment hubs.',
    services: ['UI/UX Design', 'Full-Stack Development', 'Headless E-Commerce', 'Inventory System'],
    techStack: ['React', 'Express API', 'Tailwind CSS', 'Stripe Integration'],
    metrics: [
      { label: 'Mobile Conversion', value: '+48%' },
      { label: 'Average Order Value', value: '+35%' },
      { label: 'Zero Cart Friction', value: '99.4%' }
    ],
    image: ASSETS.cosmetics,
    featured: true
  },
  {
    id: 'immigration-consultancy',
    number: '03',
    name: 'IMMIGRATION CONSULTANCY',
    client: 'Apex Global Mobility',
    industry: 'Professional Consultancy',
    year: '2026',
    tagline: 'Sovereign Advisory & Cross-Border Relocation',
    description: 'An authoritative digital gateway for executive visas, global citizenship, and cross-border corporate relocation services.',
    challenge: 'High-stakes legal and immigration clients required immediate trust, discreet consultation scheduling, and straightforward clarity on complex multi-tier immigration programs.',
    solution: 'Designed an elegant, restrained corporate digital environment with interactive eligibility self-assessments, secure encrypted client intake, and instant consultation scheduling.',
    services: ['Web Design', 'Custom Intake Workflows', 'Brand Positioning', 'SEO Strategy'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Form Security Modules'],
    metrics: [
      { label: 'Lead Conversion', value: '+92%' },
      { label: 'Intake Automation', value: '80%' },
      { label: 'Client Trust Rating', value: '98%' }
    ],
    image: ASSETS.consultancy,
    featured: true
  },
  {
    id: 'empire-roofing',
    number: '04',
    name: 'EMPIRE ROOFING',
    client: 'Empire Commercial Contracting',
    industry: 'Commercial Construction & Roofing',
    year: '2025',
    tagline: 'Architectural Roofing for Commercial Landmarks',
    description: 'A high-authority contractor platform establishing market supremacy in commercial roofing, industrial cladding, and structural restoration.',
    challenge: 'Breaking out of the low-end "local handyman" contractor stereotype to win multimillion-dollar commercial municipal and industrial construction tenders.',
    solution: 'Built a bold, monolithic architectural site highlighting technical certifications, past civic projects, live project tracking, and an automated project estimator.',
    services: ['Digital Strategy', 'Web Development', 'Interactive Estimator', 'Local SEO'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Dynamic Quoting Engine'],
    metrics: [
      { label: 'Tender Inquiries', value: '+215%' },
      { label: 'Commercial Contract Value', value: '4.2x' },
      { label: 'Google Top 3 Rankings', value: '18 terms' }
    ],
    image: ASSETS.roofing,
    featured: true
  },
  {
    id: 'technova',
    number: '05',
    name: 'TECHNOVA',
    client: 'Technova Hardware Labs',
    industry: 'Technology E-Commerce & Hardware',
    year: '2026',
    tagline: 'Precision Computing Hardware & Systems',
    description: 'An immersive digital storefront showcasing next-generation computing hardware, enterprise workstations, and modular peripherals.',
    challenge: 'Communicating dense engineering specifications without overwhelming non-technical procurement decision makers or boring enthusiast hardware buyers.',
    solution: 'Interactive 360 exploded-view hardware explorer, dynamic specification comparison grids, and instantaneous hardware configurator built on clean component logic.',
    services: ['Web Design', 'Full-Stack Development', 'Interactive 3D Configurator', 'Speed Optimization'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WebGL Canvas Engine'],
    metrics: [
      { label: 'Configurator Engagement', value: '+310%' },
      { label: 'Checkout Abandonment', value: '-34%' },
      { label: 'Global Traffic Latency', value: '<40ms' }
    ],
    image: ASSETS.technova,
    featured: true
  }
];

export const INDUSTRIES_LIST: IndustryItem[] = [
  {
    id: 'real-estate',
    number: '01',
    title: 'REAL ESTATE',
    subtitle: 'Luxury developments, boutique brokerages & commercial syndicates',
    description: 'In prime real estate, perception is price. We build immersive property showcases with virtual walk-throughs, dynamic neighborhood context, and floor-plan choreography that attract high-net-worth investors.',
    challenges: ['Generic MLS listings look cheap', 'Slow image-heavy pages frustrate mobile buyers', 'Lack of emotional brand storytelling'],
    solutions: ['Full-bleed architectural galleries', 'Sub-second asset compression', 'VIP private viewing booking funnels'],
    recommendedServices: ['Web Design', 'Web Development', 'Digital Experiences'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'immigration-consultancies',
    number: '02',
    title: 'IMMIGRATION CONSULTANCIES',
    subtitle: 'Global mobility, investor visas & cross-border relocation',
    description: 'Clients entrusting their family future and capital require unquestioned authority. We design dignified, crystal-clear digital presences that filter qualified applicants and streamline legal compliance.',
    challenges: ['Complex legal jargon confuses prospects', 'High drop-off on lengthy intake forms', 'Difficult to convey international legitimacy'],
    solutions: ['Interactive step-by-step visa eligibility checkers', 'Multi-lingual language support', 'Frictionless consultation booking'],
    recommendedServices: ['Full-Stack Applications', 'Web Design', 'SEO Strategy'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'legal',
    number: '03',
    title: 'LEGAL & LAW PRACTICES',
    subtitle: 'Corporate law, litigation, intellectual property & private client counsel',
    description: 'Modern legal leaders need websites that command boardroom respect. We replace dense text walls with crisp typography, practice-area hierarchies, and verified case outcome chronicles.',
    challenges: ['Outdated websites undermine partner credentials', 'No clear conversion pathway for high-retainer clients', 'Poor mobile accessibility'],
    solutions: ['Editorial typography systems', 'Practice-specific landing pages', 'Secure client portal integrations'],
    recommendedServices: ['Web Design', 'Web Development', 'Content Architecture'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'healthcare',
    number: '04',
    title: 'HEALTHCARE & SPECIALTY CLINICS',
    subtitle: 'Private surgical clinics, regenerative medicine & medical centers',
    description: 'Patients seeking specialized medical care demand utmost reassurance, clinical excellence, and effortless appointment coordination. We craft patient-first digital journeys.',
    challenges: ['Anxiety-inducing clunky interfaces', 'HIPAA/confidentiality requirements', 'Fragmented booking software'],
    solutions: ['Calming, modern medical art direction', 'Direct calendar sync with clinic management software', 'Doctor credential spotlights'],
    recommendedServices: ['UI/UX Design', 'Full-Stack Applications', 'Digital Experiences'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'dental',
    number: '05',
    title: 'DENTAL & COSMETIC DENTISTRY',
    subtitle: 'Cosmetic smile design, orthodontics & modern dental studios',
    description: 'Transform dental consultations from a clinical chore into a luxury lifestyle investment with stunning before/after showcases and smile preview simulators.',
    challenges: ['Commoditized competition on price', 'Poor visual demonstration of cosmetic outcomes', 'Missed lead follow-ups'],
    solutions: ['Interactive before-and-after comparison sliders', 'Treatment visualizers', 'Instant WhatsApp inquiry integration'],
    recommendedServices: ['Web Design', 'Conversion Optimization', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'construction',
    number: '06',
    title: 'CONSTRUCTION & ARCHITECTURE',
    subtitle: 'General contractors, commercial builders & architectural studios',
    description: 'Showcase structural craftsmanship, safety records, and project scale with monolithic layout designs and comprehensive project dossiers that win tenders.',
    challenges: ['Hard to demonstrate physical scale online', 'Outdated portfolio galleries', 'Lack of clear commercial bid intake'],
    solutions: ['Cinematic project case study showcases', 'Milestone & timeline visualizers', 'Commercial RFP inquiry flows'],
    recommendedServices: ['Web Design', 'Web Development', 'Digital Consulting'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'roofing',
    number: '07',
    title: 'ROOFING & EXTERIORS',
    subtitle: 'Commercial roofing contractors & residential exterior specialists',
    description: 'Elevate your roofing enterprise above standard local ads with an authoritative platform showcasing storm response capabilities, material guarantees, and interactive project estimators.',
    challenges: ['Distrust of contractor industry', 'Unclear pricing causing client hesitation', 'Low local organic ranking'],
    solutions: ['Interactive square-footage instant estimator', 'Warranty & license transparency', 'Localized commercial SEO architecture'],
    recommendedServices: ['Web Development', 'Interactive Tools', 'SEO & Speed Tuning'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'ecommerce',
    number: '08',
    title: 'E-COMMERCE & LUXURY RETAIL',
    subtitle: 'Direct-to-consumer brands, curated fashion & boutique lifestyle products',
    description: 'Deliver the tactile exclusivity of an avenue boutique directly through the browser with fluid cart transitions and rapid checkout speeds.',
    challenges: ['High cart abandonment rates', 'Slow loading product catalogs', 'Generic Shopify template appearance'],
    solutions: ['Headless architecture with sub-second page transitions', 'One-click modern checkout', 'Bespoke editorial product storytelling'],
    recommendedServices: ['E-Commerce', 'UI/UX Design', 'Full-Stack Applications'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'technology',
    number: '09',
    title: 'TECHNOLOGY & SAAS',
    subtitle: 'Hardware innovators, software platforms & AI infrastructure',
    description: 'Translate cutting-edge technical capabilities into clear enterprise value propositions that convince both engineers and C-suite budget controllers.',
    challenges: ['Abstract product features hard to visualize', 'High customer acquisition costs', 'Slow demo booking velocity'],
    solutions: ['Interactive product playgrounds & live feature sandboxes', 'Clear architectural diagrams', 'Frictionless enterprise demo request flows'],
    recommendedServices: ['Full-Stack Applications', 'AI Solutions', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'fitness',
    number: '10',
    title: 'FITNESS & WELLNESS',
    subtitle: 'Boutique fitness clubs, wellness retreats & longevity studios',
    description: 'Channel energy and community belonging into an inspiring digital front door with seamless membership tiering and class booking.',
    challenges: ['Confusing membership options', 'Poor integration with gym management apps', 'Dull visual design'],
    solutions: ['High-energy editorial video/imagery integration', 'Simplified membership tiers', 'Real-time class schedule booking'],
    recommendedServices: ['Web Design', 'Web Development', 'Mobile Optimization'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'professional-services',
    number: '11',
    title: 'PROFESSIONAL SERVICES',
    subtitle: 'Management consulting, executive search & wealth advisory',
    description: 'When your product is intellectual capital and strategic expertise, your website must radiate unshakeable competence, clarity, and discernment.',
    challenges: ['Intangible services hard to quantify', 'Wall-of-text disease', 'Generic corporate stock photos'],
    solutions: ['Insight and whitepaper publishing engine', 'Authoritative leadership profiles', 'Strategic inquiry qualification workflows'],
    recommendedServices: ['Web Design', 'Digital Consulting', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop'
  }
];

export const AGENCY_STATS = [
  { label: 'DIGITAL EXPERIENCES', detail: 'Tailored for Category Leaders' },
  { label: 'FULL-STACK DEVELOPMENT', detail: 'React, TypeScript, Modern Cloud' },
  { label: 'RESPONSIVE DESIGN', detail: 'Engineered for Mobile & Desktop' },
  { label: 'BUSINESS-FOCUSED', detail: 'Conversion & Prestige Aligned' },
];
