'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { useReducedMotion } from 'motion/react';

export interface OrbitTerm {
  id: string;
  name: string;
  isPrimary: boolean;
  ring: 1 | 2 | 3;
  angleOffset: number; // in radians
}

/**
 * EXACT 16 APPROVED ORBIT TERMS:
 * BUILD · TEST · DEPLOY · DESIGN · DEVELOP · LEARN · ITERATE · DATABASE ·
 * WEBSITE · APPLICATION · API · CLOUD · AUTOMATE · ANALYTICS · LAUNCH · SCALE
 *
 * Distributed cleanly across 3 organic elliptical orbits:
 * Ring 1 (Inner, 4 terms):  BUILD, TEST, DESIGN, DEVELOP
 * Ring 2 (Middle, 6 terms): DATABASE, WEBSITE, APPLICATION, API, CLOUD, AUTOMATE
 * Ring 3 (Outer, 6 terms):  DEPLOY, LEARN, ITERATE, ANALYTICS, LAUNCH, SCALE
 * Total: 4 + 6 + 6 = 16 terms exactly. No duplications, no extra terms.
 */

// Ring 1 (Inner) — 4 core engineering verbs
const RING_1_TERMS: OrbitTerm[] = [
  { id: 'r1-build', name: 'BUILD', isPrimary: true, ring: 1, angleOffset: 0 },
  { id: 'r1-design', name: 'DESIGN', isPrimary: false, ring: 1, angleOffset: (Math.PI * 2 * 1) / 4 },
  { id: 'r1-develop', name: 'DEVELOP', isPrimary: false, ring: 1, angleOffset: (Math.PI * 2 * 2) / 4 },
  { id: 'r1-test', name: 'TEST', isPrimary: true, ring: 1, angleOffset: (Math.PI * 2 * 3) / 4 },
];

// Ring 2 (Middle) — 6 architectural & system terms
const RING_2_TERMS: OrbitTerm[] = [
  { id: 'r2-database', name: 'DATABASE', isPrimary: true, ring: 2, angleOffset: 0 },
  { id: 'r2-website', name: 'WEBSITE', isPrimary: false, ring: 2, angleOffset: (Math.PI * 2 * 1) / 6 },
  { id: 'r2-application', name: 'APPLICATION', isPrimary: true, ring: 2, angleOffset: (Math.PI * 2 * 2) / 6 },
  { id: 'r2-api', name: 'API', isPrimary: false, ring: 2, angleOffset: (Math.PI * 2 * 3) / 6 },
  { id: 'r2-cloud', name: 'CLOUD', isPrimary: true, ring: 2, angleOffset: (Math.PI * 2 * 4) / 6 },
  { id: 'r2-automate', name: 'AUTOMATE', isPrimary: false, ring: 2, angleOffset: (Math.PI * 2 * 5) / 6 },
];

// Ring 3 (Outer) — 6 lifecycle & scale terms
const RING_3_TERMS: OrbitTerm[] = [
  { id: 'r3-deploy', name: 'DEPLOY', isPrimary: true, ring: 3, angleOffset: 0 },
  { id: 'r3-learn', name: 'LEARN', isPrimary: false, ring: 3, angleOffset: (Math.PI * 2 * 1) / 6 },
  { id: 'r3-iterate', name: 'ITERATE', isPrimary: false, ring: 3, angleOffset: (Math.PI * 2 * 2) / 6 },
  { id: 'r3-analytics', name: 'ANALYTICS', isPrimary: false, ring: 3, angleOffset: (Math.PI * 2 * 3) / 6 },
  { id: 'r3-launch', name: 'LAUNCH', isPrimary: true, ring: 3, angleOffset: (Math.PI * 2 * 4) / 6 },
  { id: 'r3-scale', name: 'SCALE', isPrimary: true, ring: 3, angleOffset: (Math.PI * 2 * 5) / 6 },
];

const ALL_ORBIT_TERMS: OrbitTerm[] = [...RING_1_TERMS, ...RING_2_TERMS, ...RING_3_TERMS];

interface OrbitRingProps {
  className?: string;
  onOpenConsultation?: () => void;
}

