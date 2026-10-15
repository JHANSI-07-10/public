'use client';

import React, { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface CurvedTravelingBeamProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  radius?: number;
  duration?: number;
  beamLength?: number;
}

export const CurvedTravelingBeam: React.FC<CurvedTravelingBeamProps> = ({
  children,
  className = '',
  color = '#DFC067',
  radius = 16,
  duration = 2.4,
  beamLength = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const rawId = useId();
  const filterId = rawId.replace(/[^a-zA-Z0-9]/g, '');

  if (shouldReduceMotion) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`group relative ${className}`}
      initial="idle"
      whileHover="hover"
      whileTap="hover"
      animate="idle"
      variants={{
        idle: { y: 0 },
        hover: { y: -3, transition: { duration: 0.2, ease: 'easeOut' } },
      }}
    >
      {/* Card Content */}
      {children}

      {/* SVG Traveling Beam along the curved radius */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-20"
      >
        <defs>
          <filter id={`beam-blur-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient glow streak */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.45"
          filter={`url(#beam-blur-${filterId})`}
          initial={{ pathLength: beamLength, pathOffset: 0, opacity: 0 }}
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: 1,
              pathOffset: [0, 1],
              transition: {
                pathOffset: { duration, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 0.2 },
              },
            },
          }}
        />

        {/* Sharp gold laser core */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          fill="none"
          stroke="#FFF2C6"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: beamLength, pathOffset: 0, opacity: 0 }}
          variants={{
            idle: { opacity: 0 },
            hover: {
              opacity: 1,
              pathOffset: [0, 1],
              transition: {
                pathOffset: { duration, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 0.2 },
              },
            },
          }}
        />
      </svg>
    </motion.div>
  );
};
