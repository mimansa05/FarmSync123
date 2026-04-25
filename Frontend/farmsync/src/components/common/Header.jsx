import React, { useMemo, useState } from 'react';
import { FaBell, FaChevronDown, FaSearch, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const searchItems = [
  { label: 'Dashboard', keywords: ['dashboard', 'home', 'overview'], route: '/' },
  { label: 'Crops', keywords: ['crops', 'crop', 'field'], route: '/crops' },
  { label: 'Expenses', keywords: ['expenses', 'expense', 'finance'], route: '/expenses' },
  { label: 'Activities', keywords: ['activities', 'activity', 'log'], route: '/activities' },
  { label: 'Reports', keywords: ['reports', 'analytics'], route: '/reports' },
  { label: 'Weather', keywords: ['weather', 'forecast'], route: '/weather' },
  { label: 'Settings', keywords: ['settings', 'profile'], route: '/settings' },
];

const Header = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchItems.slice(0, 5);
    return searchItems.filter((item) => {
      const haystack = `${item.label} ${item.keywords.join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const goToItem = (item) => {
    setQuery(item.label);
    setShowResults(false);
    navigate(item.route);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex w-full items-center justify-between px-4 py-4 backdrop-blur-md md:px-6 xl:px-7 bg-[var(--header-bg)] border-b border-[var(--border-color)]">
      <div className="relative w-full max-w-[420px]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full items-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 text-sm transition-all focus-within:border-[var(--accent-color)] focus-within:ring-2 focus-within:ring-[var(--accent-color)]/10"
        >
          <FaSearch className="mr-3 text-[var(--text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            placeholder="Search anything..."
            className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
          />
        </form>

        {showResults && query && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-2 shadow-2xl">
            {results.map((item) => (
              <button
                key={item.label}
                onMouseDown={() => goToItem(item)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/notifications')}
          className="relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-2.5 text-[var(--text-primary)] transition-all hover:bg-[var(--bg-primary)] hover:scale-105 active:scale-95"
          aria-label="Notifications"
        >
          <FaBell className="text-xl" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[var(--bg-secondary)]" />
        </button>

        <button
          onClick={toggleTheme}
          className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-2.5 text-[var(--text-primary)] transition-all hover:bg-[var(--bg-primary)] hover:scale-105 active:scale-95"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2 transition-all hover:bg-[var(--bg-primary)] hover:border-[var(--accent-color)]"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full border border-[var(--border-color)]">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="hidden flex-col text-left md:flex">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Welcome back</span>
              <span className="text-sm font-bold text-[var(--text-primary)]">{auth?.user?.name || 'Farmer'}</span>
            </div>
            <FaChevronDown className={`text-xs text-[var(--text-muted)] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-52 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
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
