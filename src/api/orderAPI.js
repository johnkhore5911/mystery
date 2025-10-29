// import { apiRequest } from './config';

// export const orderAPI = {
//   // Create order after payment
//   createOrder: async (orderData) => {
//     return await apiRequest('/orders', {
//       method: 'POST',
//       body: JSON.stringify(orderData),
//     });
//   },

//   // Get order by ID
//   getOrder: async (orderId) => {
//     return await apiRequest(`/orders/${orderId}`, {
//       method: 'GET',
//     });
//   },

//   // ADMIN PROTECTED ROUTES

//   // Get all orders (with filters)
//   getAllOrders: async (filters = {}) => {
//     const queryParams = new URLSearchParams(filters).toString();
//     const endpoint = queryParams ? `/orders?${queryParams}` : '/orders';
    
//     return await apiRequest(endpoint, {
//       method: 'GET',
//     });
//   },

//   // Update order status
//   updateOrderStatus: async (orderId, status) => {
//     return await apiRequest(`/orders/${orderId}/status`, {
//       method: 'PATCH',
//       body: JSON.stringify({ orderStatus: status }),
//     });
//   },
// };

// src/api/orderAPI.js

import { apiRequest } from './config';

export const orderAPI = {
  /**
   * Create a new order after a successful payment.
   */
  createOrder: async (orderData) => {
    return await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  /**
   * Get a single order by its unique ID.
   * This is the function we will use on the OrderStatusPage.
   */
  getOrderById: async (orderId) => {
    return await apiRequest(`/orders/${orderId}`, {
      method: 'GET',
    });
  },

  // --- ADMIN PROTECTED ROUTES ---

  /**
   * Get all orders, with optional filters.
   */
  getAllOrders: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/orders?${queryParams}` : '/orders';
    return await apiRequest(endpoint, {
      method: 'GET',
    });
  },

  /**
   * Update the status of an order.
   */
  updateOrderStatus: async (orderId, status) => {
    return await apiRequest(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ orderStatus: status }),
    });
  },
};
