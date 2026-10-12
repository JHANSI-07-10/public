'use client';

import React, { useEffect, useRef } from 'react';

interface HeroVideoBackgroundProps {
  className?: string;
  videoSrc?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  className = '',
  videoSrc = '/gemini_generated_video_170d55ff.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
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
  }, [videoSrc]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0A0A0A] ${className}`}
      aria-hidden="true"
    >
      {/* Video: nudged right so its subject sits in the uncovered half, with a
          low-contrast, desaturated grade so it stays ambient and never competes
          with the copy or the metric numbers */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover object-[68%_center] contrast-[0.95] saturate-[0.85] brightness-[0.95]"
      />

      {/* Global tone-down so the video melts into the page background */}
      <div className="absolute inset-0 bg-[#0A0A0A]/30" />

      {/* Left scrim: heavy over the text column, fading out to the right so the
          video stays vivid on the right half of the hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.97) 34%, rgba(10,10,10,0.9) 52%, rgba(10,10,10,0.55) 68%, rgba(10,10,10,0.18) 82%, transparent 100%)',
        }}
      />

      {/* Mobile: text spans the full width, so use a heavier uniform wash */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.92) 100%)',
        }}
      />

      {/* Edge fades: blend into the navbar above and the next section below */}
      <div
        className="absolute inset-x-0 top-0 h-24 sm:h-32"
        style={{
          background: 'linear-gradient(to bottom, #0A0A0A 0%, rgba(10,10,10,0) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 sm:h-40"
        style={{
          background:
            'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0) 100%)',
        }}
      />
    </div>
  );
};
