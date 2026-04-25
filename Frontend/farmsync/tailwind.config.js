/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        farm: {
          bg: '#0F1115',
          card: '#1A1C1E',
          sidebar: '#131619',
          border: '#2A2D31',
          accent: '#22C55E',
          'accent-hover': '#16A34A',
          greenCard: '#0D211A',
          blueCard: '#0A1828',
          yellowCard: '#241F0D',
          redCard: '#2B1212',
        }
      }
    },
  },
  plugins: [],
}