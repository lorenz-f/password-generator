/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poiretOne: ["Poiret One", "cursive"],
      didactGothic: ["Didact Gothic", "sans-serif"]
    },
    screens: {
      'sm': {'max': '700px'} 
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('flowbite/plugin')
  ], 
  
}
