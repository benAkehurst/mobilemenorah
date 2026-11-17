import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Prose from "@/components/Prose";
import { pageMetadata } from "@/lib/metadata";
import { pageSchema } from "@/lib/schema";
import { appConfig } from "../../../app.config";

const title = "Privacy policy";
const description = `How ${appConfig.appName} handles your data: no accounts, cookieless Vercel Analytics, and Google Analytics only with your consent.`;

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
      <ul>
        <li>
          <strong>Vercel Analytics</strong> counts page views and visits without using cookies or
          identifying you.
        </li>
        <li>
          <strong>Google Analytics</strong> is only loaded if you choose &quot;Allow cookies&quot;.
          It helps us understand how the site is used, such as which pages are visited and roughly
          where visitors are from.
        </li>
      </ul>

      <h2>Cookies and local storage</h2>
      <p>
        Your cookie choice is saved in your browser&apos;s local storage so we don&apos;t ask again
        on every visit. You can change it at any time with the &quot;Cookie settings&quot; link in
        the footer. <Link href="/info/cookies">Read more about cookies on this site.</Link>
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
      <p className="text-sm text-slate-500">Last updated: 17 November 2026</p>
    </Prose>
  );
}
