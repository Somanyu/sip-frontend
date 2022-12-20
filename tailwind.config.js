/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        karla: ['Karla', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
