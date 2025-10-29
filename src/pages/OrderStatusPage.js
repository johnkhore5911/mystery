// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { CheckCircle, Clock, ChefHat, Home, Receipt, Leaf, Download } from 'lucide-react';
// // import { menuData } from '../data/menuData';
// import html2canvas from 'html2canvas';
// import toast, { Toaster } from 'react-hot-toast';
// import '../assets/styles/OrderStatusPage.css';

// const OrderStatusPage = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get('orderId');
//   const tableNumber = searchParams.get('table');
//   const restaurantInfo = { // Add this object
//     name: 'Mystery Dine-In',
//     tagline: 'An unforgettable culinary experience.',
//     phone: '+91 98765 43210',
//     email: 'contact@mysterydine.com'
//   };
  
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isDownloading, setIsDownloading] = useState(false);
  
//   const receiptRef = useRef(null);

//   useEffect(() => {
//     const fetchOrderData = () => {
//       try {
//         const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
//         const order = orders.find(o => o.razorpay_payment_id === orderId);
        
//         if (order) {
//           setOrderData(order);
//         } else {
//           setOrderData({
//             razorpay_payment_id: orderId || 'MYS-' + Date.now(),
//             table_number: tableNumber || '12',
//             items: [
//               {
//                 id: 'demo-1',
//                 name: 'Butter Chicken',
//                 price: 349,
//                 quantity: 2,
//                 isVeg: false
//               },
//               {
//                 id: 'demo-2',
//                 name: 'Paneer Tikka',
//                 price: 299,
//                 quantity: 1,
//                 isVeg: true
//               },
//               {
//                 id: 'demo-3',
//                 name: 'Chocolate Lava Cake',
//                 price: 179,
//                 quantity: 1,
//                 isVeg: true
//               }
//             ],
//             subtotal: 1176,
//             gst: 58.80,
//             total: 1234.80,
//             timestamp: new Date().toISOString(),
//             status: 'preparing'
//           });
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching order:', error);
//         setLoading(false);
//       }
//     };

//     setTimeout(fetchOrderData, 1000);
//   }, [orderId, tableNumber]);

//   // Download Receipt Function - FIXED VERSION
//   const downloadReceipt = async () => {
//     if (!receiptRef.current) {
//       toast.error('Receipt not ready');
//       return;
//     }
    
//     setIsDownloading(true);
//     const loadingToast = toast.loading('Preparing your receipt...');

//     try {
//       // Wait a bit for any animations to complete
//       await new Promise(resolve => setTimeout(resolve, 500));

//       // Capture with better options
//       const canvas = await html2canvas(receiptRef.current, {
//         backgroundColor: '#FCFCF9',
//         scale: 2,
//         logging: false,
//         useCORS: true,
//         allowTaint: true,
//         width: receiptRef.current.scrollWidth,
//         height: receiptRef.current.scrollHeight,
//         windowWidth: receiptRef.current.scrollWidth,
//         windowHeight: receiptRef.current.scrollHeight
//       });

//       // Check if canvas is empty
//       if (canvas.width === 0 || canvas.height === 0) {
//         throw new Error('Canvas is empty');
//       }

//       const image = canvas.toDataURL('image/png', 1.0);
      
//       // Verify image is not empty
//       if (!image || image === 'data:,') {
//         throw new Error('Generated image is empty');
//       }

//       const link = document.createElement('a');
//       const shortOrderId = orderData.razorpay_payment_id.slice(-8).toUpperCase();
//       link.download = `Mystery-Dine-Receipt-${shortOrderId}.png`;
//       link.href = image;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.dismiss(loadingToast);
//       toast.success('Receipt downloaded! 📥');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Failed to download receipt. Please try again.');
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="order-status-page">
//         <div className="loading-state">
//           <div className="spinner"></div>
//           <p>Loading your order...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!orderData) {
//     return (
//       <div className="order-status-page">
//         <div className="error-state">
//           <h2>Order Not Found</h2>
//           <p>We couldn't find your order. Please contact staff.</p>
//           <button className="btn btn--primary" onClick={() => navigate('/')}>
//             Back to Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const shortOrderId = orderData.razorpay_payment_id.slice(-8).toUpperCase();
//   const orderTime = new Date(orderData.timestamp).toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit'
//   });
//   const orderDate = new Date(orderData.timestamp).toLocaleDateString('en-IN', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric'
//   });

