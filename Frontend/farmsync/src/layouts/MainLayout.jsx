import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useTheme } from '../context/ThemeContext';

/**
 * MainLayout Component
 * 
 * Provides the structural frame for the application, including the sidebar,
 * top header, and a scrollable content area. It applies dynamic backgrounds
 * based on the active global theme.
 * 
 * @returns {JSX.Element} The application shell layout
 */
const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#07110d] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic Background Gradients */}
      <div className={`pointer-events-none fixed inset-0 transition-opacity duration-300 ${
        theme === 'dark' ? 'opacity-100' : 'opacity-30'
      } bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_22%)]`} />
      
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="main-content flex-1 px-4 pb-6 md:px-6 xl:px-7">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

