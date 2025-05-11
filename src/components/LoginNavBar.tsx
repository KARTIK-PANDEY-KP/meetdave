import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { api } from '../services/api';

const LoginNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api.me().then(data => {
      if (data.authenticated && data.user_id) setUsername(data.user_id);
      else navigate('/login');
    }).catch(() => navigate('/login'));
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await api.logout();
    navigate('/');
  };

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent')}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="project dave logo" className="h-12 md:h-14" />
          <span className="font-extrabold text-transparent text-2xl md:text-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text select-none">project dave</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">{username}</button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
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
            <button onClick={handleLogout} className="w-full text-left px-6 py-3 rounded-full text-gray-700 hover:bg-gray-100">Profile</button>
            <button onClick={handleLogout} className="w-full text-left px-6 py-3 rounded-full text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LoginNavBar;