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
          /* Brand Palette — from NORELLE.pdf (3 colors only) */
          burgundy: '#3B0505',
          cream: '#FFFAEB',
          mocha: '#2F1B1A',

          /* Functional tints derived from brand palette */
          'burgundy-light': '#4E0E0E',
          'burgundy-dark': '#2A0303',
          'cream-dark': '#F0E6CC',

          /* Semantic */
          text: '#FFFAEB',
          'text-muted': 'rgba(255, 250, 235, 0.6)',
          'text-dim': 'rgba(255, 250, 235, 0.35)',
          border: 'rgba(255, 250, 235, 0.12)',
          'border-light': 'rgba(255, 250, 235, 0.2)',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant', 'serif'],
        body: ['var(--font-jost)', 'Jost', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Cormorant', 'serif'],
        sans: ['var(--font-jost)', 'Jost', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.15em',
        nav: '0.1em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
