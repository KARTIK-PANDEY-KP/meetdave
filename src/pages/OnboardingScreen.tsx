import React from 'react';
import OnboardingComponent from '@/components/OnboardingComponent';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OnboardingScreen = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      
      <main className="pt-16">
        <OnboardingComponent />
      </main>

      <footer className="bg-white py-8 border-t border-gray-100 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="project dave logo" 
                className="h-12 md:h-14"
              />
              <div className="mb-0">
                <h3 className="font-extrabold text-transparent text-2xl md:text-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text tracking-tight leading-tight select-none mb-1">project dave</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {new Date().getFullYear()} project dave. All rights reserved.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-8">
              <Link
                to="/about"
                className="text-gray-600 hover:text-convrt-purple transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/"
                className="text-gray-600 hover:text-convrt-purple transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingScreen;