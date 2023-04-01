/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
