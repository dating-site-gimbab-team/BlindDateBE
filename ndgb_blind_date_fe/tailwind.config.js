/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // src 디렉토리를 사용하는 경우 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}