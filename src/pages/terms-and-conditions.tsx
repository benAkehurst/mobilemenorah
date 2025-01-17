import Head from 'next/head';
import { appConfig } from '../../app.config';

const TermsAndConditions = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
        <link
          rel="canonical"
          href={`${appConfig.appDomainName}/terms-and-conditions`}
        />
      </Head>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <p className="mb-4">
          These terms and conditions outline the rules and regulations for the
          use of {appConfig.companyName}&apos;s Website.
        </p>

        <h3 className="text-xl font-bold mb-2">1. Acceptance of Terms</h3>
        <p className="mb-4">
          Introduction Welcome to {appConfig.appName} (the &quot;App&quot;).
          These Terms and Conditions (&quot;Terms&quot;) govern your use of our
          App. By accessing or using the App, you agree to be bound by these
          Terms. If you do not agree with these Terms, please do not use the
          App.
        </p>
        <h3 className="text-xl font-bold mb-2">2. Analytics</h3>
        <p className="mb-4">
          <h3 className="text-l font-bold mb-2">2.1 Google Analytics</h3>
          <p>
            We use Google Analytics to collect information about your use of the
            App. Google Analytics collects information such as how often users
            visit the App, what pages they visit, and what other sites they used
            prior to coming to the App. We use the information from Google
            Analytics to improve our App.
          </p>{' '}
          <h3 className="text-l font-bold mb-2">2.2 Vercel Analytics</h3>
          <p>
            We also use Vercel Analytics to monitor and analyze web traffic.
            This helps us understand how users interact with our App and improve
            its performance.
          </p>{' '}
        </p>
        <h3 className="text-xl font-bold mb-2">3. User Conduct</h3>
        <p className="mb-4">
          <p>
            You agree not to use the App for any unlawful purpose or in any way
            that might harm, disrupt, or otherwise interfere with the operation
            of the App or the enjoyment of any other user.
          </p>{' '}
        </p>
        <h3 className="text-xl font-bold mb-2">4. Intellectual Property</h3>
        <p className="mb-4">
          <p>
            All content on the App, including but not limited to text, audio,
            graphics, logos, and software, is the property of{' '}
            {appConfig.appName} or its licensors and is protected by
            intellectual property laws. You agree not to reproduce, distribute,
            or create derivative works from any content without our express
            written permission.
          </p>{' '}
        </p>
        <h3 className="text-xl font-bold mb-2">
          5. Disclaimers and Limitation of Liability
        </h3>
        <p className="mb-4">
          <h3 className="text-l font-bold mb-2">5.1 Disclaimers</h3>
          <p>
            The App is provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind, either express or implied. We do not
            warrant that the App will be uninterrupted or error-free.
          </p>{' '}
          <h3 className="text-l font-bold mb-2">5.2 Limitation of Liability</h3>
          <p>
            In no event shall {appConfig.appName}, its officers, directors,
            employees, or agents be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of or
            related to your use of the App.
          </p>{' '}
        </p>
        <h3 className="text-xl font-bold mb-2">6. Changes to Terms</h3>
        <p className="mb-4">
          <p>
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the new Terms on the App. Your
            continued use of the App after any such changes constitutes your
            acceptance of the new Terms.
          </p>{' '}
        </p>
        <h3 className="text-xl font-bold mb-2">7. Contact Us</h3>
        <p className="mb-4">
          <p>
            If you have any questions about these Terms, please contact us
            <a href={`mailto:${appConfig.publicEmailAddress}`}> here</a>.
          </p>
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
