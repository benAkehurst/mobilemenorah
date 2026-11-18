/**
 * Content for the Long Document pages (About, Contact, Privacy, Terms,
 * Cookies). Each page renders it as HTML through <ProseDocument /> and the
 * same data is served as Markdown to agents (see src/lib/markdown.ts), so
 * both representations always match.
 */
import { appConfig } from "../../app.config";

/** Plain text, or a link. Internal links start with "/". */
export type Inline = string | { text: string; href: string };

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; content: Inline[]; note?: boolean }
  | { type: "ul"; items: Inline[][] };

export type ProseDoc = {
  path: string;
  /** Used in <title> and the breadcrumb. */
  title: string;
  /** The page's H1. */
  heading: string;
  description: string;
  schemaType: "WebPage" | "AboutPage" | "ContactPage";
  blocks: Block[];
};

const { appName, companyName, domainName, publicEmailAddress, author } = appConfig;
const mailto = `mailto:${publicEmailAddress}`;
const authorSite = author.url.replace("https://", "");

const h2 = (text: string): Block => ({ type: "h2", text });
const h3 = (text: string): Block => ({ type: "h3", text });
const p = (...content: Inline[]): Block => ({ type: "p", content });

export const aboutDoc: ProseDoc = {
  path: "/about",
  title: "About",
  heading: `About ${appName}`,
  description: `Why ${appName} was created: a free virtual Hanukkah menorah for anyone who can't light real candles, built by ${author.name}.`,
  schemaType: "AboutPage",
  blocks: [
    p(
      `${appName} lets anybody, wherever they are in the world, light a menorah at Hanukkah. You can light the candles from your phone, tablet or computer, learn the blessings and see when Hanukkah falls each year.`
    ),
    h2("Why I created it"),
    p(
      "I'm a software engineer who loves solving problems. One year I was abroad during Hanukkah without a menorah, so my family couldn't light candles together. I wanted a digital menorah we could light from our phones, so I built one, and I hope it helps others in the same situation."
    ),
    p(
      "A virtual menorah isn't a substitute for lighting real candles when you can, but it's a way to share the lights, practise the blessings and teach children about the festival."
    ),
    h2("Get in touch"),
    p(
      "Questions, feedback or ideas? ",
      { text: "Email me", href: mailto },
      " or visit ",
      { text: authorSite, href: author.url },
      "."
    ),
  ],
};

export const contactDoc: ProseDoc = {
  path: "/contact",
  title: "Contact",
  heading: `Contact ${appName}`,
  description: `How to contact ${appName}: email ${author.name} with questions, feedback, problems or corrections.`,
  schemaType: "ContactPage",
  blocks: [
    p(
      `${appName} is made and run by ${author.name}, a software engineer. The best way to get in touch is by email.`
    ),
    h2("Email"),
    p(
      "Email ",
      { text: publicEmailAddress, href: mailto },
      ` with questions, feedback or ideas for ${appName}.`
    ),
    h2("Reporting a problem"),
    p(
      "If the menorah won't light, a date looks wrong, or something is hard to use with a keyboard or screen reader, please let me know. It helps to include:"
    ),
    {
      type: "ul",
      items: [
        ["The device and browser you're using, for example an iPhone with Safari or a laptop with Chrome"],
        ["What you did, and what happened instead"],
        ["A screenshot, if you can take one"],
      ],
    },
    h2("Corrections"),
    p(
      "If you spot a mistake in a Hanukkah date, a blessing, its transliteration or its translation, please email me so I can correct it."
    ),
    h2("Your privacy"),
    p(
      "When you email, I receive your email address and message and only use them to reply. Read the ",
      { text: "privacy policy", href: "/privacy-policy" },
      " for more details."
    ),
    h2("Elsewhere"),
    p("You can find more of my work at ", { text: authorSite, href: author.url }, "."),
  ],
};

