import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Replace with your faucet contract address and ABI
const FAUCET_CONTRACT_ADDRESS = '0xd74B1b037f8655Ea5D026eC5345a66a311dADbF5';
const FAUCET_ABI = [
  // ABI for claimTokens function
  "function claimTokens() public",
];

const App = () => {
  const [provider, setProvider] = useState(null);
  const [faucetContract, setFaucetContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = ethersProvider.getSigner();
        setProvider(ethersProvider);

        const contract = new ethers.Contract(FAUCET_CONTRACT_ADDRESS, FAUCET_ABI, signer);
        setFaucetContract(contract);

        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (err) {
        console.error(err);
        setError('Failed to connect wallet');
      }
    } else {
      setError('Please install MetaMask');
    }
  };

  const claimTokens = async () => {
    if (!faucetContract) {
      setError('Contract not loaded');
      return;
    }

    setLoading(true);
    try {
      const tx = await faucetContract.claimTokens();
      await tx.wait();
      alert('Tokens claimed successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to claim tokens');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Xennium Token Faucet</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={claimTokens} disabled={loading}>
        {loading ? 'Claiming...' : 'Claim Tokens'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
