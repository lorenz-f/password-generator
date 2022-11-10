/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
      oxygen: ["Oxygen", "sans-serif"],
      rufina: ["Rufina", "serif"]
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('flowbite/plugin')
  ], 
}
