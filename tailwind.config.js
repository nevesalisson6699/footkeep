/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          light: '#22c55e',
          DEFAULT: '#15803d',
          dark: '#14532d',
          deep: '#052e16',
        },
        turf: '#1b4d2e',
      },
      fontFamily: {
        teko: ['Teko', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
