/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        halloween: {
          ...require("daisyui/src/colors/themes")["[data-theme=halloween]"],
          primary: "#AADD3E",
          "base-200": "#2a2a2b",
        },
      },
    ],
  },
};
