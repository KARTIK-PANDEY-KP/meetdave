import React from 'react';
import { Link } from 'react-router-dom';

const SearchAnnouncement: React.FC = () => {
  return (
    <section className="pt-10 pb-0 px-6 animate-reveal">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="mb-auto" style={{ opacity: 1, transform: 'none' }}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide w-5 h-5 mr-2 animate-pulse">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-sm font-medium font-inter tracking-wide">Discover More with Dave Search</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
            Find Anyone You Need with<br />
            <span className="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">Dave Search</span>
          </h2>
          <p className="text-lg text-gray-500 mb-6">Powerful search capabilities to help you find exactly who you're looking for</p>
          <Link 
            to="/search" 
            className="inline-flex items-center text-lg px-8 py-4 rounded-full font-medium transition-all duration-200 transform hover:scale-105 text-white shadow-lg hover:shadow-xl" 
            style={{ backgroundImage: 'linear-gradient(to right, rgb(59, 130, 246), rgb(139, 92, 246), rgb(236, 72, 153))' }}
          >
            Try Dave Search
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 w-5 h-5 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SearchAnnouncement;
