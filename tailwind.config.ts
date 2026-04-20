import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050505',
          elevated: '#0D0D0D',
          subtle: '#141414',
        },
        rule: {
          DEFAULT: '#1F1F1F',
          strong: '#2E2E2E',
        },
        fg: {
          DEFAULT: '#F5F5F5',
          secondary: '#A8A8A8',
          muted: '#7A7A7A',
        },
        accent: {
          DEFAULT: '#F97316',
          dim: '#A13F00',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(4rem, 11vw, 8rem)',           { lineHeight: '0.92', letterSpacing: '-0.045em', fontWeight: '500' }],
        'h1':      ['clamp(2.5rem, 5.5vw, 3.5rem)',      { lineHeight: '1',    letterSpacing: '-0.035em', fontWeight: '500' }],
        'h2':      ['clamp(2rem, 4.3vw, 2.75rem)',       { lineHeight: '1',    letterSpacing: '-0.035em', fontWeight: '500' }],
        'h3':      ['clamp(1.5rem, 2.75vw, 1.75rem)',    { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '500' }],
        'index':   ['clamp(3.5rem, 8vw, 6rem)',          { lineHeight: '0.88', letterSpacing: '-0.04em',  fontWeight: '500' }],
        'lede':    ['clamp(0.875rem, 1.5vw, 0.9375rem)', { lineHeight: '1.6',  letterSpacing: '0',        fontWeight: '400' }],
        'body':    ['0.875rem',                          { lineHeight: '1.65', letterSpacing: '0',        fontWeight: '400' }],
        'meta':    ['0.8125rem',                         { lineHeight: '1.5',  letterSpacing: '0.01em',   fontWeight: '500' }],
        'nav':     ['0.8125rem',                         { lineHeight: '1',    letterSpacing: '0.04em',   fontWeight: '500' }],
        'micro':   ['0.625rem',                          { lineHeight: '1',    letterSpacing: '0.14em',   fontWeight: '500' }],
        'coord':   ['0.6875rem',                         { lineHeight: '1',    letterSpacing: '0.12em',   fontWeight: '400' }],
      },
      maxWidth: {
        container: '1200px',
        prose: '680px',
        ch60: '60ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0, 0, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '150ms',
        slow: '200ms',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [],
} satisfies Config
