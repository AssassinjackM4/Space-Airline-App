// API Configuration - Dynamic based on environment
const getApiUrl = () => {
  // Use Vite environment variables
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (apiUrl) {
    return apiUrl;
  }

  // Fallback based on current URL in production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080';
    }
    
    if (hostname.includes('vercel.app')) {
      // Will be set via environment variable in Vercel
      return process.env.REACT_APP_API_URL || 'https://space-airline-app.onrender.com';
    }
    
    if (hostname.includes('onrender.com')) {
      return 'https://space-airline-app.onrender.com';
    }
  }

  // Default fallback
  return 'https://space-airline-app.onrender.com';
};

export const API_URL = getApiUrl();

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_URL}/airline/api/auth/login`,
    SIGNUP: `${API_URL}/airline/api/auth/signup`,
    PROFILE: (userId) => `${API_URL}/airline/api/auth/profile/${userId}`,
    UPDATE_PROFILE: (userId) => `${API_URL}/airline/api/auth/profile/${userId}`,
  },

  // Flight endpoints
  FLIGHTS: {
    ALL: `${API_URL}/api/flights/public/all`,
    CREATE: `${API_URL}/api/flights/admin/create`,
    DELETE: (flightId) => `${API_URL}/api/flights/admin/${flightId}`,
  },

  // Booking endpoints
  BOOKINGS: {
    USER: (userId) => `${API_URL}/api/bookings/user/${userId}`,
    BOOK: `${API_URL}/api/bookings/book`,
    CANCEL: (bookingId) => `${API_URL}/api/bookings/${bookingId}/cancel`,
  },

  // Boarding Pass endpoints
  BOARDING_PASSES: {
    USER: (userId) => `${API_URL}/api/boarding-passes/user/${userId}`,
  },
};

export default API_ENDPOINTS;
