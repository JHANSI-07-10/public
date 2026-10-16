'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { COMPANY_DATA } from '../data/content';
import { AnimatedVPDLogo } from './AnimatedVPDLogo';
import { Button } from './ui/Button';
import { AnimatedButton } from './motion/AnimatedButton';
import { motionTokens } from './motion/motionTokens';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Industries', path: '/industries' },
    { label: 'Products & Platforms', shortLabel: 'Products', path: '/products' },
    { label: 'Careers', path: '/careers' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease.snappy }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626] py-1.5 sm:py-2 shadow-xl shadow-black/50'
            : 'bg-[#0a0a0a]/92 backdrop-blur-md border-b border-white/5 py-2.5 sm:py-3'
        }`}
      >
        {/* Scroll progress indicator */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: shouldReduceMotion ? scrollYProgress : progressScaleX }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#c9a84c] via-[#D4AF37] to-[#f3d57b]"
        />
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-8">
          {/* Zone 1: Authentic Brand Monogram & Wordmark */}
          <Link
            href="/"
            className="animated-vpd-logo-link flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded-xl py-0.5 px-1 -ml-1 transition-transform duration-200 active:scale-95"
            aria-label="VPD Technologies - Home"
          >
            <div
              className={`relative flex items-center justify-center shrink-0 rounded-lg bg-[#0a0a0a] transition-all duration-300 ${
                isScrolled
                  ? 'h-9 w-[72px] sm:h-9.5 sm:w-[76px] md:h-10 md:w-[80px]'
                  : 'h-11 w-[88px] sm:h-12 sm:w-[96px] md:h-[52px] md:w-[104px]'
              }`}
            >
              <AnimatedVPDLogo />
            </div>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4.5 2xl:gap-6 text-[13px] xl:text-sm font-medium text-[#aaaaaa]">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.label}
                  href={link.path}
                  className={`relative transition-colors duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded-lg px-1.5 py-1 ${
                    isActive ? 'text-[#c9a84c] font-bold' : 'hover:text-white'
                  }`}
                >
                  <span className={link.shortLabel ? 'hidden 2xl:inline' : ''}>{link.label}</span>
                  {link.shortLabel && <span className="inline 2xl:hidden">{link.shortLabel}</span>}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-[#c9a84c] rounded-full"
                      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <AnimatedButton
              onClick={onOpenConsultation}
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="hidden xl:inline-flex"
            >
              Get a Quote
            </AnimatedButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[38px] min-h-[38px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center text-[#aaaaaa] hover:text-white bg-[#161616] border border-[#2a2a2a] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Responsive Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy }}
            className="fixed inset-0 z-40 md:hidden bg-black/92 backdrop-blur-xl pt-20 sm:pt-24 px-6 flex flex-col justify-between pb-8"
            role="dialog"
            aria-modal="true"
          >
            <div className="space-y-2">
              <div className="text-xs font-bold tracking-widest text-[#777777] uppercase mb-4 px-2">
                Navigation
              </div>
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.label}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * motionTokens.stagger.tight,
                      duration: motionTokens.duration.fast,
                      ease: motionTokens.ease.snappy,
                    }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-lg font-bold transition-colors py-3 px-2 border-b border-[#1c1c1c] active:bg-[#161616] rounded-lg ${
                        isActive ? 'text-[#c9a84c]' : 'text-[#aaaaaa] hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-4 pt-6 border-t border-[#222222]">
              <AnimatedButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                variant="primary"
                size="lg"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request Free Consultation
              </AnimatedButton>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${COMPANY_DATA.phone}`}
                  className="min-h-[44px] flex items-center justify-center gap-2 py-2.5 bg-[#161616] border border-[#2a2a2a] rounded-xl text-white text-xs font-semibold hover:border-[#c9a84c]/40 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Call Directly</span>
                </a>
                <a
                  href={COMPANY_DATA.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] flex items-center justify-center gap-2 py-2.5 bg-[#161616] border border-[#2a2a2a] rounded-xl text-white text-xs font-semibold hover:border-[#22c55e]/40 transition-colors"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
