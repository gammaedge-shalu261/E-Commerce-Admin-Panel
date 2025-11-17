import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-blue-500">
          <span className="text-4xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/v1/stats');
        console.log('data', data)
        
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Total Products" 
            value={stats.productCount}
            icon="📦" 
          />

          <StatCard 
            title="Total Orders" 
            value="N/A"
            icon="🛒" 
          />

          <StatCard 
            title="Total Revenue" 
            value="N/A"
            icon="💰" 
          />
        </div>
      ) : (
        <p>Could not load dashboard statistics.</p>
      )}
    </div>
  );
};

export default Dashboard;