'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{4,30}$/;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [usernameValid, setUsernameValid] = useState(null);
  const [usernameExists, setUsernameExists] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUsername('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!usernameValid || usernameExists) {
      setError('Please fix the errors before submitting.');
      return;
    }

    if (!agree) {
      setError('You must agree to the privacy policy and terms and conditions.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();

      if (res.status === 200) {
        router.push('/confirm-email');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const validateUsername = async (username) => {
    if (username.length < 4 || username.length > 30) {
      setUsernameValid(false);
      setUsernameMessage('Username must be 4-30 characters long.');
      return;
    }
    if (username.startsWith('.') || username.endsWith('.')) {
      setUsernameValid(false);
      setUsernameMessage('Username cannot start or end with a period.');
      return;
    }
    if (username.includes('..')) {
      setUsernameValid(false);
      setUsernameMessage('Username cannot contain consecutive periods.');
      return;
    }

    setUsernameValid(true);
    setUsernameMessage('Checking availability...');

    try {
      const res = await fetch(`/api/check-username?username=${username}`);
      const data = await res.json();

      if (data.exists) {
        setUsernameExists(true);
        setUsernameValid(false);
        setUsernameMessage('Username already exists.');
      } else {
        setUsernameExists(false);
        setUsernameValid(true);
        setUsernameMessage('Username is available.');
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameMessage('Error checking username.');
    }
  };

  useEffect(() => {
    if (username) {
      validateUsername(username);
    } else {
      setUsernameMessage('');
      setUsernameValid(null);
      setUsernameExists(false);
    }
  }, [username]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
              />
              {username && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm">
                  {usernameValid ? (
                    usernameExists ? (
                      <i className="bi bi-x-circle text-red-500"></i>
                    ) : (
                      <i className="bi bi-check-circle text-green-500"></i>
                    )
                  ) : (
                    <i className="bi bi-x-circle text-red-500"></i>
                  )}
                </span>
              )}
            </div>
            <p className={`mt-2 text-sm ${usernameValid ? 'text-green-600' : 'text-red-600'}`}>
              {usernameMessage}
            </p>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={agree}
              onChange={() => setAgree(!agree)}
              required
              className="h-4 w-4 text-black accent-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I'm above 18 years old. I agree to the{' '}
              <a href="/privacy-policy" className="font-medium text-black underline hover:text-gray-800">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms-and-conditions" className="font-medium text-black underline hover:text-gray-800">
                Terms and Conditions
              </a>.
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={!usernameValid || usernameExists || !agree}
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-black hover:text-gray-800 font-medium underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
