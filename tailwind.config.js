/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0d1116',
          surface: '#14181f',
          card: '#14181f',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        neon: {
          green: '#00df8f',
          dark: '#00b373',
        },
      },
    },
  },
  plugins: [],
}