"use client";

import { useToday } from "@/hooks/useToday";
import { formatLongDate, getHanukkahStatus, ordinal } from "@/lib/hanukkah";

/** Personalised "tonight" message, based on the visitor's local date. */
export default function HanukkahStatus() {
  const today = useToday();

  if (!today) {
    // Reserve the line's height so the layout doesn't jump after hydration.
    return <p className="min-h-7" aria-hidden="true" />;
  }

  const status = getHanukkahStatus(today);
  let text: string;
  switch (status.kind) {
    case "night":
      text =
        status.night === 1
          ? "Hanukkah begins tonight! Light the first candle after sundown."
          : `Tonight is the ${ordinal(status.night)} night of Hanukkah – light ${status.night} candles plus the shamash.`;
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
    <p className="min-h-7 text-lg font-semibold text-blue-900" role="status">
      {text}
    </p>
  );
}
