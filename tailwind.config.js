/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#FFF8E6",
        'purple-base': 'rgb(60, 30, 70)',
        'base': "rgb(245, 245, 230)",
        'page-base' : "#f5f1e6",
        'aura' : 'rgb(230, 210, 170)',
        'tm-orange' : 'rgb(160, 90, 70)',
        'tm-vert' : 'rgb(140, 140, 90)'
      },

    fontFamily: {
      palab: ["Palab", "sans-serif"],
    },
    },
  },
  plugins: [],
}

