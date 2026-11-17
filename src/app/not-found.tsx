import type { Metadata } from "next";
import Link from "next/link";
import MenorahMark from "@/components/MenorahMark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <MenorahMark size={56} tile />
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 text-muted">Sorry, we couldn&apos;t find that page.</p>
      <p className="mt-6">
        <Link href="/" className="font-semibold">
          Go to the menorah
        </Link>
      </p>
    </div>
  );
}
