import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";
import typography from "@tailwindcss/typography";
import daisyUi from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      padding: {
        '3': '0.4rem',
      }
    },
  },
  plugins: [
    typography,
    daisyUi,
    //require('@tailwindcss/typography'), 
    //require('daisyui'),
    flowbite.plugin(),
  ],
};
export default config;