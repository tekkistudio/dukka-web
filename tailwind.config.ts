import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light theme palette - African e-commerce focus
        dukka: {
          // Primary brand color - Chatseller blue
          blue: {
            DEFAULT: '#3973e0',
            50: '#f0f5ff',
            100: '#e0ebff',
            200: '#c7dbff',
            300: '#a3c4ff',
            400: '#7ca3ff',
            500: '#5a84ff',
            600: '#3973e0',
            700: '#2d5ac7',
            800: '#2649a0',
            900: '#1e3a7a',
          },

          // Supporting colors
          orange: {
            DEFAULT: '#ff6b35',
            50: '#fff4f0',
            100: '#ffe8e0',
            200: '#ffd0c2',
            300: '#ffb39a',
            400: '#ff8b66',
            500: '#ff6b35',
            600: '#f04d1a',
            700: '#c73e15',
            800: '#a03418',
            900: '#7a2914',
          },

          yellow: {
            DEFAULT: '#ffc107',
            50: '#fffbf0',
            100: '#fff6d6',
            200: '#ffebad',
            300: '#ffdc7a',
            400: '#ffc94d',
            500: '#ffc107',
            600: '#e6a800',
            700: '#b38400',
            800: '#806000',
            900: '#664d00',
          },

          green: {
            DEFAULT: '#34c759',
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#34c759',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },

          // Neutral colors
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'hover': '0 8px 30px rgba(57, 115, 224, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;