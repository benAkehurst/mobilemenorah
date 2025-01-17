import Link from "next/link";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      options: { [key: string]: string }
    ) => void;
  }
}

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
  }, []);

  useEffect(() => {
    if (cookieConsent !== null && typeof window !== undefined) {
      const newValue = cookieConsent ? "granted" : "denied";
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
      setLocalStorage("cookie_consent", cookieConsent);
    }
  }, [cookieConsent]);

  // Render the banner if cookieConsent is null (first visit) or false (declined)
  if (cookieConsent === true) return null;

  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-sm z-50
                  fixed bottom-0 left-0 right-0 
                  flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                  bg-slate-600 text-white rounded-lg shadow ${
                    cookieConsent === null || cookieConsent === false
                      ? "flex"
                      : "hidden"
                  } `}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p className="text-text">
            We use <span className="text-info">cookies</span> on our site.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCookieConsent(false)}
          className="px-5 py-2 text-text rounded-md border-gray-900"
        >
          Decline
        </button>
        <button
          onClick={() => setCookieConsent(true)}
          className="bg-lime-700 px-5 py-2 text-text rounded-lg"
        >
          Allow Cookies
        </button>
      </div>
    </div>
  );
}

export function getLocalStorage(key: string, defaultValue: any) {
  if (typeof window === "undefined") return defaultValue;
  const stickyValue = localStorage.getItem(key);
  return stickyValue !== null && stickyValue !== "undefined"
    ? JSON.parse(stickyValue)
    : defaultValue;
}

export function setLocalStorage(key: string, value: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
