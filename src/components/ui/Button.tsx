'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  outlineAnimation?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  outlineAnimation = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `inline-flex items-center justify-center font-bold tracking-wide rounded-xl transition-colors duration-200 focus:outline-none ${
    outlineAnimation
      ? ''
      : 'focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] transition-all active:scale-[0.98]'
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
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const interactionStyles = outlineAnimation
    ? `vpd-outline-cta ${outlineVariantStyles[variant]}`
    : legacyVariantStyles[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${interactionStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="vpd-cta-icon vpd-cta-icon-left shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="vpd-cta-icon vpd-cta-icon-right shrink-0">{icon}</span>}
    </button>
  );
};
