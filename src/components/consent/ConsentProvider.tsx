"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (command: "consent", action: "update", options: Record<string, string>) => void;
  }
}

const STORAGE_KEY = "cookie_consent";
const CHANGE_EVENT = "cookie-consent-change";

/** Reads the stored choice. Supports the old `true` / `false` values. */
function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "granted" || raw === "true") return "granted";
    if (raw === "denied" || raw === "false") return "denied";
  } catch {
    // Storage can be unavailable (e.g. some private browsing modes).
  }
  return null;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

type ConsentContextValue = {
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue>({ openSettings: () => {} });

export function useConsent() {
  return useContext(ConsentContext);
}

/**
 * Cookie consent. Google Analytics is only loaded after the visitor accepts,
 * so no analytics cookies are set without consent. Vercel Analytics is
 * cookieless and always on (loaded in the root layout).
 */
export default function ConsentProvider({
  gaId,
  children,
}: {
  gaId?: string;
  children: ReactNode;
}) {
  // `undefined` = not known yet (server render / hydration).
  const consent = useSyncExternalStore<Consent | null | undefined>(
    subscribe,
    readConsent,
    () => undefined
  );

  const save = useCallback((value: Consent | null) => {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors; the banner will simply show again next visit.
    }
    if (value === "denied") {
      // If GA was loaded earlier in this session, stop it storing anything.
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const contextValue = useMemo(() => ({ openSettings: () => save(null) }), [save]);

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}
      {consent === "granted" && gaId && <GoogleAnalytics gaId={gaId} />}
      {consent === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl flex-col items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 text-white shadow-lg sm:flex-row sm:justify-between"
        >
          <p className="text-center text-sm sm:text-left">
            We&apos;d like to use Google Analytics cookies to understand how the site is used.{" "}
            <Link href="/info/cookies" className="underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => save("denied")}
              className="rounded-lg px-4 py-2 text-sm ring-1 ring-white/40 hover:bg-white/10"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => save("granted")}
              className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-semibold hover:bg-lime-500"
            >
              Allow cookies
            </button>
          </div>
        </div>
      )}
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      Cookie settings
    </button>
  );
}
