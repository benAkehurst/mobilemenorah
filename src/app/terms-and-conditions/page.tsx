import JsonLd from "@/components/JsonLd";
import Prose from "@/components/Prose";
import { pageMetadata } from "@/lib/metadata";
import { pageSchema } from "@/lib/schema";
import { appConfig } from "../../../app.config";

const title = "Terms and conditions";
const description = `The terms and conditions for using ${appConfig.appName}.`;

export const metadata = pageMetadata({ title, description, path: "/terms-and-conditions" });

export default function TermsPage() {
  return (
    <Prose title="Terms and conditions">
      <JsonLd data={pageSchema({ path: "/terms-and-conditions", name: title, description })} />
      <p>
        These terms set out the rules for using {appConfig.appName} (&quot;the App&quot;),
        available at {appConfig.domainName}.
      </p>

      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using the App, you agree to these terms. If you do not agree, please do not
        use the App.
      </p>

      <h2>2. Analytics</h2>
      <h3>2.1 Google Analytics</h3>
      <p>
        If you allow cookies, we use Google Analytics to understand how the App is used, such as
        how often people visit and which pages they view. We use this to improve the App.
      </p>
      <h3>2.2 Vercel Analytics</h3>
      <p>
        We use cookieless Vercel Analytics to measure traffic and performance so we can improve the
        App.
      </p>

      <h2>3. User conduct</h2>
      <p>
        You agree not to use the App for any unlawful purpose or in any way that might harm,
        disrupt or interfere with the App or other people&apos;s use of it.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        All content in the App, including text, graphics, logos and software, belongs to{" "}
        {appConfig.companyName} or its licensors and is protected by intellectual property laws.
        You may not reproduce, distribute or create derivative works from it without our written
        permission.
      </p>

      <h2>5. Disclaimers and limitation of liability</h2>
      <h3>5.1 Disclaimers</h3>
      <p>
        The App is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
        kind. We do not guarantee that it will be uninterrupted or error-free. Dates and religious
        information are provided in good faith; please check local customs and your community for
        guidance.
      </p>
      <h3>5.2 Limitation of liability</h3>
      <p>
        To the extent permitted by law, {appConfig.companyName} is not liable for any indirect,
        incidental, special, consequential or punitive damages arising from your use of the App.
      </p>

      <h2>6. Changes to these terms</h2>
      <p>
        We may change these terms at any time by posting the new version here. Continuing to use the
        App after a change means you accept the new terms.
      </p>

      <h2>7. Contact us</h2>
      <p>
        If you have any questions about these terms,{" "}
        <a href={`mailto:${appConfig.publicEmailAddress}`}>contact us</a>.
      </p>
    </Prose>
  );
}
