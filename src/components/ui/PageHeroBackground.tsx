'use client';

import React from 'react';

interface PageHeroBackgroundProps {
  imageSrc: string;
  position?: string;
}

export const PageHeroBackground: React.FC<PageHeroBackgroundProps> = ({
  imageSrc,
  position = 'center',
}) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <img
      src={imageSrc}
      alt=""
      className="absolute inset-0 h-full w-full scale-105 object-cover opacity-95 contrast-105 brightness-105"
      style={{ objectPosition: position }}
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/75 via-[#0a0a0a]/35 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
  </div>
);
