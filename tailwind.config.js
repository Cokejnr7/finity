/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    screens: {
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl: '1440px'
    },
    extend: {
      colors:{
        lightPurple: 'rgb(90, 35, 185)',
        darkPurple: 'rgb(54, 22, 111)',
        veryLightPurple: '#F6F6F9',
        borderColor: 'rgb(98, 98, 108)',
      }
    },
  },
  plugins: [],
}

