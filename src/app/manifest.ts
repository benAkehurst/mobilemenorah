import type { MetadataRoute } from "next";
import { appConfig } from "../../app.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.appName,
    short_name: "Menorah",
    description: appConfig.appDescription,
    start_url: "/",
    display: "standalone",
    // Hex equivalents of --color-night (the window band).
    background_color: "#080f1c",
    theme_color: "#080f1c",
    categories: ["lifestyle", "education"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
