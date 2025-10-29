import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import '../../assets/styles/AdminAnalyticsPage.css';
import AdminNavbar from '../../components/AdminNavbar';
import { analyticsAPI } from '../../api/analyticsAPI';
import toast, { Toaster } from 'react-hot-toast';


const AdminAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('week'); // week, month, year
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  // const fetchAnalytics = async () => {
  //   try {
  //     const [dashboardStats, revenueData, popularItems] = await Promise.all([
  //       analyticsAPI.getDashboardStats(),
  //       analyticsAPI.getRevenueData(30),
  //       analyticsAPI.getPopularItems(10)
  //     ]);

  //     setStats({
  //       ...dashboardStats.stats,
  //       revenueData: revenueData.data,
  //       popularItems: popularItems.items
  //     });
  //   } catch (error) {
  //     toast.error('Failed to load analytics');
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAnalytics = async () => {
  try {
    const [dashboardStats, revenueData, popularItems, categoryData, peakHours] = await Promise.all([
      analyticsAPI.getDashboardStats(),
      analyticsAPI.getRevenueData(30),
      analyticsAPI.getPopularItems(10),
      analyticsAPI.getCategoryData(),
      analyticsAPI.getPeakHours()
    ]);

    setStats({
      ...dashboardStats.stats,
      revenueData: revenueData.data,
      popularItems: popularItems.items,
      categoryData: categoryData.data,
      peakHours: peakHours.data
    });
  } catch (error) {
    toast.error('Failed to load analytics');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  // const calculateStats = () => {
  //   const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
    
  //   // Generate dummy data if no orders
  //   if (orders.length === 0) {
  //     setStats(getDummyStats());
  //     return;
  //   }

  //   // Calculate real stats from orders
  //   const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  //   const totalOrders = orders.length;
  //   const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  //   setStats({
  //     totalRevenue,
  //     totalOrders,
  //     avgOrderValue,
  //     // Use dummy data for charts
  //     ...getDummyStats()
  //   });
  // };

  // const getDummyStats = () => {
  //   return {
  //     totalRevenue: 45680,
  //     totalOrders: 156,
  //     avgOrderValue: 293,
  //     newCustomers: 42,
  //     revenueGrowth: 12.5,
  //     ordersGrowth: 8.3,
      
  //     // Revenue over time (last 7 days)
  //     revenueData: [
  //       { date: 'Mon', revenue: 5200, orders: 18 },
  //       { date: 'Tue', revenue: 6800, orders: 24 },
  //       { date: 'Wed', revenue: 5600, orders: 19 },
  //       { date: 'Thu', revenue: 7200, orders: 26 },
  //       { date: 'Fri', revenue: 8400, orders: 31 },
  //       { date: 'Sat', revenue: 9100, orders: 35 },
  //       { date: 'Sun', revenue: 8200, orders: 29 }
  //     ],
      
  //     // Popular items
  //     popularItems: [
  //       { name: 'Butter Chicken', orders: 45, revenue: 15705 },
  //       { name: 'Paneer Tikka', orders: 38, revenue: 11362 },
  //       { name: 'Biryani', orders: 32, revenue: 9568 },
  //       { name: 'Dal Makhani', orders: 28, revenue: 6972 },
  //       { name: 'Naan', orders: 52, revenue: 2080 }
  //     ],
      
  //     // Orders by category
  //     categoryData: [
  //       { category: 'Main Course', value: 45, color: '#218D8D' },
  //       { category: 'Appetizers', value: 25, color: '#F59E0B' },
  //       { category: 'Desserts', value: 18, color: '#EF4444' },
  //       { category: 'Beverages', value: 12, color: '#8B5CF6' }
  //     ],
      
  //     // Peak hours
  //     peakHours: [
  //       { hour: '12 PM', orders: 8 },
  //       { hour: '1 PM', orders: 15 },
  //       { hour: '2 PM', orders: 12 },
  //       { hour: '7 PM', orders: 18 },
  //       { hour: '8 PM', orders: 22 },
  //       { hour: '9 PM', orders: 16 }
  //     ]
  //   };
  // };

  if (!stats) {
    return (
      <div className="admin-analytics-page">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
    <div className="admin-analytics-page">
      {/* Header */}
      <header className="analytics-header">
        <div className="header-content">
          <div>
            <h1>Analytics Dashboard</h1>
            <p className="header-subtitle">Monitor your restaurant performance</p>
          </div>
          
          {/* Time Range Selector */}
          <div className="time-range-selector">
            <button
              className={timeRange === 'week' ? 'active' : ''}
              onClick={() => setTimeRange('week')}
            >
              This Week
            </button>
            <button
              className={timeRange === 'month' ? 'active' : ''}
              onClick={() => setTimeRange('month')}
            >
              This Month
            </button>
            <button
              className={timeRange === 'year' ? 'active' : ''}
              onClick={() => setTimeRange('year')}
            >
              This Year
            </button>
          </div>
        </div>
      </header>

      <div className="analytics-container">
        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card metric-primary">
            <div className="metric-icon">
              <DollarSign size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Total Revenue</div>
              <div className="metric-value">₹{stats.totalRevenue.toLocaleString()}</div>
              <div className="metric-change positive">
                <ArrowUp size={14} />
                +{stats.revenueGrowth}% from last period
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <ShoppingBag size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Total Orders</div>
              <div className="metric-value">{stats.totalOrders}</div>
              <div className="metric-change positive">
                <ArrowUp size={14} />
                +{stats.ordersGrowth}% from last period
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <TrendingUp size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Avg Order Value</div>
              <div className="metric-value">₹{Math.round(stats.avgOrderValue)}</div>
              <div className="metric-change">
                <ArrowDown size={14} />
                -2.3% from last period
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Users size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">New Customers</div>
              <div className="metric-value">{stats.newCustomers}</div>
              <div className="metric-change positive">
                <ArrowUp size={14} />
                +15.2% from last period
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="charts-row">
          {/* Revenue Chart */}
          <div className="chart-card large">
            <div className="chart-header">
              <h2>Revenue Overview</h2>
              <p>Daily revenue for the past week</p>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--color-border), 0.3)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--color-text-secondary)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="var(--color-text-secondary)"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#218D8D" 
                    strokeWidth={3}
                    dot={{ fill: '#218D8D', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>Orders by Category</h2>
              <p>Distribution of menu categories</p>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="charts-row">
          {/* Popular Items */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>Top Selling Items</h2>
              <p>Best performers this period</p>
            </div>
            <div className="popular-items-list">
              {stats.popularItems.map((item, index) => (
                <div key={index} className="popular-item">
                  <div className="item-rank">#{index + 1}</div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-stats">
                      {item.orders} orders • ₹{item.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="item-bar">
                    <div 
                      className="item-bar-fill" 
                      style={{ width: `${(item.orders / 52) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>Peak Hours</h2>
              <p>Busiest times of the day</p>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats.peakHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--color-border), 0.3)" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="var(--color-text-secondary)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="var(--color-text-secondary)"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="orders" fill="#218D8D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminAnalyticsPage;
