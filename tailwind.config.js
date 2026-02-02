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
        'purple-base': '#3D1B47'
      }
    },
  },
  plugins: [],
}

