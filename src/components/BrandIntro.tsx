import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { VPD_LOGO_METRICS } from './vpdLogoPaths';

interface BrandIntroProps {
  onDismiss: () => void;
  autoDismissDelay?: number;
}

/**
 * VPD Technologies — Cinematic Animated Logo Intro
 *
 * Scene Breakdown:
 * 1. Scene 1 — Darkness: Pure black background (#000000). A subtle luminous gold
 *    particle appears at the center with a gentle breathing pulse.
 * 2. Scene 2 — Golden light trails: Thin, metallic-gold light trails sweep across
 *    the canvas with bright spark heads, outlining the letter trajectories.
 * 3. Scene 3 — Logo formation: Progressive construction of the VPD monogram.
 *    - V shape draws progressively, then white body and gold apex chevron illuminate.
 *    - P shape stem shoots down and loop wraps around cleanly.
 *    - D shape vertical spine and grand outer arc form, with the bottom gold arc igniting.
 *    - Preserves exact proportions, spacing, alignment, and colors of the official logo.
 * 4. Scene 4 — Premium glow: Controlled layered glow (soft gold outer bloom,
 *    crisp bright edge highlights, subtle white specular reflection sweep across the mark).
 * 5. Scene 5 — TECHNOLOGIES reveal: Subtitle appears with a smooth character-by-character
 *    reveal and metallic gold baseline sweep.
 * 6. Scene 6 — Final logo: Holds the completed logo for ~1.8s while the glow gently
 *    breathes, then seamlessly transitions into the homepage upon hover, click, keypress,
 *    or auto-delay.
 */
