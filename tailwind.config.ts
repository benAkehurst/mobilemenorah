import type { Config } from "tailwindcss";

// All colours and fonts come from src/app/tokens.css (see design.md).
const token = (name: string) => `var(--color-${name})`;

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: token("paper"), 2: token("paper-2") },
        rule: token("rule"),
        muted: token("muted"),
        ink: token("ink"),
        brass: { DEFAULT: token("brass"), deep: token("brass-deep"), shade: token("brass-shade") },
        link: token("link"),
        focus: token("focus"),
        night: {
          DEFAULT: token("night"),
          2: token("night-2"),
          rule: token("night-rule"),
          ink: token("night-ink"),
          muted: token("night-muted"),
        },
        flame: { core: token("flame-core"), DEFAULT: token("flame"), edge: token("flame-edge") },
        wick: token("wick"),
        shamash: token("wax-shamash"),
        candle: {
          blue: token("candle-blue"),
          white: token("candle-white"),
          red: token("candle-red"),
          green: token("candle-green"),
          yellow: token("candle-yellow"),
          purple: token("candle-purple"),
          orange: token("candle-orange"),
        },
      },
      // Type scale from design.md.
      fontSize: {
        h2: ["clamp(1.75rem, 2vw + 1rem, 2.5rem)", { lineHeight: "1.15" }],
        display: ["clamp(2.5rem, 4vw + 1rem, 4.25rem)", { lineHeight: "1.05" }],
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        flame: "var(--shadow-flame)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
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
