import Link from "next/link";
import { appConfig } from "../../app.config";
import { CookieSettingsButton } from "./consent/ConsentProvider";

const linkClass = "hover:text-blue-700 hover:underline";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-sm text-slate-600">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <li>
              <Link href="/about" className={linkClass}>
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className={linkClass}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className={linkClass}>
                Terms
              </Link>
            </li>
            <li>
              <Link href="/info/cookies" className={linkClass}>
                Cookies
              </Link>
            </li>
            <li>
              <CookieSettingsButton className={linkClass} />
            </li>
          </ul>
        </nav>
        <p>
          © {new Date().getFullYear()} {appConfig.companyName}. All rights reserved.
        </p>
        <p>
          Created by{" "}
          <a
            href={`${appConfig.author.url}?utm_source=mobile-menorah`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {appConfig.author.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
