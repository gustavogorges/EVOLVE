/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    colors: {
      'primary': 'var(--main-color)',
      'secondary': 'var(--secondary-color)',
      'primaryWhite': '#F4F4F4',
      'secondaryWhite': '#F8F8F8',
      'primaryGray': '#F5F5F5',
      'primaryFontBlack': '#343434',
      'primaryNav': '#F8F8F8',
      'fontGray': '#6A7181',

      'dark-primary': 'var(--main-dark-color)',
      'dark-secundary-gray': '#414651',
      'dark-primary-black': '#171717',
      'dark-theme-back': '#232323',
      'dark-secondary': 'var(--secondary-dark-color)',
      'dark-primary-gray': '#363636'
    },
    fontFamily: {
      'titulo': ['Montserrat', 'sans-serif'],
      'hind-madurai': ['Hind Madurai', 'sans-serif']
    }
  },
};
export const plugins = [];

