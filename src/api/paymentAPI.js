import { apiRequest } from './config';

export const paymentAPI = {
  // Create Razorpay order
  createRazorpayOrder: async (data) => {
    return await apiRequest('/payment/create-order', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    return await apiRequest('/payment/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};
