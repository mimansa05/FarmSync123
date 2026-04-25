import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * ThemeContext provides the global state and toggle functionality for 
 * light and dark modes across the application.
 */
const ThemeContext = createContext();

/**
 * ThemeProvider component that wraps the application to provide theme state.
 * It manages the theme preference in localStorage and applies the appropriate 
 * class to the document body.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The provider component
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  /**
   * Effect hook to synchronize the theme state with the DOM and localStorage.
   * Whenever the theme changes, it updates the class on the body element 
   * and saves the preference.
   */
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Toggles the theme between light and dark modes.
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to consume the ThemeContext.
 * 
 * @returns {Object} { theme, toggleTheme }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
