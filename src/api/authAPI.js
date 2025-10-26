import { apiRequest } from './config';

export const authAPI = {
  // Admin Signup
  signup: async (data) => {
    return await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin Login
  login: async (credentials) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get Current Admin
  getMe: async () => {
    return await apiRequest('/auth/me', {
      method: 'GET',
    });
  },
};
