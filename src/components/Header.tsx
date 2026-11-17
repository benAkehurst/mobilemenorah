import Link from "next/link";
import MenorahMark from "./MenorahMark";
import ThemeToggle from "./theme/ThemeToggle";
import { appConfig } from "../../app.config";

const navLink =
  "whitespace-nowrap text-night-muted no-underline transition-colors duration-150 ease-out hover:text-night-ink";

/** Edge-aligned header on the night "window" band (design.md: N9). */
export default function Header() {
  return (
    <header data-band="night" className="bg-night text-night-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-night-ink no-underline">
          <MenorahMark size={30} />
          <span className="whitespace-nowrap font-display text-lg font-medium tracking-tight">
            {appConfig.appName}
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-6 text-sm">
              <li>
                <Link href="/#how-to-light" className={navLink}>
                  How to light
                </Link>
              </li>
              <li>
                <Link href="/#blessings" className={navLink}>
                  Blessings
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={navLink}>
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
