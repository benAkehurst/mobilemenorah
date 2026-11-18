import { describe, expect, it } from "vitest";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llms";
import { pageMarkdown, pagePathForMarkdownUrl } from "@/lib/markdown";

const TODAY = "2026-11-17";
const ORIGIN = "https://www.mobilemenorah.com";

describe("llms.txt follows the llmstxt.org format", () => {
  const txt = buildLlmsTxt(TODAY);
  const lines = txt.split("\n");
  const firstH2 = lines.findIndex((line) => line.startsWith("## "));

  it("starts with an H1 and a blockquote summary", () => {
    expect(lines[0]).toBe("# Mobile Menorah");
    expect(lines[1]).toBe("");
    expect(lines[2].startsWith("> ")).toBe(true);
  });

  it("has no headings in the details section", () => {
    const details = lines.slice(1, firstH2);
    expect(details.filter((line) => line.startsWith("#"))).toEqual([]);
  });

  it("only has file lists of [name](url) links under H2 sections", () => {
    const sections = lines.slice(firstH2).filter((line) => line.trim() !== "");
    for (const line of sections) {
      if (line.startsWith("## ")) continue;
      expect(line).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\)(: .+)?$/);
    }
    expect(sections.filter((line) => line.startsWith("## "))).toEqual(["## Pages", "## Optional"]);
  });

  it("links to Markdown versions that exist", () => {
    const urls = [...txt.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url.startsWith(ORIGIN)).toBe(true);
      const path = url.slice(ORIGIN.length);
      if (path === "/llms-full.txt") continue;
      const pagePath = pagePathForMarkdownUrl(path);
      expect(pagePath, url).not.toBeNull();
      expect(pageMarkdown(pagePath!, TODAY), url).not.toBeNull();
    }
    expect(txt).toContain(`[Contact](${ORIGIN}/contact.md)`);
  });

  it("tells agents when (and when not) to use the site and how to call it", () => {
    expect(txt).toContain("When to use Mobile Menorah:");
    expect(txt).toContain("When not to use it:");
    expect(txt).toContain("How an agent should use it:");
    expect(txt).toContain("`Accept: text/markdown`");
    expect(txt).toContain(`${ORIGIN}/index.md`);
  });

  it("lists the upcoming Hanukkah dates", () => {
    expect(txt).toContain("Upcoming Hanukkah dates:");
    expect(txt).toContain("- 2026: first candle on the evening of Friday 4 December 2026");
  });
});

describe("llms-full.txt", () => {
  it("contains the full site content and contact details", () => {
    const full = buildLlmsFullTxt(TODAY);
    expect(full.startsWith("# Mobile Menorah – full content\n")).toBe(true);
    for (const heading of ["## How to light the menorah", "## Hanukkah blessings", "## Frequently asked questions", "## Contact"]) {
      expect(full).toContain(heading);
    }
    expect(full).toContain("benakehurstyt@gmail.com");
  });
});
