'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ConsultationModal } from './ConsultationModal';
import { BrandIntro } from './BrandIntro';
import { CursorTrail } from './CursorTrail';
import { ConsultationProvider } from './ConsultationContext';
import { Service, COMPANY_DATA } from '../data/content';
import { MessageSquare } from 'lucide-react';

export const SiteChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const pathname = usePathname() ?? '';

  // Brand Intro: disabled on initial load so landing page and video display immediately
  const [showBrandIntro, setShowBrandIntro] = useState<boolean>(false);

  const handleDismissIntro = () => {
    setShowBrandIntro(false);
  };

  // Support replaying intro via custom event if triggered from footer or elsewhere
  useEffect(() => {
    const handleReplayIntro = () => {
      setShowBrandIntro(true);
    };
    window.addEventListener('replay_brand_intro', handleReplayIntro);
    return () => window.removeEventListener('replay_brand_intro', handleReplayIntro);
  }, []);

  useLayoutEffect(() => {
    const main = document.querySelector('main');
    if (
      !main ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-scroll-reveal', 'visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    const observePageSections = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('section:not(#hero), article').forEach((element) => {
        if (element.hasAttribute('data-scroll-reveal')) return;
        const bounds = element.getBoundingClientRect();
        const isOnScreen = bounds.top < window.innerHeight && bounds.bottom > 0;
        element.setAttribute('data-scroll-reveal', isOnScreen ? 'visible' : 'pending');
        if (!isOnScreen) observer.observe(element);
      });
    };

    observePageSections(main);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) observePageSections(node);
        });
      });
    });
    mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  const handleOpenConsultation = (service?: Service) => {
    setSelectedService(service || null);
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
    setSelectedService(null);
  };

  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <ConsultationProvider
      value={{ openConsultation: handleOpenConsultation, closeConsultation: handleCloseConsultation }}
    >
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-[#c9a84c]/20 selection:text-[#c9a84c]">
        {/* Cinematic Brand Intro (dismissible, session-cached) */}
        {showBrandIntro && <BrandIntro onDismiss={handleDismissIntro} />}

        <ScrollToTop />

        {/* Global Navigation Header */}
        <Navbar onOpenConsultation={() => handleOpenConsultation()} />

        {/* Small gold spark trail that follows the mouse (desktop only, subtle) */}
        <CursorTrail />

        {/* Page Content */}
        <main className="relative z-10 flex-grow">{children}</main>

        {/* Global Enterprise Footer */}
        {!isAdminRoute && <Footer />}

        {/* Global Consultation Modal */}
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={handleCloseConsultation}
          initialService={selectedService}
        />

        {/* Direct WhatsApp Floating Trigger */}
        {!isAdminRoute && (
          <aside aria-label="Direct Technical Support">
            <a
              href={COMPANY_DATA.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#181818]/90 hover:bg-[#202020] text-white hover:text-[#22c55e] border border-[#2e2e2e] hover:border-[#22c55e]/50 rounded-full shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e]"
              title="Direct WhatsApp Support: +91 83339 19447"
            >
              <MessageSquare className="w-5 h-5 text-[#22c55e]" />
              <span className="hidden sm:inline text-xs font-semibold pr-1">
                Chat on WhatsApp
              </span>
            </a>
          </aside>
        )}
      </div>
    </ConsultationProvider>
  );
};

export default SiteChrome;
