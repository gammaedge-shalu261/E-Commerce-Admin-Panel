// src/components/Layout/AdminLayout.jsx
import React from 'react';
// 1. Import Link and Outlet
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/" className="block p-2 rounded hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/products" className="block p-2 rounded hover:bg-gray-700">
                Products
              </Link>
            </li>
            <li className="mb-2">
              <span className="block p-2 text-gray-500 cursor-not-allowed">
                Orders (soon)
              </span>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;