'use client';

import React from 'react';
import { VPD_LOGO_PATHS, VPD_LOGO_VIEWBOX } from './photonKnot/logoPaths';

/**
 * PageLoader — Lightweight loading indicator for Next.js App Router Suspense boundaries
 * Displays while route segments are loading and data is rendering.
 */
export const PageLoader: React.FC = () => {
  return (
    <div
      className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 bg-[#0A0A0A] select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading page data"
    >
      <div className="relative w-full max-w-[340px] aspect-[2/1] flex items-center justify-center">
        {/* Ambient radial gold glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full blur-2xl opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)',
          }}
        />

        {/* Authentic VPD Logo */}
        <svg
          viewBox={VPD_LOGO_VIEWBOX}
          className="w-full h-full object-contain drop-shadow-[0_2px_20px_rgba(212,175,55,0.25)] animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pageLoaderDGoldGrad" x1="30%" y1="10%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFFFFF" />
              <stop offset="62%" stopColor="#F2D98D" />
              <stop offset="85%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#C59B27" />
            </linearGradient>
            <linearGradient id="pageLoaderVGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5C15D" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
          <path d={VPD_LOGO_PATHS.vp_body.d} fill="#FFFFFF" fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.v_gold.d} fill="url(#pageLoaderVGoldGrad)" fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.d_shape.d} fill="url(#pageLoaderDGoldGrad)" fillRule="evenodd" />
          <path d={VPD_LOGO_PATHS.text.d} fill="#FFFFFF" fillRule="evenodd" opacity="0.9" />
        </svg>
      </div>

      {/* Status Pill and Progress Bar */}
      <div className="mt-5 flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626]">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
            RENDERING SYSTEM DATA
          </span>
        </div>
        <div className="w-36 h-[2px] rounded-full bg-[#202020] overflow-hidden mt-1 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
