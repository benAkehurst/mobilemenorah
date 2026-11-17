/** schema.org JSON-LD builders. */
import { appConfig } from "../../app.config";
import type { Faq, HowToStep } from "./content";

const base = appConfig.appDomainName;

export const ids = {
  website: `${base}/#website`,
  person: `${base}/#ben-akehurst`,
  app: `${base}/#app`,
  homePage: `${base}/#webpage`,
};

export const hanukkahThing = {
  "@type": "Thing",
  name: "Hanukkah",
  alternateName: ["Chanukah", "Festival of Lights"],
  sameAs: "https://en.wikipedia.org/wiki/Hanukkah",
};

export const personSchema = {
  "@type": "Person",
  "@id": ids.person,
  name: appConfig.author.name,
  url: appConfig.author.url,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": ids.website,
  url: `${base}/`,
  name: appConfig.appName,
  description: appConfig.appDescription,
  inLanguage: "en",
  publisher: { "@id": ids.person },
};

export function homeSchema({
  faqs,
  steps,
  modified,
}: {
  faqs: Faq[];
  steps: HowToStep[];
  modified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema,
      personSchema,
      {
        "@type": "WebApplication",
        "@id": ids.app,
        name: appConfig.appName,
        url: `${base}/`,
        description: appConfig.appDescription,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        image: `${base}/icon-512.png`,
        creator: { "@id": ids.person },
        about: hanukkahThing,
        featureList: [
          "Interactive menorah lit with a draggable shamash",
          "Shows tonight's Hanukkah candle count",
          "Hanukkah blessings in Hebrew, transliteration and English",
          "Hanukkah dates in the Gregorian and Hebrew calendars",
          "Choice of candle colours",
        ],
      },
      {
        "@type": "WebPage",
        "@id": ids.homePage,
        url: `${base}/`,
        name: appConfig.appTitle,
        description: appConfig.appDescription,
        isPartOf: { "@id": ids.website },
        about: hanukkahThing,
        mainEntity: { "@id": ids.app },
        dateModified: modified,
        inLanguage: "en",
      },
      {
        "@type": "HowTo",
        "@id": `${base}/#how-to-light`,
        name: "How to light a Hanukkah menorah",
        description: "Step-by-step guide to lighting the Hanukkah menorah each night.",
        supply: [
          { "@type": "HowToSupply", name: "Hanukkah candles or oil" },
        ],
        tool: [{ "@type": "HowToTool", name: "Menorah (hanukkiah)" }],
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
          url: `${base}/#how-to-light`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

export function pageSchema({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage";
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${base}${path}#webpage`,
        url: `${base}${path}`,
        name,
        description,
        isPartOf: websiteSchema,
        inLanguage: "en",
        ...(type === "AboutPage" ? { mainEntity: personSchema } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: appConfig.appName, item: `${base}/` },
          { "@type": "ListItem", position: 2, name, item: `${base}${path}` },
        ],
      },
    ],
  };
}
