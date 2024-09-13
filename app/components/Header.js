// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-pink-400 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">E-Commerce Store</h1>
        </Link>
        <nav>
          <Link href="/products" className="mr-4 hover:underline">
            Products
          </Link>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
