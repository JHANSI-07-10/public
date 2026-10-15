'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { VpdPhotonKnotLogo } from './photonKnot/VpdPhotonKnotLogo';

interface BrandIntroProps {
  onDismiss: () => void;
  minDuration?: number;
}

/**
 * VPD Technologies — Cinematic Brand Intro & Page Preloader
 *
 * Displays during initial page load and component/data rendering.
 * Features:
 * - 3D WebGL Photon Ribbon animation with champagne-gold highlights.
 * - Clean contour tracing and reveal of the authentic VPD logo.
 * - Background matched to website background (#0A0A0A) with zero box boundaries.
 * - Clean presentation focused on the animated brand ident (no clutter or extra text).
 * - Smooth fade-out into the homepage upon completion.
 * - Instant skip via click anywhere, Escape, Space, Enter, or discrete top-right button.
 */
export const BrandIntro: React.FC<BrandIntroProps> = ({
  onDismiss,
  minDuration = 3400,
}) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isDismissing, setIsDismissing] = useState(false);
  const hasDismissedRef = useRef(false);

  const handleDismiss = useCallback(() => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    setIsDismissing(true);
    // Reliable dismiss fallback in case motion exit event is throttled
    setTimeout(() => {
      onDismiss();
    }, 700);
  }, [onDismiss]);

  // Lock body scroll while the preloader is active, guaranteed clean unlock on dismiss/unmount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, []);

  // Automatic dismiss safety timeout (in case requestAnimationFrame is throttled or user is passive)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      handleDismiss();
    }, minDuration + 800);
    return () => clearTimeout(safetyTimer);
  }, [handleDismiss, minDuration]);

  // Keyboard controls: Escape, Space, or Enter skips immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDismiss]);

  // Reduced motion: bypass immediately
  useEffect(() => {
    if (shouldReduceMotion) {
      handleDismiss();
    }
  }, [shouldReduceMotion, handleDismiss]);

  // Callback when the Photon Knot logo has finished its crisp reveal sequence
  const handleRevealComplete = useCallback(() => {
    // Hold briefly in crisp focus so the user takes in the authentic resolved logo, then dismiss
    const exitDelay = 600;
    setTimeout(() => {
      handleDismiss();
    }, exitDelay);
  }, [handleDismiss]);

  return (
    <AnimatePresence onExitComplete={onDismiss}>
      {!isDismissing && (
        <motion.div
          key="vpd-photon-knot-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: 'blur(8px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0A0A0A] overflow-hidden select-none cursor-pointer"
          role="dialog"
          aria-label="VPD Technologies Brand Presentation"
          onClick={handleDismiss}
        >
          {/* Subtle Ambient Radial Gold Glow (Zero box boundaries, seamlessly blends into #0A0A0A) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.07) 0%, rgba(10, 10, 10, 0) 65%)',
            }}
          />

          {/* Minimal Discrete Skip Control (Top Right) */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414]/70 hover:bg-[#1C1C1C] border border-[#262626]/70 hover:border-[#D4AF37]/50 text-xs font-medium text-[#777777] hover:text-[#DFC067] transition-all duration-200 cursor-pointer backdrop-blur-md focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              aria-label="Skip intro"
            >
              <span>Skip</span>
              <span className="text-xs font-mono text-[#555555] bg-[#1E1E1E] px-1 py-0.2 rounded border border-[#2B2B2B]">
                ESC
              </span>
              <ArrowRight className="w-3 h-3 text-[#666666]" />
            </button>
          </div>

          {/* Central Showcase: Pure Animated VPD Logo */}
          <div
            className="relative z-20 w-full max-w-2xl px-4 sm:px-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-[500px]">
              <VpdPhotonKnotLogo
                borderless={true}
                showControls={false}
                duration={minDuration}
                interactive={true}
                onRevealComplete={handleRevealComplete}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandIntro;
