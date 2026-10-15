'use client';

import React, { useEffect, useRef } from 'react';

interface LuxuryArchitecturalBackgroundProps {
  className?: string;
  intensity?: number;
}

/**
 * LuxuryGoldFlowBackground
 *
 * Procedural Architectural Background in matte charcoal and dual metallic (Gold + Silver) rim lighting.
 * Recreates the exact luxury aesthetic requested:
 * 1. Base Deep Obsidian Void (#08080A) with soft atmospheric light dome.
 * 2. Giant Upper Dome Surface with realistic volumetric drop shadow.
 * 3. Secondary Horizon Ledge (Curve 2) with horizontal golden rim and razor hairline.
 * 4. Lower Foreground Curved Plane (Curve 1) with primary metallic gold line.
 * 5. Reduced Slight Glow: Tight, restrained focal bloom that does NOT overlap or wash out text.
 * 6. Crisp Silver Line along the gold line: Razor-sharp metallic chrome/silver filament with ZERO glow.
 * 7. Multi-layered 3D depth with zero raster images — 100% procedural vector canvas rendering.
 * 8. Stationary & Zero-CPU: Renders with DPR-aware precision on mount/resize with zero shaking/movement.
 */
export const LuxuryGoldFlowBackground: React.FC<LuxuryArchitecturalBackgroundProps> = ({
  className = '',
  intensity = 0.9,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.max(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const W = width;
      const H = height;

      // -----------------------------------------------------------
      // 1. BASE OBSIDIAN CANVAS (#08080A)
      // -----------------------------------------------------------
      ctx.fillStyle = '#08080A';
      ctx.fillRect(0, 0, W, H);

      // Exact curve geometry:
      // Primary sweeping curve (C1) from top-left through apex to bottom-right
      const c1_x0 = W * 0.115, c1_y0 = -H * 0.05;
      const c1_cp1x = W * 0.14, c1_cp1y = H * 0.26;
      const c1_cp2x = W * 0.25, c1_cp2y = H * 0.54;
      const c1_midx = W * 0.442, c1_midy = H * 0.716;
      const c1_cp3x = W * 0.58, c1_cp3y = H * 0.83;
      const c1_cp4x = W * 0.74, c1_cp4y = H * 0.93;
      const c1_x1 = W * 0.94, c1_y1 = H * 1.05;

      // Secondary horizon curve (C2) across right side
      const c2_x0 = c1_midx - W * 0.005, c2_y0 = c1_midy + H * 0.004;
      const c2_cp1x = W * 0.58, c2_cp1y = H * 0.728;
      const c2_cp2x = W * 0.78, c2_cp2y = H * 0.710;
      const c2_x1 = W * 1.05, c2_y1 = H * 0.615;

      // -----------------------------------------------------------
      // 2. RECESSED INTERMEDIATE VOID (Between C1 and C2 on right)
      // -----------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(c2_x0, c2_y0);
      ctx.bezierCurveTo(c2_cp1x, c2_cp1y, c2_cp2x, c2_cp2y, c2_x1, c2_y1);
      ctx.lineTo(W * 1.05, H * 1.05);
      ctx.lineTo(c1_x1, c1_y1);
      ctx.bezierCurveTo(c1_cp4x, c1_cp4y, c1_cp3x, c1_cp3y, c1_midx, c1_midy);
      ctx.closePath();

      const recessGrad = ctx.createLinearGradient(W * 0.70, H * 0.68, W * 0.70, H * 0.95);
      recessGrad.addColorStop(0, 'rgba(26, 26, 28, 1)');
      recessGrad.addColorStop(0.35, 'rgba(18, 18, 20, 1)');
      recessGrad.addColorStop(0.75, 'rgba(10, 10, 12, 1)');
      recessGrad.addColorStop(1, 'rgba(7, 7, 8, 1)');
      ctx.fillStyle = recessGrad;
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------
      // 3. GIANT UPPER SPHERE / DOME (Above C1 on left, and C2 on right)
      // -----------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(c1_x0, c1_y0);
      ctx.bezierCurveTo(c1_cp1x, c1_cp1y, c1_cp2x, c1_cp2y, c1_midx, c1_midy);
      ctx.bezierCurveTo(c2_cp1x, c2_cp1y, c2_cp2x, c2_cp2y, c2_x1, c2_y1);
      ctx.lineTo(W * 1.05, -H * 0.05);
      ctx.lineTo(c1_x0, -H * 0.05);
      ctx.closePath();

      // Deep volumetric drop shadow cast downwards
      ctx.shadowColor = 'rgba(0, 0, 0, 0.96)';
      ctx.shadowBlur = 45;
      ctx.shadowOffsetX = -10;
      ctx.shadowOffsetY = 24;
      ctx.fillStyle = '#0a0a0c';
      ctx.fill();

      // Smooth matte charcoal surface with subtle ambient light dome
      const domeGrad = ctx.createRadialGradient(W * 0.54, H * 0.20, 30, W * 0.54, H * 0.20, W * 0.60);
      domeGrad.addColorStop(0, 'rgba(29, 29, 31, 1)');
      domeGrad.addColorStop(0.35, 'rgba(24, 24, 26, 1)');
      domeGrad.addColorStop(0.70, 'rgba(15, 15, 17, 1)');
      domeGrad.addColorStop(1, 'rgba(9, 9, 10, 1)');
      ctx.fillStyle = domeGrad;
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------
      // 4. LOWER FOREGROUND SURFACE (Below C1 in bottom-left/center)
      // -----------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(c1_x0, c1_y0);
      ctx.bezierCurveTo(c1_cp1x, c1_cp1y, c1_cp2x, c1_cp2y, c1_midx, c1_midy);
      ctx.bezierCurveTo(c1_cp3x, c1_cp3y, c1_cp4x, c1_cp4y, c1_x1, c1_y1);
      ctx.lineTo(-W * 0.05, H * 1.05);
      ctx.lineTo(-W * 0.05, -H * 0.05);
      ctx.closePath();

      // Realistic drop shadow under the foreground curve
      ctx.shadowColor = 'rgba(0, 0, 0, 0.92)';
      ctx.shadowBlur = 32;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 15;

      const lowerGrad = ctx.createLinearGradient(0, H * 0.35, W * 0.55, H * 0.95);
      lowerGrad.addColorStop(0, 'rgba(10, 10, 12, 1)');
      lowerGrad.addColorStop(0.35, 'rgba(24, 24, 26, 1)');
      lowerGrad.addColorStop(0.75, 'rgba(34, 34, 36, 1)');
      lowerGrad.addColorStop(1, 'rgba(19, 19, 21, 1)');
      ctx.fillStyle = lowerGrad;
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------
      // 5. REDUCED SLIGHT GLOW (RESTRICTED TO APEX, DOES NOT OVERLAP TEXT)
      // User: "reduce the glow because it iverlaps the text , just a slight glow os wnough"
      // -----------------------------------------------------------
      // Slight tight apex bloom (tight radius, reduced opacity, hugs curve apex)
      ctx.save();
      ctx.translate(c1_midx, c1_midy);
      ctx.rotate(-0.35);
      ctx.scale(1.2, 0.55);
      const slightApexGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, W * 0.040);
      slightApexGlow.addColorStop(0, `rgba(255, 245, 190, ${0.35 * intensity})`);
      slightApexGlow.addColorStop(0.25, `rgba(245, 200, 70, ${0.16 * intensity})`);
      slightApexGlow.addColorStop(0.55, `rgba(210, 150, 30, ${0.04 * intensity})`);
      slightApexGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = slightApexGlow;
      ctx.beginPath();
      ctx.arc(0, 0, W * 0.040, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Slight compact horizontal beam glow on C2
      ctx.save();
      ctx.translate(W * 0.665, H * 0.720);
      ctx.scale(2.0, 0.40);
      const slightBeamGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, W * 0.035);
      slightBeamGlow.addColorStop(0, `rgba(255, 238, 160, ${0.30 * intensity})`);
      slightBeamGlow.addColorStop(0.30, `rgba(250, 195, 60, ${0.12 * intensity})`);
      slightBeamGlow.addColorStop(0.65, `rgba(200, 140, 20, ${0.03 * intensity})`);
      slightBeamGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = slightBeamGlow;
      ctx.beginPath();
      ctx.arc(0, 0, W * 0.035, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------
      // 6. C2 HORIZON GOLD RIM & RAZOR HAIRLINE
      // -----------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(c2_x0, c2_y0);
      ctx.bezierCurveTo(c2_cp1x, c2_cp1y, c2_cp2x, c2_cp2y, c2_x1, c2_y1);
      const c2Grad = ctx.createLinearGradient(W * 0.44, 0, W * 1.05, 0);
      c2Grad.addColorStop(0, 'rgba(100, 70, 20, 0.05)');
      c2Grad.addColorStop(0.12, 'rgba(215, 165, 55, 0.60)');
      c2Grad.addColorStop(0.28, 'rgba(255, 225, 95, 0.95)');
      c2Grad.addColorStop(0.40, 'rgba(255, 255, 220, 1.0)');
      c2Grad.addColorStop(0.55, 'rgba(255, 220, 80, 0.90)');
      c2Grad.addColorStop(0.72, 'rgba(215, 150, 40, 0.55)');
      c2Grad.addColorStop(0.88, 'rgba(140, 90, 25, 0.22)');
      c2Grad.addColorStop(1, 'rgba(80, 50, 10, 0.02)');
      ctx.strokeStyle = c2Grad;
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Razor-sharp bright hairline on C2
      ctx.beginPath();
      ctx.moveTo(W * 0.58, H * 0.728);
      ctx.bezierCurveTo(W * 0.63, H * 0.724, W * 0.68, H * 0.718, W * 0.75, H * 0.710);
      const c2Core = ctx.createLinearGradient(W * 0.58, 0, W * 0.75, 0);
      c2Core.addColorStop(0, 'rgba(255, 255, 240, 0)');
      c2Core.addColorStop(0.4, 'rgba(255, 255, 255, 0.95)');
      c2Core.addColorStop(0.6, 'rgba(255, 255, 255, 0.95)');
      c2Core.addColorStop(1, 'rgba(255, 255, 240, 0)');
      ctx.strokeStyle = c2Core;
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.restore();

      // -----------------------------------------------------------
      // 7. PRIMARY METALLIC GOLD LINE (Along C1)
      // -----------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(c1_x0, c1_y0);
      ctx.bezierCurveTo(c1_cp1x, c1_cp1y, c1_cp2x, c1_cp2y, c1_midx, c1_midy);
      ctx.bezierCurveTo(c1_cp3x, c1_cp3y, c1_cp4x, c1_cp4y, c1_x1, c1_y1);

      const c1Gold = ctx.createLinearGradient(W * 0.11, H * 0.10, W * 0.90, H * 1.0);
      c1Gold.addColorStop(0, 'rgba(200, 175, 110, 0.15)');
      c1Gold.addColorStop(0.18, 'rgba(225, 185, 85, 0.55)');
      c1Gold.addColorStop(0.35, 'rgba(255, 225, 95, 0.95)');
      c1Gold.addColorStop(0.44, 'rgba(255, 250, 195, 1.0)');
      c1Gold.addColorStop(0.53, 'rgba(255, 215, 80, 0.95)');
      c1Gold.addColorStop(0.72, 'rgba(215, 155, 45, 0.60)');
      c1Gold.addColorStop(0.90, 'rgba(140, 95, 25, 0.22)');
      c1Gold.addColorStop(1, 'rgba(80, 50, 10, 0.04)');
      ctx.strokeStyle = c1Gold;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Fine core highlight at gold apex
      ctx.beginPath();
      ctx.moveTo(W * 0.40, H * 0.67);
      ctx.bezierCurveTo(W * 0.42, H * 0.69, c1_midx, c1_midy, W * 0.48, H * 0.75);
      const goldApexCore = ctx.createLinearGradient(W * 0.40, H * 0.67, W * 0.48, H * 0.75);
      goldApexCore.addColorStop(0, 'rgba(255, 255, 220, 0)');
      goldApexCore.addColorStop(0.5, 'rgba(255, 255, 250, 0.90)');
      goldApexCore.addColorStop(1, 'rgba(255, 255, 220, 0)');
      ctx.strokeStyle = goldApexCore;
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();

      // -----------------------------------------------------------
      // 8. CRISP SILVER LINE ALONG THE GOLD LINE (NO GLOW)
      // User: "and also add a silver line along the gold line but no glow should be present"
      // -----------------------------------------------------------
      const getBezierPointAndNormal = (
        p0: { x: number; y: number },
        p1: { x: number; y: number },
        p2: { x: number; y: number },
        p3: { x: number; y: number },
        t: number
      ) => {
        const mt = 1 - t;
        const mt2 = mt * mt;
        const t2 = t * t;
        const x = mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x;
        const y = mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y;

        const dx = 3 * mt2 * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x);
        const dy = 3 * mt2 * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y);
        const len = Math.sqrt(dx * dx + dy * dy) || 1;

        const nx = -dy / len;
        const ny = dx / len;

        return { x, y, nx, ny };
      };

      const drawOffsetSilverCurve = (offsetDist: number) => {
        const steps = 140;
        ctx.save();
        // Strictly NO GLOW or blur
        ctx.filter = 'none';
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        ctx.beginPath();
        const seg1_p0 = { x: c1_x0, y: c1_y0 };
        const seg1_p1 = { x: c1_cp1x, y: c1_cp1y };
        const seg1_p2 = { x: c1_cp2x, y: c1_cp2y };
        const seg1_p3 = { x: c1_midx, y: c1_midy };

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const pt = getBezierPointAndNormal(seg1_p0, seg1_p1, seg1_p2, seg1_p3, t);
          const px = pt.x + pt.nx * offsetDist;
          const py = pt.y + pt.ny * offsetDist;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        const seg2_p0 = { x: c1_midx, y: c1_midy };
        const seg2_p1 = { x: c1_cp3x, y: c1_cp3y };
        const seg2_p2 = { x: c1_cp4x, y: c1_cp4y };
        const seg2_p3 = { x: c1_x1, y: c1_y1 };

        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const pt = getBezierPointAndNormal(seg2_p0, seg2_p1, seg2_p2, seg2_p3, t);
          const px = pt.x + pt.nx * offsetDist;
          const py = pt.y + pt.ny * offsetDist;
          ctx.lineTo(px, py);
        }

        // Razor-sharp metallic chrome / silver gradient
        const silverGrad = ctx.createLinearGradient(W * 0.11, H * 0.10, W * 0.90, H * 1.0);
        silverGrad.addColorStop(0, 'rgba(165, 180, 200, 0.12)');
        silverGrad.addColorStop(0.18, 'rgba(195, 210, 225, 0.50)');
        silverGrad.addColorStop(0.35, 'rgba(235, 245, 255, 0.88)');
        silverGrad.addColorStop(0.44, 'rgba(255, 255, 255, 0.98)');
        silverGrad.addColorStop(0.53, 'rgba(225, 238, 252, 0.88)');
        silverGrad.addColorStop(0.72, 'rgba(185, 200, 218, 0.55)');
        silverGrad.addColorStop(0.90, 'rgba(150, 165, 185, 0.20)');
        silverGrad.addColorStop(1, 'rgba(120, 135, 150, 0.04)');

        ctx.strokeStyle = silverGrad;
        ctx.lineWidth = 1.4; // Crisp, razor-sharp metallic line
        ctx.stroke();
        ctx.restore();
      };

      // Draw parallel silver line alongside the gold line with zero glow
      drawOffsetSilverCurve(-3.5);

      // -----------------------------------------------------------
      // 9. PERIPHERAL CORNER VIGNETTE
      // -----------------------------------------------------------
      const vignette = ctx.createRadialGradient(W * 0.5, H * 0.5, W * 0.38, W * 0.5, H * 0.5, W * 0.78);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.50)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);
    };

    draw();

    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('resize', draw);
    };
  }, [intensity]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#08080A] ${className}`}
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
