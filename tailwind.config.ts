import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050508',
        'deep-navy': '#0D1B2A',
        'brand-blue': {
          DEFAULT: '#0D2137',
          light: '#1A4A7A',
          glow: '#2A6BB0',
        },
        gold: {
          DEFAULT: '#C9A740',
          light: '#E8D5B0',
          bright: '#F0C860',
          dim: '#8A7020',
        },
        champagne: '#E8D5B0',
        'luxury-white': '#F8F6F0',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,167,64,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(201,167,64,0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A740 0%, #F0C860 50%, #C9A740 100%)',
        'dark-gradient': 'linear-gradient(180deg, #050508 0%, #0D1B2A 100%)',
        'hero-radial': 'radial-gradient(ellipse at center, #1A4A7A22 0%, #050508 70%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(201,167,64,0.2) 50%, transparent 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
        '144': '36rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201,167,64,0.3)',
        'gold-lg': '0 0 60px rgba(201,167,64,0.4)',
        'blue-glow': '0 0 40px rgba(26,74,122,0.5)',
        'inner-dark': 'inset 0 2px 20px rgba(0,0,0,0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

export default config
