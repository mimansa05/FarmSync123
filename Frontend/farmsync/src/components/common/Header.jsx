import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-green-800/90 backdrop-blur-sm text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌾</span>
          <h1 className="text-2xl font-bold">FarmSync</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-green-100">Welcome, Farmer</span>
          <FaUserCircle className="text-3xl text-green-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;