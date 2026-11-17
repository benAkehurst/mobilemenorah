import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Prose from "@/components/Prose";
import { pageMetadata } from "@/lib/metadata";
import { pageSchema } from "@/lib/schema";
import { appConfig } from "../../../../app.config";

const title = "Cookie policy";
const description = `${appConfig.appName} doesn't use cookies. Visits are measured with cookieless Vercel Analytics.`;

export const metadata = pageMetadata({ title, description, path: "/info/cookies" });

export default function CookiesPage() {
  return (
    <Prose title="Cookie policy">
      <JsonLd data={pageSchema({ path: "/info/cookies", name: title, description })} />
      <h2>We don&apos;t use cookies</h2>
      <p>
        {appConfig.appName} doesn&apos;t set any cookies and doesn&apos;t store anything on your
        device to track you, so there&apos;s no cookie banner.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Vercel Analytics to count visits and page views. It works without cookies and
        without identifying you.
      </p>

      <p>
        See our <Link href="/privacy-policy">privacy policy</Link> for more details.
      </p>
    </Prose>
  );
}
