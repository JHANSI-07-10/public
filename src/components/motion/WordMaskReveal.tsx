'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';

interface WordMaskRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const WordMaskReveal: React.FC<WordMaskRevealProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.06,
  highlightWords,
  highlightClassName = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const words = text.split(' ').filter((w) => w.length > 0);

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            variants={word}
            className={`inline-block ${highlightWords?.includes(w) ? highlightClassName : ''}`}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};
