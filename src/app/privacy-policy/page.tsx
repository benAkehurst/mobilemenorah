import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Prose from "@/components/Prose";
import { pageMetadata } from "@/lib/metadata";
import { pageSchema } from "@/lib/schema";
import { appConfig } from "../../../app.config";

const title = "Privacy policy";
const description = `How ${appConfig.appName} handles your data: no accounts, no cookies, and cookieless Vercel Analytics.`;

export const metadata = pageMetadata({ title, description, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <Prose title="Privacy policy">
      <JsonLd data={pageSchema({ path: "/privacy-policy", name: title, description })} />
      <p>
        This privacy policy applies to {appConfig.domainName} and all services offered by{" "}
        {appConfig.companyName}.
      </p>

      <h2>Information we collect</h2>
      <p>
        There are no accounts and we don&apos;t ask for personal information. If you email us, we
        receive your email address and message and only use them to reply.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Vercel Analytics to count page views and visits, such as which pages are viewed and
        which country visitors are in. It doesn&apos;t use cookies and doesn&apos;t identify you.
      </p>

      <h2>Cookies</h2>
      <p>
        We don&apos;t use cookies or store anything on your device to track you. If you choose a
        Light or Dark theme, that preference is kept in your browser&apos;s local storage and never
        sent to us.{" "}
        <Link href="/info/cookies">Read our cookie policy.</Link>
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date below shows when it last changed.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about this policy,{" "}
        <a href={`mailto:${appConfig.publicEmailAddress}`}>contact us</a>.
      </p>
      <p className="text-sm text-muted">Last updated: 17 November 2026</p>
    </Prose>
  );
}
