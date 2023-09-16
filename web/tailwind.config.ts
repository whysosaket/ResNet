import { fontFamily } from "tailwindcss/defaultTheme";
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--inter-font)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
