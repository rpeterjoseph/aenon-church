/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#06090F',
          900: '#0C1220',
          800: '#141E34',
          700: '#1C2A48',
          600: '#24365C',
        },
        accent: {
          700: '#9B0E20',
          600: '#B71226',
          500: '#D42B2B',
          400: '#E04040',
          300: '#EC6060',
        },
        silver: {
          100: '#F5F5F7',
          200: '#E8E8EC',
          300: '#C0C0C8',
          400: '#9898A0',
          500: '#6E6E78',
        },
      },
      fontFamily: {
        sans: ['Neue Montreal', 'system-ui', 'sans-serif'],
        nav: ['Neue Montreal', 'system-ui', 'sans-serif'],
        display: ['Neue Montreal', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
