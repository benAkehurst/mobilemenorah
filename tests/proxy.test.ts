import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "@/proxy";

const ORIGIN = "https://www.mobilemenorah.com";

function request(path: string, headers: Record<string, string> = {}, method = "GET") {
  return new NextRequest(new URL(path, ORIGIN), { headers, method });
}

const isPassThrough = (res: Response) => res.headers.get("x-middleware-next") === "1";

describe("proxy: Markdown negotiation on pages", () => {
  it("serves the home page as Markdown for Accept: text/markdown", async () => {
    const res = proxy(request("/", { accept: "text/markdown" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    expect(res.headers.get("link")).toContain(`<${ORIGIN}/>; rel="canonical"`);
    const body = await res.text();
    expect(body.startsWith("# Light a virtual Hanukkah menorah\n")).toBe(true);
    expect(body).not.toContain("<html");
  });

  it.each(["/about", "/contact", "/privacy-policy", "/terms-and-conditions", "/info/cookies"])(
    "serves %s as Markdown",
    async (path) => {
      const res = proxy(request(path, { accept: "text/markdown, text/html;q=0.9" }));
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
      expect(res.headers.get("vary")).toBe("Accept");
      expect((await res.text()).startsWith("# ")).toBe(true);
    }
  );

  it("passes HTML requests through to the page, advertising the Markdown version", () => {
    for (const accept of ["text/html", "text/html,application/xhtml+xml,*/*;q=0.8", "*/*"]) {
      const res = proxy(request("/", { accept }));
      expect(isPassThrough(res)).toBe(true);
      expect(res.headers.get("vary")).toMatch(/(^|, )Accept$/);
      expect(res.headers.get("vary")).toContain("rsc");
      expect(res.headers.get("link")).toBe(
        '</index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"'
      );
    }
    expect(isPassThrough(proxy(request("/about")))).toBe(true);
  });

  it("returns 406 when neither HTML nor Markdown is acceptable", async () => {
    const res = proxy(request("/", { accept: "application/pdf" }));
    expect(res.status).toBe(406);
    expect(res.headers.get("vary")).toBe("Accept");
    expect(res.headers.get("cache-control")).toBe("no-store");
    const body = await res.text();
    expect(body).toContain("text/html");
    expect(body).toContain("text/markdown");
  });

  it("answers HEAD with headers only", async () => {
    const res = proxy(request("/", { accept: "text/markdown" }, "HEAD"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await res.text()).toBe("");
  });
});

describe("proxy: .md URLs", () => {
  it.each([
    ["/index.md", "# Light a virtual Hanukkah menorah"],
    ["/about.md", "# About Mobile Menorah"],
    ["/contact.md", "# Contact Mobile Menorah"],
    ["/info/cookies.md", "# Cookie policy"],
  ])("%s is always Markdown, whatever Accept says", async (path, heading) => {
    const res = proxy(request(path, { accept: "text/html" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect((await res.text()).startsWith(`${heading}\n`)).toBe(true);
  });

  it("404s unknown .md URLs in Markdown", async () => {
    const res = proxy(request("/nope.md"));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
  });
});

describe("proxy: agent-friendly 404", () => {
  it("returns a Markdown 404 body for unknown paths when Markdown is preferred", async () => {
    const res = proxy(request("/__ora-404-probe-afzgy6g4", { accept: "text/markdown" }));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    const body = await res.text();
    expect(body).toContain("# Page not found");
    expect(body).toContain(`${ORIGIN}/llms.txt`);
    expect(body).toContain(`${ORIGIN}/sitemap.xml`);
  });

  it("leaves unknown paths to the HTML not-found page otherwise", () => {
    expect(isPassThrough(proxy(request("/nope", { accept: "text/html" })))).toBe(true);
    expect(isPassThrough(proxy(request("/nope", { accept: "application/pdf" })))).toBe(true);
  });
});

describe("proxy: requests it must not touch", () => {
  it.each([
    "/llms.txt",
    "/llms-full.txt",
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.webmanifest",
    "/icon.svg",
    "/icon-512.png",
    "/opengraph-image",
    "/apple-icon",
    "/_next/static/chunks/main.js",
    "/_vercel/insights/script.js",
  ])("%s", (path) => {
    const res = proxy(request(path, { accept: "text/markdown" }));
    expect(isPassThrough(res)).toBe(true);
    expect(res.headers.get("content-type")).toBeNull();
  });

  it("skips RSC navigations, prefetches and non-GET methods", () => {
    expect(isPassThrough(proxy(request("/about", { rsc: "1", accept: "*/*" })))).toBe(true);
    expect(isPassThrough(proxy(request("/about", { "next-router-prefetch": "1" })))).toBe(true);
    expect(isPassThrough(proxy(request("/", { accept: "text/markdown" }, "POST")))).toBe(true);
  });

  it("excludes Next internals and RSC requests in the matcher", () => {
    const [matcher] = config.matcher;
    const source = new RegExp(`^${matcher.source}$`);
    expect(source.test("/")).toBe(true);
    expect(source.test("/about")).toBe(true);
    expect(source.test("/_next/static/x.js")).toBe(false);
    expect(source.test("/_vercel/insights/view")).toBe(false);
    expect(matcher.missing.map((m) => m.key)).toEqual(["rsc", "next-router-prefetch"]);
  });
});
