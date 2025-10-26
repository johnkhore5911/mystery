// // API Configuration - Change base URL here for all endpoints
// const config = {
//   // Development URL (local backend)
//   baseURL: process.env.REACT_APP_API_URL || 'http://192.168.18.15:5000/api',
  
//   // Production URL (when you deploy)
//   // baseURL: 'https://your-backend-url.com/api',
  
//   // Request timeout
//   timeout: 10000,
  
//   // Razorpay configuration
//   razorpay: {
//     keyId: process.env.REACT_APP_RAZORPAY_KEY_ID || 'your_razorpay_key_id'
//   }
// };

// // Helper function to get authorization header
// export const getAuthHeader = () => {
//   const token = localStorage.getItem('adminToken');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // API request helper with error handling
// export const apiRequest = async (endpoint, options = {}) => {
//   const url = `${config.baseURL}${endpoint}`;
  
//   const defaultHeaders = {
//     'Content-Type': 'application/json',
//     ...getAuthHeader(),
//   };

//   const config = {
//     ...options,
//     headers: {
//       ...defaultHeaders,
//       ...options.headers,
//     },
//   };

//   try {
//     const response = await fetch(url, config);
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'API request failed');
//     }

//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export default config;


// API Configuration - Change base URL here for all endpoints
const config = {
  // Development URL (local backend)
  baseURL: process.env.REACT_APP_API_URL || 'http://192.168.18.15:5000/api',
  
  // Production URL (when you deploy)
  // baseURL: 'https://your-backend-url.com/api',
  
  // Request timeout
  timeout: 10000,
  
  // Razorpay configuration
  razorpay: {
    keyId: process.env.REACT_APP_RAZORPAY_KEY_ID || 'your_razorpay_key_id'
  }
};

// Helper function to get authorization header
export const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API request helper with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${config.baseURL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  };

  // ✅ FIXED: Renamed 'config' to 'fetchConfig'
  const fetchConfig = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchConfig);  // ✅ Use fetchConfig here
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default config;
