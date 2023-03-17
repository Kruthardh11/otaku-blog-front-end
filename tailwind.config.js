/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: "'Merriweather', serif;",
        openSans:"'Open Sans', sans-serif;",
      }
    },
  },
  plugins: [],
}