import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'; // Using HTTP for local development

// Log the API URL for debugging
console.log('Using API URL:', API_BASE_URL);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for CORS with credentials
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Don't follow redirects automatically
  maxRedirects: 0,
  validateStatus: function (status) {
    return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
  }
});

// Add response interceptor to handle session cookies
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const api = {
  // Login with Google (existing users)
  login: (): void => {
    window.location.href = `${API_BASE_URL}/login?flow=login`;
  },

  // Fetch current user session info
  me: async (): Promise<{ authenticated: boolean; user_id?: string; profile_completed: boolean; joined_waitlist: boolean }> => {
    const response = await apiClient.get('/me', { withCredentials: true });
    return response.data;
  },

  // Logout user and clear session
  logout: async (): Promise<void> => {
    await apiClient.post('/logout', {}, { withCredentials: true });
  },

  // Complete profile with resume and details
  completeProfile: async (username: string, data: { fullName: string, additionalDetails?: string }) => {
    const response = await apiClient.post('/complete_profile', {
      username,
      ...data
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    return response.data;
  },

  // Check credentials status
  checkCredentials: async (username: string) => {
    const response = await apiClient.get(`/check_credentials/${username}`, {
      withCredentials: true
    });
    return response.data;
  },

  // Search by query
  search: async (query: string): Promise<any> => {
    const response = await apiClient.post('/search', { query });
    return response.data.results;
  },

  // Links-only search
  linksOnly: async (query: string): Promise<any> => {
    const response = await apiClient.post('/links', { query });
    return response.data.links;
  },

  // Send an email
  sendEmail: async (
    username: string,
    to: string,
    subject: string,
    body: string
  ): Promise<any> => {
    const response = await apiClient.post('/send_email', { username, to, subject, body });
    return response.data;
  },

  // Read conversation with a contact
  readWith: async (
    username: string,
    email: string
  ): Promise<any> => {
    const response = await apiClient.post('/read_with', { username, email });
    return response.data.emails;
  },

  // Fetch email from Apollo API
  getEmail: async (
    first_name: string,
    last_name: string,
    linkedin_url: string
  ): Promise<any> => {
    const response = await apiClient.post('/get_email', { first_name, last_name, linkedin_url });
    return response.data.email;
  },

  // Sign up with Google (new users)
  signUp: (username: string): void => {
    window.location.href = `${API_BASE_URL}/login?flow=signup&username=${encodeURIComponent(username)}`;
  },
}; 