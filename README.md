# Mobile Menorah

A free virtual Hanukkah menorah at [mobilemenorah.com](https://www.mobilemenorah.com). Light the shamash, then drag it over the candles (or tap them) to light each one. The site also shows tonight's candle count, the blessings, upcoming Hanukkah dates and a how-to guide.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS 3
- `react-draggable` for the shamash
- Vercel Analytics (cookieless) and Google Analytics (loaded only after cookie consent)

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Set `NEXT_PUBLIC_GOOGLE_ANALYTICS` to a GA4 measurement ID to enable Google Analytics.

## How it's organised

| Path | What it does |
| --- | --- |
| `src/app/page.tsx` | Home page: menorah, how-to, blessings, dates table, FAQ, JSON-LD |
| `src/components/menorah/MenorahExperience.tsx` | Interactive menorah (client component) |
| `src/lib/hanukkah.ts` | Hanukkah dates computed from the Hebrew calendar via `Intl` (no hardcoded table) |
| `src/lib/content.ts` | Blessings, how-to steps and FAQs, shared by the page, JSON-LD and llms.txt |
| `src/lib/schema.ts` | schema.org structured data (WebSite, WebApplication, HowTo, FAQPage, …) |
| `src/app/llms.txt`, `src/app/llms-full.txt` | Plain-text summaries for AI answer engines ([llmstxt.org](https://llmstxt.org)) |
| `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx` | Crawling, PWA manifest and social card |
| `src/components/consent/ConsentProvider.tsx` | Cookie banner and consent-gated Google Analytics |
| `src/components/AdSlot.tsx` | Ad placeholder behind `appConfig.ads.enabled` |
| `app.config.ts` | Site name, domain, contact details and feature flags |
