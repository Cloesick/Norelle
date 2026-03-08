/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        norelle: {
          /* Primary Brand Colors */
          burgundy: '#722F37',
          'burgundy-light': '#8B3F47',
          'burgundy-dark': '#5A1F27',
          gold: '#D4AF37',
          'gold-light': '#E6C547',
          'gold-dark': '#B8941F',
          cream: '#F5F2E8',
          'cream-light': '#FAF8F2',
          'cream-dark': '#E8E5D8',
          
          /* Text Colors */
          text: '#F5F2E8',
          'text-muted': 'rgba(245, 242, 232, 0.7)',
          'text-dim': 'rgba(245, 242, 232, 0.5)',
          
          /* Semantic Colors */
          background: '#722F37',
          border: 'rgba(245, 242, 232, 0.2)',
          'border-light': 'rgba(245, 242, 232, 0.3)',
          'border-dark': 'rgba(245, 242, 232, 0.1)',
          
          /* Supporting Colors */
          charcoal: '#2C2C2C',
          gray: '#666666',
          silver: '#C0C0C0',
          pearl: '#F8F6F0',
          
          /* Accent Colors */
          'rose-gold': '#E8B4A0',
          platinum: '#E5E4E2',
          diamond: '#B9F2FF',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
