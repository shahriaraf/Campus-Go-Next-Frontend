import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1C4D8D",   // Primary Deep Blue
          medium: "#4988C4", // Secondary Medium Blue
          light: "#BDE8F5",  // Accent Light Blue
        }
      },
    },
  },
  plugins: [],
};
export default config;