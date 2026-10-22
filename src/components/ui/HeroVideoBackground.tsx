'use client';

import React, { useEffect, useRef, useState } from 'react';

interface HeroVideoBackgroundProps {
  className?: string;
  videoSrc?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  className = '',
  videoSrc = '/gemini_generated_video_170d55ff-1080p.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop/tablet viewport (>= 768px) to prevent downloading/rendering video on mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const play = () => {
      const attempt = video.play();
      if (attempt !== undefined) attempt.catch(() => {});
    };

    if (video.readyState >= 2) play();
    else video.addEventListener('loadeddata', play, { once: true });

    return () => video.removeEventListener('loadeddata', play);
  }, [isDesktop, videoSrc]);

  return (
    <div
      className={`hidden md:block absolute inset-0 overflow-hidden pointer-events-none select-none bg-transparent ${className}`}
      style={{
        // Bottom blend: completely dissolves the video layer and scrims to 0 opacity before reaching the bottom edge
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0.06) 90%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0.06) 90%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* 
        Video layer:
        - Enhanced contrast, saturation, and luminance overall so the right side is vivid, punchy, and prominent.
        - Horizontal gradient mask deeply reduces video visibility on the left side (down to 4-8%) so that
          the headline text, paragraph, and CTAs have crystal-clear readability with zero competing contrast.
        - The right side receives full 100% opacity with rich, high-contrast dynamic range.
        - Rendered strictly on viewports >= 768px to ensure 0 mobile cellular data usage and 0 distraction on mobile.
      */}
      {isDesktop && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.85) 68%, black 84%)',
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.85) 68%, black 84%)',
          }}
          className="absolute inset-0 w-full h-full object-cover object-[72%_center] 2xl:object-[76%_center] 3xl:object-[80%_center] contrast-[0.95] saturate-[1.25] brightness-[1.08]"
        />
      )}

      {/* 
        Left Scrim: Deeply softens and darkens the left side to guarantee high-contrast
        readability for all text contents, allowing the subtle procedural gold/silver lines to show cleanly.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #060606 0%, rgba(6,6,6,0.96) 26%, rgba(6,6,6,0.80) 44%, rgba(6,6,6,0.20) 65%, transparent 82%)',
        }}
      />

      {/* 
        Right Side Contrast Accent:
        Enhances the dynamic depth of the technical visualization on the right half.
      */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 85% 45%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Feathered bottom blend: dissolves into transparent well before the bottom of the section */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 sm:h-52 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #060606 0%, rgba(6,6,6,0.7) 35%, rgba(6,6,6,0.15) 70%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default HeroVideoBackground;
