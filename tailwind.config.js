/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
}

