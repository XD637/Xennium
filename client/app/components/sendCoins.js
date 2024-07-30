"use client";

import { useState, useEffect } from 'react';

const SendCoins = () => {
  const [formData, setFormData] = useState({
    fromUserId: '',
    toUserId: '',
    amount: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        setRecaptchaLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.onload = () => setRecaptchaLoaded(true);
      script.onerror = () => setResponseMessage('Failed to load reCAPTCHA.');
      document.head.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(''); // Clear previous response message

    if (!recaptchaLoaded) {
      setResponseMessage('reCAPTCHA is not loaded.');
      return;
    }

    try {
      if (!window.grecaptcha) {
        setResponseMessage('reCAPTCHA is not available.');
        return;
      }

      const token = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch('/api/send-coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage('Transaction successful.');
        setFormData({ fromUserId: '', toUserId: '', amount: '' }); // Clear form
      } else {
        setResponseMessage(data.message || 'Failed to process transaction.');
      }
    } catch (error) {
      setResponseMessage('Failed to process transaction.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Send Xenium</h1>
        {responseMessage && (
          <p className={`mb-4 text-center ${responseMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {responseMessage}
          </p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fromUserId" className="block text-sm font-medium text-gray-700">
              From User ID
            </label>
            <input
              type="text"
              id="fromUserId"
              value={formData.fromUserId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Sender's User ID"
            />
          </div>
          <div>
            <label htmlFor="toUserId" className="block text-sm font-medium text-gray-700">
              To User ID
            </label>
            <input
              type="text"
              id="toUserId"
              value={formData.toUserId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Recipient's User ID"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Amount to send"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Send Coins
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SendCoins;
