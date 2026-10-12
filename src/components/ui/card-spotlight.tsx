import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  radius?: number;
  color?: string;
}

export const CardSpotlight: React.FC<CardSpotlightProps> = ({
  children,
  radius = 280,
  color = '#262114',
  className,
  onMouseMove,
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const spotlight = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 72%)`;
  const sheen = useMotionTemplate`radial-gradient(${radius * 0.7}px circle at ${mouseX}px ${mouseY}px, rgba(212,175,55,0.16), rgba(212,175,55,0.05) 45%, transparent 72%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'group/spotlight relative h-full overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1D1D1D]',
        'transition-[border-color,box-shadow,transform] duration-300',
        'hover:border-[#D4AF37]/40 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6),0_0_24px_-8px_rgba(212,175,55,0.18)]',
        'motion-safe:hover:-translate-y-1',
        'focus-within:border-[#D4AF37]/40',
        className,
      )}
      {...props}
    >
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
            style={{ background: spotlight }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
            style={{ background: sheen }}
          />
        </>
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
