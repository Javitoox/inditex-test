import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        'custom-gray': 'rgb(23, 23, 23)',
        'custom-white': 'rgb(252, 252, 247)',
      },
      fontFamily: {
        'clash-display-variable': ['ClashDisplay-Variable', 'sans-serif'],
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      marquee: {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
      },
    },
    animation: {
      marquee: 'marquee 20s linear infinite',
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    heroui({
      themes: {
        light: {
          colors: {
            background: '#FCFCF7',
            foreground: '#171717',
          },
        },
        dark: {
          colors: {
            background: '#171717',
            foreground: '#FCFCF7',
          },
        },
      },
    }),
  ],
};
