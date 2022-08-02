/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./pages/**/*.vue"],
  theme: {
    extend: {
      colors: {
        brandPurple: '#6941C6',
        brandNlue: '#3C3C9B',
        brandPink: '#D2468C',
        blue: '#007bff',
        purple: '#6f42c1',
        red: '#f74236',
        orange: '#fd7e14',
        yellow: '#ffc107',
        green: '#28a745',
        gray: {
          1: '#191919',
          2: '#323232',
          3: '#4B4B4B',
          4: '#646464',
          5: '#7D7D7D',
          6: '#969696',
          7: '#AFAFAF',
          8: '#C8C8C8',
          9: '#E1E1E1',
          10: '#F0F0F0',
          11: '#FAFAFA',
        },
        white: '#ffffff',
        tomatoRed: '#db3e52',
      },
      boxShadow: {
        'nav': '0px 6px 10px rgba(0, 0, 0, 0.15)',
        'card': '0px 2px 6px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        Raleway: ["Raleway"],
      },
    },
    fontSize: {
      titleXxxl: ['58px', '56px'],
    },
  },
  plugins: [],
};
