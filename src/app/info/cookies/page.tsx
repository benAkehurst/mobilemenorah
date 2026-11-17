import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Prose from "@/components/Prose";
import { CookieSettingsButton } from "@/components/consent/ConsentProvider";
import { pageMetadata } from "@/lib/metadata";
import { pageSchema } from "@/lib/schema";
import { appConfig } from "../../../../app.config";

const title = "Cookie policy";
const description = `Which cookies ${appConfig.appName} uses and how to change your choice.`;

export const metadata = pageMetadata({ title, description, path: "/info/cookies" });

export default function CookiesPage() {
  return (
    <Prose title="Cookie policy">
      <JsonLd data={pageSchema({ path: "/info/cookies", name: title, description })} />
      <h2>Google Analytics (optional)</h2>
      <p>
        If you choose &quot;Allow cookies&quot;, Google Analytics sets cookies (named{" "}
        <code>_ga</code> and <code>_ga_*</code>) to measure how the site is used, such as which
        pages are visited and where visitors come from. These cookies can last up to two years. If
        you decline, Google Analytics is not loaded.
      </p>

      <h2>Vercel Analytics (no cookies)</h2>
      <p>
        Vercel Analytics counts visits and page views without cookies and without identifying you.
      </p>

      <h2>Your cookie choice</h2>
      <p>
        We store your choice in your browser&apos;s local storage (<code>cookie_consent</code>) so
        we don&apos;t ask on every visit.
      </p>
      <p>
        <CookieSettingsButton className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700" />
      </p>
      <p>
        See our <Link href="/privacy-policy">privacy policy</Link> for more details.
      </p>
    </Prose>
  );
}
