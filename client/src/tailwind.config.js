/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
    "./dist/**/*.{html,js,ts,css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
}