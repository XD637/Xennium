'use client';

import React, { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers'; // Import directly from ethers
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

let ethereum;
if (typeof window !== 'undefined') {
  ethereum = window.ethereum;
}

const getEthereumContract = () => {
  if (!ethereum) {
    console.error("Ethereum object doesn't exist!");
    return null;
  }

  // Use ethers.BrowserProvider for ethers.js v6
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({
    provider,
    signer,
    transactionContract,
  });

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) throw new Error("No crypto wallet found. Please install it.");

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Connected to wallet:", accounts[0]);
        getEthereumContract();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) throw new Error("No crypto wallet found. Please install it.");

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet connected:", accounts[0]);
        getEthereumContract();
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet , currentAccount }}>
      {children}
    </TransactionContext.Provider>
  );
};
