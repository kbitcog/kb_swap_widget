/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#45F5A1',
        label: '#9295A6',
        inputlabel: '#6C7080',
        black: '#000000',
        alert: '#F87171'
      },
      backgroundImage: (theme) => ({

      }),
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
