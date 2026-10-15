'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from './motionTokens';

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'outline-gold';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  outlineAnimation?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  outlineAnimation = true,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = `inline-flex items-center justify-center font-bold tracking-wide rounded-xl transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap cursor-pointer ${
    outlineAnimation
      ? ''
      : 'focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]'
  }`;

  const sizeStyles = {
    sm: 'h-8 px-3 text-[11px] gap-1',
    md: 'h-10 px-4 text-xs sm:text-[13px] gap-1.5',
    lg: 'h-11 px-5 text-sm gap-2',
  };

  const outlineVariantStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-[#cccccc]',
    ghost: 'text-[#aaaaaa]',
    'outline-gold': 'text-[#c9a84c]',
  };

  const legacyVariantStyles = {
    primary:
      'bg-[#c9a84c] text-black hover:bg-[#d8b75b] shadow-lg shadow-[#c9a84c]/20 hover:shadow-[#c9a84c]/35',
    secondary:
      'bg-[#161616] text-white hover:bg-[#1e1e1e] border border-[#2a2a2a] hover:border-[#c9a84c]/50',
    outline:
      'bg-transparent text-[#cccccc] hover:text-white border border-[#2e2e2e] hover:border-[#c9a84c]/60',
    ghost:
      'bg-transparent text-[#aaaaaa] hover:text-white hover:bg-[#161616]',
    'outline-gold':
      'bg-transparent text-[#c9a84c] border border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0a0a]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const interactionStyles = outlineAnimation
    ? `vpd-outline-cta ${outlineVariantStyles[variant]}`
    : legacyVariantStyles[variant];

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: disabled ? undefined : { scale: 1.015 },
        whileTap: disabled ? undefined : { scale: 0.97 },
        transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease.snappy },
      };

  return (
    <motion.button
      className={`${baseStyles} ${sizeStyles[size]} ${interactionStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
      {...(props as any)}
    >
      {icon && iconPosition === 'left' && <span className="vpd-cta-icon vpd-cta-icon-left shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="vpd-cta-icon vpd-cta-icon-right shrink-0">{icon}</span>}
    </motion.button>
  );
};
