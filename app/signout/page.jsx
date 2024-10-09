import { useState } from 'react';
import { auth, signOut } from '../firebase'; // Ensure correct path

export default function SignOutForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth); // Pass the auth instance here
      console.log("Successfully signed out!");
    } catch (err) {
      console.error("Sign out failed:", err);
      setError("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Sign Out</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${
          loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {loading ? 'Signing out...' : 'Sign Out'}
      </button>
    </div>
  );
}
