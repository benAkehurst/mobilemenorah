import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

// next/link needs the Next router at runtime; a plain anchor renders the same markup.
vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));
// next/font only works inside a Next.js build.
vi.mock("@/app/fonts", () => ({ fontVariables: "font-vars" }));

const { default: ErrorContent, errorDigest } = await import("@/components/ErrorContent");
const { default: ErrorPage } = await import("@/app/error");
const { default: GlobalError } = await import("@/app/global-error");
const { metadata: notFoundMetadata } = await import("@/app/not-found");

const serverError = Object.assign(new Error("An error occurred in the Server Components render."), {
  digest: "1234567890",
});

/** Depth-first search of a rendered element tree. */
function findElement(node: unknown, match: (el: ReactElement<Record<string, unknown>>) => boolean): ReactElement<Record<string, unknown>> | undefined {
  if (!node || typeof node !== "object") return undefined;
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findElement(child, match);
      if (found) return found;
    }
    return undefined;
  }
  const el = node as ReactElement<Record<string, unknown>>;
  if (match(el)) return el;
  return findElement(el.props?.children, match);
}

describe("errorDigest", () => {
  it("reads the digest from Server Component errors only", () => {
    expect(errorDigest(serverError)).toBe("1234567890");
    expect(errorDigest(new Error("client"))).toBeUndefined();
    expect(errorDigest("thrown string")).toBeUndefined();
    expect(errorDigest({ digest: "not an Error" })).toBeUndefined();
  });
});

describe("<ErrorContent />", () => {
  it("explains the error and offers retry, home and contact", () => {
    const html = renderToStaticMarkup(<ErrorContent error={serverError} onRetry={() => {}} />);
    expect(html).toContain(">Something went wrong</h1>");
    expect(html).toContain('<button type="button"');
    expect(html).toContain(">Try again</button>");
    expect(html).toContain('<a href="/" class="font-semibold">Go to the menorah</a>');
    expect(html).toContain('<a href="/contact">let me know</a>');
    expect(html).toContain("<code>1234567890</code>");
    // Never show the raw error message.
    expect(html).not.toContain("Server Components render");
  });

  it("omits the reference when there is no digest", () => {
    const html = renderToStaticMarkup(<ErrorContent error={new Error("boom")} onRetry={() => {}} />);
    expect(html).not.toContain("<code>");
    expect(html).not.toContain("boom");
  });

  it("calls onRetry when Try again is pressed", () => {
    const onRetry = vi.fn();
    const tree = ErrorContent({ error: serverError, onRetry });
    const button = findElement(tree, (el) => el.type === "button");
    (button!.props.onClick as () => void)();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

describe("error.tsx", () => {
  it("renders the error content inside the normal layout", () => {
    const html = renderToStaticMarkup(<ErrorPage error={serverError} retry={() => {}} />);
    expect(html).toContain(">Something went wrong</h1>");
    expect(html).not.toContain("<html");
  });
});

describe("global-error.tsx", () => {
  it("renders a complete, noindexed document with the site header band", () => {
    const html = renderToStaticMarkup(<GlobalError error={serverError} retry={() => {}} />);
    expect(html).toMatch(/^<html lang="en" class="font-vars">/);
    expect(html).toContain("<title>Something went wrong | Mobile Menorah</title>");
    expect(html).toContain('<meta name="robots" content="noindex"/>');
    expect(html).toContain('<header data-band="night"');
    expect(html).toContain('<main id="main"');
    expect(html).toContain(">Something went wrong</h1>");
  });
});

describe("not-found.tsx metadata", () => {
  it("doesn't inherit the layout's robots tags or the home page's canonical or social URL", () => {
    // Next.js adds the noindex tag itself for 404s; null just drops "index, follow".
    expect(notFoundMetadata.robots).toBeNull();
    expect(notFoundMetadata.alternates).toEqual({ canonical: null });
    expect(notFoundMetadata.openGraph).toBeNull();
    expect(notFoundMetadata.twitter).toBeNull();
  });
});
