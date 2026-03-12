import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaSeedling, 
  FaMoneyBillWave, 
  FaClipboardList, 
  FaChartBar,
  FaCog 
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: <FaTachometerAlt />, text: 'Dashboard' },
    { path: '/crops', icon: <FaSeedling />, text: 'Crops' },
    { path: '/expenses', icon: <FaMoneyBillWave />, text: 'Expenses' },
    { path: '/activities', icon: <FaClipboardList />, text: 'Activities' },
    { path: '/reports', icon: <FaChartBar />, text: 'Reports' },
  ];

  return (
    <aside className="w-64 bg-gray-900/90 backdrop-blur-sm text-white h-screen sticky top-0 border-r border-green-800">
      <div className="p-4">
        <div className="flex items-center gap-2 px-4 py-5 mb-6 border-b border-green-800">
          <span className="text-3xl">🚜</span>
          <span className="text-xl font-bold text-green-400">FarmSync</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700/50 transition-all duration-300 hover:pl-6"
                >
                  <span className="text-xl text-green-400">{item.icon}</span>
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Farm Status */}
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-green-800/30 rounded-lg border border-green-700">
          <p className="text-sm text-green-300 mb-2">🌤️ Farm Status</p>
          <p className="text-xs text-green-200">All crops healthy</p>
          <div className="w-full bg-gray-700 h-1 mt-2 rounded">
            <div className="bg-green-500 h-1 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;