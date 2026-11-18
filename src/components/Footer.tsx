import Link from "next/link";
import { appConfig } from "../../app.config";

const footLink = "whitespace-nowrap text-muted no-underline hover:text-ink hover:underline";

/** Statement footer (design.md: Ft5): one closing line, then an inline row. */
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8">
        <p className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          <span lang="he" dir="rtl">
            חג אורים שמח
          </span>
          , a happy Festival of Lights.
        </p>
        <div className="mt-8 flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link href="/about" className={footLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footLink}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={footLink}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className={footLink}>
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/info/cookies" className={footLink}>
                  Cookies
                </Link>
              </li>
            </ul>
          </nav>
          <p>
            © {new Date().getFullYear()} {appConfig.companyName} · Made by{" "}
            <a
              href={`${appConfig.author.url}?utm_source=mobile-menorah`}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-muted hover:text-ink"
            >
              {appConfig.author.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
