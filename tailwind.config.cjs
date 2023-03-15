/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "976px",
      xl: "1200px",
      xxl: "1440px",
    },
    extend: {
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "50%": "50%",
        16: "1rem",
        24: "1.5rem",
        28: "1.75rem",
        32: "2rem",
      },
      colors: {
        "primary": "#3ea2f7",
        "secondary": "#eef7ff",
        "blue-light": "#cce6ff",
        "blue-light2" : "#e5f1fd"
      }
    },
  },
  plugins: [],
}