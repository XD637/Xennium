'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import { TransactionContext } from '../context/TransactionContext';
import { useSession } from 'next-auth/react';

const ConnectMetamask = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(status === 'authenticated');
  }, [status]);

  const handleConnect = async () => {
    if (isAuthenticated) {
      try {
        await connectWallet();
        console.log('Current Account:', currentAccount); // Log the currentAccount value

        if (currentAccount) {
          // Call the API to save the user's address
          const response = await fetch('/api/saveUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session.user.id, // Include userId
              address: currentAccount,
            }),
          });

          const result = await response.json();
          console.log('API response:', result); // Log the API response
        } else {
          console.error('Current account is not populated.');
        }
      } catch (error) {
        console.error('Error during wallet connection:', error);
      }
    } else {
      // Redirect to login page if not authenticated
      router.push('/login');
    }
  };

  return (
    <div>
      {!currentAccount ? (
        <button onClick={handleConnect}>
          <p className="m-0 max-w-[30ch] text-sm opacity-50 text-balance">
            Connect to Metamask.
          </p>
        </button>
      ) : (
        <p className="m-0 max-w-[30ch] text-sm opacity-50 text-balance overflow-hidden text-ellipsis">
          Wallet Connected: {currentAccount}
        </p>
      )}
    </div>
  );
};

export default ConnectMetamask;
