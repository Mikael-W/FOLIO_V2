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
      colors: {
        iosBlue: '#3B85A6',
        lightBg: '#F5F5F7',
        lightText: '#1C1C1E',
        darkBg: '#000000',
        darkText: '#FFFFFF',
      },
      boxShadow: {
        apple: '0 4px 16px rgba(0,0,0,0.08)',
        appleLg: '0 8px 32px rgba(0,0,0,0.12)',
      },
    },
  },

  safelist: [
    {
      pattern: /bg-gradient-to-(r|l|br|bl|t|b)/,
    },

    {
      pattern: /from-(blue|purple|green|orange|yellow|pink)-(400|500|600)/,
    },

    {
      pattern: /to-(blue|purple|green|orange|yellow|pink)-(400|500|600)/,
    },
  ],

  plugins: [],
};
