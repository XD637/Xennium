"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { TransactionProvider } from "./context/TransactionContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return (
    <SessionProvider session={session}>
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </SessionProvider>
  );
}

export default MyApp;
