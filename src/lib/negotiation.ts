/**
 * HTTP content negotiation between HTML and Markdown (RFC 9110 §12.5.1),
 * following https://acceptmarkdown.com: rank by q-value, let the most
 * specific matching range decide each type's q (so `text/html;q=0, *\/*`
 * still rejects HTML), treat q=0 as a rejection and break ties by the
 * client's order. Server preference (HTML first) breaks any remaining tie.
 */

export const HTML = "text/html";
export const MARKDOWN = "text/markdown";

/** Representations this site can produce, in server preference order. */
export const PRODUCES = [HTML, MARKDOWN] as const;
export type Representation = (typeof PRODUCES)[number];

type AcceptEntry = { type: string; q: number; specificity: number };

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const [type, ...params] = raw.split(";").map((s) => s.trim());
      let q = 1;
      for (const param of params) {
        const [name, value] = param.split("=").map((s) => s.trim());
        if (name.toLowerCase() === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const mediaType = type.toLowerCase();
      const specificity = mediaType === "*/*" ? 0 : mediaType.endsWith("/*") ? 1 : 2;
      return { type: mediaType, q, specificity };
    });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/**
 * The representation to send, or `null` when the client accepts none of
 * them (respond 406). A missing or empty Accept header means "anything",
 * so it gets the default (HTML).
 */
export function preferredType(header: string | null | undefined): Representation | null {
  if (!header || !header.trim()) return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let best: Representation | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    entries.forEach((entry, idx) => {
      if (!matches(entry, candidate)) return;
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = idx;
      }
    });
    if (matched === null) continue;
    const q = (matched as AcceptEntry).q;
    if (q <= 0) continue;
    if (q > bestQ || (q === bestQ && matchedPosition < bestPosition)) {
      best = candidate;
      bestQ = q;
      bestPosition = matchedPosition;
    }
  }
  return best;
}

/** Adds `Accept` to a Vary header value without duplicating it. */
export function withVaryAccept(existing: string | null): string {
  if (!existing || !existing.trim()) return "Accept";
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (tokens.includes("accept") || tokens.includes("*")) return existing;
  return `${existing}, Accept`;
}
