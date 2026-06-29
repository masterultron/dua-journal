import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        noor: {
          purple:    '#6D28D9',
          dark:      '#5B21B6',
          accent:    '#8B5CF6',
          lavender:  '#F3E8FF',
          bg:        '#FCFAFF',
          card:      '#FFFFFF',
          border:    '#E9D5FF',
          text:      '#1F2937',
          muted:     '#6B7280',
        },
      },
      fontFamily: {
        sans:   ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'serif'],
      },
      backgroundImage: {
        'noor-gradient': 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease forwards',
        'slide-up':   'slideUp 0.5s ease forwards',
        'geo-rotate': 'geoRotate 60s linear infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        geoRotate: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
}

export default config