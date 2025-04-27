/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // seus componentes e hooks
    "./public/index.html"            // seu HTML principal
  ],
  darkMode: "class",                 // se quiser suporte a tema escuro por classe
  theme: {
    extend: {},
  },
  plugins: [],
}
