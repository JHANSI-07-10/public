'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'surface' | 'card' | 'raised';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = true,
  padding = 'lg',
  variant = 'card',
  className = '',
  ...props
}) => {
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

  const hoverStyles = hoverable ? 'card-hover' : '';

  return (
    <div
      className={`rounded-2xl border ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
