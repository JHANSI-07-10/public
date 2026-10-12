'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from './motionTokens';

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-wide rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap cursor-pointer';

  const sizeStyles = {
    sm: 'h-9 px-3.5 text-xs gap-1.5',
    md: 'h-11 px-5 text-xs sm:text-sm gap-2',
    lg: 'h-13 px-7 text-sm sm:text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#c9a84c] text-black hover:bg-[#d8b75b] shadow-lg shadow-[#c9a84c]/20 hover:shadow-[#c9a84c]/35',
    secondary:
      'bg-[#161616] text-white hover:bg-[#1e1e1e] border border-[#2a2a2a] hover:border-[#c9a84c]/50',
    outline:
      'bg-transparent text-[#cccccc] hover:text-white border border-[#2e2e2e] hover:border-[#c9a84c]/60',
    ghost:
      'bg-transparent text-[#aaaaaa] hover:text-white hover:bg-[#161616]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: disabled ? undefined : { scale: 1.015 },
        whileTap: disabled ? undefined : { scale: 0.98 },
        transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy },
      };

  return (
    <motion.button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
      {...(props as any)}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
};
