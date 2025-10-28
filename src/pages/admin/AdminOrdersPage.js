// import React, { useState, useEffect } from 'react';
// import { Clock, CheckCircle, ChefHat, X, Leaf } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import '../../assets/styles/AdminOrdersPage.css';
// import AdminNavbar from '../../components/AdminNavbar';
// import { orderAPI } from '../../api/orderAPI';

// const AdminOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('pending'); // ✅ ADD THIS LINE - Missing state!

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 10000); // Auto-refresh
//     return () => clearInterval(interval);
//   }, [filter]); // Now 'filter' is properly defined

//   const fetchOrders = async () => {
//     try {
//       const filters = filter !== 'all' ? { status: filter } : {};
//       const response = await orderAPI.getAllOrders(filters);
//       setOrders(response.orders);
//     } catch (error) {
//       toast.error('Failed to load orders');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsCompleted = async (orderId) => {
//     try {
//       await orderAPI.updateOrderStatus(orderId, 'completed');
//       toast.success('Order marked as served!');
//       fetchOrders(); // Refresh list
//     } catch (error) {
//       toast.error('Failed to update order');
//     }
//   };

//   const deleteOrder = (orderId) => {
//     const updatedOrders = orders.filter(order => order._id !== orderId);
//     setOrders(updatedOrders);
//     toast.success('Order removed');
//   };

//   const getTimeAgo = (timestamp) => {
//     const minutes = Math.floor((Date.now() - new Date(timestamp)) / 60000);
//     if (minutes < 1) return 'Just now';
//     if (minutes === 1) return '1 min ago';
//     if (minutes < 60) return `${minutes} mins ago`;
//     const hours = Math.floor(minutes / 60);
//     if (hours === 1) return '1 hour ago';
//     return `${hours} hours ago`;
//   };

//   const filteredOrders = orders
//     .filter(order => {
//       if (filter === 'all') return true;
//       return order.orderStatus === filter; // Backend uses 'orderStatus'
//     })
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   const pendingCount = orders.filter(o => o.orderStatus === 'pending').length;
//   const completedCount = orders.filter(o => o.orderStatus === 'completed').length;

//   return (
//     <>
//       <AdminNavbar />
//       <Toaster position="top-center" />
      
//       <div className="admin-orders-container">
//         <div className="orders-header">
//           <div className="header-content">
//             <ChefHat className="header-icon" />
//             <div>
//               <h1>Orders Dashboard</h1>
//               <p>Real-time order management</p>
//             </div>
//           </div>

//           {/* Filter buttons */}
//           <div className="filter-tabs">
//             <button
//               className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
//               onClick={() => setFilter('pending')}
//             >
//               <Clock size={18} />
//               Pending ({pendingCount})
//             </button>
//             <button
//               className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
//               onClick={() => setFilter('completed')}
//             >
//               <CheckCircle size={18} />
//               Completed ({completedCount})
//             </button>
//             <button
//               className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
//               onClick={() => setFilter('all')}
//             >
//               All Orders ({orders.length})
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="loading-state">
//             <div className="spinner"></div>
//             <p>Loading orders...</p>
//           </div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="empty-state">
//             <ChefHat size={64} />
//             <h2>No {filter !== 'all' ? filter : ''} orders</h2>
//             <p>New orders will appear here in real-time</p>
//           </div>
//         ) : (
//           <div className="orders-grid">
//             {filteredOrders.map((order) => (
//               <div
//                 key={order._id}
//                 className={`order-card ${order.orderStatus === 'completed' ? 'completed' : ''}`}
//               >
//                 <div className="order-card-header">
//                   <div className="order-info">
//                     <h3>Table #{order.tableNumber}</h3>
//                     <span className="order-time">
//                       {getTimeAgo(order.createdAt)}
//                     </span>
//                   </div>
//                   <span className={`status-badge ${order.orderStatus}`}>
//                     {order.orderStatus === 'pending' ? (
//                       <>
//                         <Clock size={14} />
//                         Preparing
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle size={14} />
//                         Served
//                       </>
//                     )}
//                   </span>
//                 </div>

//                 <div className="order-items">
//                   {order.items.map((item, idx) => (
//                     <div key={idx} className="order-item">
//                       <div className="item-details">
//                         <span className="item-name">
//                           {item.isVeg && <Leaf className="veg-icon" size={14} />}
//                           {item.name}
//                         </span>
//                         <span className="item-quantity">× {item.quantity}</span>
//                       </div>
//                       <span className="item-price">₹{item.price}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="order-footer">
//                   <div className="order-total">
//                     <span>Total</span>
//                     <strong>₹{order.total}</strong>
//                   </div>

