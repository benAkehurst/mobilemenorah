/**
 * Markdown content negotiation (https://acceptmarkdown.com).
 *
 * - `Accept: text/markdown` (preferred over text/html by q-value) on a page
 *   URL gets that page as Markdown, from the same URL.
 * - A page's `.md` URL (/index.md, /about.md, …) always gets Markdown.
 * - Unknown paths that prefer Markdown get a Markdown 404 body.
 * - An Accept header that rules out both HTML and Markdown gets a 406.
 * - Everything else falls through to the normal HTML page.
 *
 * Every negotiated response carries `Vary: Accept` so caches keep the two
 * representations apart.
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  absoluteUrl,
  buildNotFoundMarkdown,
  hasMarkdownPage,
  markdownUrlPath,
  pageMarkdown,
  pagePathForMarkdownUrl,
} from "@/lib/markdown";
import { MARKDOWN, preferredType, withVaryAccept } from "@/lib/negotiation";

const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
const LLMS_TXT = "/llms.txt";

/**
 * The Vary value Next.js 16 gives App Router pages. The page renderer sets
 * Vary itself (replacing ours under `next start`); repeating Next's tokens
 * here keeps them intact on any host that applies the proxy's headers on top.
 */
const NEXT_APP_VARY = "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch";

/** Generated non-page routes without a file extension. */
const NON_PAGE_ROUTES = new Set(["/opengraph-image", "/apple-icon"]);

/** Requests the negotiation shouldn't touch: Next internals and files. */
function isPassThrough(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;
  if (request.method !== "GET" && request.method !== "HEAD") return true;
  // Client-side navigations and prefetches fetch RSC payloads, not documents.
  if (request.headers.has("rsc") || request.headers.has("next-router-prefetch")) return true;
  if (pathname.startsWith("/_next/") || pathname.startsWith("/_vercel/")) return true;
  if (NON_PAGE_ROUTES.has(pathname)) return true;
  // Files (llms.txt, robots.txt, icons, …), except .md URLs.
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  return lastSegment.includes(".") && !pathname.endsWith(".md");
}

function markdownResponse(
  request: NextRequest,
  body: string,
  { status = 200, canonicalPath }: { status?: number; canonicalPath?: string } = {}
): Response {
  const links = [`<${LLMS_TXT}>; rel="describedby"`];
  if (canonicalPath) links.unshift(`<${absoluteUrl(canonicalPath)}>; rel="canonical"`);
  return new Response(request.method === "HEAD" ? null : body, {
    status,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      Vary: "Accept",
      Link: links.join(", "),
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Builds a page's Markdown, or returns undefined (and logs) if that fails. */
function buildMarkdown(pagePath: string): string | undefined {
  try {
    return pageMarkdown(pagePath) ?? undefined;
  } catch (error) {
    console.error(`Failed to build Markdown for ${pagePath}`, error);
    return undefined;
  }
}

function htmlResponse(pathname: string, isPage: boolean) {
  const response = NextResponse.next();
  response.headers.set("Vary", withVaryAccept(NEXT_APP_VARY));
  if (isPage) {
    response.headers.set(
      "Link",
      `<${markdownUrlPath(pathname)}>; rel="alternate"; type="text/markdown", <${LLMS_TXT}>; rel="describedby"`
    );
  }
  return response;
}

export function proxy(request: NextRequest) {
  if (isPassThrough(request)) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Explicit .md URL: always Markdown, whatever Accept says.
  if (pathname.endsWith(".md")) {
    const pagePath = pagePathForMarkdownUrl(pathname);
    if (!pagePath || !hasMarkdownPage(pagePath)) {
      return markdownResponse(request, buildNotFoundMarkdown(pathname), { status: 404 });
    }
    const body = buildMarkdown(pagePath);
    if (body === undefined) {
      // No HTML lives at this URL, so report the failure and point to the page.
      return markdownResponse(
        request,
        `# Temporarily unavailable\n\nThe Markdown version of this page couldn't be generated. Read it at ${absoluteUrl(pagePath)} instead.\n`,
        { status: 500, canonicalPath: pagePath }
      );
    }
    return markdownResponse(request, body, { canonicalPath: pagePath });
  }

  const accept = request.headers.get("accept");
  const chosen = preferredType(accept);
  const isPage = hasMarkdownPage(pathname);

  if (chosen === MARKDOWN) {
    if (!isPage) return markdownResponse(request, buildNotFoundMarkdown(pathname), { status: 404 });
    const body = buildMarkdown(pathname);
    // If the Markdown can't be built, the HTML page is better than an error.
    return body === undefined ? htmlResponse(pathname, isPage) : markdownResponse(request, body, { canonicalPath: pathname });
  }

  // Neither HTML nor Markdown is acceptable. Unknown paths still 404 (as HTML).
  if (chosen === null && isPage) {
    return new Response(
      request.method === "HEAD"
        ? null
        : `Not Acceptable\n\nThis resource is available as:\n- text/html\n- text/markdown\n\nYou requested: ${accept}\n`,
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  // HTML: carry on to the page, advertising the Markdown version.
  return htmlResponse(pathname, isPage);
}

export const config = {
  matcher: [
    {
      // Skip Next internals and Vercel's analytics endpoints.
      source: "/((?!_next/|_vercel/).*)",
      // Skip client-side navigation and prefetch requests for RSC payloads.
      missing: [
        { type: "header", key: "rsc" },
        { type: "header", key: "next-router-prefetch" },
      ],
    },
  ],
};
