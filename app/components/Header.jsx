import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component for optimization

export default function Header() {
  return (
    <header className="bg-pink-400 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center">
          {/* Logo */}
          <Image 
            src="/logo.png" // Adjust this to the correct path of your logo
            alt=" Logo"
            width={40} // Set the desired width
            height={40} // Set the desired height
            className="mr-2"
          />
          {/* Title */}
          <h1 className="text-2xl font-bold">Bargain Bliss</h1>
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
