import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

// Hook for using theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or use dark mode as default
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('market-pulse-theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  
  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('market-pulse-theme', JSON.stringify(darkMode));
  }, [darkMode]);
  
  // Context value
  const value = {
    darkMode,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;