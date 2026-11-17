import type { Metadata } from "next";
import { appConfig } from "../../app.config";

// Overriding `openGraph`/`twitter` in a page replaces the root's file-based
// image, so reference the generated image (src/app/opengraph-image.tsx) here.
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${appConfig.appName} – light a virtual Hanukkah menorah online`,
};

/** Per-page metadata with a canonical URL and matching social card text. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: appConfig.appName,
      locale: "en_GB",
      url: path,
      title: `${title} | ${appConfig.appName}`,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${appConfig.appName}`,
      description,
      images: [socialImage],
    },
  };
}
