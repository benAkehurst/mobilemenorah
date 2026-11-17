import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden="true">
        🕎
      </p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-700">Sorry, we couldn&apos;t find that page.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800"
      >
        Light the menorah
      </Link>
    </div>
  );
}
