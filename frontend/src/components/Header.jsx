import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');

    delete axios.defaults.headers.common['Authorization'];

    navigate('/login');
  };

  const adminUser = JSON.parse(localStorage.getItem('adminUser'));
  const adminName = adminUser ? adminUser.name : 'Admin';

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome, {adminName}
        </h2>
      </div>

      <div>
        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;