/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['RF Dewi Expanded'],
      'body': ['Montserrat'],
    },
    colors: {
      "accent": '#00FFAE',
      "gray-1": '#B6C1BE',
      "gray-2": '#606163',
      "gray-3": '#242529',
      "gray-4/70": '#22252F',
      "black/80": 'rgba(0,0,0,0.8)'
    },
    extend: {
      colors: {
        "accent": '#00FFAE'
      },
      screens: {
        'tablet': '744px',
        // => @media (min-width: 640px) { ... }

        'desktop': '1300px',
      },
    },
  },
  plugins: [],
});

