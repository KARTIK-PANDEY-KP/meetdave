import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingDots, setThinkingDots] = useState('');
  
  // Animate thinking dots when loading
  useEffect(() => {
    if (!isLoading) return;
    
    const thoughts = [
      'Searching knowledge base',
      'Processing query',
      'Analyzing relevant data',
      'Gathering information',
      'Retrieving results'
    ];
    
    let dotCount = 0;
    let thoughtIndex = 0;
    
    const interval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      const dots = '.'.repeat(dotCount);
      thoughtIndex = (thoughtIndex + (dotCount === 0 ? 1 : 0)) % thoughts.length;
      setThinkingDots(`${thoughts[thoughtIndex]}${dots}`);
    }, 500);
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Set loading state
    setIsLoading(true);
    setSearchResults([]);
    
    // Simulate API call
    setTimeout(() => {
      // TODO: Replace with actual API call
      console.log('Searching for:', searchQuery);
      // Mock search results with profile info
      setSearchResults([
        { 
          id: 1, 
          name: 'Alex Johnson',
          profileImage: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=random',
          linkUrl: '/profile/1',
          linkText: 'View Profile'
        },
        { 
          id: 2, 
          name: 'Sarah Williams',
          profileImage: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=random',
          linkUrl: '/profile/2',
          linkText: 'View Profile'
        },
        { 
          id: 3, 
          name: 'Michael Chen',
          profileImage: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random',
          linkUrl: '/profile/3',
          linkText: 'View Calendar'
        },
        { 
          id: 4, 
          name: 'Emma Rodriguez',
          profileImage: 'https://ui-avatars.com/api/?name=Emma+Rodriguez&background=random',
          linkUrl: '/profile/4',
          linkText: 'Schedule Meeting'
        },
        { 
          id: 5, 
          name: 'David Kumar',
          profileImage: 'https://ui-avatars.com/api/?name=David+Kumar&background=random',
          linkUrl: '/profile/5',
          linkText: 'View Profile'
        },
        { 
          id: 6, 
          name: 'Olivia Smith',
          profileImage: 'https://ui-avatars.com/api/?name=Olivia+Smith&background=random',
          linkUrl: '/profile/6',
          linkText: 'Connect'
        },
        { 
          id: 7, 
          name: 'James Wilson',
          profileImage: 'https://ui-avatars.com/api/?name=James+Wilson&background=random',
          linkUrl: '/profile/7',
          linkText: 'View Profile'
        },
        { 
          id: 8, 
          name: 'Sophia Lee',
          profileImage: 'https://ui-avatars.com/api/?name=Sophia+Lee&background=random',
          linkUrl: '/profile/8',
          linkText: 'Message'
        }
      ]);
      setIsLoading(false);
    }, 3000); // 3 second delay to simulate API call
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-project-dave-dark-blue overflow-hidden flex flex-col">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      
      {/* Main Content with Search Bar */}
      <main className="pt-16 flex-grow">
        <div className="container mx-auto px-4 mt-8">
          <div className="max-w-3xl mx-auto">
            {/* Search Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-sm text-blue-600 font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                Your Personal People Finder
              </span>
              <div className="flex items-center justify-center mb-6">
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                  Meet Dave
                </h1>
                <img src="/logo.png" alt="Project Dave Logo" className="h-24 w-auto -ml-2" />
              </div>
              <p className="text-lg text-gray-600">
                Your AI-powered sidekick for finding the perfect connections.
              </p>
              <p className="text-lg text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                From photographers to founders, we've got you covered.
              </p>
            </div>
          
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-12">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full py-4 px-6 pl-14 bg-white rounded-full border-2 border-transparent bg-origin-border text-lg relative focus:outline-none"
                  style={{
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <SearchIcon className="h-6 w-6 text-gray-400" />
                </div>
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 py-2 px-6 bg-white rounded-full transition-colors border-2 border-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                >
                  <span className="font-medium text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                    Search
                  </span>
                </button>
              </div>
            </form>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center mt-8">
                <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                    <div className="text-gray-600">
                      {thinkingDots}
                    </div>
                  </div>
                </div>
              </div>
            )}
          
            {/* Search Results - Card Grid */}
            {!isLoading && searchResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-xl font-semibold text-project-dave-dark-blue mb-6">
                  Results ({searchResults.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchResults.map((result) => (
                    <div key={result.id} className="bg-white border-2 border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col items-center p-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                          <img 
                            src={result.profileImage} 
                            alt={`${result.name} profile`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-center text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                          {result.name}
                        </h3>
                        <a 
                          href={result.linkUrl} 
                          className="mt-3 py-2 px-4 border-2 border-transparent rounded-full text-sm font-medium transition-colors"
                          style={{
                            backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          <span className="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                            {result.linkText}
                          </span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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

export default SearchPage;
