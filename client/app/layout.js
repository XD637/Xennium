import { Inter } from "next/font/google";
import "../app/globals.css";
import Head from "next/head";
import Navbar from "../app/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HOME",
  description: "CryptoX",
  icons: {
    icon: ["/favicon.ico"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon[0]} type="image/ico" />
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
