import React from 'react'

export default function Layout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Products</li>
            <li>Orders</li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-10">
        
      </main>
    </div>
  )
}
