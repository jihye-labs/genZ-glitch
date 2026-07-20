/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        rounded: ['"Baloo 2"', "system-ui", "sans-serif"],
      },
      colors: {
        butter: "#ffd94d",
        butterSoft: "#ffe883",
        bubblegum: "#ff4fa3",
        soda: "#1f8cff",
        arcade: "#52c957",
        cream: "#fff3bd",
        ink: "#2e1c16",
      },
      boxShadow: {
        pixel: "0 10px 0 rgba(177, 127, 18, 0.35), 0 18px 34px rgba(156, 83, 0, 0.22)",
        sticker: "0 8px 0 rgba(0,0,0,0.16), 0 16px 32px rgba(105, 67, 0, 0.22)",
      },
    },
  },
  plugins: [],
};
