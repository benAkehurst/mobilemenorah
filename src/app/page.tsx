/* Hallmark · genre: editorial (+ atmospheric window) · macrostructure: Marquee Hero · design-system: design.md · designed-as-app · nav: N9 · footer: Ft5 */
import AdSlot from "@/components/AdSlot";
import HanukkahStatus from "@/components/HanukkahStatus";
import JsonLd from "@/components/JsonLd";
import MenorahExperience from "@/components/menorah/MenorahExperience";
import { blessings, getFaqs, homeCopy, howToSteps } from "@/lib/content";
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

const sectionHeading = "font-display text-h2 font-medium tracking-tight text-ink";

export default function Home() {
  const today = localToday();
  const upcoming = getUpcomingHanukkahs(today, 6);
  const current = upcoming[0];
  const faqs = getFaqs(current);

  return (
    <>
      <JsonLd data={homeSchema({ faqs, steps: howToSteps, modified: today })} />

      {/* The window: night band holding the headline and the menorah. */}
      <section aria-labelledby="page-title" data-band="night" className="border-b-[3px] border-brass-shade bg-night text-night-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-14 lg:pb-14 lg:pt-14">
          <div className="lg:pb-24">
            <p lang="he" dir="rtl" className="text-left text-2xl text-brass">
              חנוכה שמח
            </p>
            <h1
              id="page-title"
              className="mt-3 font-display text-display font-medium tracking-tight"
            >
              {homeCopy.heading}
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-night-muted sm:text-lg">
              {describeHanukkah(current)}
            </p>
            <div className="mt-6">
              <HanukkahStatus />
            </div>
          </div>
          <MenorahExperience />
        </div>
      </section>

      <AdSlot id="home-below-menorah" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section id="how-to-light" aria-labelledby="how-to-light-heading" className="max-w-[65ch] pt-20 sm:pt-24">
          <h2 id="how-to-light-heading" className={sectionHeading}>
            {homeCopy.howToHeading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{homeCopy.howToIntro}</p>
          <ol className="mt-8 border-b border-rule">
            {howToSteps.map((step, i) => (
              <li key={step.name} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-rule py-5">
                <span className="font-display text-3xl leading-none text-brass-deep tabular-nums" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{step.name}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="blessings" aria-labelledby="blessings-heading" className="pt-24 sm:pt-32">
          <div className="max-w-[65ch]">
            <h2 id="blessings-heading" className={sectionHeading}>
              {homeCopy.blessingsHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{homeCopy.blessingsIntro}</p>
          </div>
          <div className="mt-10 border-b border-rule">
            {blessings.map((blessing) => (
              <article key={blessing.id} className="border-t border-rule py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-semibold text-ink">{blessing.title}</h3>
                  <p className="text-sm text-brass-deep">{blessing.when}</p>
                </div>
                <div className="mt-4 grid gap-5 md:grid-cols-2 md:gap-12">
                  <p
                    lang="he"
                    dir="rtl"
                    className="text-2xl leading-[1.7] text-ink md:order-2 md:text-[1.75rem]"
                  >
                    {blessing.hebrew}
                  </p>
                  <div className="md:order-1">
                    <p className="italic leading-relaxed text-ink">{blessing.transliteration}</p>
                    <p className="mt-3 leading-relaxed text-muted">{blessing.translation}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="dates" aria-labelledby="dates-heading" className="pt-20 sm:pt-24">
          <div className="max-w-[65ch]">
            <h2 id="dates-heading" className={sectionHeading}>
              {homeCopy.datesHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{homeCopy.datesIntro}</p>
          </div>
          {/* Scrolls sideways instead of being clipped when text is enlarged
              (the page hides horizontal overflow). Focusable so keyboard users can scroll it. */}
          <div
            role="region"
            aria-label="Hanukkah dates table"
            tabIndex={0}
            className="mt-8 max-w-4xl overflow-x-auto"
          >
            {/* Below sm, each row becomes a two-column block with the Hebrew dates underneath. */}
            <table className="block w-full text-left tabular-nums sm:table">
              <caption className="sr-only">Hanukkah dates for the coming years</caption>
              <thead className="sr-only text-sm text-muted sm:not-sr-only sm:table-header-group">
                <tr className="border-b border-rule">
                  <th scope="col" className="py-3 pr-4 font-semibold">Year</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">First candle</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Ends at nightfall</th>
                  <th scope="col" className="py-3 font-semibold">Hebrew dates</th>
                </tr>
              </thead>
              <tbody className="block border-t border-rule sm:table-row-group sm:border-t-0">
                {upcoming.map((h, i) => (
                  <tr
                    key={h.year}
                    className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 border-b border-rule py-4 align-top sm:table-row sm:py-0"
                  >
                    <th scope="row" className="font-display text-xl font-medium text-ink sm:table-cell sm:py-4 sm:pr-4">
                      <span className="flex items-center gap-2">
                        {i === 0 && <span className="h-2 w-2 rounded-full bg-brass" aria-hidden="true" />}
                        {h.year}
                        {i === 0 && <span className="sr-only"> (next)</span>}
                      </span>
                    </th>
                    <td className="text-ink sm:table-cell sm:py-4 sm:pr-4">
                      <span className="whitespace-nowrap">{formatShortDate(h.firstCandle)}</span>
                      <span className="block text-sm text-muted sm:hidden">
                        ends at nightfall {formatShortDate(h.endDate)}
                      </span>
                    </td>
                    <td className="hidden whitespace-nowrap text-ink sm:table-cell sm:py-4 sm:pr-4">
                      {formatShortDate(h.endDate)}
                    </td>
                    <td className="col-start-2 mt-2 text-sm text-muted sm:mt-0 sm:table-cell sm:py-4">
                      <span className="block">
                        {h.hebrewStartEn} – {h.hebrewEndEn}
                      </span>
                      <span className="block text-left text-base" lang="he" dir="rtl">
                        {h.hebrewStart} – {h.hebrewEnd}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="max-w-[65ch] pt-24 sm:pt-32">
          <h2 id="faq-heading" className={sectionHeading}>
            {homeCopy.faqHeading}
          </h2>
          <div className="mt-8 border-b border-rule">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-t border-rule py-6">
                <h3 className="font-display text-xl font-medium text-ink">{faq.question}</h3>
                <p className="mt-2 leading-relaxed text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
