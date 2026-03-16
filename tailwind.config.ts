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
        background: "#0a0a0a",
        foreground: "#ededed",
        primary: {
          DEFAULT: "#ffd89b",
          glow: "rgba(255, 216, 155, 0.5)",
        },
        secondary: {
          DEFAULT: "#19547b",
          glow: "rgba(25, 84, 123, 0.5)",
        },
        card: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #ffd89b 0%, #19547b 50%, #ffd89b 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
