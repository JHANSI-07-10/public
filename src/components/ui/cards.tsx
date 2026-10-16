'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';

export interface CardItem {
  id?: string | number;
  title: string;
  description: string;
  image: string;
  icon?: React.ComponentType<{ className?: string }>;
  tag?: string;
  link?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export interface HoverRevealCardProps {
  item: CardItem;
  index?: number;
  cardBg?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  heightClass?: string;
  className?: string;
  onClick?: () => void;
}

export const HoverRevealCard: React.FC<HoverRevealCardProps> = ({
  item,
  index = 0,
  cardBg = 'bg-[#303030]',
  borderColor = 'border-[#494949]',
  hoverBorderColor = 'hover:border-[#D4AF37] focus-within:border-[#D4AF37]',
  heightClass = 'h-[400px] sm:h-[420px] lg:h-[440px]',
  className,
  onClick,
}) => {
  const Icon = item.icon;

  return (
    <div
      tabIndex={0}
      role={onClick ? 'button' : 'region'}
      aria-label={item.title}
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] select-none',
        'hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_24px_-6px_rgba(212,175,55,0.18)]',
        'focus-within:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_24px_-6px_rgba(212,175,55,0.18)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818]',
        cardBg,
        borderColor,
        hoverBorderColor,
        heightClass,
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* 1. Background Visual with smooth scale + upward shift on hover */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          quality={100}
          sizes="800px"
          className={cn(
            'object-cover object-center w-full h-full',
            'transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
            'group-hover:scale-105 group-hover:-translate-y-2.5',
            'group-focus-within:scale-105 group-focus-within:-translate-y-2.5',
            'motion-reduce:transform-none motion-reduce:transition-none'
          )}
          priority={index < 2}
        />
      </div>

      {/* 2. Gradient Overlay keeping title readable & transitioning smoothly */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent',
          'transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
          'group-hover:from-black/90 group-hover:via-black/35 group-hover:to-transparent',
          'group-focus-within:from-black/90 group-focus-within:via-black/35 group-focus-within:to-transparent',
          'pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* 3. Subtle Gold Bottom Accent Vignette on hover */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#D4AF37]/15 to-transparent',
          'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
          'transition-opacity duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
          'pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* 4. Top Tag Chip (if provided) */}
      {item.tag && (
        <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-[#111111]/80 border border-[#444444] text-[10px] font-mono tracking-wider text-[#A1A1AA] uppercase backdrop-blur-md">
          {item.tag}
        </div>
      )}

      {/* 5. Card Content Area (anchored at bottom) */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end z-10">
        {/* Icon (if provided) */}
        {Icon && (
          <div className="w-11 h-11 rounded-xl bg-[#1c1c1c]/90 border border-[#D4AF37]/30 flex items-center justify-center mb-3.5 text-[#D4AF37] backdrop-blur-md transition-colors duration-500 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/15">
            <Icon className="w-5 h-5 text-[#D4AF37]" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#F2D98D] group-focus-within:text-[#F2D98D] transition-colors duration-500">
          {item.title}
        </h3>

        {/* Controlled Gold Accent Indicator Line */}
        <div
          className={cn(
            'h-[2px] w-8 bg-[#D4AF37]/60 rounded-full mt-2.5',
            'transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
            'group-hover:w-14 group-hover:bg-[#D4AF37]',
            'group-focus-within:w-14 group-focus-within:bg-[#D4AF37]'
          )}
          aria-hidden="true"
        />

        {/* Expandable Description Area */}
        <div
          className={cn(
            'grid transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden',
            'grid-rows-[1fr] md:grid-rows-[0fr]',
            'md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]',
            'motion-reduce:grid-rows-[1fr]'
          )}
        >
          <div className="overflow-hidden min-h-0">
            <p
              className={cn(
                'pt-3 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed',
                'transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
                'opacity-100 md:opacity-0 md:translate-y-3',
                'md:group-hover:opacity-100 md:group-hover:translate-y-0',
                'md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0',
                'motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none'
              )}
            >
              {item.description}
            </p>

            {item.action && (
              <div
                className={cn(
                  'pt-3 flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider',
                  'transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
                  'opacity-100 md:opacity-0 md:translate-y-2',
                  'md:group-hover:opacity-100 md:group-hover:translate-y-0',
                  'md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0',
                  'motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none'
                )}
              >
                <span>{item.action.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface HoverRevealCardsProps {
  items: CardItem[];
  className?: string;
  gridClassName?: string;
  cardBg?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  heightClass?: string;
  onCardClick?: (item: CardItem, index: number) => void;
}

export const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  items,
  className,
  gridClassName = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6',
  cardBg,
  borderColor,
  hoverBorderColor,
  heightClass,
  onCardClick,
}) => {
  return (
    <StaggerContainer className={cn('grid', gridClassName, className)}>
      {items.map((item, idx) => (
        <StaggerItem key={item.id ?? item.title} distance={20} className="h-full">
          <HoverRevealCard
            item={item}
            index={idx}
            cardBg={cardBg}
            borderColor={borderColor}
            hoverBorderColor={hoverBorderColor}
            heightClass={heightClass}
            onClick={onCardClick ? () => onCardClick(item, idx) : undefined}
          />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default HoverRevealCards;