//                   <div className="order-actions">
//                     {order.orderStatus === 'pending' && (
//                       <button
//                         className="btn-complete"
//                         onClick={() => markAsCompleted(order._id)}
//                       >
//                         <CheckCircle size={16} />
//                         Mark as Served
//                       </button>
//                     )}
//                     <button
//                       className="btn-delete"
//                       onClick={() => deleteOrder(order._id)}
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AdminOrdersPage;

// AdminOrdersPage.js - FIXED VERSION

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, ChefHat, X, Leaf } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../assets/styles/AdminOrdersPage.css';
import AdminNavbar from '../../components/AdminNavbar';
import { orderAPI } from '../../api/orderAPI';

const AdminOrdersPage = () => {
  const [allOrders, setAllOrders] = useState([]); // ✅ Store ALL orders
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Auto-refresh
    return () => clearInterval(interval);
  }, []); // ✅ Remove filter dependency - always fetch all orders

  const fetchOrders = async () => {
    try {
      // ✅ Always fetch ALL orders without filter
      const response = await orderAPI.getAllOrders({});
      setAllOrders(response.orders);
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

  const deleteOrder = async (orderId) => {
    try {
      // If you have a delete API endpoint, use it
      // await orderAPI.deleteOrder(orderId);
      
      // Otherwise, just update the UI
      const updatedOrders = allOrders.filter(order => order._id !== orderId);
      setAllOrders(updatedOrders);
      toast.success('Order removed');
    } catch (error) {
      toast.error('Failed to delete order');
    }
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

  // ✅ Filter orders based on current tab
  const filteredOrders = allOrders
    .filter(order => {
      if (filter === 'all') return true;
      return order.orderStatus === filter;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // ✅ Calculate counts from ALL orders, not filtered ones
  const pendingCount = allOrders.filter(o => o.orderStatus === 'pending').length;
  const completedCount = allOrders.filter(o => o.orderStatus === 'completed').length;

  return (
    <>
      <AdminNavbar />
      <Toaster position="top-right" />
      
      <div className="admin-orders-page">
        {/* Header with Stats */}
        <div className="admin-header">
          <div className="header-content">
            <div>
              <h1>Orders Dashboard</h1>
              <p className="header-subtitle">Real-time order management</p>
            </div>
            
            <div className="header-stats">
              <div className="stat-card stat-pending">
                <Clock size={24} color="#fbbf24" />
                <div>
                  <div className="stat-value">{pendingCount}</div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>
              
              <div className="stat-card stat-completed">
                <CheckCircle size={24} color="#22c55e" />
                <div>
                  <div className="stat-value">{completedCount}</div>
                  <div className="stat-label">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <Clock size={18} /> Pending ({pendingCount})
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <CheckCircle size={18} /> Completed ({completedCount})
          </button>
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Orders ({allOrders.length})
          </button>
        </div>

        {/* Orders Grid */}
        <div className="orders-container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-state">
              <ChefHat size={64} />
              <h2>No {filter !== 'all' ? filter : ''} orders</h2>
              <p>New orders will appear here in real-time</p>
            </div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map(order => (
                <div 
                  key={order._id} 
                  className={`order-card ${order.orderStatus === 'completed' ? 'completed' : ''} ${
                    Date.now() - new Date(order.createdAt) < 60000 ? 'new' : ''
                  }`}
                >
                  {Date.now() - new Date(order.createdAt) < 60000 && (
                    <span className="new-badge">NEW</span>
                  )}
                  
                  {/* Order Header */}
                  <div className="order-card-header">
                    <div className="order-info">
                      <h2 className="table-number">Table #{order.tableNumber}</h2>
                      <span className="order-id">#{order._id.slice(-6)}</span>
                      <div className="order-time">
                        <Clock size={14} />
                        {getTimeAgo(order.createdAt)}
                      </div>
                    </div>
                    
                    <div className={`status-badge status-${order.orderStatus}`}>
                      {order.orderStatus === 'pending' ? (
                        <><Clock size={16} /> Preparing</>
                      ) : (
                        <><CheckCircle size={16} /> Ready</>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-details">
                          <span className="item-quantity">×{item.quantity}</span>
                          <span className="item-name">{item.name}</span>
                          {item.isVeg && (
                            <span className="veg-indicator">
                              <Leaf size={14} />
                            </span>
                          )}
                        </div>
                         <span className="item-price">₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="order-card-footer">
                    <div className="order-total">₹{order.total}</div>
                    
                    <div className="order-actions">
                      {order.orderStatus === 'pending' ? (
                        <button 
                          className="btn-complete"
                          onClick={() => markAsCompleted(order._id)}
                        >
                          <CheckCircle size={18} />
                          Mark as Served
                        </button>
                      ) : (
                        <div className="completed-badge">
                          <CheckCircle size={18} />
                          Completed
                        </div>
                      )}
                      
                      <button 
                        className="btn-delete"
                        onClick={() => deleteOrder(order._id)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrdersPage;
