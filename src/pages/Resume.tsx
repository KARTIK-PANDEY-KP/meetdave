import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, Sparkles, Upload, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { api } from '../services/api';

const Resume = () => {
  const [formData, setFormData] = useState({
    resume: null as File | null,
    additionalDetails: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resume) {
      setError('Please upload your resume to continue');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Create FormData for multipart/form-data submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('resume_file', formData.resume);
      formDataToSubmit.append('additional_details', formData.additionalDetails);
      
      // Submit directly to the backend endpoint with hardcoded URL
      // The backend will identify the user from the session cookie that is automatically sent
      const response = await fetch('http://localhost:8080/complete_profile', {
        method: 'POST',
        body: formDataToSubmit,
        credentials: 'include', // This ensures cookies are sent with the request
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
      }
      
      // Redirect to coming soon page
      window.location.href = '/coming-soon';
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error('Profile submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      
      <div className="flex-1 container mx-auto max-w-4xl py-12 px-6 pt-24">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-project-dave-dark-blue">
              Step 1 of 2
            </span>
            <span className="text-sm font-medium text-project-dave-purple">
              50% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-project-dave-purple rounded-full transition-all duration-300 ease-in-out"
              style={{ width: '50%' }}
            ></div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <div className="space-y-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-project-dave-purple/10 text-project-dave-purple mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Resume Upload</span>
              </div>
              <h1 className="text-3xl font-bold text-project-dave-dark-blue mb-4">
                <span className="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">agent dave</span> needs your resume
              </h1>
              <p className="text-project-dave-dark-blue/80 max-w-lg mx-auto">
                Your resume helps us understand your expertise and industry focus.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <h2 className="text-2xl font-bold text-project-dave-dark-blue mb-2">Upload Your Resume <span className="text-red-500">*</span></h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {!formData.resume ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-project-dave-purple/10 rounded-full flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-project-dave-purple" />
                    </div>
                    <p className="text-project-dave-dark-blue font-medium mb-2">
                      Drag and drop your resume here
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      or click to browse (PDF, DOCX, up to 5MB)
                    </p>
                    <label className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-project-dave-dark-blue hover:bg-gray-50 cursor-pointer transition-colors">
                      <span>Browse Files</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="bg-project-dave-purple/5 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-project-dave-purple/10 rounded-lg flex items-center justify-center mr-3">
                        <Check className="h-5 w-5 text-project-dave-purple" />
                      </div>
                      <div className="text-left">
                        <p className="text-project-dave-dark-blue font-medium">{formData.resume.name}</p>
                        <p className="text-xs text-gray-500">
                          {Math.round(formData.resume.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                    <button 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details Textarea (Optional) */}
            <div className="space-y-2 mt-6">
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-project-dave-dark-blue">
                Additional Details (Optional)
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-project-dave-purple/50 focus:border-project-dave-purple"
                rows={4}
                placeholder="Share any additional information that might help us understand your goals better"
              ></textarea>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                className="flex items-center px-6 py-3 bg-project-dave-purple text-white rounded-lg hover:bg-project-dave-purple/90 transition-colors"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Finish
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-project-dave-dark-blue/60">
          Having trouble? <a href="mailto:danielwu28@g.ucla.edu" className="text-project-dave-purple hover:underline">Contact our support team</a>
        </div>
      </div>

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
              <a
                href="/about"
                className="text-gray-600 hover:text-convrt-purple transition-colors"
              >
                About Us
              </a>
              <a
                href="/"
                className="text-gray-600 hover:text-convrt-purple transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resume;