import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0F172A',
          800: '#111827',
          700: '#1F2937',
        },
        brand: {
          500: '#2563EB',
          600: '#1D4ED8',
        },
        success: '#22C55E',
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 23, 42, 0.24)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;
