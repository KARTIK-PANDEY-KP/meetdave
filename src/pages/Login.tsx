import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { api } from '../services/api';

const Login = () => {
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get('error');
    if (err === 'email_already_registered') {
      setUrlError('This email is already registered. Please log in.');
    }
  }, [location.search]);

  const handleSignUp = () => {
    if (!fullName) {
      setError('Please enter your full name');
      return;
    }
    api.signUp(fullName);
  };

  const handleLogin = () => {
    api.login();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      <div className="flex-1 container mx-auto max-w-4xl py-12 px-6 pt-36">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <div className="flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-project-dave-purple/10 text-project-dave-purple mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-2v-2a6 6 0 10-12 0v2a2 2 0 002 2h8a2 2 0 002-2z" /></svg>
              <span className="text-sm font-medium">Login Now</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-project-dave-dark-blue mb-4">
                <span className="lowercase">
                  <span className="text-black">try </span>
                  <span className="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">dave search</span>
                </span>
              </h1>
              <p className="text-project-dave-dark-blue/80 max-w-lg mx-auto">
                Enter your name and connect with your Google account.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              {urlError && (
                <div className="mb-2 text-red-600 text-sm">
                  {urlError}
                </div>
              )}
              <div className="w-full max-w-sm">
                <label htmlFor="fullName" className="block text-sm font-medium text-project-dave-dark-blue mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-project-dave-purple/50 focus:border-project-dave-purple"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <button
                onClick={handleSignUp}
                disabled={!fullName || loading}
                className="flex items-center justify-center gap-3 w-full max-w-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 shadow-sm transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 13.61a7.05 7.05 0 010-4.22V6.55H2.18a11.98 11.98 0 000 10.9l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 4.77c1.62 0 3.08.56 4.23 1.65l3.17-3.17C17.46 1.64 14.97.5 12 .5 7.7.5 3.99 3.47 2.18 6.55l3.66 2.84C6.71 7.7 9.14 4.77 12 4.77z" />
                  <path fill="none" d="M0 0h24v24H0z" />
                </svg>
                Sign up with Google
              </button>
              <div className="flex items-center my-2 w-full max-w-sm">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-2 text-gray-500">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="flex items-center justify-center gap-3 w-full max-w-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 shadow-sm transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 13.61a7.05 7.05 0 010-4.22V6.55H2.18a11.98 11.98 0 000 10.9l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 4.77c1.62 0 3.08.56 4.23 1.65l3.17-3.17C17.46 1.64 14.97.5 12 .5 7.7.5 3.99 3.47 2.18 6.55l3.66 2.84C6.71 7.7 9.14 4.77 12 4.77z" />
                  <path fill="none" d="M0 0h24v24H0z" />
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-8 border-t border-gray-100 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="project dave logo" className="h-12 md:h-14" />
              <div>
                <h3 className="font-extrabold text-transparent text-2xl md:text-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text tracking-tight leading-tight select-none mb-1">
                  project dave
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {new Date().getFullYear()} project dave. All rights reserved.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-8">
              <a href="/about" className="text-gray-600 hover:text-convrt-purple transition-colors">
                About Us
              </a>
              <a href="/" className="text-gray-600 hover:text-convrt-purple transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;