/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.ts',
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        hatch: 'rgb(var(--c-hatch) / <alpha-value>)',
        signal: 'rgb(var(--c-signal) / <alpha-value>)',
        'on-signal': 'rgb(var(--c-on-signal) / <alpha-value>)',
        'on-signal-inverse': 'rgb(var(--c-on-signal-inverse) / <alpha-value>)',
        footer: 'rgb(var(--c-footer) / <alpha-value>)',
        'footer-text': 'rgb(var(--c-footer-text) / <alpha-value>)',
      },
    },
  },


  plugins: [],
};
