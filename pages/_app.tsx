import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import onSiteLoad from '../helpers/onSiteLoad';
import { useEffect } from 'react';
import Script from 'next/script';
import * as gtag from '../helpers/gtag';


export default function App({ Component, pageProps }: AppProps) {
  const { asPath, events } = useRouter();

  useEffect(() => {
    onSiteLoad();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    events.on('routeChangeComplete', handleRouteChange);

    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);

  return (
    <>
      <Head>
        <title>Perry&apos;s Portfolio</title>
        <meta name="description" content="Perry's Portfolio - Front-End Developer / Design Technologist / Jack of many trades: creator of user interfaces, experiences, and web applications." key="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0 viewport-fit=cover" />
        <meta name="theme-color" content="#303030" />
        <meta name="googlebot" content="noindex" key="bot-one" />
        <meta name="robots" content="noindex" key="bot-two" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#303030" />
      </Head>
      <Script strategy='afterInteractive' async src="https://www.googletagmanager.com/gtag/js?id=G-XPVPZ8BTR9" />
      <Script id='google-analytics' strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XPVPZ8BTR9', {
            page_path: window.location.pathname,
          });`
        }}
      />
      <Header />
      <AnimatePresence mode='wait'>
        <Component {...pageProps} key={asPath} />
      </AnimatePresence>
      <Footer />
    </>
  );
}
