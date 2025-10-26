import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, ChefHat, X, Leaf } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../assets/styles/AdminOrdersPage.css';
import AdminNavbar from '../../components/AdminNavbar';
import { orderAPI } from '../../api/orderAPI';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // ✅ ADD THIS LINE - Missing state!

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Auto-refresh
    return () => clearInterval(interval);
  }, [filter]); // Now 'filter' is properly defined

  const fetchOrders = async () => {
    try {
      const filters = filter !== 'all' ? { status: filter } : {};
      const response = await orderAPI.getAllOrders(filters);
      setOrders(response.orders);
    } catch (error) {
      toast.error('Failed to load orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (orderId) => {
    try {
      await orderAPI.updateOrderStatus(orderId, 'completed');
      toast.success('Order marked as served!');
      fetchOrders(); // Refresh list
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order._id !== orderId);
    setOrders(updatedOrders);
    toast.success('Order removed');
  };

  const getTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const filteredOrders = orders
    .filter(order => {
      if (filter === 'all') return true;
      return order.orderStatus === filter; // Backend uses 'orderStatus'
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const pendingCount = orders.filter(o => o.orderStatus === 'pending').length;
  const completedCount = orders.filter(o => o.orderStatus === 'completed').length;

  return (
    <>
      <AdminNavbar />
      <Toaster position="top-center" />
      
      <div className="admin-orders-container">
        <div className="orders-header">
          <div className="header-content">
            <ChefHat className="header-icon" />
            <div>
              <h1>Orders Dashboard</h1>
              <p>Real-time order management</p>
            </div>
          </div>

          {/* Filter buttons */}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              <Clock size={18} />
              Pending ({pendingCount})
            </button>
            <button
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              <CheckCircle size={18} />
              Completed ({completedCount})
            </button>
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Orders ({orders.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <ChefHat size={64} />
            <h2>No {filter !== 'all' ? filter : ''} orders</h2>
            <p>New orders will appear here in real-time</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className={`order-card ${order.orderStatus === 'completed' ? 'completed' : ''}`}
              >
                <div className="order-card-header">
                  <div className="order-info">
                    <h3>Table #{order.tableNumber}</h3>
                    <span className="order-time">
                      {getTimeAgo(order.createdAt)}
                    </span>
                  </div>
                  <span className={`status-badge ${order.orderStatus}`}>
                    {order.orderStatus === 'pending' ? (
                      <>
                        <Clock size={14} />
                        Preparing
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} />
                        Served
                      </>
                    )}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <div className="item-details">
                        <span className="item-name">
                          {item.isVeg && <Leaf className="veg-icon" size={14} />}
                          {item.name}
                        </span>
                        <span className="item-quantity">× {item.quantity}</span>
                      </div>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total</span>
                    <strong>₹{order.total}</strong>
                  </div>

                  <div className="order-actions">
                    {order.orderStatus === 'pending' && (
                      <button
                        className="btn-complete"
                        onClick={() => markAsCompleted(order._id)}
                      >
                        <CheckCircle size={16} />
                        Mark as Served
                      </button>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => deleteOrder(order._id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrdersPage;
