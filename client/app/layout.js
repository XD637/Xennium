"use client";
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../app/globals.css';
import { Inter } from "next/font/google";
import Head from "next/head";
import Script from 'next/script';
import Navbar from "./components/Navbar";
import { TransactionProvider } from "./context/TransactionContext"; 
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>HOME</title>
        <meta name="description" content="CryptoX" />
        <link rel="icon" href="/favicon.ico" type="image/ico" />
      </Head>
      <body className={inter.className}>
        <SessionProvider>
          <TransactionProvider>
            <Navbar />
            {children}
          </TransactionProvider>
        </SessionProvider>
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
