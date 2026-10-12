import React, { useRef, useEffect, useState } from 'react';

interface HeroVideoBackgroundProps {
  className?: string;
  videoSrc?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  className = '',
  videoSrc = '/gemini_generated_video_170d55ff.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Attempt video playback on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled
        });
      }
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Initial check in case it was already loaded
    if (video.readyState >= 2) {
      setIsVideoLoaded(true);
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  // High-performance canvas fallback if video is loading or restricted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || (isVideoLoaded && !videoError)) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1280);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 720);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let t = 0;
    const render = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Deep dark background
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);

      // Right-side ambient gold glow
      const radialGlow = ctx.createRadialGradient(
        width * 0.82,
        height * 0.45,
        20,
        width * 0.82,
        height * 0.45,
        width * 0.55
      );
      radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
      radialGlow.addColorStop(0.4, 'rgba(212, 175, 55, 0.09)');
      radialGlow.addColorStop(0.8, 'rgba(10, 10, 10, 0.6)');
      radialGlow.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Flowing golden ribbons on the right
      const ribbonCount = 4;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const startX = width * 0.35;
        const startY = height * (0.28 + r * 0.12);
        ctx.moveTo(startX, startY);

        for (let x = startX; x <= width + 50; x += 15) {
          const normX = (x - startX) / (width - startX);
          const y =
            startY +
            Math.sin(normX * 5 + t * 2 + r * 1.4) * 45 +
            Math.cos(normX * 8 - t * 1.5 + r * 0.8) * 25;
          ctx.lineTo(x, y);
        }

        const ribbonGrad = ctx.createLinearGradient(startX, 0, width, 0);
        ribbonGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
        ribbonGrad.addColorStop(0.35, 'rgba(212, 175, 55, 0.25)');
        ribbonGrad.addColorStop(0.7, 'rgba(223, 192, 103, 0.6)');
        ribbonGrad.addColorStop(1, 'rgba(255, 232, 158, 0.35)');

        ctx.strokeStyle = ribbonGrad;
        ctx.lineWidth = 2.5 + r * 1.2;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.45)';
        ctx.shadowBlur = 14;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVideoLoaded, videoError]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Underlying Canvas Fallback / Ambient Render */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 2. Video Player Element */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[80%_center] filter contrast-[1.3] saturate-[1.2] brightness-[1.05] will-change-transform"
        >
          {/* Fallback alternative source */}
          <source src={videoSrc} type="video/mp4" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 3. Right-Side High-Contrast / High-Luminance Ambient Highlight (Emphasizes video richness on right) */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-3/5 pointer-events-none mix-blend-screen opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 82% 48%, rgba(212, 175, 55, 0.32) 0%, rgba(223, 192, 103, 0.14) 45%, transparent 75%)',
        }}
      />

      {/* 4. Left-Side Darkening Scrim (Guarantees Ultra-Sharp Readability of Text Content) */}
      {/* User instruction: "as the contents are in left side so this video should be more contrast on right side and left less and the text in left should visible clearly" */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to right, #0A0A0A 0%, #0A0A0A 36%, rgba(10, 10, 10, 0.96) 48%, rgba(10, 10, 10, 0.8) 60%, rgba(10, 10, 10, 0.3) 76%, transparent 100%)',
        }}
      />

      {/* 5. Mobile & Responsive Overlay (Ensures text stacks cleanly without video distraction) */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.86) 50%, rgba(10, 10, 10, 0.96) 100%)',
        }}
      />

      {/* 6. Top Edge Seamless Blend into Header/Navigation */}
      <div
        className="absolute inset-x-0 top-0 h-28 sm:h-36 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, #0A0A0A 15%, rgba(10, 10, 10, 0.8) 60%, transparent 100%)',
        }}
      />

      {/* 7. Bottom Edge Seamless Blend into Trust Metrics / Next Section */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 sm:h-36 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to top, #0A0A0A 20%, rgba(10, 10, 10, 0.85) 60%, transparent 100%)',
        }}
      />

      {/* 8. Rightmost Edge Smooth Fade (Prevents any hard video boundary on ultra-wide screens) */}
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-28 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to left, #0A0A0A 0%, rgba(10, 10, 10, 0.5) 45%, transparent 100%)',
        }}
      />
    </div>
  );
};
