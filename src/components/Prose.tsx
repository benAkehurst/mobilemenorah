import type { ReactNode } from "react";

/** Simple text-page layout used by About, Privacy, Terms and Cookies. */
export default function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 text-slate-700 [&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">{title}</h1>
      {children}
    </article>
  );
}
