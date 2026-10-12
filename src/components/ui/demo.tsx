'use client';

import React from "react";
import { TiltedGridHero } from "./tilted-grid-hero";
import { VPD_HERO_GRID_IMAGES } from "../../data/heroImages";

export const TiltedGridHeroDemo: React.FC = () => {
  return (
    <div className="w-full py-12 bg-[#0A0A0A] flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">
          TiltedGridHero — Cylindrical Perspective Showcase
        </h2>
        <p className="text-sm text-[#A1A1AA]">
          Continuous right-to-left curved stream with cylindrical depth and edge fading
        </p>
      </div>

      <div className="w-full max-w-5xl">
        <TiltedGridHero
          images={VPD_HERO_GRID_IMAGES}
          onTileClick={(image) => {
            console.log("Selected showcase tile:", image.title);
          }}
        />
      </div>
    </div>
  );
};

export default TiltedGridHeroDemo;
