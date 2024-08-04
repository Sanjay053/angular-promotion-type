/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: false,
    content: [
      "./src/**/*.{html,ts}",
    ],
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-focus']
    },
  },
  plugins: [],
}