export const OrbitRing: React.FC<OrbitRingProps> = ({
  className = '',
  onOpenConsultation,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredTermId, setHoveredTermId] = useState<string | null>(null);

  // SVG Unique IDs
  const uniqueId = useId();
  const goldGradId = `orbit-gold-grad-${uniqueId}`;
  const coreHaloId = `orbit-core-halo-${uniqueId}`;
  const particleFilterId = `orbit-particle-filter-${uniqueId}`;
  const sheenGradId = `orbit-sheen-grad-${uniqueId}`;

  // Canvas Center in 560x560 coordinate space
  const CENTER_X = 280;
  const CENTER_Y = 280;

  /**
   * ELEGANT ASYMMETRICAL & ELLIPTICAL ORBITS
   * Subtle organic geometry: softly irregular elliptical paths with slight tilt
   * Radii (rx, ry) and rotation tilt angle (tilt in radians)
   * Keeps central logo visually centered while breaking mechanical concentric circles.
   */
  const ORBIT_GEOMETRY = {
    ring1: { rx: 118, ry: 104, tilt: -0.18 }, // Inner: subtle inclination (-10.3 deg)
    ring2: { rx: 172, ry: 188, tilt: 0.22 },  // Middle: vertical stretch, positive tilt (+12.6 deg)
    ring3: { rx: 254, ry: 236, tilt: -0.12 }, // Outer: wide elegant sweep (-6.8 deg)
  };

  // Distinct rotation speeds per ring (radians per second)
  const RING_SPEEDS = {
    ring1: 0.20,  // clockwise
    ring2: -0.15, // counter-clockwise
    ring3: 0.11,  // clockwise
  };

  // Rotation angles for each ring
  const [angles, setAngles] = useState({ ring1: 0, ring2: 0, ring3: 0 });
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const delta = (time - lastTimeRef.current) / 1000;
        // Hover dampening: gently slows rotation when a label is hovered
        const hoverDampener = hoveredTermId ? 0.35 : 1.0;
        const mult = hoverDampener * delta;

        setAngles((prev) => ({
          ring1: (prev.ring1 + RING_SPEEDS.ring1 * mult) % (Math.PI * 2),
          ring2: (prev.ring2 + RING_SPEEDS.ring2 * mult) % (Math.PI * 2),
          ring3: (prev.ring3 + RING_SPEEDS.ring3 * mult) % (Math.PI * 2),
        }));
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [shouldReduceMotion, hoveredTermId]);

  /**
   * Calculate (x, y) along the rotated ellipse:
   * x = CENTER_X + rx*cos(t)*cos(tilt) - ry*sin(t)*sin(tilt)
   * y = CENTER_Y + rx*cos(t)*sin(tilt) + ry*sin(t)*cos(tilt)
   */
  const getEllipsePoint = (ring: 1 | 2 | 3, t: number) => {
    const geo = ring === 1 ? ORBIT_GEOMETRY.ring1 : ring === 2 ? ORBIT_GEOMETRY.ring2 : ORBIT_GEOMETRY.ring3;
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    const cosTilt = Math.cos(geo.tilt);
    const sinTilt = Math.sin(geo.tilt);

    const x = CENTER_X + (geo.rx * cosT * cosTilt - geo.ry * sinT * sinTilt);
    const y = CENTER_Y + (geo.rx * cosT * sinTilt + geo.ry * sinT * cosTilt);
    return { x, y };
  };

  // Helper to generate SVG ellipse path string or transformation
  const getEllipsePathProps = (ring: 1 | 2 | 3) => {
    const geo = ring === 1 ? ORBIT_GEOMETRY.ring1 : ring === 2 ? ORBIT_GEOMETRY.ring2 : ORBIT_GEOMETRY.ring3;
    const tiltDeg = (geo.tilt * 180) / Math.PI;
    return {
      cx: CENTER_X,
      cy: CENTER_Y,
      rx: geo.rx,
      ry: geo.ry,
      transform: `rotate(${tiltDeg.toFixed(2)} ${CENTER_X} ${CENTER_Y})`,
    };
  };

  // Compute coordinates for any term along its elliptical path
  const getTermCoords = (term: OrbitTerm) => {
    const ringAngle = term.ring === 1 ? angles.ring1 : term.ring === 2 ? angles.ring2 : angles.ring3;
    const t = shouldReduceMotion ? term.angleOffset : (term.angleOffset + ringAngle) % (Math.PI * 2);
    return getEllipsePoint(term.ring, t);
  };

  // Intermediate subtle gold nodes along the elliptical trajectories
  const CONNECTED_NODES = [
    { ring: 1 as const, offset: Math.PI * 0.45 },
    { ring: 1 as const, offset: Math.PI * 1.45 },
    { ring: 2 as const, offset: Math.PI * 0.28 },
    { ring: 2 as const, offset: Math.PI * 0.95 },
    { ring: 2 as const, offset: Math.PI * 1.62 },
    { ring: 3 as const, offset: Math.PI * 0.32 },
    { ring: 3 as const, offset: Math.PI * 0.82 },
    { ring: 3 as const, offset: Math.PI * 1.42 },
    { ring: 3 as const, offset: Math.PI * 1.88 },
  ];

  return (
    <div
      className={`relative w-full max-w-[450px] sm:max-w-[480px] lg:max-w-[510px] xl:max-w-[540px] aspect-square select-none ${className}`}
      aria-label="VPD Technologies Orbit Ring - Official Logo Core and System Lifecycle"
    >
      {/* Ambient background gold glow & subtle radial warmth */}
      <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.10),transparent_72%)]" />

      {/* Main SVG Orbit Canvas with 560x560 coordinate space */}
      <svg
        viewBox="0 0 560 560"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Metallic Gold Gradient for orbit paths & illuminated elements */}
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC067" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9C781A" />
          </linearGradient>

          {/* Restrained Gold Halo for Center Official Logo */}
          <radialGradient id={coreHaloId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DFC067" stopOpacity="0.38" />
            <stop offset="45%" stopColor="#D4AF37" stopOpacity="0.16" />
            <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
          </radialGradient>

          {/* Subtle light sweep across logo */}
          <linearGradient id={sheenGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="45%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="55%" stopColor="rgba(223,192,103,0.28)" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Glow filter for photon nodes & hover highlights */}
          <filter id={particleFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Halo behind stationary center logo */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="105"
          fill={`url(#${coreHaloId})`}
          className="pointer-events-none"
        />

        {/* ========================================================
            ORBIT PATHS: 3 Sophisticated, Elliptical Orbits
            Subtle asymmetry with gently varied horizontal and vertical radii
            ======================================================== */}

        {/* Ring 3 — Outer Orbit (DEPLOY, LEARN, ITERATE, ANALYTICS, LAUNCH, SCALE) */}
        <ellipse
          {...getEllipsePathProps(3)}
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <ellipse
          {...getEllipsePathProps(3)}
          fill="none"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* Ring 2 — Middle Orbit (DATABASE, WEBSITE, APPLICATION, API, CLOUD, AUTOMATE) */}
        <ellipse
          {...getEllipsePathProps(2)}
          fill="none"
          stroke="#262626"
          strokeWidth="1.2"
          strokeDasharray="3 5"
        />
        <ellipse
          {...getEllipsePathProps(2)}
          fill="none"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1"
          strokeOpacity="0.32"
        />

        {/* Ring 1 — Inner Orbit (BUILD, TEST, DESIGN, DEVELOP) */}
        <ellipse
          {...getEllipsePathProps(1)}
          fill="none"
          stroke="#262626"
          strokeWidth="1.4"
          strokeDasharray="2 4"
        />
        <ellipse
          {...getEllipsePathProps(1)}
          fill="none"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1.2"
          strokeOpacity="0.45"
        />

        {/* ========================================================
            ILLUMINATED WORKFLOW NODES (Connected systems)
            ======================================================== */}
        {CONNECTED_NODES.map((node, idx) => {
          const ringAngle = node.ring === 1 ? angles.ring1 : node.ring === 2 ? angles.ring2 : angles.ring3;
          const t = shouldReduceMotion ? node.offset : (node.offset + ringAngle) % (Math.PI * 2);
          const { x: nx, y: ny } = getEllipsePoint(node.ring, t);

          return (
            <circle
              key={`node-${node.ring}-${idx}`}
              cx={nx}
              cy={ny}
              r={node.ring === 1 ? 2.5 : 2}
              fill="#DFC067"
              filter={`url(#${particleFilterId})`}
              className="pointer-events-none opacity-80"
            />
          );
        })}

        {/* ========================================================
            ROTATING APPROVED STARTUP TERMS (Text always upright)
            ======================================================== */}
        {ALL_ORBIT_TERMS.map((term) => {
          const { x, y } = getTermCoords(term);
          const isHovered = hoveredTermId === term.id;
          const isPrimary = term.isPrimary;

          // Dimensions for pill labels - neatly sized for readable upright text
          const textLen = term.name.length;
          const pillWidth = isPrimary
            ? textLen > 8 ? 68 : textLen > 5 ? 58 : 50
            : textLen > 8 ? 62 : textLen > 5 ? 52 : 44;
          const pillHeight = isPrimary ? 19 : 15;
          const radiusCorner = isPrimary ? 9.5 : 7.5;

          return (
            <g
              key={term.id}
              className="cursor-pointer select-none transition-transform duration-150"
              style={{
                transform: `translate(${x}px, ${y}px) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`,
                transformOrigin: '0 0',
              }}
              onMouseEnter={() => setHoveredTermId(term.id)}
              onMouseLeave={() => setHoveredTermId(null)}
              onClick={() => {
                setHoveredTermId(term.id);
                if (onOpenConsultation) onOpenConsultation();
              }}
            >
              {/* Active Golden Glow under hovered label */}
              {isHovered && (
                <circle
                  cx="0"
                  cy="0"
                  r={isPrimary ? 24 : 18}
                  fill="#D4AF37"
                  fillOpacity="0.25"
                  filter={`url(#${particleFilterId})`}
                  className="pointer-events-none"
                />
              )}

              {/* Background Pill */}
              <rect
                x={-pillWidth / 2}
                y={-pillHeight / 2}
                width={pillWidth}
                height={pillHeight}
                rx={radiusCorner}
                ry={radiusCorner}
                fill={isHovered ? '#1D1D1D' : isPrimary ? '#171717' : '#111111'}
                stroke={
                  isHovered
                    ? '#DFC067'
                    : isPrimary
                    ? '#D4AF37'
                    : '#2A2A2A'
                }
                strokeWidth={isHovered ? 1.4 : isPrimary ? 1.2 : 0.8}
                fillOpacity="0.96"
                className="transition-colors duration-200"
              />

              {/* Leading Indicator Dot */}
              <circle
                cx={-pillWidth / 2 + (isPrimary ? 8.5 : 6.5)}
                cy="0"
                r={isPrimary ? 2.2 : 1.6}
                fill={isPrimary || isHovered ? '#D4AF37' : '#71717A'}
                className={isPrimary ? 'animate-pulse' : ''}
              />

              {/* Label Text — ALWAYS UPRIGHT AND READABLE */}
              <text
                x={isPrimary ? 3.5 : 2.5}
                y={isPrimary ? 3.2 : 2.8}
                textAnchor="middle"
                fill={
                  isHovered
                    ? '#FFFFFF'
                    : isPrimary
                    ? '#DFC067'
                    : '#A1A1AA'
                }
                fontSize={isPrimary ? '8.5' : '7'}
                fontWeight={isPrimary ? '800' : '600'}
                letterSpacing={isPrimary ? '0.07em' : '0.04em'}
                fontFamily="system-ui, -apple-system, sans-serif"
                className="pointer-events-none transition-colors duration-200"
              >
                {term.name}
              </text>
            </g>
          );
        })}

        {/* ========================================================
            CENTER OFFICIAL VPD TECHNOLOGIES LOGO (Stationary)
            Geometric center is at cx=CENTER_X, cy=CENTER_Y.
            Logo remains fixed while orbits rotate around it.
            Orbit paths never cross over or obscure the logo.
            ======================================================== */}
        <g
          className="cursor-pointer"
          onClick={onOpenConsultation}
          role="button"
          tabIndex={0}
          aria-label="VPD Technologies Central Brand Anchor"
        >
          {/* Gentle, Slow Glow Pulse Ring around logo (3.6s) */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="44"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeOpacity="0.32"
            className="animate-ping pointer-events-none origin-center"
            style={{ animationDuration: '3.6s' }}
          />

          {/* Near-Black Circular Area for High Contrast */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="38"
            fill="#111111"
            stroke="#D4AF37"
            strokeWidth="1.5"
            className="transition-transform duration-300 hover:scale-105 shadow-2xl"
          />

          {/* Inner Accent Gold Border */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="35"
            fill="#0D0D0D"
            stroke="#2A2A2A"
            strokeWidth="1"
          />

          {/* Subtle slow moving light sweep overlay */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="34"
            fill={`url(#${sheenGradId})`}
            className="pointer-events-none"
          />

          {/* EXACT OFFICIAL VPD TECHNOLOGIES LOGO ASSET (/logo.webp)
              Preserving original aspect ratio, colors, and typography.
              Stationary at the geometric center (cx=CENTER_X, cy=CENTER_Y). */}
          <image
            href="/logo.webp"
            x={CENTER_X - 26}
            y={CENTER_Y - 26}
            width="52"
            height="52"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none drop-shadow-[0_0_14px_rgba(212,175,55,0.45)]"
          />

          {/* Tiny Status Beacon below logo to anchor core presence */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y + 28}
            r="2"
            fill="#D4AF37"
            className="animate-pulse"
          />
        </g>
      </svg>
    </div>
  );
};
