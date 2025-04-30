import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      
      {/* Main Content */}
      <main className="pt-16 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-sm text-blue-600 font-medium mb-3">
                  Our Story
                </span>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-normal overflow-visible">
                  <span
                    className="inline-block overflow-visible pb-1
                              text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                              bg-clip-text"
                  >
                    Origins of Project Dave
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 mb-6 mx-auto max-w-2xl">
                  How we're building the future of connection and discovery
                </p>
              </div>
            {/* Story Section */}
            <div
              className="prose prose-lg max-w-none mb-16
                         mx-auto text-center
                         prose-headings:text-center prose-p:text-center"
            >
              <p>
                Project Dave began with a simple idea: making meaningful connections more easier. 
                In a world where connections matter more than ever, we set out to build a platform that combines 
                powerful AI with human-centered design.
              </p>
              <br></br>
              <p>
                Project Dave was built in just 36 hours during LAHacks 2025 with Yang Gao and Alvin Tan, where we competed for Linkd, Fetch AI, and DAIN challenges. 
                Our hard work paid off as we earned us third in the DAIN Butterfly AI challenge and an honorable mention from Fetch AI. 
                We even had the opportunity to discuss our project with Simplify founder Michael Yan, who was very interested and curious of 
                what we made.
              </p>
              <br></br>
              <p>
                Project Dave bridges this gap by combining powerful AI with human-centered design. Our platform 
                understands not just what you're looking for, but the context and nuance behind your search. 
                Whether you're seeking a photographer with a specific aesthetic, a mentor in your industry, 
                or a collaborator with complementary skills, Dave helps you find exactly who you need.
              </p>
            </div>
            
            {/* Team Section */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Team Member 1 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <img 
                        src="/about/kartik.png" 
                        alt="Team member" 
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                      />
                      <h3 className="font-bold text-xl text-project-dave-dark-blue mb-1">Kartik Pandey</h3>
                      <p className="text-gray-600">Co-Founder</p>
                    </div>
                    <div className="flex justify-center gap-4 mb-4">
                      <a href="https://www.linkedin.com/in/kartik-pandey-kp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-project-dave-purple" aria-label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm15.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.36-1.56 2.8-1.56 3 0 3.56 1.97 3.56 4.53v4.8z"/>
                        </svg>
                      </a>
                      <a href="https://github.com/KARTIK-PANDEY-KP" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-project-dave-purple">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.309 3.438 9.8 8.207 11.382.6.109.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.107-.776.418-1.305.762-1.605-2.665-.3-5.469-1.332-5.469-5.901 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.12-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.604-5.479 5.901.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a href="mailto:kartikpandeykapie@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-project-dave-purple">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Team Member 2 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <img 
                        src="/about/daniel.jpg" 
                        alt="Team member" 
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                      />
                      <h3 className="font-bold text-xl text-project-dave-dark-blue mb-1">Daniel Wu</h3>
                      <p className="text-gray-600">Co-Founder</p>
                    </div>
                    <div className="flex justify-center gap-4 mb-4">
                      <a href="https://www.linkedin.com/in/danielwu06" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-project-dave-purple" aria-label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm15.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.36-1.56 2.8-1.56 3 0 3.56 1.97 3.56 4.53v4.8z"/>
                        </svg>
                      </a>
                      <a href="https://x.com/danielwu28" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-project-dave-purple" aria-label="X">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a href="https://github.com/dwu006" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-project-dave-purple">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.309 3.438 9.8 8.207 11.382.6.109.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.107-.776.418-1.305.762-1.605-2.665-.3-5.469-1.332-5.469-5.901 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.12-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.604-5.479 5.901.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a href="mailto:kartikpandeykapie@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-project-dave-purple">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Join Us Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-project-dave-dark-blue">Join Us on Our Journey</h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                We're just getting started, and we'd love for you to be part of our story. 
                Whether you're looking to find connections or be found, Project Dave is built for you.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
      
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
    </div>
  );
};

export default About;