/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "container": "#3E3E3E",
        "border": "#3E3E3E"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      gridTemplateColumns: {
        "20": "repeat(20, minmax(0, 1fr))",
      }
    },
  },
  plugins: [],
}