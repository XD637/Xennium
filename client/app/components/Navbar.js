import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-zinc-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
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
  );
};

export default Navbar;
