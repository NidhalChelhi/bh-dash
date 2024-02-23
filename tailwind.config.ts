import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#234189",
        secondary: "#ee3647",
        teritiary: "#d8dada",
        grey: "#23272e",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
