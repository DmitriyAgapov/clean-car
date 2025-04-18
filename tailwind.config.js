/** @type {(tailwindConfig: object) => object} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: 'RF Dewi Expanded',
      body: 'Montserrat',
      sansSerif: 'Montserrat'
    },
    fontSize: {
      xss: ['0.625rem', '.75rem'],
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '21px'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.375rem'],
      xl: '1.25rem',
      '2xl': ['1.5rem', '1.875rem'],
      '3xl': '1.75rem',
      '4xl': '2rem',
      '5xl': '2.25rem',
      '6xl': '2.5rem',
      '7xl': '3.75rem',
      '8xl': '4rem',
    },
    colors: {
      accent: '#00FFAE',
      'gray-1': '#B6C1BE',
      'gray-2': '#606163',
      'gray-3': '#242529',
      'gray-4/70': 'rgba(33,36,46,0.7)',
      'black/80': 'rgba(0,0,0,0.8)',
      error: '#F4565F',
      active: '#13FF71',
      notice: '#FBFF4A',
    },
    extend: {
      borderRadius: {
        '062': '.625rem'
      },
      animation: {
        'progressFive': 'progress 6s ease-in-out ',
      },
      keyframes: {
        progress: {
          "from": { translate: '-20rem 0',     scale: "100% 1"},
          "to": {translate: '0 0',     scale: "200% 1"},
        }
      },
      colors: {
        // progress: "linear-gradient(270deg, #29725B 18.5%, var(--notification-color) 45.5%, #29725B 55.5%, #3FECAE 88.5%)",
        accent: '#00FFAE',
      },
      maxWidth: {
        xss: '17rem',
      },
      screens: {
        mobile:  {'max': '743px'},
        tablet: '744px',
        "tablet-max": {'max': '743px'},
        // => @media (min-width: 640px) { ... }
        "tablet-big-max": {'max': '1023px'},
        "desktop-max": {'max': '1299px'},
        "lg-to-desktop": {'min': '961px', 'max': '1299px'},
        desktop: '1300px',
      },
      letterSpacing: {
        input: '0.02em'
      }
    },
  },
  plugins: [
    require('tailwindcss-children'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');

    }
  ],
})
