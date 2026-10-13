'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';
import {
  VPD_LOGO_PATHS,
  VPD_LOGO_VIEWBOX,
} from './logoPaths';

export interface VpdPhotonKnotLogoProps {
  className?: string;
  autoplay?: boolean;
  showControls?: boolean;
  interactive?: boolean;
  borderless?: boolean;
  duration?: number;
  onRevealComplete?: () => void;
}

type AnimationPhase = 'tracing' | 'resolving' | 'ambient';

export const VpdPhotonKnotLogo: React.FC<VpdPhotonKnotLogoProps> = ({
  className = '',
  autoplay = true,
  interactive = true,
  duration = 3400,
  onRevealComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  // Animation Timeline States — Starts directly with logo contour tracing (no separate intro animation)
  const [phase, setPhase] = useState<AnimationPhase>(shouldReduceMotion ? 'ambient' : 'tracing');

  // Parallax Coordinates (-1 to 1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothTilt, setSmoothTilt] = useState({ x: 0, y: 0 });

  // Tracer stroke offsets (0 to 1 progress of stroke-drawing)
  const [strokeProgress, setStrokeProgress] = useState(shouldReduceMotion ? 1 : 0);
  // Logo fill opacity (0 to 1)
  const [fillOpacity, setFillOpacity] = useState(shouldReduceMotion ? 1 : 0);
  // Metallic sheen sweep position
  const [sheenOffset, setSheenOffset] = useState(-100);
  // Ambient pulse on gold accents
  const [ambientPulse, setAmbientPulse] = useState(0);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const onRevealCompleteRef = useRef(onRevealComplete);
  const hasCalledRevealCompleteRef = useRef(false);

  useEffect(() => {
    onRevealCompleteRef.current = onRevealComplete;
  }, [onRevealComplete]);

  // Master Choreography Timeline Loop — direct VPD logo animation only
  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase('ambient');
      setStrokeProgress(1);
      setFillOpacity(1);
      onRevealCompleteRef.current?.();
      return;
    }

    if (!autoplay) {
      setPhase('ambient');
      setStrokeProgress(1);
      setFillOpacity(1);
      return;
    }

    startTimeRef.current = performance.now();

    const TOTAL_DURATION = duration;
    const traceEnd = TOTAL_DURATION * 0.65; // 0% - 65%: direct contour tracing
    const resolveEnd = TOTAL_DURATION;     // 65% - 100%: metallic sheen & crisp resolve

    const tick = (now: number) => {
      if (startTimeRef.current != null) {
        const elapsed = now - startTimeRef.current;

        if (elapsed < TOTAL_DURATION) {
          // --- Stage 1: Direct Contour Tracing (0 to 65%) ---
          if (elapsed < traceEnd) {
            setPhase('tracing');
            const traceFrac = elapsed / traceEnd;
            // Eased stroke drawing starting immediately on mount
            const easedTrace = Math.min(Math.pow(traceFrac, 1.12), 1.0);
            setStrokeProgress(easedTrace);
            // Progressive fill reveals as stroke completes second half
            const fillFrac = Math.max(0, (traceFrac - 0.32) / 0.68);
            setFillOpacity(Math.pow(fillFrac, 1.3) * 0.9);
          }
          // --- Stage 2: Resolving & Sheen Sweep (65% to 100%) ---
          else {
            setPhase('resolving');
            const resolveFrac = (elapsed - traceEnd) / (resolveEnd - traceEnd);
            setStrokeProgress(1.0);
            setFillOpacity(0.9 + resolveFrac * 0.1);
            // Sweep metallic sheen across letters (-100% to 220%)
            setSheenOffset(-100 + resolveFrac * 320);
          }
        } else {
          // --- Stage 3: Continuous Ambient Mode ---
          setPhase('ambient');
          setStrokeProgress(1.0);
          setFillOpacity(1.0);

          if (!hasCalledRevealCompleteRef.current) {
            hasCalledRevealCompleteRef.current = true;
            onRevealCompleteRef.current?.();
          }

          // Gentle ambient golden edge pulse every 6 seconds
          const ambientTime = (elapsed - TOTAL_DURATION) / 1000;
          const pulseCycle = (ambientTime % 6.0) / 6.0;
          if (pulseCycle < 0.35) {
            setAmbientPulse(Math.sin((pulseCycle / 0.35) * Math.PI));
          } else {
            setAmbientPulse(0);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoplay, duration, shouldReduceMotion]);

  // Smooth Interactive 3D Parallax Lerp
  useEffect(() => {
    if (shouldReduceMotion || !interactive) return;

    let rafId: number;
    const lerpParallax = () => {
      setSmoothTilt((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      rafId = requestAnimationFrame(lerpParallax);
    };
    rafId = requestAnimationFrame(lerpParallax);

    return () => cancelAnimationFrame(rafId);
  }, [mousePos, shouldReduceMotion, interactive]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Compute 3D Parallax CSS Transform for the Logo Plane
  const logoParallaxTransform = shouldReduceMotion
    ? 'none'
    : `perspective(1000px) rotateX(${-smoothTilt.y * 6}deg) rotateY(${smoothTilt.x * 8}deg) translateZ(10px)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full aspect-[2/1] max-w-[500px] mx-auto select-none bg-transparent flex items-center justify-center ${className}`}
      role="region"
      aria-label="VPD Technologies Animated Brand Identity"
    >
      {/* Background Soft Atmospheric Ambient Glow (Fades to 0% transparent, seamlessly blending into #0A0A0A) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(212, 175, 55, 0.08) 0%, rgba(10, 10, 10, 0) 70%)',
          opacity: 0.85,
        }}
      />

      {/* ========================================================
          AUTHENTIC VPD TECHNOLOGIES LOGO PLANE
          Clean vector contours, direct light-tracing, and solid fill reveal
          Only the authentic VPD logo animation runs — no other intro animations
          ======================================================== */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-5 pointer-events-none transition-transform duration-150 ease-out"
        style={{
          transform: logoParallaxTransform,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox={VPD_LOGO_VIEWBOX}
          className="w-full h-full max-h-[220px] object-contain drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Photon Tracer Gold-to-White Linear Gradient */}
            <linearGradient id="vpdPhotonTracerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#F2D98D" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E5C15D" stopOpacity="0.3" />
            </linearGradient>

            {/* Glowing filter for neon photon contour trails */}
            <filter id="vpdPhotonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle Metallic Sheen Linear Gradient */}
            <linearGradient
              id="vpdSheenGrad"
              x1={`${sheenOffset}%`}
              y1="0%"
              x2={`${sheenOffset + 60}%`}
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#F2D98D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Ambient Gold Pulse Filter */}
            <filter id="vpdAccentPulseGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ----------------------------------------------------
              STAGE A: PROGRESSIVE SOLID FILLS (The Real VPD Logo)
              Renders exact authentic shapes with crisp white and gold
              ---------------------------------------------------- */}
          <g
            style={{
              opacity: fillOpacity,
              transition: phase === 'resolving' ? 'opacity 0.6s ease-out' : 'none',
            }}
          >
            {/* V White */}
            <path
              d={VPD_LOGO_PATHS.v_white.d}
              fill={VPD_LOGO_PATHS.v_white.color}
              fillRule="evenodd"
            />

            {/* V Gold Accent Wing */}
            <path
              d={VPD_LOGO_PATHS.v_gold.d}
              fill={VPD_LOGO_PATHS.v_gold.color}
              fillRule="evenodd"
              filter={ambientPulse > 0.05 ? 'url(#vpdAccentPulseGlow)' : undefined}
            />

            {/* P White */}
            <path
              d={VPD_LOGO_PATHS.p_white.d}
              fill={VPD_LOGO_PATHS.p_white.color}
              fillRule="evenodd"
            />

            {/* D White */}
            <path
              d={VPD_LOGO_PATHS.d_white.d}
              fill={VPD_LOGO_PATHS.d_white.color}
              fillRule="evenodd"
            />

            {/* D Gold Swoosh Accent */}
            <path
              d={VPD_LOGO_PATHS.d_gold.d}
              fill={VPD_LOGO_PATHS.d_gold.color}
              fillRule="evenodd"
              filter={ambientPulse > 0.05 ? 'url(#vpdAccentPulseGlow)' : undefined}
            />

            {/* TECHNOLOGIES Wordmark */}
            <path
              d={VPD_LOGO_PATHS.text.d}
              fill={VPD_LOGO_PATHS.text.color}
              fillRule="evenodd"
              opacity={Math.min(fillOpacity * 1.1, 1)}
            />
          </g>

          {/* ----------------------------------------------------
              STAGE B: DIRECT ANIMATED CONTOUR PHOTON TRACERS
              Starts immediately from t=0, tracing clean contours
              ---------------------------------------------------- */}
          {(phase === 'tracing' || phase === 'resolving') && (
            <g filter="url(#vpdPhotonGlow)">
              {Object.entries(VPD_LOGO_PATHS).map(([key, item]) => {
                const totalLen = item.length;
                const offset = totalLen * (1.0 - strokeProgress);

                return (
                  <path
                    key={`tracer-${key}`}
                    d={item.d}
                    fill="none"
                    stroke={item.isGold ? '#FFE58F' : 'url(#vpdPhotonTracerGrad)'}
                    strokeWidth={item.isGold ? 3.0 : 2.2}
                    strokeDasharray={totalLen}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={1.0 - fillOpacity * 0.75}
                  />
                );
              })}
            </g>
          )}

          {/* ----------------------------------------------------
              STAGE C: RESOLVING METALLIC SHEEN SWEEP
              Sweeps across gold and white surfaces during reveal
              ---------------------------------------------------- */}
          {phase === 'resolving' && sheenOffset > -90 && sheenOffset < 250 && (
            <g opacity="0.75">
              <path
                d={VPD_LOGO_PATHS.v_gold.d}
                fill="url(#vpdSheenGrad)"
                fillRule="evenodd"
              />
              <path
                d={VPD_LOGO_PATHS.d_gold.d}
                fill="url(#vpdSheenGrad)"
                fillRule="evenodd"
              />
            </g>
          )}

          {/* ----------------------------------------------------
              STAGE D: AMBIENT GOLDEN PULSE (Ambient Phase)
              Subtle pulse tracing along gold accents every few seconds
              ---------------------------------------------------- */}
          {phase === 'ambient' && ambientPulse > 0.05 && (
            <g opacity={ambientPulse}>
              <path
                d={VPD_LOGO_PATHS.v_gold.d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                filter="url(#vpdPhotonGlow)"
              />
              <path
                d={VPD_LOGO_PATHS.d_gold.d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                filter="url(#vpdPhotonGlow)"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default VpdPhotonKnotLogo;
