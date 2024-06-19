/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary': '#f500ff',
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
