import api from './api';

/**
 * Auth Service
 * Handles authentication and user login
 */

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.log('Login error details:', error);
      
      if (!error.response) {
        throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:5000');
      }
      
      const message = error.response?.data?.error || error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;
