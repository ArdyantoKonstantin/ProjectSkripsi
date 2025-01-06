// pages/login.js
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/functions/firebase.js';
import router from 'next/router';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (errorMessage) {
      setError("Either email and password are incorrect");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign in to Your Account
        </h2>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="mt-4 w-full rounded-lg bg-purple-500 py-2 text-white transition-transform duration-200 hover:bg-purple-600 active:scale-95"
        >
          Sign In
        </button>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <button onClick={() => router.push('/signup')} className="text-purple-500 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
