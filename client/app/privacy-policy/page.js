'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="relative z-10 text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
      </div>
      <div className="p-4 max-w-4xl w-full">
        <h2 className="text-xl font-bold mb-2">Introduction</h2>
        <p className="text-lg mb-4">
          Welcome to Xenium. This Privacy Policy explains how we collect, use, and disclose your personal information.
        </p>
        <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
        <p className="text-lg mb-4">
          We collect information that you provide to us directly, such as when you register an account, use our services, or contact us. This includes personal information such as your name, email address, and any other information you provide.
        </p>
        <h2 className="text-xl font-bold mb-2">Use of Information</h2>
        <p className="text-lg mb-4">
          We use the information we collect to provide and improve our services, to communicate with you, and to comply with legal obligations. 
        </p>
        <h2 className="text-xl font-bold mb-2">Sharing of Information</h2>
        <p className="text-lg mb-4">
          We may share your data with third parties for purposes such as analytics, advertising, and other services. We do not sell your personal information to third parties.
        </p>
        <h2 className="text-xl font-bold mb-2">Security</h2>
        <p className="text-lg mb-4">
          We take reasonable measures to protect your information from unauthorized access or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure.
        </p>
        <h2 className="text-xl font-bold mb-2">Changes to This Privacy Policy</h2>
        <p className="text-lg mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions about this Privacy Policy, please contact us.
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

export default PrivacyPolicy;
