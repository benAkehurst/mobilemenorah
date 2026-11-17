import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, IBM_Plex_Sans_Hebrew } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/theme/theme";
import { appConfig } from "../../app.config";
import "./tokens.css";
import "./globals.css";

// Display face + all Hebrew (see design.md).
const display = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  variable: "--font-display",
  display: "swap",
});

// Body + UI.
const body = IBM_Plex_Sans_Hebrew({
  subsets: ["latin", "hebrew"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.appDomainName),
  title: {
    default: appConfig.appTitle,
    template: `%s | ${appConfig.appName}`,
  },
  description: appConfig.appDescription,
  applicationName: appConfig.appName,
  authors: [{ name: appConfig.author.name, url: appConfig.author.url }],
  creator: appConfig.author.name,
  publisher: appConfig.author.name,
  keywords: [
    "virtual menorah",
    "online menorah",
    "digital menorah",
    "Hanukkah",
    "Chanukah",
    "light the menorah",
    "Hanukkah candles",
    "Hanukkah blessings",
    "Hanukkah dates",
    "hanukkiah",
  ],
  category: "religion",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: appConfig.appName,
    locale: "en_GB",
    url: "/",
    title: appConfig.appTitle,
    description: appConfig.appDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.appTitle,
    description: appConfig.appDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons come from the file conventions: src/app/icon.svg and apple-icon.tsx.
};

export const viewport: Viewport = {
  // The header is the night "window" band in both themes.
  themeColor: "#080f1c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set before paint by themeInitScript, so React's markup won't match it.
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Vercel Web Analytics is cookieless, so no consent banner is needed. */}
        <Analytics />
        {/* Core Web Vitals from real visits; also cookieless. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
