import { useState, useEffect } from 'react';

 // Manages the dark mode state and synchronizes it with the 'dark' class on the document.

export const useThemeToggle = () => {
  // Check system preference to set initial mode (industry standard)
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Synchronizes the state with the global HTML class for Tailwind
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Function to flip the state
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return { isDarkMode, toggleTheme };
};