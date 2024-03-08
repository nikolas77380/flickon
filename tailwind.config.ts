import type { Config } from "tailwindcss";

const config: Config = {
   content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: "0.9rem",
      xs: "0.7rem",
    },
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        hover: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(2)" },
        },
      },
      animation: {
        "loading-animation": "fade 2s linear infinite",
        "scalse-animation": "hover 1s linear",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      header: "#37003c",
      secondary: "rgba(111, 115, 254, 1)",
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
