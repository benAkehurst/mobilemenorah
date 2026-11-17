/**
 * Hanukkah date calculations.
 *
 * Dates are computed from the Hebrew calendar via `Intl` instead of a
 * hardcoded table, so they never go stale and can't contain typos.
 *
 * Hanukkah starts on 25 Kislev. Hebrew days begin at sundown, so the first
 * candle is lit on the evening of the Gregorian day *before* 25 Kislev.
 *
 * All dates are handled as plain `YYYY-MM-DD` strings (calendar dates with no
 * time zone) to avoid the UTC-vs-local shifts that `new Date("2025-12-14")`
 * causes.
 */

export type IsoDate = string; // YYYY-MM-DD

export type HanukkahDates = {
  /** Gregorian year in which the first candle is lit. */
  year: number;
  hebrewYear: number;
  /** Evening of the first candle (sundown, start of 25 Kislev). */
  firstCandle: IsoDate;
  /** Evening of the eighth and final candle. */
  lastCandle: IsoDate;
  /** Final day of Hanukkah; the festival ends at nightfall on this date. */
  endDate: IsoDate;
  /** e.g. כ״ה בכסלו ה׳תשפ״ז */
  hebrewStart: string;
  /** e.g. ב׳ בטבת ה׳תשפ״ז */
  hebrewEnd: string;
  /** e.g. 25 Kislev 5787 */
  hebrewStartEn: string;
  /** e.g. 2 Tevet 5787 */
  hebrewEndEn: string;
};

export type HanukkahStatus =
  | { kind: "upcoming"; daysUntil: number; dates: HanukkahDates }
  | { kind: "night"; night: number; dates: HanukkahDates }
  | { kind: "lastDay"; dates: HanukkahDates };

const DAY_MS = 24 * 60 * 60 * 1000;

