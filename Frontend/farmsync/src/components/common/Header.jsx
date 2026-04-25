import React, { useMemo, useState } from 'react';
import { FaBell, FaChevronDown, FaSearch, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Global Search Configuration
 * Defines searchable navigation items throughout the application.
 */
const searchItems = [
  { label: 'Dashboard', keywords: ['dashboard', 'home', 'overview'], route: '/' },
  { label: 'Crop Overview', keywords: ['crop overview', 'chart', 'growth'], route: '/', hash: '#crop-overview' },
  { label: 'Recent Activities', keywords: ['recent activities', 'activity', 'timeline'], route: '/', hash: '#recent-activities' },
  { label: 'AI Farm Assistant', keywords: ['ai', 'assistant', 'suggestion'], route: '/ai-assistant' },
  { label: 'Crops', keywords: ['crops', 'crop', 'field'], route: '/crops' },
  { label: 'Expenses', keywords: ['expenses', 'expense', 'spending', 'finance'], route: '/expenses' },
  { label: 'Activities', keywords: ['activities', 'activity', 'log'], route: '/activities' },
  { label: 'Reports', keywords: ['reports', 'analytics', 'trends'], route: '/reports' },
  { label: 'Weather', keywords: ['weather', 'forecast', 'temperature'], route: '/weather' },
  { label: 'Notifications', keywords: ['notification', 'notifications', 'alerts', 'bell'], route: '/notifications' },
  { label: 'Contact Us', keywords: ['contact', 'help', 'support'], route: '/contact-us' },
  { label: 'Settings', keywords: ['settings', 'profile', 'notifications'], route: '/settings' },
];

/**
 * Header Component
 * 
 * The top navigation bar containing global search, notification alerts,
 * and user profile/account settings.
 * 
 * @returns {JSX.Element} The rendered Header component
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  /** @type {string} Current value of the search input bar */
  const [query, setQuery] = useState('');

  /** @type {boolean} Toggle for showing the real-time search results dropdown */
  const [showResults, setShowResults] = useState(false);

  /** @type {boolean} Toggle for showing the user account menu */
  const [showUserMenu, setShowUserMenu] = useState(false);

  /**
   * useMemo - Search Result Filtering
   * Filters the searchItems based on the current query string.
   */
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchItems.slice(0, 5);
    return searchItems.filter((item) => {
      const haystack = `${item.label} ${item.keywords.join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  /**
   * Navigates to a specific search result item.
   * Handles both internal routing and intra-page hash navigation.
   * 
   * @param {Object} item - The search result item to navigate to
   */
  const goToItem = (item) => {
    setQuery(item.label);
    setShowResults(false);

    if (location.pathname === item.route) {
      if (item.hash) {
        const target = document.querySelector(item.hash);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    navigate(`${item.route}${item.hash || ''}`);
  };

  /**
   * Handles form submission for the search bar, navigating to the primary result.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const match = results[0];
    if (match) goToItem(match);
  };

  /**
   * Clears session data and redirects the user to the login page.
   */
  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex w-full items-center justify-between bg-transparent px-4 py-4 backdrop-blur-sm md:px-6 xl:px-7">
      {/* Search bar section */}
      <div className="relative w-full max-w-[420px]">
        <form
          onSubmit={onSubmit}
          className="flex w-full items-center rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/8 dark:bg-white/4 px-4 py-2.5 text-sm transition-colors focus-within:border-emerald-500/50"
        >
          <FaSearch className="mr-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onBlur={() => {
              window.setTimeout(() => setShowResults(false), 120);
            }}
            placeholder="Search anything..."
            className="w-full bg-transparent text-slate-700 dark:text-gray-300 placeholder-slate-400 dark:placeholder-gray-500 outline-none"
          />
        </form>

        {showResults && results.length > 0 && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/8 dark:bg-[#101814]/95 p-2 shadow-2xl backdrop-blur-xl">
            {results.slice(0, 6).map((item) => (
              <button
                key={`${item.route}-${item.label}`}
                type="button"
                onMouseDown={() => goToItem(item)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {item.route === '/' ? 'Dashboard' : item.route.replace('/', '')}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right side controls */}
      <div className="ml-4 flex items-center gap-5 text-gray-300">
        <button
          type="button"
          onClick={() => navigate('/notifications')}
          className="relative rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-600 transition-colors hover:text-emerald-600 dark:border-white/8 dark:bg-white/4 dark:text-gray-300 dark:hover:text-white"
        >
          <FaBell className="text-lg" />
          <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-transparent" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-600 transition-colors hover:text-emerald-600 dark:border-white/8 dark:bg-white/4 dark:text-gray-300 dark:hover:text-white"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/8 dark:bg-white/4 px-3 py-2.5"
          >
            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-gray-800">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Farmer Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-gray-300">
                Welcome back
              </span>
              <span className="text-sm font-semibold text-white">
                {auth?.user?.name || 'Farmer'}
              </span>
            </div>
            <FaChevronDown
              className={`ml-1 text-xs text-gray-500 transition-transform group-hover:text-white ${
                showUserMenu ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/8 dark:bg-[#101814]/95 p-2 shadow-2xl backdrop-blur-xl">
              <div className="border-b border-slate-100 dark:border-white/8 px-3 py-3 mb-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {auth?.user?.name}
                </p>
                <p className="text-xs text-slate-400 truncate mt-1">
                  {auth?.user?.email}
                </p>
                <span className="mt-2 inline-block rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  {auth?.user?.role}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/settings');
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-300 transition hover:bg-red-500/10"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

