/**
 * Centralized Design System Tokens for VPD Technologies
 * Verified against live stylesheet (index-DGMHL6Js.css) and production assets
 */

export const tokens = {
  colors: {
    brand: {
      accent: '#c9a84c', // Warm Amber Gold
      accentHover: '#d8b75b',
      accentSoft: 'rgba(201, 168, 76, 0.14)',
      accentGlow: 'rgba(201, 168, 76, 0.25)',
      accentBorder: 'rgba(201, 168, 76, 0.38)',
    },
    background: {
      main: '#0a0a0a',
      surface: '#111111',
      surfaceRaised: '#141414',
      card: '#161616',
      cardHover: '#1c1c1c',
      input: '#101010',
    },
    border: {
      default: '#262626',
      subtle: '#1f1f1f',
      accent: 'rgba(201, 168, 76, 0.38)',
      focus: '#c9a84c',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
      muted: '#777777',
      dim: '#555555',
      onAccent: '#000000',
    },
    status: {
      success: '#22c55e',
      error: '#ef4444',
      warning: '#f59e0b',
    }
  },
  typography: {
    fontFamilies: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, Consolas, "JetBrains Mono", monospace',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    subtle: '0 8px 32px rgba(0, 0, 0, 0.28)',
    raised: '0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 24px -6px rgba(201, 168, 76, 0.15)',
    goldGlow: '0 0 28px -4px rgba(201, 168, 76, 0.35)',
  },
  transitions: {
    default: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    card: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  }
} as const;

export type DesignTokens = typeof tokens;
