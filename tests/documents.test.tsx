import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { aboutDoc, contactDoc, docPlainText, privacyDoc, proseDocs } from "@/lib/documents";

// next/link needs the Next router at runtime; a plain anchor renders the same markup.
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

const { default: ProseDocument } = await import("@/components/ProseDocument");

describe("trust pages", () => {
  it.each([aboutDoc, contactDoc, privacyDoc])("$path has at least 500 characters of content", (doc) => {
    expect(docPlainText(doc).length).toBeGreaterThanOrEqual(500);
  });

  it("contact page gives a way to get in touch", () => {
    const text = docPlainText(contactDoc);
    expect(text).toContain("benakehurstyt@gmail.com");
    expect(contactDoc.schemaType).toBe("ContactPage");
  });

  it("every document has a unique path, a title and a description", () => {
    expect(new Set(proseDocs.map((d) => d.path)).size).toBe(proseDocs.length);
    for (const doc of proseDocs) {
      expect(doc.title).not.toBe("");
      expect(doc.description.length).toBeGreaterThan(20);
    }
  });
});

describe("<ProseDocument />", () => {
  it("renders headings, paragraphs, links and lists with the Long Document layout", () => {
    const html = renderToStaticMarkup(<ProseDocument doc={contactDoc} />);
    expect(html).toContain('<h1 class="mb-8 font-display');
    expect(html).toContain(">Contact Mobile Menorah</h1>");
    expect(html).toContain("<h2>Reporting a problem</h2>");
    expect(html).toContain('<a href="mailto:benakehurstyt@gmail.com">benakehurstyt@gmail.com</a>');
    expect(html).toContain('<a href="/privacy-policy">privacy policy</a>');
    expect(html).toContain("<ul><li>The device and browser");
    expect(html).toContain('"@type":"ContactPage"');
  });

  it("styles the note paragraph like before", () => {
    const html = renderToStaticMarkup(<ProseDocument doc={privacyDoc} />);
    expect(html).toContain('<p class="text-sm text-muted">Last updated: 17 November 2026</p>');
  });
});
