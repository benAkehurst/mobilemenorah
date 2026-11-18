/**
 * Markdown versions of every page, served to agents by src/proxy.ts when
 * they send `Accept: text/markdown` (or request the page's `.md` URL), plus
 * the Markdown 404 body. Built from the same content as the HTML pages.
 */
import { appConfig } from "../../app.config";
import { blessings, getFaqs, homeCopy, howToSteps, usingSteps } from "./content";
import { proseDocs, type Inline, type ProseDoc } from "./documents";
import {
  describeHanukkah,
  formatLongDate,
  formatShortDate,
  getUpcomingHanukkahs,
  localToday,
  type HanukkahDates,
  type IsoDate,
} from "./hanukkah";

const base = appConfig.appDomainName;

/** Absolute URL for a site path ("/" → "https://www.mobilemenorah.com/"). */
export function absoluteUrl(path: string): string {
  return `${base}${path}`;
}

/** `.md` sibling URL path for a page, per https://llmstxt.org ("/" → "/index.md"). */
export function markdownUrlPath(path: string): string {
  return path === "/" ? "/index.md" : `${path}.md`;
}

function inlineToMarkdown(parts: Inline[]): string {
  return parts
    .map((part) =>
      typeof part === "string"
        ? part
        : `[${part.text}](${part.href.startsWith("/") ? absoluteUrl(part.href) : part.href})`
    )
    .join("");
}

const footerLinks: [string, string][] = [
  ["Virtual menorah", "/"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy-policy"],
  ["Terms", "/terms-and-conditions"],
  ["Cookies", "/info/cookies"],
  ["llms.txt", "/llms.txt"],
];

function footer(): string {
  return `---\n\n${footerLinks.map(([text, path]) => `[${text}](${absoluteUrl(path)})`).join(" · ")}\n`;
}

export function datesList(today: IsoDate, count: number): string {
  return getUpcomingHanukkahs(today, count)
    .map(
      (h) =>
        `- ${h.year}: first candle on the evening of ${formatLongDate(
          h.firstCandle
        )}; ends at nightfall on ${formatLongDate(h.endDate)} (${h.hebrewStartEn} – ${h.hebrewEndEn})`
    )
    .join("\n");
}

export function usingMarkdown(): string {
  return usingSteps.map((step, i) => `${i + 1}. ${step}`).join("\n");
}

export function howToMarkdown(): string {
  return howToSteps.map((s, i) => `${i + 1}. **${s.name}.** ${s.text}`).join("\n");
}

export function blessingsMarkdown(): string {
  return blessings
    .map(
      (b) =>
        `### ${b.title}\n\n*${b.when}*\n\n- Hebrew: ${b.hebrew}\n- Transliteration: ${b.transliteration}\n- Translation: ${b.translation}`
    )
    .join("\n\n");
}

export function faqMarkdown(current: HanukkahDates): string {
  return getFaqs(current)
    .map((f) => `### ${f.question}\n\n${f.answer}`)
    .join("\n\n");
}

function datesTable(upcoming: HanukkahDates[]): string {
  const rows = upcoming.map(
    (h) =>
      `| ${h.year} | ${formatShortDate(h.firstCandle)} | ${formatShortDate(h.endDate)} | ${h.hebrewStartEn} – ${h.hebrewEndEn} (${h.hebrewStart} – ${h.hebrewEnd}) |`
  );
  return ["| Year | First candle | Ends at nightfall | Hebrew dates |", "| --- | --- | --- | --- |", ...rows].join(
    "\n"
  );
}

/** The home page (/) as Markdown. */
export function buildHomeMarkdown(today: IsoDate = localToday()): string {
  const upcoming = getUpcomingHanukkahs(today, 6);
  const current = upcoming[0];
  return `# ${homeCopy.heading}

> ${appConfig.appDescription}

${describeHanukkah(current)}

## Using the virtual menorah

The interactive menorah runs in a web browser with JavaScript. Open ${absoluteUrl("/")} to light it.

${usingMarkdown()}

## ${homeCopy.howToHeading}

${homeCopy.howToIntro}

${howToMarkdown()}

## ${homeCopy.blessingsHeading}

${homeCopy.blessingsIntro}

${blessingsMarkdown()}

## ${homeCopy.datesHeading}

${homeCopy.datesIntro}

${datesTable(upcoming)}

## ${homeCopy.faqHeading}

${faqMarkdown(current)}

${footer()}`;
}

/** A Long Document page (About, Contact, …) as Markdown. */
export function proseDocToMarkdown(doc: ProseDoc): string {
  const blocks = doc.blocks.map((block) => {
    switch (block.type) {
      case "h2":
        return `## ${block.text}`;
      case "h3":
        return `### ${block.text}`;
      case "p":
        return block.note ? `*${inlineToMarkdown(block.content)}*` : inlineToMarkdown(block.content);
      case "ul":
        return block.items.map((item) => `- ${inlineToMarkdown(item)}`).join("\n");
    }
  });
  return `# ${doc.heading}\n\n${blocks.join("\n\n")}\n\n${footer()}`;
}

/** Markdown 404 body. `path` is echoed back, so keep it short and inert. */
export function buildNotFoundMarkdown(path: string): string {
  const safePath = path.replace(/[`\r\n]/g, "").slice(0, 200);
  return `# Page not found

There is no page at \`${safePath}\` on ${appConfig.appName} (HTTP 404). It may have moved, or the address may be mistyped.

Try one of these instead:

- [Virtual Hanukkah menorah](${absoluteUrl("/")}): the home page, with tonight's Hanukkah dates, blessings and FAQ
- [llms.txt](${absoluteUrl("/llms.txt")}): a guide to this site for AI agents, with links to every page in Markdown
- [Sitemap](${absoluteUrl("/sitemap.xml")}): every public page

${footer()}`;
}

const markdownBuilders: Record<string, (today: IsoDate) => string> = {
  "/": buildHomeMarkdown,
  ...Object.fromEntries(proseDocs.map((doc) => [doc.path, () => proseDocToMarkdown(doc)])),
};

/** Paths of every HTML page that has a Markdown version. */
export const markdownPagePaths = Object.keys(markdownBuilders);

/** Whether a page path has a Markdown version (cheap; builds nothing). */
export function hasMarkdownPage(path: string): boolean {
  return Object.hasOwn(markdownBuilders, path);
}

/** Markdown for a page path, or null if there is no such page. */
export function pageMarkdown(path: string, today: IsoDate = localToday()): string | null {
  return hasMarkdownPage(path) ? markdownBuilders[path](today) : null;
}

/**
 * Page path for a `.md` URL ("/index.md" → "/", "/about.md" → "/about"),
 * or null if the URL isn't a `.md` URL.
 */
export function pagePathForMarkdownUrl(pathname: string): string | null {
  if (!pathname.endsWith(".md")) return null;
  if (pathname === "/index.md") return "/";
  return pathname.slice(0, -3) || null;
}