const hebrewParts = new Intl.DateTimeFormat("en-u-ca-hebrew", {
  timeZone: "UTC",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const hebrewMonthHe = new Intl.DateTimeFormat("he-u-ca-hebrew", {
  timeZone: "UTC",
  month: "long",
});

function isoToUtc(iso: IsoDate): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function utcToIso(ms: number): IsoDate {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(iso: IsoDate, days: number): IsoDate {
  return utcToIso(isoToUtc(iso) + days * DAY_MS);
}

/** Whole calendar days from `a` to `b` (b - a). */
export function daysBetween(a: IsoDate, b: IsoDate): number {
  return Math.round((isoToUtc(b) - isoToUtc(a)) / DAY_MS);
}

/** Today's calendar date in the *local* time zone of the runtime. */
export function localToday(now: Date = new Date()): IsoDate {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hebrewDate(ms: number) {
  const parts = Object.fromEntries(
    hebrewParts.formatToParts(new Date(ms)).map((p) => [p.type, p.value])
  );
  return {
    day: Number(parts.day),
    month: parts.month as string,
    year: Number(parts.year),
  };
}

const HEBREW_ONES = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
const HEBREW_TENS = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
const HEBREW_HUNDREDS = ["", "ק", "ר", "ש", "ת"];

/** Hebrew numerals (gematria) with geresh/gershayim, e.g. 25 → כ״ה. */
export function toHebrewNumeral(value: number, withThousands = false): string {
  let n = value;
  let prefix = "";
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000);
    n %= 1000;
    if (withThousands) prefix = `${HEBREW_ONES[thousands]}׳`;
  }

  let letters = "";
  while (n >= 400) {
    letters += "ת";
    n -= 400;
  }
  if (n >= 100) {
    letters += HEBREW_HUNDREDS[Math.floor(n / 100)];
    n %= 100;
  }
  // 15 and 16 are written ט״ו / ט״ז to avoid spelling a divine name.
  if (n === 15 || n === 16) {
    letters += n === 15 ? "טו" : "טז";
  } else {
    letters += HEBREW_TENS[Math.floor(n / 10)] + HEBREW_ONES[n % 10];
  }

  const punctuated =
    letters.length === 1
      ? `${letters}׳`
      : `${letters.slice(0, -1)}״${letters.slice(-1)}`;
  return prefix + punctuated;
}

function formatHebrew(ms: number): string {
  const { day, year } = hebrewDate(ms);
  // Month-only formatting gives the bare month name, e.g. "כסלו".
  const month = hebrewMonthHe.format(new Date(ms));
  return `${toHebrewNumeral(day)} ${month} ${toHebrewNumeral(year, true)}`;
}

function formatHebrewEn(ms: number): string {
  const { day, month, year } = hebrewDate(ms);
  return `${day} ${month} ${year}`;
}

const cache = new Map<number, HanukkahDates>();

/** Hanukkah whose first candle falls in the given Gregorian year. */
export function getHanukkahDates(year: number): HanukkahDates {
  const cached = cache.get(year);
  if (cached) return cached;

  // 25 Kislev always falls between late November and late December.
  for (let ms = Date.UTC(year, 10, 20); ms <= Date.UTC(year, 11, 31); ms += DAY_MS) {
    const h = hebrewDate(ms);
    if (h.month === "Kislev" && h.day === 25) {
      const endMs = ms + 7 * DAY_MS;
      const dates: HanukkahDates = {
        year,
        hebrewYear: h.year,
        firstCandle: utcToIso(ms - DAY_MS),
        lastCandle: utcToIso(ms + 6 * DAY_MS),
        endDate: utcToIso(endMs),
        hebrewStart: formatHebrew(ms),
        hebrewEnd: formatHebrew(endMs),
        hebrewStartEn: formatHebrewEn(ms),
        hebrewEndEn: formatHebrewEn(endMs),
      };
      cache.set(year, dates);
      return dates;
    }
  }
  throw new Error(`Could not find 25 Kislev in ${year}`);
}

/** The Hanukkah that is happening now, or the next one if none is. */
export function getCurrentOrNextHanukkah(today: IsoDate): HanukkahDates {
  const year = Number(today.slice(0, 4));
  for (const y of [year - 1, year, year + 1]) {
    const dates = getHanukkahDates(y);
    if (daysBetween(today, dates.endDate) >= 0) return dates;
  }
  return getHanukkahDates(year + 1);
}

/** Upcoming Hanukkah dates for the next `count` years, starting with the current/next one. */
export function getUpcomingHanukkahs(today: IsoDate, count: number): HanukkahDates[] {
  const first = getCurrentOrNextHanukkah(today);
  return Array.from({ length: count }, (_, i) => getHanukkahDates(first.year + i));
}

export function getHanukkahStatus(today: IsoDate): HanukkahStatus {
  const dates = getCurrentOrNextHanukkah(today);
  const offset = daysBetween(dates.firstCandle, today);
  if (offset < 0) return { kind: "upcoming", daysUntil: -offset, dates };
  if (offset < 8) return { kind: "night", night: offset + 1, dates };
  return { kind: "lastDay", dates };
}

const longDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** e.g. "Friday 4 December 2026" */
export function formatLongDate(iso: IsoDate): string {
  return longDate.format(isoToUtc(iso)).replace(",", "");
}

/** e.g. "Fri 4 Dec 2026" */
export function formatShortDate(iso: IsoDate): string {
  return shortDate.format(isoToUtc(iso)).replace(",", "");
}

const ORDINALS = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];

export function ordinal(night: number): string {
  return ORDINALS[night - 1] ?? `${night}th`;
}

/** One-sentence, answer-first summary used in copy, JSON-LD and llms.txt. */
export function describeHanukkah(dates: HanukkahDates): string {
  return `Hanukkah ${dates.year} begins at sundown on ${formatLongDate(
    dates.firstCandle
  )} and ends at nightfall on ${formatLongDate(dates.endDate)} (${
    dates.hebrewStartEn
  } – ${dates.hebrewEndEn}).`;
}
