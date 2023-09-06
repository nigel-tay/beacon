/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'yellow-primary': '#F6E27F',
      'blue-button': '#7AB9F2',
      'blue-button-hover': '#B1D9FD',
      'pink-accent': '#FD9682',
    }
  },
  plugins: [],
}

