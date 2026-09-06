/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0C0C0C',
          800: '#141414',
          700: '#1C1C1C',
          600: '#2A2A2A',
        },
        metallic: {
          gold: '#BA8C63',
          bronze: '#966F48',
          amber: '#D4AF37',
        },
      },
    },
  },
  plugins: [],
}
