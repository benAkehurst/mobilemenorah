import { Frank_Ruhl_Libre, IBM_Plex_Sans_Hebrew } from "next/font/google";

// Shared by the root layout and global-error.tsx, which renders its own
// <html> and so needs the fonts passed in separately.

// Display face + all Hebrew (see design.md).
export const display = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  variable: "--font-display",
  display: "swap",
});

// Body + UI.
export const body = IBM_Plex_Sans_Hebrew({
  subsets: ["latin", "hebrew"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

/** Class names that define the font CSS variables; put them on <html>. */
export const fontVariables = `${display.variable} ${body.variable}`;
