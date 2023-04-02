/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.ejs', './views/include/*.ejs'],
  theme: {
    extend: {
      colors:{
        darkPink : '#D87D4A',
        pink: '#FBAF85',
        black : '#000000',
        footerBlack: '#101010',
        itemBg : '#F1F1F1',
        white: '#FFFFFF'
      },
      fontFamily:{
        sans: ['Manrope', 'sans-serif']
      }
    },
    letterSpacing:{
      widest : '1rem',
      normal: '0.15rem',
      tight: '0.1rem'
    }
  },
  plugins: [],
}
