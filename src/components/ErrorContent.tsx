import Link from "next/link";
import MenorahMark from "./MenorahMark";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

/** The server-log identifier Next.js attaches to errors from Server Components. */
export function errorDigest(error: unknown): string | undefined {
  if (error instanceof Error && "digest" in error && typeof error.digest === "string") {
    return error.digest;
  }
  return undefined;
}

/**
 * Body of the error pages (src/app/error.tsx and global-error.tsx). Laid out
 * like the 404 page. Has no hooks, so it can render inside either boundary.
 */
export default function ErrorContent({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  const digest = errorDigest(error);
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <MenorahMark size={56} tile />
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink">Something went wrong</h1>
      <p className="mt-3 max-w-[65ch] text-muted">
        Sorry, this page didn&apos;t load properly. Try again, or go back to the menorah.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={onRetry}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-ink ring-1 ring-inset ring-rule transition-colors duration-150 ease-out hover:bg-paper-2 ${focusRing}`}
        >
          Try again
        </button>
        <Link href="/" className="font-semibold">
          Go to the menorah
        </Link>
      </div>
      <p className="mt-8 max-w-[65ch] text-sm text-muted">
        If it keeps happening, please <Link href="/contact">let me know</Link>
        {digest ? (
          <>
            {" "}
            and mention reference <code>{digest}</code>
          </>
        ) : null}
        .
      </p>
    </div>
  );
}
