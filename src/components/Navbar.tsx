import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { api } from '../services/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [joined, setJoined] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    api.me()
      .then(data => {
        setAuth(data.authenticated);
        setJoined(data.joined_waitlist);
      })
      .catch(() => {
        setAuth(false);
        setJoined(false);
      });
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="project dave logo" 
              className="h-12 md:h-14"
            />
            <span className="font-extrabold text-transparent text-2xl md:text-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text tracking-tight leading-tight select-none">project dave</span>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to={!auth ? '/onboarding' : joined ? '/coming-soon' : '/resume'} className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 text-white shadow-lg hover:shadow-xl bg-blue-500">
            Join Waitlist
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-project-dave-dark-blue" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
          <div className="flex flex-col space-y-4">
            <Link 
              to={!auth ? '/onboarding' : joined ? '/coming-soon' : '/resume'} 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 text-white shadow-lg hover:shadow-xl bg-blue-500 w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
