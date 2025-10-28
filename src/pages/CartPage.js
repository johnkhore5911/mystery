import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, CreditCard, Leaf, Receipt, TrendingUp } from 'lucide-react';
import { useCart } from '../hooks/useCart';
// import { menuData } from '../data/menuData';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/styles/CartPage.css';
import { paymentAPI } from '../api/paymentAPI';
import { orderAPI } from '../api/orderAPI';

const CartPage = () => {
  const navigate = useNavigate();
  const restaurantName = 'Mystery Dine-In';
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get('table') || 'Unknown';
  
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const gst = subtotal * 0.05; // 5% GST
  const total = subtotal + gst;

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create Razorpay order from backend
      const orderResponse = await paymentAPI.createRazorpayOrder({
        amount: total,
        customerEmail: 'guest@mysterydine.com',
        tableNumber: tableNumber
      });

      // Step 2: Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: orderResponse.key,
          amount: orderResponse.order.amount,
          currency: orderResponse.order.currency,
          order_id: orderResponse.order.id,
          name: restaurantName,
          description: `Table ${tableNumber} - Order Payment`,
          handler: async function (response) {
            try {
              // Step 3: Verify payment
              await paymentAPI.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });

              // Step 4: Create order in database
              const orderData = {
                tableNumber: tableNumber,
                customerEmail: 'guest@mysterydine.com',
                items: cart.map(item => ({
                  menuItem: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  isVeg: item.isVeg
                })),
                subtotal: subtotal,
                gst: gst,
                total: total,
                paymentId: response.razorpay_payment_id
              };

              const createdOrder = await orderAPI.createOrder(orderData);

              clearCart();
              toast.success('Payment Successful! 🎉');
              
              setTimeout(() => {
                navigate(`/order-status?orderId=${createdOrder.order._id}&table=${tableNumber}`);
              }, 1500);
            } catch (error) {
              toast.error('Order creation failed');
              console.error(error);
            }
          },
          prefill: {
            name: 'Guest',
            email: 'guest@mysterydine.com',
            contact: '9999999999'
          },
          theme: {
            color: '#218D8D'
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
              toast.error('Payment cancelled');
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        setIsProcessing(false);
      };
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <Toaster position="top-center" />
        <div className="cart-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1>Your Cart</h1>
          <ShoppingBag size={24} />
        </div>

        <div className="empty-cart">
          <ShoppingBag size={64} />
          <h2>Your cart is empty</h2>
          <p>Add some delicious items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Your Cart</h1>
        <div className="cart-badge">{cart.length}</div>
      </div>

      {/* Cart Content */}
      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <h3>{item.name}</h3>
                  {item.isVeg && (
                    <div className="veg-badge-small">
                      <Leaf size={10} />
                    </div>
                  )}
                </div>
                <p className="cart-item-price">₹{item.price}</p>
                
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <p className="item-total">₹{item.price * item.quantity}</p>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✨ OPTIMIZED Bill Summary */}
        <div className="bill-summary">
          <div className="summary-header">
            <Receipt size={20} />
            <h2>Bill Summary</h2>
          </div>

          <div className="summary-content">
            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="bill-row">
              <span className="tax-label">
                GST (5%)
                <span className="tax-badge">incl.</span>
              </span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            
            {/* ✅ Highlighted Total - Psychological Pricing */}
            <div className="bill-total">
              <span>Total Amount</span>
              <div className="total-price">
                <span className="currency">₹</span>
                <span className="amount">{Math.floor(total)}</span>
                <span className="decimal">.{(total % 1).toFixed(2).split('.')[1]}</span>
              </div>
            </div>
          </div>

          {/* ✅ Urgency + Clear CTA */}
          <button
            className="checkout-btn"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="spinner-small"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Proceed to Payment
              </>
            )}
          </button>

          <p className="payment-note">
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
