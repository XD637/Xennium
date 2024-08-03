'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false); // State to manage the icon change
  const [showBalance, setShowBalance] = useState(false); // State to toggle balance visibility
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Don't do anything while loading

    if (!session) {
      router.push('/login'); // Redirect to login page if not authenticated
    } else if (session?.user?.id) {
      fetchWalletInfo(session.user.id);
    }
  }, [status, session, router]);

  const fetchWalletInfo = async (userId) => {
    try {
      const res = await fetch('/api/getWalletInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Send the user ID in the request body
      });

      if (!res.ok) {
        throw new Error('Error fetching wallet info');
      }

      const data = await res.json();
      setWallet(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const copyToClipboard = (text, event) => {
    event.preventDefault(); // Prevent default action if inside a form or link
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true); // Set copied state to true

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(prevState => !prevState); // Toggle balance visibility
  };

  const downloadPrivateKey = (privateKey) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify({ privateKey })], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "privateKey.json";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-container">
          <div className="loading-animation text-xl font-bold">X</div>
          <div className="rotating-circle size-1"></div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    // No need to show any content; redirection will handle it
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="relative z-10 text-2xl font-bold text-gray-800 mb-4">WALLET</h1>
      </div>

      <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-md shadow-md mb-4 max-w-md mx-auto flex items-start space-x-2">
        <i className="bi bi-info-circle text-lg"></i>
        <p className="text-sm">
          <strong>Note:</strong> Do not share your private key with anyone. Download and save it in a safe place. It's the only way to retrieve your account if the password is forgotten.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8 lg:max-w-4xl lg:w-full lg:justify-center lg:items-stretch gap-8 w-full max-w-4xl">
        <div className="group rounded-lg border border-transparent px-5 py-4 bg-white shadow-md hover:border-gray-300 hover:bg-gray-100 transition-colors flex-1 min-w-[300px] max-w-[400px]">
          <h2 className="mb-3 text-xl font-semibold flex items-center">
            Private Key <i className="bi bi-key ml-2"></i>
          </h2>
          {wallet ? (
            <div className="flex flex-col items-start">
              <div className="flex items-center w-full mb-2">
                <p className="flex-1 text-sm text-gray-600 border p-2 rounded-md overflow-hidden text-ellipsis whitespace-nowrap">
                  {wallet.privateKey}
                </p>
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={(event) => copyToClipboard(wallet.privateKey, event)}
                    className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                    title="Copy private key"
                  >
                    <i className={copied ? 'bi bi-check2' : 'bi bi-clipboard'}></i>
                  </button>
                  <button
                    onClick={() => downloadPrivateKey(wallet.privateKey)}
                    className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                    title="Download private key"
                  >
                    <i className="bi bi-download"></i>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 bg-white shadow-md hover:border-gray-300 hover:bg-gray-100 transition-colors flex-1 min-w-[300px] max-w-[400px]">
          <h2 className="mb-3 text-xl font-semibold">Balance <i className="bi bi-wallet ml-2"></i></h2>
          <div className="flex items-center justify-between">
            {wallet ? (
              <>
                <p className="text-xl font-semibold text-gray-800 flex items-center border p-2 rounded-md">
                  {showBalance ? wallet.balance : '****'}
                  <span className="text-xs text-gray-400 ml-1">Xens</span>
                </p>
                <button
                  onClick={toggleBalanceVisibility}
                  className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                  title={showBalance ? 'Hide Balance' : 'Show Balance'}
                >
                  <i className={`bi ${showBalance ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
