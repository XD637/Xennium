import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-zinc-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/">
            Xenium
          </Link>
        </div>
        <div>
          <Link href="/" className="text-white mr-4">Home</Link>
          <Link href="/about" className="text-white mr-4">About</Link>
          <Link href="/contact" className="text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;