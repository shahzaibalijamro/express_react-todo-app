/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {fontFamily: {
      inter: ["Inter", "sans-serif"],
    }},
  },
  plugins: [
    require('daisyui'),
  ],
}