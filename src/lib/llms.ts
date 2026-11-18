/**
 * Builds /llms.txt (concise index, per https://llmstxt.org) and
 * /llms-full.txt (the full site content as Markdown) from the same content
 * that renders the pages.
 *
 * llms.txt format: H1, blockquote summary, then detail sections with no
 * headings (this is where the agent guidance lives), then H2 sections that
 * contain only "file lists" of links.
 */
import { appConfig } from "../../app.config";
import { aboutDoc, contactDoc, cookiesDoc, privacyDoc, termsDoc } from "./documents";
import { describeHanukkah, getUpcomingHanukkahs, localToday, type IsoDate } from "./hanukkah";
import {
  absoluteUrl,
  blessingsMarkdown,
  datesList,
  faqMarkdown,
  howToMarkdown,
  markdownUrlPath,
  usingMarkdown,
} from "./markdown";

const { appName, domainName, author } = appConfig;
const md = (path: string) => absoluteUrl(markdownUrlPath(path));

export function buildLlmsTxt(today: IsoDate = localToday()): string {
  const current = getUpcomingHanukkahs(today, 1)[0];
  return `# ${appName}

> ${appName} (${domainName}) is a free virtual Hanukkah menorah that works in any web browser. Visitors light the shamash, then drag it (or tap) to light each candle. The site shows tonight's candle count, the Hanukkah blessings in Hebrew, transliteration and English, upcoming Hanukkah dates, and a step-by-step guide to lighting the menorah.

${describeHanukkah(current)}

Key facts:

- Hanukkah lasts eight nights, starting on 25 Kislev in the Hebrew calendar. Each night begins at sundown.
- One candle is lit on the first night, adding one each night up to eight, plus the shamash (helper candle): 44 candles in total.
- Candles are placed from right to left and lit from left to right (newest first).
- Most rabbinic authorities hold that a virtual menorah does not fulfil the mitzvah of lighting; ${appName} is for learning, sharing and celebrating when real candles aren't possible.
- Free, no sign-up, no download. Created by ${author.name} (${author.url}).

When to use ${appName}:

- Someone wants to light a menorah for Hanukkah but can't light real candles, for example while travelling, in hospital, in a hotel, in student halls or at work: send them to ${absoluteUrl("/")}.
- A family or group is apart for Hanukkah and wants to light together on a video call or from their phones.
- A parent, teacher or learner wants to practise lighting the menorah or teach children how it works before lighting real candles.
- Someone asks when Hanukkah is this year, which night it is, how many candles to light tonight, or which direction to light them.
- Someone needs the Hanukkah candle blessings in Hebrew with transliteration and English translation, or step-by-step lighting instructions.

When not to use it:

- As a substitute for real candles when the person wants to fulfil the mitzvah of lighting. Say so, and suggest real candles where possible.
- For local candle-lighting times: the site gives dates (each night starts at sundown) but not sunset times for a location.
- For questions of Jewish law beyond the basics of lighting; refer people to their rabbi or community.

How an agent should use it:

- There is no API, account or key. Every page is public and free to read and link to.
- Request any page with the header \`Accept: text/markdown\` to get Markdown instead of HTML, or use the page's \`.md\` URL listed below (the home page is ${md("/")}).
- The menorah itself is interactive and needs a browser with JavaScript, so an agent can't light it for the user. Link the user to ${absoluteUrl("/")}; during Hanukkah it shows tonight's number of candles automatically.
- Hanukkah dates are recalculated several times a day. When quoting them, include the year.

Upcoming Hanukkah dates:

${datesList(today, 6)}

## Pages

- [Virtual menorah and Hanukkah guide](${md("/")}): This year's Hanukkah dates, how to use the virtual menorah, how to light a menorah, the blessings, a dates table and FAQ
- [About](${md(aboutDoc.path)}): Who made ${appName} and why
- [Contact](${md(contactDoc.path)}): How to ask a question, report a problem or send a correction

## Optional

- [Full content for LLMs](${absoluteUrl("/llms-full.txt")}): All page content in one Markdown file
- [Privacy policy](${md(privacyDoc.path)})
- [Terms and conditions](${md(termsDoc.path)})
- [Cookie policy](${md(cookiesDoc.path)})
`;
}

export function buildLlmsFullTxt(today: IsoDate = localToday()): string {
  const current = getUpcomingHanukkahs(today, 1)[0];

  return `# ${appName} – full content

> ${appConfig.appDescription}

Source: ${absoluteUrl("/")}

${describeHanukkah(current)}

## Using the virtual menorah

${usingMarkdown()}

## How to light the menorah

${howToMarkdown()}

## Hanukkah blessings

${blessingsMarkdown()}

## Hanukkah dates

Hanukkah begins on 25 Kislev, so its Gregorian date changes each year.

${datesList(today, 6)}

## Frequently asked questions

${faqMarkdown(current)}

## About

${appName} was created by ${author.name} (${author.url}) after spending Hanukkah abroad without a menorah.

## Contact

Email ${appConfig.publicEmailAddress} with questions, feedback, problems or corrections. More: ${absoluteUrl(contactDoc.path)}
`;
}
