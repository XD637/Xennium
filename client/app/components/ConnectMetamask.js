'use client';

import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const ConnectMetamask = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  return (
    <div>
      {!currentAccount ? (
        <button
          onClick={connectWallet}
        >
          <p className="m-0 max-w-[30ch] text-sm opacity-50 text-balance">
            Connect to Metamask.
          </p>
        </button>
      ) : (
        <p>Connected</p>
      )}
    </div>
  );
};

export default ConnectMetamask;
