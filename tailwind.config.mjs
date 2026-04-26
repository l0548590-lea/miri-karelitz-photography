/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red:      '#C41E3A',
          redDark:  '#9B1530',
          redLight: '#E84060',
          pink:     '#FADADD',
          pinkMid:  '#F5B8C4',
          pinkDeep: '#E8839A',
          blue:     '#C5DCF0',
          blueMid:  '#96BDE0',
          cream:    '#FEF6F7',
          dark:     '#2D2020',
        },
      },
      fontFamily: {
        hebrew: ['"Noto Serif Hebrew"', 'serif'],
        latin:  ['"Playfair Display"', 'serif'],
        sans:   ['"Assistant"', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease-out forwards',
        'fade-in':   'fadeIn 0.7s ease-out forwards',
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%':      { transform: 'scale(1.15)' },
          '28%':      { transform: 'scale(1)' },
          '42%':      { transform: 'scale(1.1)' },
          '70%':      { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
