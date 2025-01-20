import Head from 'next/head';
import { appConfig } from '../../app.config';

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
        <link rel="canonical" href={`${appConfig.appDomainName}/about`} />
      </Head>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">{appConfig.appName}</h3>
          <p>
            {appConfig.appName} was created to allow anybody, no matter where
            they are in the world to light a menorah at hannukah. We want to
            allow you to light candles from your phone, tablet or computer by
            providing a digital menorah.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Why I Created This App</h3>
          <p>
            As a software engineer who loves solving problems, I was on holiday
            abroad during hannukah and didn&apos;t have a menorah with me so my
            family couldn&apos;t light candles. I thought it would be great to
            have a digital menorah that we could light from our phones. I
            created this app to solve that problem and to help others who may be
            in a similar situation.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Get in touch</h3>
          <p>
            If you have any questions, feedback or suggestions, please get in
            touch by{' '}
            <a href={`mailto:${appConfig.publicEmailAddress}`}>emailing me</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
