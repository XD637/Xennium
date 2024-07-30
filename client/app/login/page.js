'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js app directory
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });

    if (result?.error) {
      setError(result.error);
    } else {
      console.log("Login successful, redirecting...");
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', {
      callbackUrl: '/',
    });

    if (result?.error) {
      if (result.error === 'OAuthAccountNotLinked') {
        setError('The email is not linked to an existing account. Please register first.');
      } else {
        setError(result.error);
      }
    } else {
      console.log("Google login successful, redirecting...");
      router.push('/');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Login <i className="bi bi-person-circle"></i></h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Password"
            />
            <p className="mt-2 text-sm text-gray-600">
              <a href="/forgot-password" className="font-medium text-black underline hover:text-gray-800">
                Forgot Password?
              </a>
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Login
            </button>
          </div>
        </form>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-6 text-center">
          <p className="text-gray-600">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
          >
            <i className="bi bi-google"></i> Sign in with Google
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-black underline hover:text-gray-800">
              Register
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
