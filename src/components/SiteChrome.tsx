'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ConsultationModal } from './ConsultationModal';
import { BrandIntro } from './BrandIntro';
import { CursorTrail } from './CursorTrail';
import { ConsultationProvider } from './ConsultationContext';
import { Service, COMPANY_DATA } from '../data/content';
import { WhatsAppIcon } from './ui/WhatsAppIcon';

export const SiteChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const pathname = usePathname() ?? '';

  const [showBrandIntro, setShowBrandIntro] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const isIntroDisabled = window.location.search.includes('nointro');
      const hasSeen =
        sessionStorage.getItem('vpd_intro_shown') ||
        sessionStorage.getItem('vpd_brand_intro_seen');
      // Only play the brand intro animation on the home page root ('/')
      if (!isIntroDisabled && !hasSeen && (pathname === '/' || pathname === '')) {
        setShowBrandIntro(true);
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, [pathname]);

  const handleDismissIntro = () => {
    setShowBrandIntro(false);
    try {
      sessionStorage.setItem('vpd_intro_shown', 'true');
      sessionStorage.setItem('vpd_brand_intro_seen', 'true');
    } catch {
      // Ignore sessionStorage errors
    }
  };

  // Support replaying intro via custom event if triggered from footer or elsewhere
  useEffect(() => {
    const handleReplayIntro = () => {
      setShowBrandIntro(true);
    };
    window.addEventListener('replay_brand_intro', handleReplayIntro);
    return () => window.removeEventListener('replay_brand_intro', handleReplayIntro);
  }, []);

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
        <main className="relative flex-grow">{children}</main>

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
              className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#141416]/95 hover:bg-[#1a1a1e] text-white hover:text-[#25D366] border border-[#2e2e32] hover:border-[#25D366]/50 rounded-full shadow-2xl hover:shadow-[0_4px_24px_rgba(37,211,102,0.28)] backdrop-blur-md transition-all duration-200 hover:scale-105 group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              title="Direct WhatsApp Support: +91 83339 19447"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
            </a>
          </aside>
        )}
      </div>
    </ConsultationProvider>
  );
};

export default SiteChrome;
