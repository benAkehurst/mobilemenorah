"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import Link from "next/link";
import ErrorContent from "@/components/ErrorContent";
import MenorahMark from "@/components/MenorahMark";
import { THEME_STORAGE_KEY } from "@/components/theme/theme";
import { appConfig } from "../../app.config";
import { fontVariables } from "./fonts";
import "./tokens.css";
import "./globals.css";

/**
 * Last-resort error page for errors in the root layout. It replaces the
 * layout, so it renders its own document with the site's styles, fonts and
 * theme, and a plain header band (it can't reuse <Header />, which lives in
 * the layout that just failed).
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
    // Apply an explicit Light/Dark choice; "System" follows prefers-color-scheme.
    try {
      const theme = localStorage.getItem(THEME_STORAGE_KEY);
      if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
    } catch {
      // Storage unavailable: keep the system theme.
    }
  }, [error]);

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Metadata exports aren't supported here, so set the head directly. */}
        <title>{`Something went wrong | ${appConfig.appName}`}</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <header data-band="night" className="bg-night text-night-ink">
          {/* min-h matches <Header />, whose theme toggle sets its height. */}
          <div className="mx-auto flex min-h-[4.25rem] max-w-6xl items-center px-5 py-4 sm:px-8">
            <Link href="/" className="flex items-center gap-2.5 text-night-ink no-underline">
              <MenorahMark size={30} />
              <span className="whitespace-nowrap font-display text-lg font-medium tracking-tight">
                {appConfig.appName}
              </span>
            </Link>
          </div>
        </header>
        <main id="main" className="flex-1">
          <ErrorContent error={error} onRetry={retry} />
        </main>
      </body>
    </html>
  );
}
