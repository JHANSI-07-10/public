import React, { useEffect, useRef } from 'react';

const DEFAULT_GOLD_COLORS: [number, number, number][] = [
  [212, 175, 55],
  [223, 192, 103],
  [150, 119, 35],
];

interface CanvasRevealEffectProps {
  className?: string;
  radius?: number;
  colors?: [number, number, number][];
  gridGap?: number;
  maxOpacity?: number;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  className = '',
  radius = 280,
  colors = DEFAULT_GOLD_COLORS,
  gridGap = 22,
  maxOpacity = 0.55,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    interface Dot {
      x: number;
      y: number;
      alpha: number;
      target: number;
      color: [number, number, number];
    }

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerInside = false;
    let rafId = 0;
    let isRunning = false;
    let isVisible = true;

    const buildDots = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const rows = Math.ceil(height / gridGap) + 1;
      const cols = Math.ceil(width / gridGap) + 1;
      for (let r = 0; r < rows; r++) {
        const offset = (r % 2) * (gridGap / 2);
        for (let c = 0; c < cols; c++) {
          const x = c * gridGap + offset;
          const y = r * gridGap;
          if (x > width || y > height) continue;
          dots.push({
            x,
            y,
            alpha: 0,
            target: 0,
            color: colors[(r * 31 + c * 17) % colors.length],
          });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.fillStyle = `rgba(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]}, 0.08)`;
        ctx.fillRect(dot.x - 0.75, dot.y - 0.75, 1.5, 1.5);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let hasVisible = false;
      const r2 = radius * radius;

      for (const dot of dots) {
        if (pointerInside) {
          const dx = dot.x - pointerX;
          const dy = dot.y - pointerY;
          const d2 = dx * dx + dy * dy;
          dot.target = d2 <= r2 ? (1 - Math.sqrt(d2) / radius) * maxOpacity : 0;
        } else {
          dot.target = 0;
        }

        dot.alpha += (dot.target - dot.alpha) * 0.14;
        if (dot.alpha < 0.004) {
          dot.alpha = 0;
        } else {
          hasVisible = true;
          const size = 1 + dot.alpha * 1.2;
          ctx.fillStyle = `rgba(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]}, ${dot.alpha.toFixed(3)})`;
          ctx.fillRect(dot.x - size / 2, dot.y - size / 2, size, size);
        }
      }

      if (hasVisible || pointerInside) {
        rafId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const startLoop = () => {
      if (!isRunning && isVisible && !reduceMotion) {
        isRunning = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      pointerInside = true;
      startLoop();
    };

    const handlePointerLeave = () => {
      pointerInside = false;
    };

    const handleResize = () => {
      buildDots();
      if (reduceMotion) drawStatic();
    };

    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
      if (!isVisible && isRunning) {
        cancelAnimationFrame(rafId);
        isRunning = false;
      }
    });

    io.observe(parent);
    parent.addEventListener('pointermove', handlePointerMove);
    parent.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    buildDots();
    if (reduceMotion) drawStatic();

    return () => {
      io.disconnect();
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [radius, colors, gridGap, maxOpacity]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute ${className}`} />;
};
