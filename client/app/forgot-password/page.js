// app/forgot-password/page.js

const ForgotPassword = () => {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Forgot Password</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Send Password Reset Link
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <a
                href="/login"
                className="font-medium text-black underline hover:text-gray-800"
              >
                Login
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Don't have an account?{' '}
              <a
                href="/register"
                className="font-medium text-black underline hover:text-gray-800"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  };
  
  export default ForgotPassword;
