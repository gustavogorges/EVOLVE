/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary' : '#185E77',
        'secondary' : '#4C956C',
        'primaryWhite' : '#F4F4F4',
        'secondaryWhite' : '#F8F8F8',
        'primaryGray' : '#F5F5F5',
        'primaryFontBlack' : '#343434',
        'primaryNav' : '#E9EDF1'
      }
    },
  },
  plugins: [],
}

