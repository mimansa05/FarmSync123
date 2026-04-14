import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaChartBar,
  FaClipboardList,
  FaCloudSun,
  FaCog,
  FaFileInvoiceDollar,
  FaHeadset,
  FaLeaf,
  FaSeedling,
  FaSignOutAlt,
  FaThLarge,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', icon: <FaThLarge />, text: 'Dashboard' },
    { path: '/crops', icon: <FaSeedling />, text: 'Crops' },
    { path: '/expenses', icon: <FaFileInvoiceDollar />, text: 'Expenses' },
    { path: '/activities', icon: <FaClipboardList />, text: 'Activities' },
    { path: '/reports', icon: <FaChartBar />, text: 'Reports' },
    { path: '/weather', icon: <FaCloudSun />, text: 'Weather' },
    { path: '/settings', icon: <FaCog />, text: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sticky top-0 z-20 flex h-screen w-64 flex-col border-r border-farm-border bg-farm-sidebar text-gray-300">
      <div className="p-5 pb-2">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-3 px-2">
          <FaLeaf className="text-2xl text-farm-accent" />
          <span className="text-xl font-bold text-white">FarmSync</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? 'border border-emerald-400/12 bg-[#135532] text-white font-medium shadow-[0_18px_30px_rgba(19,85,50,0.2)]'
                        : 'text-gray-400 hover:bg-farm-border/50 hover:text-white'
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom section */}
      <div className="mt-auto p-4 pb-5">

        {/* Promo card */}
        <div className="relative mb-4 overflow-hidden rounded-2xl border border-farm-accent/10 bg-gradient-to-br from-[#0D2618] to-[#0A1A12] p-5 shadow-lg">
          <div className="absolute -right-4 -top-8 text-[120px] text-farm-accent opacity-5">
            <FaLeaf />
          </div>
          <h3 className="relative z-10 mb-2 text-lg font-bold leading-tight text-white">
            Smart Farming,
            <br />
            Better Tomorrow
          </h3>
          <p className="relative z-10 mb-4 text-xs text-gray-400">
            Let&apos;s grow more,
            <br />
            waste less.
          </p>
          <div className="relative z-10 flex gap-1">
            <div className="h-1 w-4 rounded-full bg-farm-accent" />
            <div className="h-1 w-1 rounded-full bg-gray-600" />
          </div>
        </div>

        {/* Logged in user info */}
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/6 bg-white/4 px-4 py-3">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-farm-border bg-gray-800">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {auth?.user?.name || 'Farmer'}
            </p>
            <p className="truncate text-xs text-gray-400">
              {auth?.user?.email || ''}
            </p>
          </div>
        </div>

        {/* Help button */}
        <button
          type="button"
          onClick={() => navigate('/contact-us')}
          className="mb-2 flex w-full items-center justify-between rounded-xl border border-farm-border px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-farm-border/50"
        >
          <div className="flex items-center gap-3">
            <FaHeadset className="text-gray-400" />
            <span>Need Help?</span>
          </div>
          <span className="text-gray-500">&gt;</span>
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-red-400/10 bg-red-500/5 px-4 py-3 text-sm text-red-300 transition-colors hover:bg-red-500/10 hover:border-red-400/20"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;
