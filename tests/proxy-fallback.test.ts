import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Make building any page's Markdown fail, while keeping the rest of the module.
const pageMarkdown = vi.fn((): string | null => {
  throw new Error("boom");
});
vi.mock("@/lib/markdown", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/markdown")>()),
  pageMarkdown,
}));

const { proxy } = await import("@/proxy");

const request = (path: string, accept: string) =>
  new NextRequest(new URL(path, "https://www.mobilemenorah.com"), { headers: { accept } });

describe("proxy when Markdown can't be built", () => {
  beforeEach(() => {
    pageMarkdown.mockClear();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("doesn't build Markdown for HTML requests", () => {
    const res = proxy(request("/", "text/html"));
    expect(res.headers.get("x-middleware-next")).toBe("1");
    expect(pageMarkdown).not.toHaveBeenCalled();
  });

  it("falls back to the HTML page for Accept: text/markdown", () => {
    const res = proxy(request("/about", "text/markdown"));
    expect(res.headers.get("x-middleware-next")).toBe("1");
    expect(res.headers.get("vary")).toContain("Accept");
    expect(console.error).toHaveBeenCalled();
  });

  it("returns a Markdown 500 that points to the HTML page for .md URLs", async () => {
    const res = proxy(request("/about.md", "*/*"));
    expect(res.status).toBe(500);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await res.text()).toContain("https://www.mobilemenorah.com/about");
  });

  it("still 404s unknown paths without building anything", () => {
    const res = proxy(request("/nope", "text/markdown"));
    expect(res.status).toBe(404);
    expect(pageMarkdown).not.toHaveBeenCalled();
  });
});
