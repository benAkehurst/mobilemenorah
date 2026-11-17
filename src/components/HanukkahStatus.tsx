"use client";

import { useToday } from "@/hooks/useToday";
import { formatLongDate, getHanukkahStatus, ordinal } from "@/lib/hanukkah";

/** Personalised "tonight" message, based on the visitor's local date. */
export default function HanukkahStatus() {
  const today = useToday();

  if (!today) {
    // Reserve the line's height so the layout doesn't jump after hydration.
    return <p className="min-h-14" aria-hidden="true" />;
  }

  const status = getHanukkahStatus(today);
  let text: string;
  switch (status.kind) {
    case "night":
      text =
        status.night === 1
          ? "Hanukkah begins tonight. Light the first candle after sundown."
          : `Tonight is the ${ordinal(status.night)} night: light ${status.night} candles and the shamash.`;
      break;
    case "lastDay":
      text = "Today is the eighth and final day of Hanukkah. It ends at nightfall.";
      break;
    case "upcoming":
      text =
        status.daysUntil === 1
          ? `Hanukkah begins tomorrow evening, ${formatLongDate(status.dates.firstCandle)}.`
          : `Hanukkah begins in ${status.daysUntil} days, at sundown on ${formatLongDate(
              status.dates.firstCandle
            )}.`;
      break;
  }

  return (
    <p className="flex min-h-14 items-start gap-3 text-base font-semibold text-night-ink sm:text-lg" role="status">
      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-flame shadow-flame" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}