//   return (
//     <div className="order-status-page">
//       <Toaster position="top-center" />

//       {/* Success Animation */}
//       <div className="success-header">
//         <div className="success-icon-wrapper">
//           <CheckCircle className="success-icon" size={60} />
//         </div>
//         <h1>Order Confirmed!</h1>
//         <p className="success-message">Thank you for your order</p>
//       </div>

//       {/* Download CTA Banner */}
//       <div className="download-cta-banner">
//         <div className="cta-icon">
//           <Receipt size={24} />
//         </div>
//         <div className="cta-text">
//           <h3>Save Your Receipt</h3>
//           <p>Download a copy for your records</p>
//         </div>
//         <button 
//           className="btn-download-cta"
//           onClick={downloadReceipt}
//           disabled={isDownloading}
//         >
//           <Download size={18} />
//           {isDownloading ? 'Wait...' : 'Download'}
//         </button>
//       </div>

//       {/* Receipt Content - This gets captured */}
//       <div ref={receiptRef} className="receipt-container">
        
//         {/* Order Info Card */}
//         <div className="order-info-card">
//           <div className="order-header">
//             <div>
//               <div className="label">Order Number</div>
//               <div className="order-number">#{shortOrderId}</div>
//             </div>
//             <div>
//               <div className="label">Table Number</div>
//               <div className="table-number-badge">{orderData.table_number}</div>
//             </div>
//           </div>

//           <div className="order-meta">
//             <div className="meta-item">
//               <Clock size={16} />
//               <span>{orderTime} • {orderDate}</span>
//             </div>
//             <div className="status-badge status-preparing">
//               <ChefHat size={14} />
//               <span>Preparing</span>
//             </div>
//           </div>
//         </div>

//         {/* Order Details */}
//         <div className="order-details-card">
//           <h2>Order Details</h2>
          
//           <div className="order-items-list">
//             {orderData.items.map((item, index) => (
//               <div key={index} className="order-item-row">
//                 <div className="item-info">
//                   <div className="item-name-wrapper">
//                     <span className="item-name">{item.name}</span>
//                     {item.isVeg && (
//                       <div className="veg-badge-tiny">
//                         <Leaf size={8} />
//                       </div>
//                     )}
//                   </div>
//                   <span className="item-quantity">Qty: {item.quantity}</span>
//                 </div>
//                 <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
//               </div>
//             ))}
//           </div>

//           {/* Bill Breakdown */}
//           <div className="bill-breakdown">
//             <div className="bill-row">
//               <span>Subtotal</span>
//               <span>₹{orderData.subtotal.toFixed(2)}</span>
//             </div>
//             <div className="bill-row">
//               <span>GST (5%)</span>
//               <span>₹{orderData.gst.toFixed(2)}</span>
//             </div>
//             <div className="bill-row bill-total">
//               <span>Total Paid</span>
//               <span>₹{orderData.total.toFixed(2)}</span>
//             </div>
//           </div>

//           <div className="payment-success-badge">
//             <CheckCircle size={16} />
//             <span>Payment Successful</span>
//           </div>
//         </div>

//         {/* Restaurant Info */}
//         <div className="restaurant-info-footer">
//           <h3>{restaurantInfo.name}</h3>
//           <p>{restaurantInfo.tagline}</p>
//           <p className="contact-info">
//             {restaurantInfo.phone} • {restaurantInfo.email}
//           </p>
//           <p className="timestamp-footer">
//             Generated on {orderDate} at {orderTime}
//           </p>
//         </div>
//       </div>

//       {/* Instructions Card */}
//       <div className="instructions-card">
//         <Receipt size={20} />
//         <div>
//           <h3>Important</h3>
//           <p>Please download and save your receipt for future reference. This helps us serve you better!</p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="action-buttons">
//         <button 
//           className="btn btn--primary btn--full-width"
//           onClick={downloadReceipt}
//           disabled={isDownloading}
//         >
//           <Download size={18} />
//           {isDownloading ? 'Downloading Receipt...' : 'Download Receipt'}
//         </button>
        
