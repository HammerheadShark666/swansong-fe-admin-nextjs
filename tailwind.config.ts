import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";
import typography from "@tailwindcss/typography";
import daisyUi from "daisyui"; 

const config: Config = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./node_modules/flowbite-react/**/*.js",
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
    flowbite.plugin, 
  ],
};
export default config;