import Head from 'next/head';
import { appConfig } from '../../../app.config';
import Link from 'next/link';

const Cookies = () => {
  return (
    <>
      <Head>
        <title>Cookies</title>
        <link
          rel="canonical"
          href={`${appConfig.appDomainName}/info/cookies`}
        />
      </Head>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
        <p className="text-sm mb-4 md:mb-0">
          We use cookies on our site for the following purposes:
          <br />
          <br />
          <strong>Vercel Analytics:</strong> These cookies help us understand
          how you use our website by collecting information on the pages you
          visit and the time you spend on them. This data is used to improve
          your browsing experience and optimize our site&apos;s performance.
          <br />
          <br />
          <strong>Google Analytics:</strong> These cookies track your
          interactions with our site to help us analyze site traffic and user
          behavior. This information is used to understand where our audience is
          coming from and how we can better serve you.
          <br />
          <br />
          We keep these cookies for a maximum of 13 months. By accepting, you
          consent to the use of these cookies as described in our{' '}
          <Link
            href="/privacy-policy"
            className="underline text-blue-400 hover:text-blue-600"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default Cookies;
