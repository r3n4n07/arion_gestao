/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          900: '#4a4f57',
          800: '#5f6570',
          700: '#737b86',
        },
        aqua: {
          500: '#19d1c3',
          600: '#11bfb1',
          700: '#0f9f95',
        },
        ember: {
          400: '#ff9a4d',
          500: '#ff7c2f',
          600: '#ef6820',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(17, 24, 39, 0.35)',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