export const BrandIntro: React.FC<BrandIntroProps> = ({
  onDismiss,
  autoDismissDelay = 7800,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Animation Timeline Phases:
  // 0: Scene 1 — Darkness & Central Gold Particle (0 - 550ms)
  // 1: Scene 2 — Golden Light Trails & Vector Strokes (550 - 1500ms)
  // 2: Scene 3A — V Shape Progressive Draw & Apex Gold Reveal (1400 - 2500ms)
  // 3: Scene 3B — P & D Shapes Progressive Construction (2400 - 3900ms)
  // 4: Scene 4 — Premium Layered Glow, Edge Highlights & Light Reflection Sweep (3800 - 5000ms)
  // 5: Scene 5 — TECHNOLOGIES Character-by-Character Cascade & Underline (4900 - 6200ms)
  // 6: Scene 6 — Final Fully Assembled Logo Hold with Subtle Breathing (6200ms+)
  const [phase, setPhase] = useState<number>(shouldReduceMotion ? 6 : 0);
  const [isDismissing, setIsDismissing] = useState(false);
  const hasDismissedRef = useRef(false);

  // Trigger dismissal transition safely once
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

  // Keyboard accessibility: Enter, Space, Escape triggers dismiss/skip
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

  // Orchestrate animation timeline precisely
  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase(6);
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 500);   // Scene 2: Light trails
    const t2 = setTimeout(() => setPhase(2), 1400);  // Scene 3A: V construction
    const t3 = setTimeout(() => setPhase(3), 2400);  // Scene 3B: P & D construction
    const t4 = setTimeout(() => setPhase(4), 3800);  // Scene 4: Premium glow & sheen
    const t5 = setTimeout(() => setPhase(5), 4900);  // Scene 5: TECHNOLOGIES cascade
    const t6 = setTimeout(() => setPhase(6), 6100);  // Scene 6: Final hold & breathing

    // Auto-reveal fallback so visitor is never trapped
    const fallbackTimer = setTimeout(() => {
      handleDismiss();
    }, autoDismissDelay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(fallbackTimer);
    };
  }, [autoDismissDelay, handleDismiss, shouldReduceMotion]);

  const { trajectories, technologiesLetters } = VPD_LOGO_METRICS;

  return (
    <AnimatePresence onExitComplete={onDismiss}>
      {!isDismissing && (
        <motion.div
          key="vpd-brand-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)',
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] overflow-hidden select-none"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Subtle cinematic radial vignette background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_65%_at_50%_50%,rgba(212,175,55,0.05),rgba(0,0,0,0.98)_80%)]" />

          {/* Background Ambient Glow that blooms when logo forms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase >= 4 ? 0.32 : phase >= 2 ? 0.14 : 0,
              scale: phase >= 4 ? [1, 1.06, 1] : 1,
            }}
            transition={{
              duration: 2.8,
              ease: 'easeInOut',
              repeat: phase >= 4 ? Infinity : 0,
              repeatType: 'reverse',
            }}
            className="absolute w-[580px] h-[300px] sm:w-[860px] sm:h-[420px] rounded-full blur-[110px] bg-gradient-to-r from-[#D4AF37]/20 via-[#DFC067]/30 to-[#D4AF37]/20 pointer-events-none"
          />

          {/* Subtle ambient floating gold micro-particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { x: '25%', y: '30%', d: 0, s: 2.5 },
              { x: '75%', y: '28%', d: 0.4, s: 2 },
              { x: '35%', y: '68%', d: 0.8, s: 2 },
              { x: '68%', y: '65%', d: 1.2, s: 2.5 },
              { x: '50%', y: '22%', d: 0.2, s: 3 },
              { x: '18%', y: '52%', d: 0.6, s: 2 },
              { x: '82%', y: '48%', d: 1.0, s: 2.2 },
            ].map((p, idx) => (
              <motion.div
                key={`micro-particle-${idx}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: phase >= 1 ? [0.15, 0.45, 0.15] : 0,
                  scale: phase >= 1 ? [1, 1.3, 1] : 0,
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4.5 + idx * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: p.d,
                }}
                style={{
                  left: p.x,
                  top: p.y,
                  width: `${p.s}px`,
                  height: `${p.s}px`,
                }}
                className="absolute rounded-full bg-[#DFC067] shadow-[0_0_8px_#D4AF37]"
              />
            ))}
          </div>

          {/* Top Control Bar: Brand Sequence Badge & Skip Intro */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#D4AF37]/85 font-mono flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                VPD ARCHITECTURE SEQUENCE
              </span>
            </div>

            <button
              onClick={handleDismiss}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414]/85 border border-[#262626] hover:border-[#D4AF37]/60 text-xs font-medium text-[#cccccc] hover:text-[#DFC067] transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md"
              aria-label="Skip intro and proceed to homepage"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Logo Interactive Canvas */}
          <div
            onClick={phase >= 4 ? handleDismiss : undefined}
            onMouseEnter={phase >= 5 ? handleDismiss : undefined}
            className={`relative z-20 w-full max-w-4xl px-4 sm:px-8 flex flex-col items-center justify-center transition-transform duration-500 ${
              phase >= 4 ? 'cursor-pointer group' : ''
            }`}
          >
            {/* SVG Logo Stage with 1040 x 520 Coordinate System */}
            <div className="w-full max-w-[740px] aspect-[1040/520] relative flex items-center justify-center">
              <svg
                viewBox={VPD_LOGO_METRICS.viewBox}
                className="w-full h-full overflow-visible drop-shadow-[0_0_40px_rgba(212,175,55,0.18)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Metallic Gold Gradient for Highlights */}
                  <linearGradient id="vpdGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFC067" />
                    <stop offset="40%" stopColor="#D4AF37" />
                    <stop offset="70%" stopColor="#FAF0BE" />
                    <stop offset="100%" stopColor="#B38F24" />
                  </linearGradient>

                  {/* Horizontal Light Trail Gradient */}
                  <linearGradient id="vpdLightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="70%" stopColor="#DFC067" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  {/* Travelling Edge Highlight Gradient */}
                  <linearGradient id="vpdEdgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#FAF0BE" stopOpacity="1" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  {/* Specular Diagonal Sheen Sweep Gradient (105deg) */}
                  <linearGradient id="vpdSpecularSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="42%" stopColor="rgba(255,255,255,0.0)" />
                    <stop offset="48%" stopColor="rgba(255,255,255,0.7)" />
                    <stop offset="52%" stopColor="rgba(223,192,103,0.9)" />
                    <stop offset="58%" stopColor="rgba(255,255,255,0.0)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  {/* Dual Glow Filter for Laser Sparks & Light Trails */}
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Intense Core Spark Filter */}
                  <filter id="superGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur1" />
                    <feGaussianBlur stdDeviation="2" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* ==================================================== */}
                  {/* SVG MASKS FOR PROGRESSIVE LOGO FORMATION            */}
                  {/* Reveal the authentic logo asset with zero distortion */}
                  {/* ==================================================== */}

                  {/* Mask for V Shape */}
                  <mask id="maskV">
                    <rect width="1040" height="520" fill="black" />
                    {phase >= 2 && (
                      <>
                        {/* Progressive stroke sweep revealing V */}
                        <motion.path
                          d={trajectories.vCombined}
                          fill="none"
                          stroke="white"
                          strokeWidth="110"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {/* Solid fill locks in to ensure 100% crispness */}
                        <motion.rect
                          x="20"
                          y="30"
                          width="330"
                          height="330"
                          fill="white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.65, duration: 0.4 }}
                        />
                      </>
                    )}
                  </mask>

                  {/* Mask for P Shape */}
                  <mask id="maskP">
                    <rect width="1040" height="520" fill="black" />
                    {phase >= 3 && (
                      <>
                        {/* Stem reveals downwards */}
                        <motion.rect
                          x="320"
                          y="37"
                          width="160"
                          height="320"
                          fill="white"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          style={{ originY: 0 }}
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                        />
                        {/* Loop reveals along arc */}
                        <motion.path
                          d={trajectories.pLoop}
                          fill="none"
                          stroke="white"
                          strokeWidth="110"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.3, duration: 0.75, ease: 'easeInOut' }}
                        />
                        {/* Solid lock-in */}
                        <motion.rect
                          x="320"
                          y="37"
                          width="365"
                          height="325"
                          fill="white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8, duration: 0.35 }}
                        />
                      </>
                    )}
                  </mask>

                  {/* Mask for D Shape */}
                  <mask id="maskD">
                    <rect width="1040" height="520" fill="black" />
                    {phase >= 3 && (
                      <>
                        {/* Spine reveals downwards */}
                        <motion.rect
                          x="675"
                          y="37"
                          width="110"
                          height="320"
                          fill="white"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          style={{ originY: 0 }}
                          transition={{ delay: 0.15, duration: 0.55, ease: 'easeOut' }}
                        />
                        {/* Outer sweeping loop */}
                        <motion.path
                          d={trajectories.dLoop}
                          fill="none"
                          stroke="white"
                          strokeWidth="120"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.4, duration: 0.85, ease: 'easeInOut' }}
                        />
                        {/* Solid lock-in */}
                        <motion.rect
                          x="675"
                          y="37"
                          width="335"
                          height="325"
                          fill="white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.95, duration: 0.35 }}
                        />
                      </>
                    )}
                  </mask>

                  {/* Individual masks for the 12 characters of TECHNOLOGIES */}
                  {technologiesLetters.map((item, idx) => (
                    <mask key={`mask-char-${item.char}-${idx}`} id={`mask-char-${idx}`}>
                      <rect width="1040" height="520" fill="black" />
                      {phase >= 5 && (
                        <motion.rect
                          x={item.startX - 4}
                          y="435"
                          width={item.width + 8}
                          height="55"
                          fill="white"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: idx * 0.055,
                            duration: 0.38,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      )}
                    </mask>
                  ))}
                </defs>

                {/* ==================================================== */}
                {/* SCENE 1: CENTRAL GOLD PARTICLE (Darkness Scene)      */}
                {/* ==================================================== */}
                {phase <= 1 && (
                  <g id="scene-1-darkness">
                    {/* Breathing central particle */}
                    <motion.circle
                      cx="520"
                      cy="230"
                      r="4"
                      fill="#FFFFFF"
                      filter="url(#superGlow)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.4, 1],
                        opacity: [0, 1, 0.9],
                      }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    <motion.circle
                      cx="520"
                      cy="230"
                      r="18"
                      fill="none"
                      stroke="#DFC067"
                      strokeWidth="1.2"
                      opacity="0.4"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0.5, 1.8],
                        opacity: [0.6, 0],
                      }}
                      transition={{ duration: 1.2, repeat: 1, ease: 'easeOut' }}
                    />
                  </g>
                )}

                {/* ==================================================== */}
                {/* SCENE 2: GOLDEN LIGHT TRAILS ACROSS CANVAS           */}
                {/* ==================================================== */}
                {phase === 1 && (
                  <g id="scene-2-light-trails">
                    {/* Travelling laser light trail */}
                    <motion.path
                      d={trajectories.lightBeam}
                      fill="none"
                      stroke="url(#vpdLightBeam)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 0.45, 0.15],
                        pathOffset: [0, 0.55, 1],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.1, ease: 'easeInOut' }}
                    />
                    {/* Glowing spark head */}
                    <motion.circle
                      r="5.5"
                      fill="#FFFFFF"
                      filter="url(#superGlow)"
                      initial={{ cx: 0, cy: 195, opacity: 0 }}
                      animate={{
                        cx: [0, 520, 1040],
                        cy: [195, 145, 195],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.1, ease: 'easeInOut' }}
                    />
                  </g>
                )}

                {/* ==================================================== */}
                {/* SCENE 3: PROGRESSIVE LOGO FORMATION (V, P, D)        */}
                {/* ==================================================== */}

                {/* --- 3A. V Shape Formation --- */}
                {phase >= 2 && (
                  <g id="v-shape-construction">
                    {/* Golden laser stroke animation tracing V skeleton */}
                    <motion.path
                      d={trajectories.vCombined}
                      fill="none"
                      stroke="#DFC067"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Authentic V Letter revealed cleanly via animated mask */}
                    <image
                      href="/logo.webp"
                      width="1040"
                      height="520"
                      mask="url(#maskV)"
                      preserveAspectRatio="xMidYMid meet"
                    />

                    {/* Spark head following V trajectory */}
                    {phase === 2 && (
                      <motion.circle
                        r="6"
                        fill="#FFFFFF"
                        filter="url(#superGlow)"
                        initial={{ cx: 54, cy: 39 }}
                        animate={{
                          cx: [54, 217, 310],
                          cy: [39, 352, 39],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </g>
                )}

                {/* --- 3B. P Shape Formation --- */}
                {phase >= 3 && (
                  <g id="p-shape-construction">
                    {/* Vertical stem stroke */}
                    <motion.path
                      d={trajectories.pStem}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />

                    {/* Outer loop stroke */}
                    <motion.path
                      d={trajectories.pLoop}
                      fill="none"
                      stroke="#DFC067"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.25, duration: 0.7, ease: 'easeInOut' }}
                    />

                    {/* Authentic P Letter revealed cleanly via animated mask */}
                    <image
                      href="/logo.webp"
                      width="1040"
                      height="520"
                      mask="url(#maskP)"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                )}

                {/* --- 3C. D Shape Formation --- */}
                {phase >= 3 && (
                  <g id="d-shape-construction">
                    {/* Vertical spine stroke */}
                    <motion.path
                      d={trajectories.dStem}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
                    />

                    {/* Grand loop curve stroke */}
                    <motion.path
                      d={trajectories.dLoop}
                      fill="none"
                      stroke="#DFC067"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.35, duration: 0.8, ease: 'easeInOut' }}
                    />

                    {/* Bottom gold arc stroke highlighting curvature */}
                    <motion.path
                      d={trajectories.dGoldArc}
                      fill="none"
                      stroke="url(#vpdGoldGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.75, duration: 0.65, ease: 'easeOut' }}
                    />

                    {/* Authentic D Letter revealed cleanly via animated mask */}
                    <image
                      href="/logo.webp"
                      width="1040"
                      height="520"
                      mask="url(#maskD)"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                )}

                {/* ==================================================== */}
                {/* SCENE 4: PREMIUM LAYERED GLOW & SPECULAR SHEEN       */}
                {/* ==================================================== */}
                {phase >= 4 && (
                  <g id="scene-4-premium-glow">
                    {/* Outer Contour Edge Highlights */}
                    <motion.path
                      d={trajectories.vOuterEdge}
                      fill="none"
                      stroke="url(#vpdEdgeGlow)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0, pathOffset: 0 }}
                      animate={{
                        pathLength: [0, 0.4, 0],
                        pathOffset: [0, 0.6, 1],
                      }}
                      transition={{ duration: 1.3, ease: 'easeInOut' }}
                    />

                    <motion.path
                      d={trajectories.pOuterEdge}
                      fill="none"
                      stroke="url(#vpdEdgeGlow)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0, pathOffset: 0 }}
                      animate={{
                        pathLength: [0, 0.35, 0],
                        pathOffset: [0, 0.6, 1],
                      }}
                      transition={{ delay: 0.15, duration: 1.4, ease: 'easeInOut' }}
                    />

                    <motion.path
                      d={trajectories.dOuterEdge}
                      fill="none"
                      stroke="url(#vpdEdgeGlow)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0, pathOffset: 0 }}
                      animate={{
                        pathLength: [0, 0.4, 0],
                        pathOffset: [0, 0.6, 1],
                      }}
                      transition={{ delay: 0.25, duration: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Specular Diagonal Sheen Beam sweeping across the mark */}
                    <g mask="url(#maskV)">
                      <motion.rect
                        x="-300"
                        y="0"
                        width="240"
                        height="400"
                        fill="url(#vpdSpecularSheen)"
                        initial={{ x: -300 }}
                        animate={{ x: 1100 }}
                        transition={{ delay: 0.3, duration: 1.25, ease: 'easeInOut' }}
                      />
                    </g>
                    <g mask="url(#maskP)">
                      <motion.rect
                        x="-300"
                        y="0"
                        width="240"
                        height="400"
                        fill="url(#vpdSpecularSheen)"
                        initial={{ x: -300 }}
                        animate={{ x: 1100 }}
                        transition={{ delay: 0.3, duration: 1.25, ease: 'easeInOut' }}
                      />
                    </g>
                    <g mask="url(#maskD)">
                      <motion.rect
                        x="-300"
                        y="0"
                        width="240"
                        height="400"
                        fill="url(#vpdSpecularSheen)"
                        initial={{ x: -300 }}
                        animate={{ x: 1100 }}
                        transition={{ delay: 0.3, duration: 1.25, ease: 'easeInOut' }}
                      />
                    </g>
                  </g>
                )}

                {/* ==================================================== */}
                {/* SCENE 5: TECHNOLOGIES CHARACTER-BY-CHARACTER CASCADE */}
                {/* ==================================================== */}
                {phase >= 5 && (
                  <g id="scene-5-technologies">
                    {/* Render each of the 12 authentic letters via its staggered mask */}
                    {technologiesLetters.map((_, idx) => (
                      <image
                        key={`tech-letter-img-${idx}`}
                        href="/logo.webp"
                        width="1040"
                        height="520"
                        mask={`url(#mask-char-${idx})`}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    ))}

                    {/* Metallic Gold Underline Sweep beneath TECHNOLOGIES */}
                    <motion.line
                      x1="85"
                      y1="492"
                      x2="942"
                      y2="492"
                      stroke="url(#vpdGoldGrad)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.85 }}
                      transition={{ delay: 0.7, duration: 0.85, ease: 'easeOut' }}
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Hold Phase: Interactive Prompt beneath the assembled logo */}
            <div className="h-14 mt-4 flex items-center justify-center">
              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center"
                >
                  <span className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Hover or click anywhere to explore website
                  </span>

                  <button
                    onClick={handleDismiss}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#DFC067] text-[#0A0A0A] text-xs font-semibold hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] transition-all duration-300 cursor-pointer"
                  >
                    <span>Explore Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom subtle brand baseline */}
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
