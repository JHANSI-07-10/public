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
      className="absolute inset-0 h-full w-full scale-105 object-cover opacity-75 contrast-150 grayscale-[10%]"
      style={{ objectPosition: position }}
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.76)_0%,rgba(10,10,10,0.58)_48%,rgba(10,10,10,0.36)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.06)_0%,rgba(10,10,10,0.02)_48%,rgba(10,10,10,0.92)_100%)]" />
  </div>
);
