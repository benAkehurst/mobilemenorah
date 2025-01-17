import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import { appConfig } from '../../app.config';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{appConfig.appName}</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕎</text></svg>"
        />
        <meta name="description" content={appConfig.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        <meta property="twitter:image" content="/logo.webp"></meta>
        <meta property="twitter:card" content="/logo.webp"></meta>
        <meta property="twitter:title" content={appConfig.appName}></meta>
        <meta
          property="twitter:description"
          content={appConfig.appDescription}
        ></meta>
        <meta property="og:image" content="/logo.webp"></meta>
        <meta property="og:site_name" content={appConfig.domainName}></meta>
        <meta property="og:title" content={appConfig.appName}></meta>
        <meta property="og:description" content={appConfig.appDescription} />
        <meta property="og:url" content={appConfig.appDomainName}></meta>
      </Head>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}
      />
      <main className={`${lato.variable} ${lato.variable}`}>
        <Header />
        <Component {...pageProps} />
        <Analytics />
        <Footer />
      </main>
    </>
  );
}
