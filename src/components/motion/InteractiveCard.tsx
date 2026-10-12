'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from './motionTokens';

export interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'surface' | 'card' | 'raised';
  hoverable?: boolean;
  className?: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  padding = 'lg',
  variant = 'card',
  hoverable = true,
  className = '',
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-9',
  };

  const variantStyles = {
    surface: 'bg-[#111111] border-[#222222]',
    card: 'bg-[#141414] border-[#262626]',
    raised: 'bg-[#181818] border-[#2c2c2c]',
  };

  const motionProps =
    hoverable && !shouldReduceMotion
      ? {
          whileHover: {
            y: -3,
            transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy },
          },
        }
      : {};

  return (
    <motion.div
      className={`rounded-2xl border ${variantStyles[variant]} ${paddingStyles[padding]} ${
        hoverable ? 'hover:border-[#c9a84c]/40 hover:shadow-xl hover:shadow-black/60 transition-colors duration-200' : ''
      } ${className}`}
      {...motionProps}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};
