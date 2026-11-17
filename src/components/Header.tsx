import Image from "next/image";
import Link from "next/link";
import { appConfig } from "../../app.config";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.webp" alt="" width={32} height={32} className="h-8 w-8" priority />
          <span className="font-semibold text-slate-900">{appConfig.appName}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-4 text-sm text-slate-700">
            <li>
              <Link href="/#how-to-light" className="hover:text-blue-700">
                How to light
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-blue-700">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-700">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
