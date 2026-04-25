import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="main-content flex-1 overflow-x-hidden p-4 pb-10 md:p-6 xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
