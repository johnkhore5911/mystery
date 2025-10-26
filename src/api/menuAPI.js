import { apiRequest } from './config';

export const menuAPI = {
  // PUBLIC ROUTES

  // Get all categories with items
  getAllCategories: async () => {
    return await apiRequest('/menu/categories', {
      method: 'GET',
    });
  },

  // Get all menu items
  getAllMenuItems: async () => {
    return await apiRequest('/menu/items', {
      method: 'GET',
    });
  },

  // Get single menu item
  getMenuItem: async (id) => {
    return await apiRequest(`/menu/items/${id}`, {
      method: 'GET',
    });
  },

  // ADMIN PROTECTED ROUTES

  // Create category
  createCategory: async (data) => {
    return await apiRequest('/menu/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update category
  updateCategory: async (id, data) => {
    return await apiRequest(`/menu/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete category
  deleteCategory: async (id) => {
    return await apiRequest(`/menu/categories/${id}`, {
      method: 'DELETE',
    });
  },

  // Create menu item
  createMenuItem: async (data) => {
    return await apiRequest('/menu/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update menu item
  updateMenuItem: async (id, data) => {
    return await apiRequest(`/menu/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete menu item
  deleteMenuItem: async (id) => {
    return await apiRequest(`/menu/items/${id}`, {
      method: 'DELETE',
    });
  },
};
