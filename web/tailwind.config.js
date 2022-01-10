module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      smd: "1100px",

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        navy: {
          500: "#1E40AF",
        },
        blueGray: {
          100: "#F1F5F9",
        },
        notionDark: {
          100: "#2F3438",
        },
      },
      height: {
        1478: "1478px",
        800: "800px",
      },
      width: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
