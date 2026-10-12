import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'subtle' | 'outline' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-[#c9a84c]/10 text-[#c9a84c] border-[#c9a84c]/25',
    subtle: 'bg-[#1a1a1a] text-[#cccccc] border-[#2a2a2a]',
    outline: 'bg-transparent text-[#999999] border-[#2e2e2e]',
    success: 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/25',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
