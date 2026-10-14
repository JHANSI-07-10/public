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
      className="absolute inset-0 h-full w-full scale-105 object-cover opacity-90 contrast-105"
      style={{ objectPosition: position }}
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/45 to-[#0a0a0a]/15" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
  </div>
);
