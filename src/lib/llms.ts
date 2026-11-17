/**
 * Builds /llms.txt (concise index, per https://llmstxt.org) and
 * /llms-full.txt (the full site content as Markdown) from the same content
 * that renders the pages.
 */
import { appConfig } from "../../app.config";
import { blessings, getFaqs, howToSteps } from "./content";
import { describeHanukkah, formatLongDate, getUpcomingHanukkahs, localToday } from "./hanukkah";

const base = appConfig.appDomainName;

function datesList(count: number): string {
  return getUpcomingHanukkahs(localToday(), count)
    .map(
      (h) =>
        `- ${h.year}: first candle on the evening of ${formatLongDate(
          h.firstCandle
        )}; ends at nightfall on ${formatLongDate(h.endDate)} (${h.hebrewStartEn} – ${h.hebrewEndEn})`
    )
    .join("\n");
}

export function buildLlmsTxt(): string {
  const current = getUpcomingHanukkahs(localToday(), 1)[0];
  return `# ${appConfig.appName}

> ${appConfig.appName} (${appConfig.domainName}) is a free virtual Hanukkah menorah that works in any web browser. Visitors light the shamash, then drag it (or tap) to light each candle. The site shows tonight's candle count, the Hanukkah blessings in Hebrew, transliteration and English, upcoming Hanukkah dates, and a step-by-step guide to lighting the menorah.

${describeHanukkah(current)}

Key facts:
- Hanukkah lasts eight nights, starting on 25 Kislev in the Hebrew calendar. Each night begins at sundown.
- One candle is lit on the first night, adding one each night up to eight, plus the shamash (helper candle): 44 candles in total.
- Candles are placed from right to left and lit from left to right (newest first).
- Most rabbinic authorities hold that a virtual menorah does not fulfil the mitzvah of lighting; ${appConfig.appName} is for learning, sharing and celebrating when real candles aren't possible.
- Free, no sign-up, no download. Created by ${appConfig.author.name} (${appConfig.author.url}).

## Main pages

- [Virtual menorah](${base}/): Interactive menorah, tonight's Hanukkah status, how to light, blessings, dates and FAQ
- [How to light the menorah](${base}/#how-to-light): Five-step guide
- [Hanukkah blessings](${base}/#blessings): Hebrew text, transliteration and translation
- [Hanukkah dates](${base}/#dates): Gregorian and Hebrew dates for upcoming years
- [FAQ](${base}/#faq): Common questions about Hanukkah and the menorah
- [About](${base}/about): Why the site was created and how to get in touch

## Upcoming Hanukkah dates

${datesList(6)}

## Optional

- [Full content for LLMs](${base}/llms-full.txt): All page content in one Markdown file
- [Privacy policy](${base}/privacy-policy)
- [Terms and conditions](${base}/terms-and-conditions)
- [Cookie policy](${base}/info/cookies)
`;
}

export function buildLlmsFullTxt(): string {
  const current = getUpcomingHanukkahs(localToday(), 1)[0];
  const steps = howToSteps.map((s, i) => `${i + 1}. **${s.name}.** ${s.text}`).join("\n");
  const blessingText = blessings
    .map(
      (b) =>
        `### ${b.title}\n\n*${b.when}*\n\n- Hebrew: ${b.hebrew}\n- Transliteration: ${b.transliteration}\n- Translation: ${b.translation}`
    )
    .join("\n\n");
  const faqs = getFaqs(current)
    .map((f) => `### ${f.question}\n\n${f.answer}`)
    .join("\n\n");

  return `# ${appConfig.appName} – full content

> ${appConfig.appDescription}

Source: ${base}/

${describeHanukkah(current)}

## Using the virtual menorah

1. Tap the shamash (the raised candle in the middle) to light it.
2. Drag the shamash's flame over each candle's wick, or tap the candles, to light them. The shamash returns to its holder when you let go.
3. The menorah shows tonight's number of candles automatically during Hanukkah. At other times, choose a night from 1 to 8 to practise.
4. Pick a candle colour, or press "Blow out the candles" to start again.

## How to light the menorah

${steps}

## Hanukkah blessings

${blessingText}

## Hanukkah dates

Hanukkah begins on 25 Kislev, so its Gregorian date changes each year.

${datesList(6)}

## Frequently asked questions

${faqs}

## About

${appConfig.appName} was created by ${appConfig.author.name} (${appConfig.author.url}) after spending Hanukkah abroad without a menorah. Contact: ${appConfig.publicEmailAddress}.
`;
}
