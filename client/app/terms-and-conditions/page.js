'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';
import Link from 'next/link';

const TermsAndConditions = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="relative z-10 text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h1>
      </div>
      <div className="p-4 max-w-4xl w-full">
        <h2 className="text-xl font-bold mb-2">Introduction</h2>
        <p className="text-lg mb-4">
          Welcome to Xenium! These Terms and Conditions outline the rules and regulations for using our website and services. By accessing or using Xenium, you agree to be bound by these terms.
        </p>

        <h2 className="text-xl font-bold mb-2">1. Age Requirement</h2>
        <p className="text-lg mb-4">
          You must be at least 18 years old to use our services. If you are under 18, you are not permitted to use our site or services. By using our site, you represent and warrant that you are 18 years of age or older.
        </p>

        <h2 className="text-xl font-bold mb-2">2. User Accounts</h2>
        <p className="text-lg mb-4">
          You are responsible for maintaining the confidentiality of your account information, including your password. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to protect your account information.
        </p>

        <h2 className="text-xl font-bold mb-2">3. Financial Transactions</h2>
        <p className="text-lg mb-4">
          All transactions conducted through our site are subject to applicable laws and regulations. By using our services, you agree to comply with all relevant financial regulations and to ensure that you are legally permitted to engage in financial transactions.
        </p>

        <h2 className="text-xl font-bold mb-2">4. Privacy Policy</h2>
        <p className="text-lg mb-4">
          We respect your privacy and are committed to protecting your personal information. Please review our <Link href="/privacy-policy" className="text-black underline">Privacy Policy</Link> to understand how we collect, use, and share your data.
        </p>

        <h2 className="text-xl font-bold mb-2">5. Limitation of Liability</h2>
        <p className="text-lg mb-4">
          To the fullest extent permitted by law, Xenium shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or related to your use of our site or services.
        </p>

        <h2 className="text-xl font-bold mb-2">6. Changes to Terms</h2>
        <p className="text-lg mb-4">
          We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and your continued use of the site constitutes your acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-bold mb-2">7. Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@example.com" className="text-black underline">support@example.com</a>.
        </p>

        <div className="mt-6 text-center">
          <Link href="/register" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;
