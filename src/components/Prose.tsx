/* Hallmark · genre: editorial · macrostructure: Long Document · design-system: design.md · designed-as-app */
import type { ReactNode } from "react";

/** Long Document layout used by About, Privacy, Terms and Cookies. */
export default function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <article className="max-w-[65ch] pt-14 leading-relaxed text-muted sm:pt-20 [&_code]:text-ink [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-h2 [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mb-1 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mb-2 [&_p]:mb-4 [&_strong]:text-ink [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
        <h1 className="mb-8 font-display text-[clamp(2.25rem,3vw+1rem,3.25rem)] font-medium leading-[1.1] tracking-tight text-ink">
          {title}
        </h1>
        {children}
      </article>
    </div>
  );
}
