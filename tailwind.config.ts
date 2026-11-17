import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "scale(1, 1) rotate(-1deg)", opacity: "1" },
          "25%": { transform: "scale(0.95, 1.06) rotate(1.5deg)", opacity: "0.92" },
          "50%": { transform: "scale(1.04, 0.96) rotate(-1.5deg)", opacity: "1" },
          "75%": { transform: "scale(0.97, 1.04) rotate(1deg)", opacity: "0.95" },
        },
      },
      animation: {
        flicker: "flicker 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
