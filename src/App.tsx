import React, { useState, useEffect, Suspense, lazy } from 'react';
import { PageId, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { CustomCursor } from './components/CustomCursor';
import { NoiseOverlay } from './components/NoiseOverlay';
import { SiteProvider } from './context/SiteContext';
import { HomePage } from './pages/HomePage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';

// Lazy-loaded heavy pages to dramatically reduce initial bundle size and speed up first paint
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal').then((m) => ({ default: m.CaseStudyModal })));

function PageLoadingFallback() {
  return (
    <div
      id="page-lazy-loading-fallback"
      className="min-h-[60vh] flex flex-col items-center justify-center py-32 px-6 text-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative w-12 h-12 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" />
        <div className="w-8 h-8 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
      </div>
      <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
        Loading View...
      </p>
    </div>
  );
}

export function MainLayout() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Synchronize with window URL hash for browser history & direct URL bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'services',
        'work',
        'industries',
        'process',
        'contact',
        'admin',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} onSelectProject={handleSelectProject} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} />;
      case 'work':
        return <WorkPage onNavigate={navigateTo} onSelectProject={handleSelectProject} />;
      case 'industries':
        return <IndustriesPage onNavigate={navigateTo} />;
      case 'process':
        return <ProcessPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'admin':
        return <AdminPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} onSelectProject={handleSelectProject} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e2e4e9] flex flex-col justify-between selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      {/* 1. Global Navigation */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* 2. Main Multi-Page Content with Smooth Animated Transitions wrapped in ErrorBoundary and Suspense */}
      <main className="flex-grow">
        <ErrorBoundary onReset={() => navigateTo('home')}>
          <Suspense fallback={<PageLoadingFallback />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* 3. Global Luxury Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 4. Fullscreen Case Study Dossier Modal (Lazy-Loaded on demand) */}
      {selectedProject && (
        <Suspense fallback={null}>
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNavigate={navigateTo}
          />
        </Suspense>
      )}

      {/* 5. Direct WhatsApp, Email & Admin Quick Concierge */}
      <FloatingConcierge onNavigate={navigateTo} currentPage={currentPage} />

      {/* 6. Smooth Luxury Follower Round Custom Cursor */}
      <CustomCursor />

      {/* 7. Photographic Tactile Noise Overlay for Haute Luxury Surfaces */}
      <NoiseOverlay />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SiteProvider>
        <MainLayout />
      </SiteProvider>
    </ErrorBoundary>
  );
}
