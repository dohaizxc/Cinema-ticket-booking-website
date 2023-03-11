/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "footer-booking": "url('./assets/ticket_bg.png')",
        "footer-booking2": "url('./assets/ticket_bg2.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
