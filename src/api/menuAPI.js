import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// This function is for the customer-facing menu
export const getMenuData = async () => {
  try {
    const response = await axios.get(`${API_URL}/menu/categories`);
    if (response.data && response.data.success) {
      return response.data.categories;
    }
    return [];
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return [];
  }
};

// --- Functions for the Admin Panel ---

export const createCategory = async (data) => {
  // Logic to post to /api/menu/categories
};

export const updateCategory = async (id, data) => {
  // Logic to put to /api/menu/categories/:id
};

export const deleteCategory = async (id) => {
  // Logic to delete /api/menu/categories/:id
};

export const createMenuItem = async (data) => {
  // Logic to post to /api/menu/items
};

export const updateMenuItem = async (id, data) => {
  // Logic to put to /api/menu/items/:id
};

export const deleteMenuItem = async (id) => {
  // Logic to delete /api/menu/items/:id
};
