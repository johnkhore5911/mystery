import { apiRequest } from './config';

export const analyticsAPI = {
  // Get dashboard stats
  getDashboardStats: async () => {
    return await apiRequest('/analytics/dashboard', {
      method: 'GET',
    });
  },

  // Get revenue data
  getRevenueData: async (days = 30) => {
    return await apiRequest(`/analytics/revenue?days=${days}`, {
      method: 'GET',
    });
  },

  // Get popular items
  getPopularItems: async (limit = 10) => {
    return await apiRequest(`/analytics/popular-items?limit=${limit}`, {
      method: 'GET',
    });
  },
};
