// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// // This function is for the customer-facing menu
// export const getMenuData = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/menu/categories`);
//     if (response.data && response.data.success) {
//       return response.data.categories;
//     }
//     return [];
//   } catch (error) {
//     console.error('Error fetching menu data:', error);
//     return [];
//   }
// };

// // --- Functions for the Admin Panel ---

// export const createCategory = async (data) => {
//   // Logic to post to /api/menu/categories
// };

// export const updateCategory = async (id, data) => {
//   // Logic to put to /api/menu/categories/:id
// };

// export const deleteCategory = async (id) => {
//   // Logic to delete /api/menu/categories/:id
// };

// export const createMenuItem = async (data) => {
//   // Logic to post to /api/menu/items
// };

// export const updateMenuItem = async (id, data) => {
//   // Logic to put to /api/menu/items/:id
// };

// export const deleteMenuItem = async (id) => {
//   // Logic to delete /api/menu/items/:id
// };


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

/**
 * Creates a new category.
 * @param {object} data - The category data, e.g., { name: 'New Category', icon: 'icon-name' }.
 * @returns {object|null} The created category object or null on failure.
 */
export const createCategory = async (data) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.post(`${API_URL}/menu/categories`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data && response.data.success) {
      return response.data.category;
    }
    return null;
  } catch (error) {
    console.error('Error creating category:', error.response?.data?.message || error.message);
    throw error.response?.data || new Error('Failed to create category');
  }
};

/**
 * Updates an existing category.
 * @param {string} id - The ID of the category to update.
 * @param {object} data - The updated category data.
 * @returns {object|null} The updated category object or null on failure.
 */
export const updateCategory = async (id, data) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.put(`${API_URL}/menu/categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data && response.data.success) {
      return response.data.category;
    }
    return null;
  } catch (error) {
    console.error('Error updating category:', error.response?.data?.message || error.message);
    throw error.response?.data || new Error('Failed to update category');
  }
};

/**
 * Deletes a category.
 * @param {string} id - The ID of the category to delete.
 * @returns {boolean} True on success, false on failure.
 */
export const deleteCategory = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.delete(`${API_URL}/menu/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data && response.data.success;
  } catch (error) {
    console.error('Error deleting category:', error.response?.data?.message || error.message);
    throw error.response?.data || new Error('Failed to delete category');
  }
};

/**
 * Creates a new menu item.
 * @param {object} data - The menu item data.
 * @returns {object|null} The created menu item object or null on failure.
 */
export const createMenuItem = async (data) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.post(`${API_URL}/menu/items`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data && response.data.success) {
      return response.data.item;
    }
    return null;
  } catch (error) {
    console.error('Error creating menu item:', error.response?.data?.message || error.message);
    throw error.response?.data || new Error('Failed to create menu item');
  }
};

/**
 * Updates an existing menu item.
 * @param {string} id - The ID of the menu item to update.
 * @param {object} data - The updated menu item data.
 * @returns {object|null} The updated menu item object or null on failure.
 */
export const updateMenuItem = async (id, data) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.put(`${API_URL}/menu/items/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data && response.data.success) {
      return response.data.item;
    }
    return null;
  } catch (error) {
    console.error('Error updating menu item:', error.response?.data?.message || error.message);
    throw error.response?.data || new Error('Failed to update menu item');
  }
};

/**
 * Deletes a menu item.
 * @param {string} id - The ID of the menu item to delete.
 * @returns {boolean} True on success, false on failure.
 */
export const deleteMenuItem = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.delete(`${API_URL}/menu/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data && response.data.success;
  } catch (error) {
    console.error('Error deleting menu item:', error.response?.data?.message || error.message);
    throw error.response?.data || new Error('Failed to delete menu item');
  }
};
