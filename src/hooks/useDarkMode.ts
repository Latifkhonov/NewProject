import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface DarkModeState {
  theme: Theme;
  isDark: boolean;
  isSystemDark: boolean;
}

export const useDarkMode = () => {
  const [state, setState] = useState<DarkModeState>(() => {
    // Get saved theme or default to 'system'
    const savedTheme = localStorage.getItem('theme') as Theme || 'system';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return {
      theme: savedTheme,
      isDark: savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark),
      isSystemDark: systemPrefersDark
    };
  });

  // Apply theme to document
  const applyTheme = useCallback((isDark: boolean) => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, []);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setState(prev => {
        const newSystemDark = e.matches;
        const newIsDark = prev.theme === 'system' ? newSystemDark : prev.isDark;
        
        return {
          ...prev,
          isSystemDark: newSystemDark,
          isDark: newIsDark
        };
      });
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme whenever isDark changes
  useEffect(() => {
    applyTheme(state.isDark);
  }, [state.isDark, applyTheme]);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    const newIsDark = newTheme === 'dark' || (newTheme === 'system' && state.isSystemDark);
    
    setState(prev => ({
      ...prev,
      theme: newTheme,
      isDark: newIsDark
    }));

    // Persist theme preference
    localStorage.setItem('theme', newTheme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: newTheme, isDark: newIsDark } 
    }));
  }, [state.isSystemDark]);

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(() => {
    setTheme(state.isDark ? 'light' : 'dark');
  }, [state.isDark, setTheme]);

  return {
    theme: state.theme,
    isDark: state.isDark,
    isSystemDark: state.isSystemDark,
    setTheme,
    toggleTheme
  };
};