# Design — Mobile Menorah

A locked design system for the site. Every page change reads this file first.
Extend or amend it when the system needs to grow; don't override per page.

## Concept — "The window"

Hanukkah lights are placed in a window so they can be seen from outside. The
site is built around that: a night-sky band (the window) holds the menorah and
the header on every page. Below it, the guide is set like a prayer-book page on
parchment (light) or night (dark).

## Genre

Editorial, with one atmospheric element: the night "window" band. The band is
dark in both themes because candlelight only reads against darkness.

## Macrostructure family

- Home: **Marquee Hero** — the window band is the whole first screen: headline
  and dates on one side, the interactive menorah on the other. Below the fold
  the page becomes a document (how to light, blessings, dates, FAQ).
- Content pages (About, Privacy, Terms, Cookies): **Long Document** — single
  column, 65ch measure, inline section heads, no cards.
- Nav: edge-aligned minimal (N9) on the night band. Footer: Statement (Ft5) —
  one closing line plus an inline row of links.

## Theme

Tokens live in `src/app/tokens.css`; Tailwind maps them in `tailwind.config.ts`.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-paper` | oklch(96.5% 0.012 85) | oklch(15% 0.022 262) |
| `--color-paper-2` | oklch(93.5% 0.016 85) | oklch(19% 0.027 262) |
| `--color-rule` | oklch(85% 0.016 80) | oklch(30% 0.025 262) |
| `--color-muted` | oklch(46% 0.018 260) | oklch(74% 0.018 85) |
| `--color-ink` | oklch(21% 0.025 262) | oklch(93% 0.012 85) |
| `--color-brass` | oklch(76% 0.12 80) | same |
| `--color-brass-deep` | oklch(52% 0.1 70) | oklch(80% 0.11 80) |
| `--color-link` | oklch(44% 0.14 258) | oklch(80% 0.1 252) |
| `--color-focus` | oklch(50% 0.17 258) | oklch(78% 0.13 252) |
| `--color-night` | oklch(17% 0.03 262) | same (window band) |
| `--color-focus-night` | oklch(78% 0.13 252) | same (focus on the band) |

Accent discipline: brass marks the menorah, active states and small rules;
Hanukkah blue is only for links and focus rings. No gradient backgrounds other
than the brass/flame shading inside the menorah itself.

Theme modes: Light, Dark, System (default). An explicit choice sets
`data-theme` on `<html>`; System removes it and follows `prefers-color-scheme`.
The choice is stored in `localStorage` (`theme`) and applied by an inline
script before first paint.

## Typography

- Display + all Hebrew: **Frank Ruhl Libre** (variable 300–900), weight 500 for
  headings, 400 for the large Hebrew blessings. Tracking −0.02em on display.
- Body + UI: **IBM Plex Sans Hebrew** 400, 600 for labels.
- Any element with `lang="he"` uses the display face.
- Scale: body 1rem/1.6; h2 clamp(1.75rem, 2vw + 1rem, 2.5rem); display
  clamp(2.5rem, 4vw + 1rem, 4.25rem), as Tailwind `text-h2` and `text-display`.
  Tabular numerals in the dates table.

## Spacing

Tailwind's 4-pt scale. Section spacing varies on purpose (the guide sections
are not all padded the same).

## Motion

- Flame flicker (only decorative loop), disabled under reduced motion.
- Shamash returns to its holder with `--ease-out` over `--dur-return`.
- Colour/background transitions `--dur-short`. No scroll reveals.

## Microinteractions stance

- Silent success: lighting a candle is its own feedback; the status line
  updates politely for screen readers.
- Focus rings appear instantly (never animated), 2px `--color-focus`. Anything
  on the night band carries `data-band="night"`, which swaps `--color-focus` to
  `--color-focus-night` so the ring stays visible in both themes.

## CTA voice

There is no marketing CTA. Controls are quiet: pill-shaped toggles on the
night band with a brass fill for the active state.

## What pages MUST share

The night header band with the mark and wordmark, the theme toggle, the type
pairing, the tokens, and the Statement footer.

## What pages MAY differ on

Home uses the full window band (Marquee Hero); content pages use only the
slim header band (Long Document).

## Exports

### tokens.css

See `src/app/tokens.css` (single source of truth).
