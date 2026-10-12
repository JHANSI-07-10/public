'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from './motionTokens';

export interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = motionTokens.duration.normal,
  distance = motionTokens.distance.normal,
  className = '',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getYOffset = () => {
    if (direction === 'up') return distance;
    if (direction === 'down') return -distance;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: getYOffset() }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: motionTokens.ease.snappy,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
