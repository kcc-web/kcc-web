/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors, // gray-300などのデフォルト色が使えるようになる
        border: "oklch(0.928 0.006 264.531)",
        background: "oklch(1 0 0)",
        foreground: "oklch(0.13 0.028 261.692)",
      },
    },
  },
  plugins: [],
};




