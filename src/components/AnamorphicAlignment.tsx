import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, RotateCcw, Play, Pause } from 'lucide-react';

interface AnamorphicAlignmentProps {
  title?: string;
  subtitle?: string;
  accentWord?: string;
  className?: string;
  autoPlay?: boolean;
}

export const AnamorphicAlignment: React.FC<AnamorphicAlignmentProps> = ({
  title = 'ENGINEER THE DIGITAL CORE',
  subtitle = 'MISSION-CRITICAL ARCHITECTURE · PRECISION ALIGNMENT',
  accentWord = 'DIGITAL CORE',
  className = '',
  autoPlay = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [phase, setPhase] = useState<'shattered' | 'aligning' | 'assembled'>('shattered');

  const replay = () => {
    setKey((prev) => prev + 1);
    setPhase('shattered');
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer1 = setTimeout(() => {
      setPhase('aligning');
    }, 400);

    const timer2 = setTimeout(() => {
      setPhase('assembled');
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [key, isPlaying]);

  // Split title into characters for kinetic anamorphic assembly
  const words = title.split(' ');

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0f1115] to-[#07080a] border border-[#26282e] p-6 sm:p-10 shadow-2xl ${className}`}
      key={key}
    >
      {/* Anamorphic optical flare streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal cyan-gold anamorphic lens flare line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.1, x: '-50%' }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.4, scaleX: 1, x: '0%' }
              : {
                  opacity: [0, 0.9, 0.4, 0.8, 0.3],
                  scaleX: [0.1, 1.4, 1, 1.1, 1],
                  x: ['-20%', '10%', '-5%', '0%', '0%'],
                }
          }
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#4ca8ff] via-[#c9a84c] to-transparent blur-[1px]"
        />

        {/* Anamorphic glow pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.25, scale: 1 }
              : { opacity: [0, 0.5, 0.2, 0.35], scale: [0.8, 1.3, 1, 1.05] }
          }
          transition={{ duration: 2.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-24 bg-[#c9a84c]/15 blur-3xl rounded-full"
        />

        {/* Optical horizontal streaks */}
        <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4ca8ff]/30 to-transparent blur-[0.5px]" />
        <div className="absolute top-[65%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent blur-[0.5px]" />
      </div>

      {/* Top Bar with Cinematic Status & Controls */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1f2127] pb-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#a0a5b2] uppercase">
            ANAMORPHIC ALIGNMENT · 2.39:1 CINEMATIC RATIO
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            className="p-1.5 rounded-lg bg-[#181a20] hover:bg-[#22252e] text-[#8e94a4] hover:text-white border border-[#2a2d36] transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={replay}
            aria-label="Replay kinetic alignment"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181a20] hover:bg-[#22252e] text-[#8e94a4] hover:text-[#c9a84c] border border-[#2a2d36] transition-colors text-xs font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            <span>ALIGN</span>
          </button>
        </div>
      </div>

      {/* Shattered Title Assembly Stage */}
      <div className="relative z-10 min-h-[160px] sm:min-h-[200px] flex flex-col items-center justify-center text-center px-2 py-4">
        {/* Kinetic Words with Shatter & Convergence */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 mb-4">
          {words.map((word, wordIndex) => {
            const isAccent = accentWord.includes(word);

            return (
              <span key={wordIndex} className="inline-flex overflow-visible relative">
                {word.split('').map((char, charIndex) => {
                  const globalIndex = wordIndex * 8 + charIndex;
                  const randomX = (globalIndex % 2 === 0 ? 1 : -1) * ((globalIndex * 13) % 40 + 10);
                  const randomY = (globalIndex % 3 === 0 ? 1 : -1) * ((globalIndex * 17) % 30 + 10);
                  const randomRotate = (globalIndex % 2 === 0 ? 1 : -1) * ((globalIndex * 7) % 25 + 5);

                  return (
                    <motion.span
                      key={charIndex}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1, x: 0, y: 0, rotate: 0 }
                          : {
                              opacity: 0,
                              x: randomX,
                              y: randomY,
                              rotate: randomRotate,
                              filter: 'blur(8px)',
                              scale: 1.4,
                            }
                      }
                      animate={
                        shouldReduceMotion
                          ? { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)', scale: 1 }
                          : {
                              opacity: 1,
                              x: 0,
                              y: 0,
                              rotate: 0,
                              filter: 'blur(0px)',
                              scale: 1,
                            }
                      }
                      transition={{
                        duration: 1.1,
                        delay: shouldReduceMotion ? 0 : 0.05 + charIndex * 0.035 + wordIndex * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block text-3xl sm:text-5xl md:text-6xl font-black tracking-tight select-none transition-colors duration-500 ${
                        isAccent
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffd977] via-[#c9a84c] to-[#e4be5c] drop-shadow-[0_0_20px_rgba(201,168,76,0.35)]'
                          : 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]'
                      }`}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </div>

        {/* Subtitle with chromatic anamorphic entrance */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, letterSpacing: '0.4em', y: 12 }}
          animate={{ opacity: 1, letterSpacing: '0.2em', y: 0 }}
          transition={{ duration: 1.2, delay: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-semibold tracking-widest text-[#a8b0c2] uppercase font-mono max-w-xl"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Assembly Diagnostic Status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#6e7485] pt-6 border-t border-[#1f2127] mt-4">
        <div className="flex items-center gap-3">
          <span>STATUS:</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
              phase === 'assembled'
                ? 'bg-[#c9a84c]/20 text-[#ffd977] border border-[#c9a84c]/40'
                : 'bg-[#22252e] text-[#a0a5b2]'
            }`}
          >
            {phase === 'assembled' ? 'LOCKSTEP ALIGNED' : phase === 'aligning' ? 'CONVERGING...' : 'SHATTERED'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#a0a5b2]">
          <Sparkles className="w-3 h-3 text-[#c9a84c]" />
          <span>CHROMATIC SYNC · ZERO DISTORTION</span>
        </div>
      </div>
    </div>
  );
};
