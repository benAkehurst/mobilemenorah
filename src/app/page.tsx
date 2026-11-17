import AdSlot from "@/components/AdSlot";
import HanukkahStatus from "@/components/HanukkahStatus";
import JsonLd from "@/components/JsonLd";
import MenorahExperience from "@/components/menorah/MenorahExperience";
import { blessings, getFaqs, howToSteps } from "@/lib/content";
import {
  describeHanukkah,
  formatShortDate,
  getUpcomingHanukkahs,
  localToday,
} from "@/lib/hanukkah";
import { homeSchema } from "@/lib/schema";

// Re-render a few times a day so dates and "next Hanukkah" stay current
// without needing a redeploy.
export const revalidate = 21600;

export default function Home() {
  const today = localToday();
  const upcoming = getUpcomingHanukkahs(today, 6);
  const current = upcoming[0];
  const faqs = getFaqs(current);

  return (
    <>
      <JsonLd data={homeSchema({ faqs, steps: howToSteps, modified: today })} />

      <div className="mx-auto max-w-3xl px-4 pt-8 text-center sm:pt-12">
        <p className="mb-2 text-lg text-slate-600" lang="he" dir="rtl">
          חנוכה שמח
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Light a virtual Hanukkah menorah
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
          {describeHanukkah(current)} Light the candles below on your phone, tablet or
          computer – no download needed.
        </p>
        <div className="mt-4">
          <HanukkahStatus />
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-3xl px-4">
        <MenorahExperience />
      </div>

      <AdSlot id="home-below-menorah" />

      <article className="mx-auto mt-16 max-w-3xl space-y-16 px-4">
        <section id="how-to-light" aria-labelledby="how-to-light-heading">
          <h2 id="how-to-light-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How to light the menorah
          </h2>
          <p className="mt-3 text-slate-700">
            On each night of Hanukkah, light one more candle than the night before, plus the
            shamash. Here&apos;s how, step by step.
          </p>
          <ol className="mt-6 space-y-4">
            {howToSteps.map((step, i) => (
              <li key={step.name} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 font-semibold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.name}</h3>
                  <p className="mt-1 text-slate-700">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="blessings" aria-labelledby="blessings-heading">
          <h2 id="blessings-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Hanukkah blessings
          </h2>
          <p className="mt-3 text-slate-700">
            Say these blessings after lighting the shamash and before lighting the candles.
          </p>
          <div className="mt-6 space-y-4">
            {blessings.map((blessing) => (
              <section key={blessing.id} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">{blessing.title}</h3>
                  <span className="text-sm font-medium text-blue-800">{blessing.when}</span>
                </div>
                <p className="mt-3 text-xl leading-relaxed text-slate-900" lang="he" dir="rtl">
                  {blessing.hebrew}
                </p>
                <p className="mt-3 italic text-slate-700">{blessing.transliteration}</p>
                <p className="mt-2 text-slate-600">{blessing.translation}</p>
              </section>
            ))}
          </div>
        </section>

        <section id="dates" aria-labelledby="dates-heading">
          <h2 id="dates-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Hanukkah dates
          </h2>
          <p className="mt-3 text-slate-700">
            Hanukkah starts on 25 Kislev in the Hebrew calendar, so its Gregorian date changes
            every year. Each night begins at sundown.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm sm:text-base">
              <caption className="sr-only">Hanukkah dates for the coming years</caption>
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Year</th>
                  <th scope="col" className="px-4 py-3 font-semibold">First candle (evening)</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Ends (nightfall)</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Hebrew dates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {upcoming.map((h) => (
                  <tr key={h.year}>
                    <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                      {h.year}
                    </th>
                    <td className="px-4 py-3">{formatShortDate(h.firstCandle)}</td>
                    <td className="px-4 py-3">{formatShortDate(h.endDate)}</td>
                    <td className="px-4 py-3">
                      <span className="block">
                        {h.hebrewStartEn} – {h.hebrewEndEn}
                      </span>
                      <span className="block text-slate-500" lang="he" dir="rtl">
                        {h.hebrewStart} – {h.hebrewEnd}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Hanukkah questions and answers
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">
                  <h3 className="inline">{faq.question}</h3>
                  <span className="float-right text-blue-700 group-open:rotate-45 motion-safe:transition-transform" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
