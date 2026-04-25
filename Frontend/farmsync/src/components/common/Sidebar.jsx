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
  const { logout } = useAuth();
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
    <aside className="sticky top-0 z-20 flex h-screen w-64 flex-col border-r border-[var(--border-color)] bg-[var(--bg-sidebar)] text-[var(--text-secondary)] transition-all duration-300">
      <div className="p-6 pb-2">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-color)] text-white shadow-lg shadow-[var(--accent-color)]/20">
            <FaLeaf className="text-xl" />
          </div>
          <span className="text-2xl font-black tracking-tight text-[var(--text-primary)]">FarmSync</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1">
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 group ${
                      isActive
                        ? 'bg-[var(--accent-color)] text-white font-bold shadow-lg shadow-[var(--accent-color)]/20'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                    }`
                  }
                >
                  <span className={`text-xl transition-transform group-hover:scale-110`}>{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom section */}
      <div className="mt-auto p-4 pb-6 space-y-4">
        {/* Help button */}
        <button
          type="button"
          onClick={() => navigate('/contact-us')}
          className="flex w-full items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--accent-color)] hover:text-[var(--text-primary)] group"
        >
          <div className="flex items-center gap-3">
            <FaHeadset className="text-lg group-hover:text-[var(--accent-color)]" />
            <span className="font-medium">Need Help?</span>
          </div>
          <span className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform">→</span>
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
