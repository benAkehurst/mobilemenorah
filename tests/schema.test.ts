import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { appConfig } from "../app.config";
import { getFaqs, howToSteps } from "@/lib/content";
import { getUpcomingHanukkahs } from "@/lib/hanukkah";
import { buildHomeMarkdown } from "@/lib/markdown";
import { homeSchema, pageSchema, productKeywords } from "@/lib/schema";

const TODAY = "2026-11-17";

describe("brand + product terms", () => {
  const schema = homeSchema({
    faqs: getFaqs(getUpcomingHanukkahs(TODAY, 1)[0]),
    steps: howToSteps,
    modified: TODAY,
  });
  const app = schema["@graph"].find((node) => node["@type"] === "WebApplication") as { keywords: string };

  it("publishes product keywords in the home page JSON-LD", () => {
    expect(app.keywords).toBe(productKeywords.join(", "));
    expect(productKeywords[0]).toBe("virtual Hanukkah menorah");
  });

  it("uses only terms that also appear on the home page", () => {
    const pageText = `${appConfig.appTitle}\n${buildHomeMarkdown(TODAY)}`.toLowerCase();
    for (const keyword of productKeywords) {
      expect(pageText, keyword).toContain(keyword.toLowerCase());
    }
  });

  it("keeps each term meaningful once the brand words are removed", () => {
    // Audits pair the brand with the term minus brand words ("Mobile Menorah <rest>").
    for (const keyword of productKeywords) {
      const rest = keyword.replace(/\b(mobile|menorah)\b/gi, "").trim();
      expect(rest.split(/\s+/).length, keyword).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("contact page", () => {
  it("has ContactPage structured data with a contact point", () => {
    const graph = pageSchema({ path: "/contact", name: "Contact", description: "d", type: "ContactPage" })["@graph"];
    const page = graph[0] as { "@type": string; mainEntity: { contactPoint: { email: string } } };
    expect(page["@type"]).toBe("ContactPage");
    expect(page.mainEntity.contactPoint.email).toBe(appConfig.publicEmailAddress);
  });

  it("is in the sitemap", () => {
    expect(sitemap().map((entry) => entry.url)).toContain(`${appConfig.appDomainName}/contact`);
  });
});
