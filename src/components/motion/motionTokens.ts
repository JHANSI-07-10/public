/**
 * VPD Technologies Motion Design System Tokens
 * Strict enterprise restraint: 200ms - 450ms durations, cubic-bezier(0.16, 1, 0.3, 1) easing.
 * Respects prefers-reduced-motion across all tokens.
 */

export const motionTokens = {
  duration: {
    instant: 0.001,
    fast: 0.2,
    normal: 0.35,
    relaxed: 0.45,
  },
  ease: {
    snappy: [0.16, 1, 0.3, 1] as [number, number, number, number],
    smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
  stagger: {
    tight: 0.05,
    normal: 0.08,
    relaxed: 0.12,
  },
  distance: {
    subtle: 12,
    normal: 18,
    relaxed: 24,
  },
};

export const defaultTransition = {
  duration: motionTokens.duration.normal,
  ease: motionTokens.ease.snappy,
};
