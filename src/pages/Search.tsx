import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Set loading state
    setIsLoading(true);
    setSearchResults([]);
    
    try {
      const response = await fetch('http://localhost:5001/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `dave_links_only_2024 ${searchQuery}`
        }),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      
      // Transform the links into the format expected by the UI
      const transformedResults = data.links.map((link: string, index: number) => {
        // Extract username from various social media URLs
        let name = '';
        let platform = '';
        
        if (link.includes('twitter.com')) {
          name = link.split('twitter.com/')[1]?.split('/')[0] || link;
          platform = 'Twitter';
        } else if (link.includes('instagram.com')) {
          name = link.split('instagram.com/')[1]?.split('/')[0] || link;
          platform = 'Instagram';
        } else if (link.includes('linkedin.com/in')) {
          name = link.split('linkedin.com/in/')[1]?.split('/')[0] || link;
          platform = 'LinkedIn';
        } else {
          name = link.split('/').pop() || 'Link';
          platform = 'Link';
        }

        // Clean up the username
        name = name.replace(/[0-9]+$/, ''); // Remove trailing numbers
        name = name.replace(/-/g, ' '); // Replace dashes with spaces
        name = name.split('?')[0]; // Remove query parameters
        
        // Capitalize first letter of each word
        name = name.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');

        return {
          id: index + 1,
          name,
          platform,
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          linkUrl: link,
          linkText: `View on ${platform}`
        };
      });

      setSearchResults(transformedResults);
    } catch (error) {
      console.error('Search error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Simplified Navbar - Only Logo and Name */}
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
        </div>
      </nav>
      
      {/* Main Content with Search Bar */}
      <div className="container mx-auto pt-32 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium font-inter tracking-wide">
                Your Personal People Finder
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                Meet Dave
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your AI-powered sidekick for finding the perfect connections. 
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-medium">
                From photographers to founders, we've got you covered.
              </span>
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
                  search
                </span>
              </button>
            </div>
          </form>
          
          {/* Thinking Animation */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 mb-4">
                  {/* Animated circles */}
                  <div className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                  <div className="absolute w-12 h-12 top-2 left-2 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
                  <div className="absolute w-8 h-8 top-4 left-4 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" style={{ animationDuration: '2s' }}></div>
                </div>
                <div className="font-medium text-gray-700 text-center">
                  {thinkingDots}
                </div>
              </div>
            </div>
          )}
          
          {/* Search Results - Card Grid */}
          {!isLoading && searchResults.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Results ({searchResults.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((result) => (
                  <div key={result.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center p-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <img 
                            src={result.profileImage} 
                            alt={`${result.name} profile`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {result.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {result.platform}
                        </p>
                      </div>
                      <a 
                        href={result.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="mt-2 py-2 px-4 border-2 border-transparent rounded-full text-sm font-medium transition-colors hover:opacity-90"
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
    </div>
  );
};

export default SearchPage;