//         <button 
//           className="btn btn--secondary btn--full-width"
//           onClick={() => navigate(`/?table=${orderData.table_number}`)}
//         >
//           <Home size={18} />
//           Order More Items
//         </button>
//       </div>

//       {/* Footer Note */}
//       <div className="footer-note">
//         <p>Your food will be served shortly</p>
//         <p className="estimate">Estimated time: 15-20 minutes</p>
//       </div>
//     </div>
//   );
// };

// export default OrderStatusPage;


import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Clock, ChefHat, Home, Receipt, Leaf, Download } from 'lucide-react';
// import { menuData } from '../data/menuData';
import { orderAPI } from '../api/orderAPI';
import html2canvas from 'html2canvas';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/styles/OrderStatusPage.css';

const OrderStatusPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const tableNumber = searchParams.get('table');
  const restaurantInfo = { // Add this object
    name: 'Mystery Dine-In',
    tagline: 'An unforgettable culinary experience.',
    phone: '+91 98765 43210',
    email: 'contact@mysterydine.com'
  };
  
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const receiptRef = useRef(null);

useEffect(() => {
        const fetchOrderData = async () => {
            if (!orderId) {
                setLoading(false);
                toast.error("No order ID found in URL!");
                return;
            }
            try {
                // Call the API function we defined in orderAPI.js
                const response = await orderAPI.getOrderById(orderId);
                if (response.success) {
                    // Set the state with the real order from the database
                    setOrderData(response.order);
                } else {
                    toast.error(response.message || "Failed to fetch order details.");
                    // Set orderData to null to show an error message
                    setOrderData(null);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                toast.error("An error occurred while fetching your order.");
                setOrderData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId]);

  // Download Receipt Function - FIXED VERSION
  const downloadReceipt = async () => {
    if (!receiptRef.current) {
      toast.error('Receipt not ready');
      return;
    }
    
    setIsDownloading(true);
    const loadingToast = toast.loading('Preparing your receipt...');

    try {
      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture with better options
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#FCFCF9',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: receiptRef.current.scrollWidth,
        height: receiptRef.current.scrollHeight,
        windowWidth: receiptRef.current.scrollWidth,
        windowHeight: receiptRef.current.scrollHeight
      });

      // Check if canvas is empty
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas is empty');
      }

      const image = canvas.toDataURL('image/png', 1.0);
      
      // Verify image is not empty
      if (!image || image === 'data:,') {
        throw new Error('Generated image is empty');
      }

      const link = document.createElement('a');
      const shortOrderId = orderData.paymentId.slice(-8).toUpperCase();
      link.download = `Mystery-Dine-Receipt-${shortOrderId}.png`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.dismiss(loadingToast);
      toast.success('Receipt downloaded! 📥');
      // const shortOrderId = orderData.razorpay_payment_id.slice(-8).toUpperCase();
      // link.download = `Mystery-Dine-Receipt-${shortOrderId}.png`;
      // link.href = image;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // toast.dismiss(loadingToast);
      // toast.success('Receipt downloaded! 📥');
    } catch (error) {
      console.error('Download error:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to download receipt. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="order-status-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="order-status-page">
        <div className="error-state">
          <h2>Order Not Found</h2>
          <p>We couldn't find your order. Please contact staff.</p>
          <button className="btn btn--primary" onClick={() => navigate('/')}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // const shortOrderId = orderData.razorpay_payment_id.slice(-8).toUpperCase();
  // const orderTime = new Date(orderData.timestamp).toLocaleTimeString('en-IN', {
  //   hour: '2-digit',
  //   minute: '2-digit'
  // });
  // const orderDate = new Date(orderData.timestamp).toLocaleDateString('en-IN', {
  //   day: '2-digit',
  //   month: 'short',
  //   year: 'numeric'
  // });

  // CHANGE: 4. Ensure all variables below use properties from your REAL orderData object.
    const orderStatusInfo = {
        pending: { icon: <Clock size={20} />, text: 'Awaiting Confirmation', color: '#ffa500' },
        preparing: { icon: <ChefHat size={20} />, text: 'Preparing Your Meal', color: '#ff6347' },
        completed: { icon: <CheckCircle size={20} />, text: 'Order Completed', color: '#32cd32' },
        cancelled: { icon: <CheckCircle size={20} />, text: 'Order Cancelled', color: '#888' },
    };
    const statusInfo = orderStatusInfo[orderData.orderStatus] || orderStatusInfo.pending;
    const orderTime = new Date(orderData.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const orderDate = new Date(orderData.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const shortOrderId = orderData.paymentId.slice(-8).toUpperCase();

  // return (
  //   <div className="order-status-page">
  //     <Toaster position="top-center" />

  //     {/* Success Animation */}
  //     <div className="success-header">
  //       <div className="success-icon-wrapper">
  //         <CheckCircle className="success-icon" size={60} />
  //       </div>
  //       <h1>Order Confirmed!</h1>
  //       <p className="success-message">Thank you for your order</p>
  //     </div>

  //     {/* Download CTA Banner */}
  //     <div className="download-cta-banner">
  //       <div className="cta-icon">
  //         <Receipt size={24} />
  //       </div>
  //       <div className="cta-text">
  //         <h3>Save Your Receipt</h3>
  //         <p>Download a copy for your records</p>
  //       </div>
  //       <button 
  //         className="btn-download-cta"
  //         onClick={downloadReceipt}
  //         disabled={isDownloading}
  //       >
  //         <Download size={18} />
  //         {isDownloading ? 'Wait...' : 'Download'}
  //       </button>
  //     </div>

  //     {/* Receipt Content - This gets captured */}
  //     <div ref={receiptRef} className="receipt-container">
        
  //       {/* Order Info Card */}
  //       <div className="order-info-card">
  //         <div className="order-header">
  //           <div>
  //             <div className="label">Order Number</div>
  //             <div className="order-number">#{shortOrderId}</div>
  //           </div>
  //           <div>
  //             <div className="label">Table Number</div>
  //             <div className="table-number-badge">{orderData.tableNumber}</div>
  //           </div>
  //         </div>


  //       <ul className="item-list">
  //           {/* --- CORRECTION for the items list --- */}
  //           {/* The API returns a `menuItem` object inside each item. We need to access its properties. */}
  //           {orderData.items.map((item, index) => (
  //               <li key={item.menuItem._id || index} className="item">
  //                   <span className={`veg-indicator ${item.menuItem.isVeg ? 'veg' : 'non-veg'}`}>●</span>
  //                   <span className="item-name">{item.menuItem.name} (x{item.quantity})</span>
  //                   <span className="item-price">₹{item.price.toFixed(2)}</span>
  //               </li>
  //           ))}
  //       </ul>

  //         <div className="order-meta">
  //           <div className="meta-item">
  //             <Clock size={16} />
  //             <span>{orderTime} • {orderDate}</span>
  //           </div>
  //           <div className="status-badge status-preparing">
  //             <ChefHat size={14} />
  //             <span>Preparing</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Order Details */}
  //       <div className="order-details-card">
  //         <h2>Order Details</h2>
          
  //         <div className="order-items-list">
  //           {orderData.items.map((item, index) => (
  //             <div key={index} className="order-item-row">
  //               <div className="item-info">
  //                 <div className="item-name-wrapper">
  //                   <span className="item-name">{item.name}</span>
  //                   {item.isVeg && (
  //                     <div className="veg-badge-tiny">
  //                       <Leaf size={8} />
  //                     </div>
  //                   )}
  //                 </div>
  //                 <span className="item-quantity">Qty: {item.quantity}</span>
  //               </div>
  //               <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
  //             </div>
  //           ))}
  //         </div>

  //         {/* Bill Breakdown */}
  //         <div className="bill-breakdown">
  //           <div className="bill-row">
  //             <span>Subtotal</span>
  //             <span>₹{orderData.subtotal.toFixed(2)}</span>
  //           </div>
  //           <div className="bill-row">
  //             <span>GST (5%)</span>
  //             <span>₹{orderData.gst.toFixed(2)}</span>
  //           </div>
  //           <div className="bill-row bill-total">
  //             <span>Total Paid</span>
  //             <span>₹{orderData.total.toFixed(2)}</span>
  //           </div>
  //         </div>

  //         <div className="payment-success-badge">
  //           <CheckCircle size={16} />
  //           <span>Payment Successful</span>
  //         </div>
  //       </div>

  //       {/* Restaurant Info */}
  //       <div className="restaurant-info-footer">
  //         <h3>{restaurantInfo.name}</h3>
  //         <p>{restaurantInfo.tagline}</p>
  //         <p className="contact-info">
  //           {restaurantInfo.phone} • {restaurantInfo.email}
  //         </p>
  //         <p className="timestamp-footer">
  //           Generated on {orderDate} at {orderTime}
  //         </p>
  //       </div>
  //     </div>

  //     {/* Instructions Card */}
  //     <div className="instructions-card">
  //       <Receipt size={20} />
  //       <div>
  //         <h3>Important</h3>
  //         <p>Please download and save your receipt for future reference. This helps us serve you better!</p>
  //       </div>
  //     </div>

  //     {/* Action Buttons */}
  //     <div className="action-buttons">
  //       <button 
  //         className="btn btn--primary btn--full-width"
  //         onClick={downloadReceipt}
  //         disabled={isDownloading}
  //       >
  //         <Download size={18} />
  //         {isDownloading ? 'Downloading Receipt...' : 'Download Receipt'}
  //       </button>
        
  //       <button 
  //         className="btn btn--secondary btn--full-width"
  //         onClick={() => navigate(`/?table=${orderData.table_number}`)}
  //       >
  //         <Home size={18} />
  //         Order More Items
  //       </button>
  //     </div>

  //     {/* Footer Note */}
  //     <div className="footer-note">
  //       <p>Your food will be served shortly</p>
  //       <p className="estimate">Estimated time: 15-20 minutes</p>
  //     </div>
  //   </div>
  // );
    return(
           <div className="order-status-page">
            <Toaster />
            <div className="status-card" style={{ borderTopColor: statusInfo.color }}>
                <div className="status-icon" style={{ backgroundColor: statusInfo.color }}>
                    {statusInfo.icon}
                </div>
                <h2>{statusInfo.text}</h2>
                <p>Thank you for your order! We've received it and are getting it ready for you.</p>
            </div>

            <div ref={receiptRef} className="receipt-container">
                <div className="receipt-header">
                    <div className="logo-title">
                        <Leaf size={32} />
                        <h3>{restaurantInfo.name}</h3>
                    </div>
                    <div className="order-details">
                        <div className="order-number">Order #{shortOrderId}</div>
                        <div className="table-number-badge">Table {orderData.tableNumber}</div>
                    </div>
                </div>

                <ul className="item-list">
                    {/* --- CORRECTION for the items list --- */}
                    {/* The API returns a `menuItem` object inside each item. We need to access its properties. */}
                    {orderData.items.map((item, index) => (
                        <li key={item.menuItem._id || index} className="item">
                            <span className={`veg-indicator ${item.menuItem.isVeg ? 'veg' : 'non-veg'}`}>●</span>
                            <span className="item-name">{item.menuItem.name} (x{item.quantity})</span>
                            <span className="item-price">₹{item.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                <div className="cost-summary">
                    <div className="cost-item">
                        <span>Subtotal</span>
                        <span>₹{orderData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="cost-item">
                        <span>GST (5%)</span>
                        <span>₹{orderData.gst.toFixed(2)}</span>
                    </div>
                    <div className="cost-item total">
                        <span>Total Paid</span>
                        <span>₹{orderData.total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="receipt-footer">
                    <p>{restaurantInfo.tagline}</p>
                    <p>{restaurantInfo.phone} • {restaurantInfo.email}</p>
                    <p className="timestamp">Generated on {orderDate} at {orderTime}</p>
                </div>
            </div>

            <div className="actions">
                <button 
                    className="btn btn--primary" 
                    onClick={downloadReceipt} 
                    disabled={isDownloading}
                >
                    <Download size={18} /> {isDownloading ? 'Downloading...' : 'Download Receipt'}
                </button>
                <button className="btn btn--secondary" onClick={() => navigate('/')}>
                    <Home size={18} /> Back to Menu
                </button>
            </div>
        </div>
    )
};

export default OrderStatusPage;
