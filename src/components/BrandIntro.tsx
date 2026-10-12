import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface BrandIntroProps {
  onDismiss: () => void;
  autoDismissDelay?: number;
}

/**
 * VPD Technologies — Brand Intro
 *
 * A short, reliable cinematic reveal using the official logo asset directly:
 * 1. Fade + scale the logo in over a gold bloom.
 * 2. Cascade the tagline in beneath it.
 * 3. Hold briefly, then auto-dismiss (or on click / keypress / skip).
 */
export const BrandIntro: React.FC<BrandIntroProps> = ({
  onDismiss,
  autoDismissDelay = 3200,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isDismissing, setIsDismissing] = useState(false);
  const hasDismissedRef = useRef(false);

  const handleDismiss = useCallback(() => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsDismissing(true);
  }, []);

  // Lock body overflow while intro is running
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard: Enter / Space / Escape skips the intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDismiss]);

  // Auto-dismiss fallback so the visitor is never trapped
  useEffect(() => {
    const timer = setTimeout(handleDismiss, shouldReduceMotion ? 1200 : autoDismissDelay);
    return () => clearTimeout(timer);
  }, [autoDismissDelay, handleDismiss, shouldReduceMotion]);

  return (
    <AnimatePresence onExitComplete={onDismiss}>
      {!isDismissing && (
        <motion.div
          key="vpd-brand-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] overflow-hidden select-none cursor-pointer"
          role="dialog"
          aria-label="VPD Technologies brand intro"
        >
          {/* Cinematic radial vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(212,175,55,0.07),rgba(0,0,0,0.98)_75%)]" />

          {/* Skip control */}
          <button
            onClick={handleDismiss}
            className="absolute top-6 right-6 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414]/85 border border-[#262626] hover:border-[#D4AF37]/60 text-xs font-medium text-[#cccccc] hover:text-[#DFC067] transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            aria-label="Skip intro and proceed to website"
          >
            <span>Skip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Gold bloom behind the logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.4, 0.25], scale: [0.8, 1.1, 1] }}
            transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
            className="absolute w-[420px] h-[220px] sm:w-[620px] sm:h-[300px] rounded-full blur-[100px] bg-gradient-to-r from-[#D4AF37]/25 via-[#DFC067]/35 to-[#D4AF37]/25 pointer-events-none"
          />

          {/* Logo + tagline */}
          <div className="relative z-20 flex flex-col items-center px-6">
            <motion.img
              src="/logo.webp"
              alt="VPD Technologies"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-[260px] sm:w-[360px] lg:w-[420px] h-auto drop-shadow-[0_0_36px_rgba(212,175,55,0.25)]"
              draggable={false}
            />

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
              <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#A1A1AA] text-center">
                Engineering High-Performance Digital Ecosystems
              </p>
            </motion.div>
          </div>

          {/* Bottom baseline */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#555555]">
              ENTERPRISE SOFTWARE ARCHITECTURE &bull; VPD TECHNOLOGIES
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
