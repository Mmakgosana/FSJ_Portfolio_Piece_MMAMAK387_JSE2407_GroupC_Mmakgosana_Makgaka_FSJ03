"use client"
// components/SignInForm.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
  
    const handleSignIn = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/'); // Redirect to home page after successful sign in
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div >
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Sign In</button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    );
  }
  