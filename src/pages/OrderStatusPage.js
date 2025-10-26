import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Clock, ChefHat, Home, Receipt, Leaf, Download } from 'lucide-react';
import { menuData } from '../data/menuData';
import html2canvas from 'html2canvas';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/styles/OrderStatusPage.css';

const OrderStatusPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const tableNumber = searchParams.get('table');
  
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const receiptRef = useRef(null);

  useEffect(() => {
    const fetchOrderData = () => {
      try {
        const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
        const order = orders.find(o => o.razorpay_payment_id === orderId);
        
        if (order) {
          setOrderData(order);
        } else {
          setOrderData({
            razorpay_payment_id: orderId || 'MYS-' + Date.now(),
            table_number: tableNumber || '12',
            items: [
              {
                id: 'demo-1',
                name: 'Butter Chicken',
                price: 349,
                quantity: 2,
                isVeg: false
              },
              {
                id: 'demo-2',
                name: 'Paneer Tikka',
                price: 299,
                quantity: 1,
                isVeg: true
              },
              {
                id: 'demo-3',
                name: 'Chocolate Lava Cake',
                price: 179,
                quantity: 1,
                isVeg: true
              }
            ],
            subtotal: 1176,
            gst: 58.80,
            total: 1234.80,
            timestamp: new Date().toISOString(),
            status: 'preparing'
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };

    setTimeout(fetchOrderData, 1000);
  }, [orderId, tableNumber]);

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
      const shortOrderId = orderData.razorpay_payment_id.slice(-8).toUpperCase();
      link.download = `Mystery-Dine-Receipt-${shortOrderId}.png`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.dismiss(loadingToast);
      toast.success('Receipt downloaded! 📥');
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

  const shortOrderId = orderData.razorpay_payment_id.slice(-8).toUpperCase();
  const orderTime = new Date(orderData.timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const orderDate = new Date(orderData.timestamp).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="order-status-page">
      <Toaster position="top-center" />

      {/* Success Animation */}
      <div className="success-header">
        <div className="success-icon-wrapper">
          <CheckCircle className="success-icon" size={60} />
        </div>
        <h1>Order Confirmed!</h1>
        <p className="success-message">Thank you for your order</p>
      </div>

      {/* Download CTA Banner */}
      <div className="download-cta-banner">
        <div className="cta-icon">
          <Receipt size={24} />
        </div>
        <div className="cta-text">
          <h3>Save Your Receipt</h3>
          <p>Download a copy for your records</p>
        </div>
        <button 
          className="btn-download-cta"
          onClick={downloadReceipt}
          disabled={isDownloading}
        >
          <Download size={18} />
          {isDownloading ? 'Wait...' : 'Download'}
        </button>
      </div>

      {/* Receipt Content - This gets captured */}
      <div ref={receiptRef} className="receipt-container">
        
        {/* Order Info Card */}
        <div className="order-info-card">
          <div className="order-header">
            <div>
              <div className="label">Order Number</div>
              <div className="order-number">#{shortOrderId}</div>
            </div>
            <div>
              <div className="label">Table Number</div>
              <div className="table-number-badge">{orderData.table_number}</div>
            </div>
          </div>

          <div className="order-meta">
            <div className="meta-item">
              <Clock size={16} />
              <span>{orderTime} • {orderDate}</span>
            </div>
            <div className="status-badge status-preparing">
              <ChefHat size={14} />
              <span>Preparing</span>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="order-details-card">
          <h2>Order Details</h2>
          
          <div className="order-items-list">
            {orderData.items.map((item, index) => (
              <div key={index} className="order-item-row">
                <div className="item-info">
                  <div className="item-name-wrapper">
                    <span className="item-name">{item.name}</span>
                    {item.isVeg && (
                      <div className="veg-badge-tiny">
                        <Leaf size={8} />
                      </div>
                    )}
                  </div>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                </div>
                <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Bill Breakdown */}
          <div className="bill-breakdown">
            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹{orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="bill-row">
              <span>GST (5%)</span>
              <span>₹{orderData.gst.toFixed(2)}</span>
            </div>
            <div className="bill-row bill-total">
              <span>Total Paid</span>
              <span>₹{orderData.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-success-badge">
            <CheckCircle size={16} />
            <span>Payment Successful</span>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="restaurant-info-footer">
          <h3>{menuData.restaurantInfo.name}</h3>
          <p>{menuData.restaurantInfo.tagline}</p>
          <p className="contact-info">
            {menuData.restaurantInfo.phone} • {menuData.restaurantInfo.email}
          </p>
          <p className="timestamp-footer">
            Generated on {orderDate} at {orderTime}
          </p>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="instructions-card">
        <Receipt size={20} />
        <div>
          <h3>Important</h3>
          <p>Please download and save your receipt for future reference. This helps us serve you better!</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="btn btn--primary btn--full-width"
          onClick={downloadReceipt}
          disabled={isDownloading}
        >
          <Download size={18} />
          {isDownloading ? 'Downloading Receipt...' : 'Download Receipt'}
        </button>
        
        <button 
          className="btn btn--secondary btn--full-width"
          onClick={() => navigate(`/?table=${orderData.table_number}`)}
        >
          <Home size={18} />
          Order More Items
        </button>
      </div>

      {/* Footer Note */}
      <div className="footer-note">
        <p>Your food will be served shortly</p>
        <p className="estimate">Estimated time: 15-20 minutes</p>
      </div>
    </div>
  );
};

export default OrderStatusPage;
