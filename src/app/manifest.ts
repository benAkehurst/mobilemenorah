import type { MetadataRoute } from "next";
import { appConfig } from "../../app.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.appName,
    short_name: "Menorah",
    description: appConfig.appDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f1f5f9",
    theme_color: "#1e1b4b",
    categories: ["lifestyle", "education"],
    icons: [{ src: "/logo.webp", sizes: "1024x1024", type: "image/webp", purpose: "any" }],
  };
}
