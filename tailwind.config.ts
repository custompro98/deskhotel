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
        flame: {
          "50": "#fcf5f0",
          "100": "#f8e7dc",
          "200": "#f0cdb8",
          "300": "#e7aa8a",
          "400": "#dc7f5b",
          "500": "#d56440",
          "600": "#c64a30",
          "700": "#a4382a",
          "800": "#843028",
          "900": "#6b2923",
          "950": "#391311",
        },
      },
    },
  },
  plugins: [],
};
export default config;
