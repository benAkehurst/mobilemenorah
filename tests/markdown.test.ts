import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { proseDocs } from "@/lib/documents";
import {
  buildHomeMarkdown,
  buildNotFoundMarkdown,
  markdownPagePaths,
  markdownUrlPath,
  pageMarkdown,
  pagePathForMarkdownUrl,
  proseDocToMarkdown,
} from "@/lib/markdown";

const TODAY = "2026-11-17";
const appDir = join(process.cwd(), "src", "app");

/** URL paths of every page.tsx under src/app. */
function appPagePaths(): string[] {
  return readdirSync(appDir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(`${sep}page.tsx`) || file === "page.tsx")
    .map((file) => {
      const dir = relative(appDir, join(appDir, file, ".."));
      return dir ? `/${dir.split(sep).join("/")}` : "/";
    })
    .sort();
}

describe("Markdown versions of pages", () => {
  it("covers every HTML page in the app", () => {
    expect([...markdownPagePaths].sort()).toEqual(appPagePaths());
  });

  it("returns null for unknown paths, including inherited object keys", () => {
    expect(pageMarkdown("/nope", TODAY)).toBeNull();
    expect(pageMarkdown("constructor", TODAY)).toBeNull();
    expect(pageMarkdown("__proto__", TODAY)).toBeNull();
  });

  it("renders the home page with the same sections as the HTML page", () => {
    const md = buildHomeMarkdown(TODAY);
    expect(md.startsWith("# Light a virtual Hanukkah menorah\n\n> ")).toBe(true);
    expect(md).toContain(
      "Hanukkah 2026 begins at sundown on Friday 4 December 2026 and ends at nightfall on Saturday 12 December 2026"
    );
    for (const heading of [
      "## Using the virtual menorah",
      "## How to light the menorah",
      "## The blessings",
      "## Hanukkah dates",
      "## Questions and answers",
    ]) {
      expect(md).toContain(`\n${heading}\n`);
    }
    expect(md).toContain("| Year | First candle | Ends at nightfall | Hebrew dates |");
    expect(md).toContain("| 2026 | Fri 4 Dec 2026 | Sat 12 Dec 2026 |");
    expect(md).toContain("### Is Mobile Menorah free?");
    expect(md).toContain("[llms.txt](https://www.mobilemenorah.com/llms.txt)");
  });

  it("renders prose documents with headings, absolute links and lists", () => {
    const contact = proseDocToMarkdown(proseDocs.find((d) => d.path === "/contact")!);
    expect(contact.startsWith("# Contact Mobile Menorah\n\n")).toBe(true);
    expect(contact).toContain("## Reporting a problem");
    expect(contact).toContain("[benakehurstyt@gmail.com](mailto:benakehurstyt@gmail.com)");
    expect(contact).toContain("[privacy policy](https://www.mobilemenorah.com/privacy-policy)");
    expect(contact).toContain("\n- What you did, and what happened instead\n");

    const privacy = pageMarkdown("/privacy-policy", TODAY)!;
    expect(privacy).toContain("*Last updated: 17 November 2026*");
  });
});

describe("Markdown 404 body", () => {
  it("explains the error and links to the home page, llms.txt and sitemap", () => {
    const md = buildNotFoundMarkdown("/missing");
    expect(md.length).toBeGreaterThan(20);
    expect(md).toContain("# Page not found");
    expect(md).toContain("`/missing`");
    expect(md).toContain("(https://www.mobilemenorah.com/)");
    expect(md).toContain("(https://www.mobilemenorah.com/llms.txt)");
    expect(md).toContain("(https://www.mobilemenorah.com/sitemap.xml)");
  });

  it("keeps the echoed path inert", () => {
    const md = buildNotFoundMarkdown("/a`b\nc" + "x".repeat(500));
    expect(md).toContain("`/abc");
    expect(md).not.toContain("x".repeat(201));
  });
});

describe(".md URLs", () => {
  it("maps between page paths and .md URLs", () => {
    expect(markdownUrlPath("/")).toBe("/index.md");
    expect(markdownUrlPath("/info/cookies")).toBe("/info/cookies.md");
    expect(pagePathForMarkdownUrl("/index.md")).toBe("/");
    expect(pagePathForMarkdownUrl("/about.md")).toBe("/about");
    expect(pagePathForMarkdownUrl("/info/cookies.md")).toBe("/info/cookies");
    expect(pagePathForMarkdownUrl("/about")).toBeNull();
    for (const path of markdownPagePaths) {
      expect(pageMarkdown(pagePathForMarkdownUrl(markdownUrlPath(path))!, TODAY)).not.toBeNull();
    }
  });
});
