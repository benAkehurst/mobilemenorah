import Head from "next/head";
import Link from "next/link";
import React from "react";
import { appConfig } from "../../app.config";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <link
          rel="canonical"
          href={`${appConfig.appDomainName}/privacy-policy`}
        />
      </Head>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4">
          This Privacy Policy applies to the website and all products and
          services offered by {appConfig.companyName}.
        </p>

        <h3 className="text-xl font-bold mb-2">Information We Collect</h3>
        <p className="mb-4">
          We do not collect any personal information from visitors unless they
          voluntarily submit it via email or other means. We may collect
          non-personal identification information about users whenever they
          interact with our website. This information may include the browser
          name, the type of computer, and technical information about users
          means of connection to our website, such as the operating system and
          the Internet service providers utilized and other similar information.
        </p>

        <h3 className="text-xl font-bold mb-2">
          How We Use Collected Information
        </h3>
        <p className="mb-4">
          We use Vercel Analytics & Google Analytics to collect non-personal
          information about visitors to our website, such as the number of
          visits, pages viewed, and other similar metrics. This information
          helps us analyze trends, administer the site, track user movements
          around the site, and gather demographic information.
        </p>

        <h3 className="text-xl font-bold mb-2">Do We Use Cookies?</h3>
        <p className="mb-4">
          We do use cookies on our website. However, third-party services via
          Vercel Analytics and Google Analytics and they may use cookies to
          collect information about visitors interactions with the site.
          <Link href="/info/cookies">
            Read more about cookies on our site here
          </Link>
        </p>

        <h3 className="text-xl font-bold mb-2">
          Changes to This Privacy Policy
        </h3>
        <p className="mb-4">
          {appConfig.companyName} has the discretion to update this privacy
          policy at any time. When we do, we will revise the updated date at the
          bottom of this page. We encourage users to frequently check this page
          for any changes to stay informed about how we are helping to protect
          the personal information we collect. You acknowledge and agree that it
          is your responsibility to review this privacy policy periodically and
          become aware of modifications.
        </p>

        <h3 className="text-xl font-bold mb-2">
          Your Acceptance of These Terms
        </h3>
        <p className="mb-4">
          By using this website, you signify your acceptance of this policy. If
          you do not agree to this policy, please do not use our website. Your
          continued use of the website following the posting of changes to this
          policy will be deemed your acceptance of those changes.
        </p>

        <h3 className="text-xl font-bold mb-2">Contacting Us</h3>
        <p>
          If you have any questions about this Privacy Policy, the practices of
          this site, or your dealings with this site, please{" "}
          <a
            href={`mailto:${appConfig.publicEmailAddress} subject=Mobile Menorah Privacy Policy`}
          >
            contact us
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
