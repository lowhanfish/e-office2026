export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mred: {
          1: '#D100D1',
          2: '#E100E1',
          3: '#F100F1',
          4: '#FFBFFF',
          5: '#FFDFFF',
        },
        morange: {
          1: '#A65A00',
          2: '#C67A00',
          3: '#E69A00',
          4: '#F6BA00',
          5: '#FFD900',
        },
        mgreen: {
          1: '#00A000',
          2: '#00C000',
          3: '#00E000',
          4: '#00FF00',
          5: '#BFFF00',
        },
        mblue: {
          1: '#0000A0',
          2: '#0000C0',
          3: '#0000E0',
          4: '#0000FF',
          5: '#BFBFFF',
        },
        mgray: {
          1: '#000000',
          2: '#202020',
          3: '#404040',
          4: '#606060',
          5: '#808080',
        },
      },
    },
  },
  plugins: [],
};