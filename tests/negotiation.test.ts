import { describe, expect, it } from "vitest";
import { preferredType, withVaryAccept } from "@/lib/negotiation";

describe("preferredType", () => {
  it.each([
    // Default to HTML when the client has no preference.
    [null, "text/html"],
    ["", "text/html"],
    ["*/*", "text/html"],
    ["text/*", "text/html"],
    // Browsers.
    ["text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "text/html"],
    // Agents.
    ["text/markdown", "text/markdown"],
    ["text/markdown, text/html, */*", "text/markdown"],
    ["text/html, text/markdown", "text/html"],
    ["text/html;q=0.5, text/markdown", "text/markdown"],
    ["text/markdown;q=0.9, text/html;q=0.8", "text/markdown"],
    ["TEXT/MARKDOWN", "text/markdown"],
    ["text/markdown; charset=utf-8", "text/markdown"],
    // A specific range overrides a wildcard, even with q=0 (RFC 9110 §12.5.1).
    ["text/html;q=0, */*", "text/markdown"],
    ["text/markdown;q=0, */*", "text/html"],
    // Nothing we can produce.
    ["application/pdf", null],
    ["text/markdown;q=0", null],
    ["text/html;q=0, text/markdown;q=0", null],
  ])("Accept %j → %j", (accept, expected) => {
    expect(preferredType(accept)).toBe(expected);
  });
});

describe("withVaryAccept", () => {
  it("adds Accept once", () => {
    expect(withVaryAccept(null)).toBe("Accept");
    expect(withVaryAccept("rsc")).toBe("rsc, Accept");
    expect(withVaryAccept("rsc, accept")).toBe("rsc, accept");
    expect(withVaryAccept("*")).toBe("*");
  });
});
