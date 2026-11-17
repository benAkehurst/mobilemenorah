import type { MetadataRoute } from "next";
import { appConfig } from "../../app.config";

/**
 * Search engines and AI answer engines are explicitly welcome. Listing the AI
 * crawlers by name isn't strictly needed (the `*` rule allows them), but makes
 * the intent clear and survives any future `*` restrictions.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "meta-externalagent",
  "MistralAI-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${appConfig.appDomainName}/sitemap.xml`,
    host: appConfig.appDomainName,
  };
}
