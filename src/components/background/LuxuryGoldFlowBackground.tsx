'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SculpturalSilkBackgroundProps {
  className?: string;
  intensity?: number;
}

/**
 * LuxurySculpturalSilkBackground
 *
 * Procedural generative canvas background matching the requested dark stealth aesthetic:
 * 1. Deep Obsidian Void (#000000) base.
 * 2. Continuous Solid Silk Surfaces in BLACK AND GREY SHADES ONLY (NO stark white, NO glow).
 * 3. Soft muted metallic grey / slate crest rims (rgba(155, 155, 165, 0.65)) with zero blurry halos.
 * 4. Secondary lower-right bifurcated satin ribbon surface in charcoal/grey tones.
 * 5. Upper dark sculptural hood plane in deep charcoal.
 * 6. NO dots, NO particles, NO glints, NO circles anywhere.
 * 7. "Live but little" micro-motion: gentle slow breathing flex (18-20s period, 4-8px amplitude) and scroll parallax.
 */
export const LuxuryGoldFlowBackground: React.FC<SculpturalSilkBackgroundProps> = ({
  className = '',
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setShouldReduceMotion(media.matches);
      const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Smooth scroll interpolation
    let targetScrollRatio = 0;
    let currentScrollRatio = 0;

    const updateScroll = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      ) - window.innerHeight;

      if (docHeight > 0) {
        targetScrollRatio = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    // High-DPR resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let startTime = performance.now();
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) startTime = performance.now();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ========================================================
    // RENDER LOOP (Live, subtle micro-motion: gentle satin flex)
    // ========================================================
    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      const elapsed = (now - startTime) * 0.001;
      const t = shouldReduceMotion ? 0 : elapsed;

      // Smooth scroll lerp (very soft)
      currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.045;

      // ------------------------------------------------------
      // 1. PURE OBSIDIAN VOID (#000000)
      // ------------------------------------------------------
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric volumetric depth in upper right corner (deep dark charcoal)
      const upperAmb = ctx.createRadialGradient(
        width * 0.72, height * 0.18, 40,
        width * 0.72, height * 0.18, width * 0.65
      );
      upperAmb.addColorStop(0, 'rgba(22, 22, 24, 0.35)');
      upperAmb.addColorStop(0.4, 'rgba(12, 12, 13, 0.18)');
      upperAmb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = upperAmb;
      ctx.fillRect(0, 0, width, height);

      // Tiny, subtle live breathing oscillations (gentle: 4px to 8px max amplitude)
      const b1 = Math.sin(t * 0.32) * 6;
      const b2 = Math.cos(t * 0.24) * 7;
      const b3 = Math.sin(t * 0.28) * 5;
      const b4 = Math.cos(t * 0.18) * 8;

      // Smooth scroll parallax displacement
      const scrollShiftY = currentScrollRatio * height * 0.14;

      // ------------------------------------------------------
      // 2. UPPER SCULPTURAL HOOD ARC (Top framing surface)
      // ------------------------------------------------------
      const hoodStartX = width * 0.26;
      const hoodStartY = -height * 0.03;

      const hoodCP1X = width * 0.54;
      const hoodCP1Y = height * 0.11 + b1 * 0.4 - scrollShiftY * 0.2;

      const hoodCP2X = width * 0.80;
      const hoodCP2Y = height * 0.21 + b2 * 0.4 - scrollShiftY * 0.16;

      const hoodEndX = width * 1.04;
      const hoodEndY = height * 0.42 - scrollShiftY * 0.12;

      // Hood dark body fill (deep charcoal)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(hoodStartX, hoodStartY);
      ctx.bezierCurveTo(hoodCP1X, hoodCP1Y, hoodCP2X, hoodCP2Y, hoodEndX, hoodEndY);
      ctx.lineTo(width, 0);
      ctx.lineTo(hoodStartX, 0);
      ctx.closePath();

      const hoodFill = ctx.createLinearGradient(width * 0.5, 0, width * 0.88, height * 0.32);
      hoodFill.addColorStop(0, 'rgba(40, 42, 48, 0.75)');
      hoodFill.addColorStop(0.55, 'rgba(22, 24, 28, 0.45)');
      hoodFill.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = hoodFill;
      ctx.fill();

      // Hood lower rim (clean, metallic silver-grey hairline)
      const hoodRimGrad = ctx.createLinearGradient(hoodStartX, hoodStartY, hoodEndX, hoodEndY);
      hoodRimGrad.addColorStop(0, 'rgba(120, 125, 135, 0.05)');
      hoodRimGrad.addColorStop(0.35, 'rgba(180, 185, 195, 0.6)');
      hoodRimGrad.addColorStop(0.7, 'rgba(140, 145, 155, 0.35)');
      hoodRimGrad.addColorStop(1, 'rgba(120, 125, 135, 0.05)');

      ctx.beginPath();
      ctx.moveTo(hoodStartX, hoodStartY);
      ctx.bezierCurveTo(hoodCP1X, hoodCP1Y, hoodCP2X, hoodCP2Y, hoodEndX, hoodEndY);
      ctx.strokeStyle = hoodRimGrad;
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 0;
      ctx.stroke();
      ctx.restore();

      // ------------------------------------------------------
      // 3. SECONDARY BIFURCATED WING (Lower Right Ribbon Surface)
      // Solid continuous satin ribbon band in high-contrast silver & charcoal
      // ------------------------------------------------------
      const secStartX = width * 0.58 + b3 * 0.3;
      const secStartY = height * 0.61 + b2 * 0.5 - scrollShiftY * 0.42;

      const secCP1X = width * 0.73;
      const secCP1Y = height * 0.65 + b1 * 0.4 - scrollShiftY * 0.38;

      const secCP2X = width * 0.88;
      const secCP2Y = height * 0.66 + b4 * 0.4 - scrollShiftY * 0.34;

      const secEndX = width * 1.06;
      const secEndY = height * 0.73 - scrollShiftY * 0.3;

      // Trailing inner edge of the lower ribbon
      const secRibbonDepth = 76;
      const secInnerCP1Y = secCP1Y + secRibbonDepth * 0.6;
      const secInnerCP2Y = secCP2Y + secRibbonDepth * 0.9;
      const secInnerEndY = secEndY + secRibbonDepth * 1.1;

      ctx.save();
      // Continuous solid ribbon fill in high-contrast charcoal & platinum tones
      ctx.beginPath();
      ctx.moveTo(secStartX, secStartY);
      ctx.bezierCurveTo(secCP1X, secCP1Y, secCP2X, secCP2Y, secEndX, secEndY);
      ctx.lineTo(secEndX, secInnerEndY);
      ctx.bezierCurveTo(secCP2X, secInnerCP2Y, secCP1X, secInnerCP1Y, secStartX - 10, secStartY + secRibbonDepth * 0.2);
      ctx.closePath();

      const secFill = ctx.createLinearGradient(secStartX, secStartY, secEndX, secInnerEndY);
      secFill.addColorStop(0, 'rgba(205, 212, 226, 0.68)');
      secFill.addColorStop(0.2, 'rgba(145, 150, 165, 0.52)');
      secFill.addColorStop(0.55, 'rgba(70, 75, 85, 0.35)');
      secFill.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = secFill;
      ctx.fill();

      // Satin micro-striation folds in rich silver-grey shades
      const secLayers = 18;
      for (let i = 1; i < secLayers; i++) {
        const u = i / secLayers;
        const off = u * secRibbonDepth;

        ctx.beginPath();
        ctx.moveTo(secStartX - u * 10, secStartY + off * 0.2);
        ctx.bezierCurveTo(
          secCP1X, secCP1Y + off * 0.6,
          secCP2X, secCP2Y + off * 0.9,
          secEndX, secEndY + off * 1.1
        );

        const a = Math.pow(1 - u, 1.25) * 0.82 * intensity;
        const g = ctx.createLinearGradient(secStartX, secStartY, secEndX, secEndY);
        g.addColorStop(0, `rgba(140, 145, 160, ${a * 0.3})`);
        g.addColorStop(0.35, `rgba(215, 222, 235, ${a * 0.95})`);
        g.addColorStop(0.85, `rgba(165, 170, 185, ${a * 0.55})`);
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Crisp crest rim in sleek metallic platinum-grey
      ctx.beginPath();
      ctx.moveTo(secStartX, secStartY);
      ctx.bezierCurveTo(secCP1X, secCP1Y, secCP2X, secCP2Y, secEndX, secEndY);
      ctx.strokeStyle = 'rgba(240, 245, 255, 0.96)';
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 0;
      ctx.stroke();
      ctx.restore();

      // ------------------------------------------------------
      // 4. MASTER SCULPTURAL SILK RIBBON (Hero Feature)
      // Solid continuous 3D satin ribbon surface in HIGH-CONTRAST SILVER & CHARCOAL
      // ------------------------------------------------------
      // Outer crest spine curve (leading edge)
      const pStartX = width * 0.77 + b2 * 0.35;
      const pStartY = height * 0.07 + b1 * 0.45 - scrollShiftY * 0.18;

      const pCP1X = width * 0.93 + b3 * 0.45;
      const pCP1Y = height * 0.31 + b4 * 0.5 - scrollShiftY * 0.3;

      const pCP2X = width * 0.67 + b1 * 0.55;
      const pCP2Y = height * 0.53 + b2 * 0.5 - scrollShiftY * 0.42;

      const pCP3X = width * 0.43 + b4 * 0.5;
      const pCP3Y = height * 0.73 + b3 * 0.5 - scrollShiftY * 0.54;

      const pEndX = width * 0.31 + b1 * 0.4;
      const pEndY = height * 1.08 - scrollShiftY * 0.66;

      ctx.save();

      // 1. Broad continuous satin ribbon gradient fill (rich silver & charcoal)
      const ribbonWidth = width * 0.26;
      ctx.beginPath();
      ctx.moveTo(pStartX, pStartY);
      ctx.bezierCurveTo(pCP1X, pCP1Y, pCP2X, pCP2Y, pCP2X + (pCP3X - pCP2X) * 0.5, (pCP2Y + pCP3Y) * 0.5);
      ctx.bezierCurveTo(pCP3X, pCP3Y, pEndX, pEndY - height * 0.05, pEndX, pEndY);

      // Connect to inner trailing edge of ribbon and trace back
      ctx.lineTo(pEndX - ribbonWidth * 0.5, pEndY);
      ctx.bezierCurveTo(
        pCP3X - ribbonWidth * 0.6, pCP3Y - ribbonWidth * 0.1,
        pCP2X - ribbonWidth * 0.9, pCP2Y - ribbonWidth * 0.2,
        pCP1X - ribbonWidth * 0.8, pCP1Y - ribbonWidth * 0.3
      );
      ctx.bezierCurveTo(
        pCP1X - ribbonWidth * 0.7, pCP1Y - ribbonWidth * 0.4,
        pStartX - ribbonWidth * 0.5, pStartY + ribbonWidth * 0.2,
        pStartX - ribbonWidth * 0.4, pStartY
      );
      ctx.closePath();

      const ribbonFill = ctx.createLinearGradient(pCP1X, pCP1Y, pCP2X - ribbonWidth * 0.8, pCP2Y);
      ribbonFill.addColorStop(0, 'rgba(215, 222, 235, 0.72)');
      ribbonFill.addColorStop(0.2, 'rgba(155, 160, 175, 0.58)');
      ribbonFill.addColorStop(0.55, 'rgba(80, 85, 96, 0.38)');
      ribbonFill.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ribbonFill;
      ctx.fill();

      // 2. High-density, smoothly blended satin striations in high-contrast silver/grey shades
      const striations = 38;
      for (let i = striations - 1; i >= 1; i--) {
        const u = i / striations; // 0 near crest, 1 deep inside
        const fanning = Math.pow(u, 1.25);

        const sOffX = -fanning * (ribbonWidth * 0.65);
        const sOffY = fanning * (height * 0.08);

        const cp1OffX = -fanning * (ribbonWidth * 0.95);
        const cp1OffY = fanning * (height * 0.12);

        const cp2OffX = -fanning * (ribbonWidth * 0.92);
        const cp2OffY = fanning * (height * 0.1);

        const cp3OffX = -fanning * (ribbonWidth * 0.6);
        const cp3OffY = fanning * (height * 0.05);

        const endOffX = -fanning * (ribbonWidth * 0.4);
        const endOffY = fanning * (height * 0.02);

        ctx.beginPath();
        ctx.moveTo(pStartX + sOffX, pStartY + sOffY);
        ctx.bezierCurveTo(
          pCP1X + cp1OffX, pCP1Y + cp1OffY,
          pCP2X + cp2OffX, pCP2Y + cp2OffY,
          pCP2X + (pCP3X - pCP2X) * 0.5 + (cp2OffX + cp3OffX) * 0.5,
          (pCP2Y + pCP3Y) * 0.5 + (cp2OffY + cp3OffY) * 0.5
        );
        ctx.bezierCurveTo(
          pCP3X + cp3OffX, pCP3Y + cp3OffY,
          pEndX + endOffX * 0.8, pEndY - height * 0.05 + endOffY,
          pEndX + endOffX, pEndY + endOffY
        );

        // High-contrast silver & slate gradient decay
        const a = Math.pow(1 - u, 1.25) * 0.88 * intensity;
        const grad = ctx.createLinearGradient(
          pStartX + sOffX, pStartY + sOffY,
          pEndX + endOffX, pEndY + endOffY
        );
        grad.addColorStop(0, `rgba(145, 150, 165, ${a * 0.3})`);
        grad.addColorStop(0.25, `rgba(220, 226, 238, ${a * 0.95})`);
        grad.addColorStop(0.55, `rgba(240, 246, 255, ${a * 1.0})`);
        grad.addColorStop(0.85, `rgba(165, 172, 186, ${a * 0.6})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 3. Crisp crest rim along leading edge in radiant metallic silver
      ctx.beginPath();
      ctx.moveTo(pStartX, pStartY);
      ctx.bezierCurveTo(pCP1X, pCP1Y, pCP2X, pCP2Y, pCP2X + (pCP3X - pCP2X) * 0.5, (pCP2Y + pCP3Y) * 0.5);
      ctx.bezierCurveTo(pCP3X, pCP3Y, pEndX, pEndY - height * 0.05, pEndX, pEndY);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
      ctx.lineWidth = 2.6;
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.restore();

      // ------------------------------------------------------
      // 5. CLEAN PERIPHERAL VIGNETTE
      // ------------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, width * 0.38,
        width * 0.5, height * 0.5, width * 0.8
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isClient, shouldReduceMotion, intensity]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

export default LuxuryGoldFlowBackground;
