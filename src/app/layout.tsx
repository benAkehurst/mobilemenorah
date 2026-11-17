import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { appConfig } from "../../app.config";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
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
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1b4b",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lato.className} flex min-h-screen flex-col bg-slate-100 text-slate-900 antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Vercel Web Analytics is cookieless, so no consent banner is needed. */}
        <Analytics />
      </body>
    </html>
  );
}
