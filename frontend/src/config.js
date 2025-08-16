// Backend API configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ai-summarizer-091u.onrender.com'
  : 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  upload: `${API_BASE_URL}/api/upload`,
  summarize: `${API_BASE_URL}/api/summarize`,
  email: `${API_BASE_URL}/api/email`,
  health: `${API_BASE_URL}/api/health`,
  test: `${API_BASE_URL}/api/test`
};