export const privacyDoc: ProseDoc = {
  path: "/privacy-policy",
  title: "Privacy policy",
  heading: "Privacy policy",
  description: `How ${appName} handles your data: no accounts, no cookies, and cookieless Vercel Analytics.`,
  schemaType: "WebPage",
  blocks: [
    p(`This privacy policy applies to ${domainName} and all services offered by ${companyName}.`),
    h2("Information we collect"),
    p(
      "There are no accounts and we don't ask for personal information. If you email us, we receive your email address and message and only use them to reply."
    ),
    h2("Analytics"),
    p(
      "We use Vercel Analytics to count page views and visits, such as which pages are viewed and which country visitors are in. It doesn't use cookies and doesn't identify you."
    ),
    h2("Cookies"),
    p(
      "We don't use cookies or store anything on your device to track you. If you choose a Light or Dark theme, that preference is kept in your browser's local storage and never sent to us. ",
      { text: "Read our cookie policy.", href: "/info/cookies" }
    ),
    h2("Changes to this policy"),
    p("We may update this policy from time to time. The date below shows when it last changed."),
    h2("Contact"),
    p("If you have any questions about this policy, ", { text: "contact us", href: mailto }, "."),
    { type: "p", content: ["Last updated: 17 November 2026"], note: true },
  ],
};

export const termsDoc: ProseDoc = {
  path: "/terms-and-conditions",
  title: "Terms and conditions",
  heading: "Terms and conditions",
  description: `The terms and conditions for using ${appName}.`,
  schemaType: "WebPage",
  blocks: [
    p(`These terms set out the rules for using ${appName} ("the App"), available at ${domainName}.`),
    h2("1. Acceptance of terms"),
    p("By accessing or using the App, you agree to these terms. If you do not agree, please do not use the App."),
    h2("2. Analytics"),
    p(
      "We use cookieless Vercel Analytics to understand how the App is used, such as how often people visit and which pages they view, so we can improve it."
    ),
    h2("3. User conduct"),
    p(
      "You agree not to use the App for any unlawful purpose or in any way that might harm, disrupt or interfere with the App or other people's use of it."
    ),
    h2("4. Intellectual property"),
    p(
      `All content in the App, including text, graphics, logos and software, belongs to ${companyName} or its licensors and is protected by intellectual property laws. You may not reproduce, distribute or create derivative works from it without our written permission.`
    ),
    h2("5. Disclaimers and limitation of liability"),
    h3("5.1 Disclaimers"),
    p(
      'The App is provided "as is" and "as available" without warranties of any kind. We do not guarantee that it will be uninterrupted or error-free. Dates and religious information are provided in good faith; please check local customs and your community for guidance.'
    ),
    h3("5.2 Limitation of liability"),
    p(
      `To the extent permitted by law, ${companyName} is not liable for any indirect, incidental, special, consequential or punitive damages arising from your use of the App.`
    ),
    h2("6. Changes to these terms"),
    p(
      "We may change these terms at any time by posting the new version here. Continuing to use the App after a change means you accept the new terms."
    ),
    h2("7. Contact us"),
    p("If you have any questions about these terms, ", { text: "contact us", href: mailto }, "."),
  ],
};

export const cookiesDoc: ProseDoc = {
  path: "/info/cookies",
  title: "Cookie policy",
  heading: "Cookie policy",
  description: `${appName} doesn't use cookies. Visits are measured with cookieless Vercel Analytics.`,
  schemaType: "WebPage",
  blocks: [
    h2("We don't use cookies"),
    p(
      `${appName} doesn't set any cookies and doesn't store anything on your device to track you, so there's no cookie banner.`
    ),
    h2("Your theme choice"),
    p(
      "If you pick Light or Dark, that choice is saved in your browser's local storage so the site remembers it. It never leaves your device. Choosing System removes it."
    ),
    h2("Analytics"),
    p("We use Vercel Analytics to count visits and page views. It works without cookies and without identifying you."),
    p("See our ", { text: "privacy policy", href: "/privacy-policy" }, " for more details."),
  ],
};

export const proseDocs: ProseDoc[] = [aboutDoc, contactDoc, privacyDoc, termsDoc, cookiesDoc];

/** Visible text of a document (heading and blocks), for length checks. */
export function docPlainText(doc: ProseDoc): string {
  const inline = (parts: Inline[]) => parts.map((part) => (typeof part === "string" ? part : part.text)).join("");
  const blocks = doc.blocks.map((block) => {
    switch (block.type) {
      case "h2":
      case "h3":
        return block.text;
      case "p":
        return inline(block.content);
      case "ul":
        return block.items.map(inline).join("\n");
    }
  });
  return [doc.heading, ...blocks].join("\n");
}
