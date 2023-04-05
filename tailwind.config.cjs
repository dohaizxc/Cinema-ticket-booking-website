/** @type {import('tailwindcss').Config} */
// galaxy: `url("./src/assets/background_galaxy.jpg")`,
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        galaxy: `url("https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/movie-details-bg.jpg")`,
      },
      fontFamily: {
        source: ["Source Sans Pro", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        scale: "scale 0.5s ease-in-out",
        scaleout: "scaleout 0.5s ease-out",
      },
      keyframes: {
        scale: {
          "0%": { scale: "0" },
          "100%": { scale: "1" },
        },
        scaleout: {
          "0%": { scale: "1" },
          "100%": { scale: "0" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
