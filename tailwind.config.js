/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./script.js",
    "./motivational_quotes.js"
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(emerald|blue|violet|cyan|rose|amber|fuchsia|pink|sky|slate|indigo)-(400|500|600)/,
    },
    {
      pattern: /(bg|border)-(emerald|blue|violet|cyan|rose|amber|fuchsia|pink|sky|slate|indigo)-(500|600)\/(10|15|20|25|30|40|50)/,
    },
    'animate-slide-up',
    'animate-fade-in',
    'animate-pop',
    'animate-pulse',
    'animate-bounce',
    'animate-flame-flicker',
    'animate-flame-burst',
    'animate-streak-pop'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
