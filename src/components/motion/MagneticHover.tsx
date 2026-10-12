import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface MagneticHoverProps {
  children: React.ReactNode;
  strength?: number;
  maxOffset?: number;
  className?: string;
}

export const MagneticHover: React.FC<MagneticHoverProps> = ({
  children,
  strength = 0.22,
  maxOffset = 10,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  if (shouldReduceMotion) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v));
    x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * strength));
    y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * strength));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
};
