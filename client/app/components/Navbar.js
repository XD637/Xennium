import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="bg-zinc-950 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
              <i className="bi bi-list text-white"></i>
            </button>
            <Link href="/">Xenium</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-white hover:translate-y-0.5 transition-transform">Home</Link>
            <Link href="/about" className="text-white hover:translate-y-0.5 transition-transform">About</Link>
            <Link href="/contact" className="text-white hover:translate-y-0.5 transition-transform">Contact</Link>
            {session ? (
              <button 
                onClick={() => signOut()} 
                className="text-white hover:translate-y-0.25 transition-transform"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="text-white hover:translate-y-0.5 transition-transform">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-zinc-950 shadow-lg z-40">
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl">&times;</button>
          </div>
          <div className="p-4">
            <ul>
              <li className="mb-3 border-b border-gray-700">
                <Link href="/profile" className="text-lg text-white" onClick={handleSidebarClose}>Profile</Link>
              </li>
              <li className="mb-3 border-b border-gray-700">
                <Link href="/dashboard" className="text-lg text-white" onClick={handleSidebarClose}>Dashboard</Link>
              </li>
              <li className="mb-3 border-b border-gray-700">
                <Link href="/privacy-policy" className="text-lg text-white" onClick={handleSidebarClose}>Privacy Policy</Link>
              </li>
              <li className="border-b border-gray-700">
                <Link href="/terms-and-conditions" className="text-lg text-white" onClick={handleSidebarClose}>Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
