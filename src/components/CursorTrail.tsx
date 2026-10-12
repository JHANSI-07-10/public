import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface Spark {
  el: HTMLDivElement;
  born: number;
  vx: number;
  vy: number;
}

const LIFETIME = 700;
const MAX_SPARKS = 40;
const SPAWN_DISTANCE = 26;

export const CursorTrail: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const layer = layerRef.current;
    if (!layer) return;

    let raf = 0;
    let lastSpawn = { x: -999, y: -999 };
    const sparks: Spark[] = [];

    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - lastSpawn.x;
      const dy = e.clientY - lastSpawn.y;
      if (dx * dx + dy * dy < SPAWN_DISTANCE * SPAWN_DISTANCE) return;
      lastSpawn.x = e.clientX;
      lastSpawn.y = e.clientY;

      const el = document.createElement('div');
      const size = 2 + Math.random() * 2.5;
      el.style.cssText = [
        'position:fixed',
        `left:${e.clientX}px`,
        `top:${e.clientY}px`,
        `width:${size}px`,
        `height:${size}px`,
        'border-radius:9999px',
        `background:${Math.random() < 0.3 ? '#f3d57b' : '#d4af37'}`,
        'pointer-events:none',
        'z-index:45',
        'will-change:transform,opacity',
      ].join(';');
      document.body.appendChild(el);

      sparks.push({
        el,
        born: performance.now(),
        vx: (Math.random() - 0.5) * 24,
        vy: -12 - Math.random() * 22,
      });
      if (sparks.length > MAX_SPARKS) {
        const old = sparks.shift();
        old?.el.remove();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const t = (now - s.born) / LIFETIME;
        if (t >= 1) {
          s.el.remove();
          sparks.splice(i, 1);
          continue;
        }
        const drift = t * LIFETIME * 0.001;
        s.el.style.transform = `translate3d(${s.vx * drift}px, ${s.vy * drift}px, 0)`;
        s.el.style.opacity = (1 - t) * (1 - t) * 0.55 + '';
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      for (const s of sparks) s.el.remove();
      sparks.length = 0;
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;
  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]" />;
};

export default CursorTrail;
