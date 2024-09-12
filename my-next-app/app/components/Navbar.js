// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Store Logo */}
        <Link href="/" className="flex items-center text-white text-xl font-bold">
            <img src="/logo.png" alt="Store Logo" className="h-8 mr-2" />
            <span>Store Name</span>
        </Link>

        {/* Navigation Links */}
        <div>
          <Link href="/" className="text-white hover:text-gray-300 mx-4">
            Home
          </Link>
          <Link href="/products" className="text-white hover:text-gray-300">Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
