'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { VPD_HERO_GRID_IMAGES, TiltedGridImage } from "../../data/heroImages";
import { cn } from "../../lib/utils";

export interface TiltedGridHeroProps {
  images?: TiltedGridImage[];
  speed?: number; // pixels per second
  radius?: number; // implied cylinder radius in pixels
  tileWidth?: number; // width of each tile in px
  tileHeight?: number; // height of each tile in px
  gap?: number; // gap between tiles in px
  tiltAngle?: number; // slight vertical tilt in degrees (-3 to -6)
  perspective?: number; // 3D perspective depth in px
  verticalOffset?: number; // vertical shift in pixels (negative = shifted up)
  className?: string;
  onTileClick?: (image: TiltedGridImage) => void;
}

export const TiltedGridHero: React.FC<TiltedGridHeroProps> = ({
  images = VPD_HERO_GRID_IMAGES,
  speed = 32, // gentle, ambient, cinematic drift
  radius = 1200, // wider, gentler cylindrical horizon
  tileWidth = 320,
  tileHeight = 420,
  gap = 36,
  tiltAngle = -3, // subtle natural tilt
  perspective = 1400,
  verticalOffset,
  className,
  onTileClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1280);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // ResizeObserver with requestAnimationFrame debounce to avoid undelivered notification loops
  useEffect(() => {
    if (!containerRef.current) return;

    let rafId: number | null = null;
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { width } = entries[0].contentRect;
        if (width > 0) {
          setContainerWidth(width);
        }
      });
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Compute responsive tile geometry based on container width
  const responsiveGeometry = useMemo(() => {
    const isMobile = containerWidth < 640;
    const isTablet = containerWidth >= 640 && containerWidth < 1024;

    const responsiveTileWidth = isMobile
      ? Math.max(190, Math.floor(containerWidth * 0.45))
      : isTablet
      ? 260
      : tileWidth;

    const responsiveTileHeight = isMobile
      ? Math.floor(responsiveTileWidth * 1.32)
      : isTablet
      ? 350
      : tileHeight;

    const responsiveGap = isMobile ? 20 : isTablet ? 28 : gap;
    const responsiveRadius = isMobile ? 700 : isTablet ? 950 : radius;
    const defaultOffset = isMobile ? -40 : isTablet ? -60 : -80;
    const computedOffset = verticalOffset !== undefined ? verticalOffset : defaultOffset;

    return {
      tileW: responsiveTileWidth,
      tileH: responsiveTileHeight,
      itemSpacing: responsiveTileWidth + responsiveGap,
      cylinderRadius: responsiveRadius,
      yOffset: computedOffset,
    };
  }, [containerWidth, tileWidth, tileHeight, gap, radius, verticalOffset]);

  const { tileW, tileH, itemSpacing, cylinderRadius, yOffset } = responsiveGeometry;

  // Seamless continuous loop setup
  const totalItems = images.length;
  const loopWidth = totalItems * itemSpacing;

  const offsetRef = useRef<number>(0);
  const [currentOffset, setCurrentOffset] = useState<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentOffset(0);
      return;
    }

    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!isHovered && loopWidth > 0) {
        // Continuous right-to-left ambient drift
        offsetRef.current = (offsetRef.current + speed * dt) % loopWidth;
        setCurrentOffset(offsetRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, loopWidth, speed, shouldReduceMotion]);

  // Compute visible slots to fill the entire ambient backdrop
  const visibleIndices = useMemo(() => {
    const slotsCount = Math.ceil((containerWidth + loopWidth) / itemSpacing) + 6;
    const indices: number[] = [];
    for (let i = -3; i < slotsCount; i++) {
      indices.push(i);
    }
    return indices;
  }, [containerWidth, loopWidth, itemSpacing]);

  // Compute cylindrical perspective & distance opacity
  const getCylinderTransform = useCallback(
    (xPos: number) => {
      const theta = xPos / cylinderRadius; // radians
      const thetaDeg = (theta * 180) / Math.PI;

      // Implied curved cylinder depth
      const zOffset = cylinderRadius * (Math.cos(theta) - 1);
      const rotY = thetaDeg;

      // Natural falloff: centered items are slightly clearer, outer items fade into dark backdrop
      const arcFactor = Math.max(0, Math.cos(theta));
      const naturalOpacity = Math.pow(arcFactor, 1.4);

      return {
        transform: `translate3d(${xPos}px, 0, ${zOffset}px) rotateY(${rotY}deg) rotateX(${tiltAngle}deg)`,
        opacity: naturalOpacity,
      };
    },
    [cylinderRadius, tiltAngle]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none",
        className
      )}
      style={{
        perspective: `${perspective}px`,
      }}
      role="presentation"
      aria-hidden="true"
    >
      {/* 3D Perspective Scene Container */}
      <div
        className="relative w-full h-full flex items-center justify-center will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateY(${yOffset}px)`,
        }}
      >
        {visibleIndices.map((slotIndex) => {
          const rawIndex = ((slotIndex % totalItems) + totalItems) % totalItems;
          const image = images[rawIndex];

          let xRelCenter = slotIndex * itemSpacing - currentOffset;

          while (xRelCenter < -loopWidth / 2 - itemSpacing) xRelCenter += loopWidth;
          while (xRelCenter > loopWidth / 2 + itemSpacing) xRelCenter -= loopWidth;

          // Only render tiles within active curved viewing field
          const isWithinViewingArc = Math.abs(xRelCenter) < containerWidth * 0.9;
          if (!isWithinViewingArc) return null;

          const { transform, opacity } = getCylinderTransform(xRelCenter);
          const isHoveredTile = hoveredTileId === `${image.id}-${slotIndex}`;

          return (
            <div
              key={`${image.id}-${slotIndex}`}
              className="absolute top-1/2 left-1/2 will-change-transform pointer-events-auto"
              style={{
                width: tileW,
                height: tileH,
                marginTop: -tileH / 2,
                marginLeft: -tileW / 2,
                transform,
                transformStyle: "preserve-3d",
                zIndex: Math.round(50 - Math.abs(xRelCenter) / 20),
                opacity,
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                setHoveredTileId(`${image.id}-${slotIndex}`);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoveredTileId(null);
              }}
              onClick={() => onTileClick?.(image)}
            >
              {/* Tile Container seamlessly integrated into dark background with no hard borders */}
              <div
                className={cn(
                  "relative w-full h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500",
                  isHoveredTile
                    ? "scale-[1.03] shadow-[0_20px_50px_rgba(212,175,55,0.22)]"
                    : "shadow-[0_16px_40px_rgba(0,0,0,0.85)]"
                )}
              >
                {/* Visual Imagery */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                />

                {/* Soft atmospheric dark tint & vignette for background integration */}
                <div 
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isHoveredTile 
                      ? "bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/20 opacity-60" 
                      : "bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/40 opacity-80"
                  )} 
                />

                {/* Subtle gold ambient glow on tile hover */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl pointer-events-none border transition-opacity duration-300",
                    isHoveredTile ? "border-[#D4AF37]/60 opacity-100" : "border-transparent opacity-0"
                  )}
                />

                {/* Minimal discreet tag for context without intrusive card chrome */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A1A1AA] truncate tracking-wider">
                    {image.title}
                  </span>
                  <span className="text-[#DFC067] text-xs uppercase font-semibold shrink-0 ml-2">
                    {image.tag}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seamless Edge Fading: Left, Right, Top, and Bottom masks into #0A0A0A */}
      <div
        className="absolute inset-y-0 left-0 w-36 sm:w-64 lg:w-96 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, #0A0A0A 15%, rgba(10,10,10,0.85) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-36 sm:w-64 lg:w-96 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to left, #0A0A0A 15%, rgba(10,10,10,0.85) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40 sm:h-56 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, #0A0A0A 25%, rgba(10,10,10,0.85) 65%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36 sm:h-48 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #0A0A0A 30%, rgba(10,10,10,0.85) 70%, transparent 100%)",
        }}
      />
    </div>
  );
};
