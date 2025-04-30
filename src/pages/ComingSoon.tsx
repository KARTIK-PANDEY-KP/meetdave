import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Sparkles, Play } from 'lucide-react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F3] flex flex-col">
      {/* Navbar */}
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      
      {/* Main content */}
      <main className="pt-16 flex-grow bg-white">
        <div className="container mx-auto max-w-5xl py-12 px-6 flex flex-col items-center justify-center">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center w-full">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-project-dave-purple/10 text-project-dave-purple mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">You're In!</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-project-dave-dark-blue mb-6">
              Coming Soon
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Thanks for signing up! We're working hard to build an amazing experience for you. 
              The full application will be available shortly.
            </p>

            {/* Demo Video */}
            <div className="mb-10 mt-8 rounded-xl overflow-hidden shadow-xl border border-gray-200 max-w-4xl mx-auto">
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <video 
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute top-0 left-0 w-full h-full object-cover sm:object-contain"
                  poster="/logo.png"
                >
                  <source src="/demovid1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 max-w-xl mx-auto mt-8">
              <p className="text-md text-project-dave-purple">
                We'll notify you as soon as we launch!
              </p>
              
              <div className="bg-project-dave-purple/5 rounded-lg px-6 py-4 text-left w-full">
                <h3 className="font-semibold text-project-dave-dark-blue mb-2">While you wait:</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Check out the demo video above to see what's coming</li>
                  <li>Make sure your profile information is complete</li>
                  <li>Stay tuned for updates via email</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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
      </main>
    </div>
  );
};

export default ComingSoon; 