"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../authfunctions'; // Update the import

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Use the `logout` function from authFunctions.js
      console.log("Successfully signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-pink-400 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="mr-2 rounded-full"
          />
          <h1 className="text-2xl font-bold">Bargain Bliss</h1>
        </Link>
        <nav className="flex items-center">
          <Link href="/products" className="mr-4 hover:underline">
            Products
          </Link>
          <Link href="/" className="mr-4 hover:underline">
            Home
          </Link>
          {user ? (
            <>
              <p className="mr-4 px-2 py-1 bg-white text-pink-500 text-sm font-semibold rounded-md">
                Welcome, {user.email}!
              </p>
              <button onClick={handleLogout} className="hover:underline">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="mr-4 hover:underline">
                Sign Up
              </Link>
              <Link href="/signin" className="hover:underline">
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
