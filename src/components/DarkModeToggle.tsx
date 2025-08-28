import React, { useState } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTranslation } from '../hooks/useTranslation';

interface DarkModeToggleProps {
  variant?: 'button' | 'dropdown';
  className?: string;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  variant = 'button', 
  className = '' 
}) => {
  const { t } = useTranslation();
  const { theme, isDark, setTheme } = useDarkMode();
  const [showDropdown, setShowDropdown] = useState(false);

  const themeOptions = [
    { 
      value: 'light' as const, 
      label: t.lightMode || 'Light', 
      icon: Sun,
      description: t.lightModeDesc || 'Light theme'
    },
    { 
      value: 'dark' as const, 
      label: t.darkMode || 'Dark', 
      icon: Moon,
      description: t.darkModeDesc || 'Dark theme'
    },
    { 
      value: 'system' as const, 
      label: t.systemMode || 'System', 
      icon: Monitor,
      description: t.systemModeDesc || 'Follow system preference'
    }
  ];

  const currentThemeOption = themeOptions.find(option => option.value === theme);
  const CurrentIcon = currentThemeOption?.icon || Sun;

  if (variant === 'button') {
    return (
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`
          relative p-2 rounded-lg transition-all duration-300 ease-in-out
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          ${className}
        `}
        aria-label={isDark ? t.switchToLight || 'Switch to light mode' : t.switchToDark || 'Switch to dark mode'}
        title={isDark ? t.switchToLight || 'Switch to light mode' : t.switchToDark || 'Switch to dark mode'}
      >
        <div className="relative w-5 h-5">
          <Sun className={`
            absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `} />
          <Moon className={`
            absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `} />
        </div>
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="
          flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
        "
        aria-label={t.selectTheme || 'Select theme'}
        aria-expanded={showDropdown}
        aria-haspopup="true"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="text-sm font-medium">{currentThemeOption?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
          showDropdown ? 'rotate-180' : ''
        } opacity-60 group-hover:opacity-100 transition-opacity duration-200`}
        }`} />
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowDropdown(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="
            absolute right-0 mt-2 w-48 z-20
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-lg
            py-1
          ">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setShowDropdown(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 text-left
                    transition-colors duration-150
                    ${isSelected 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                  role="menuitem"
                >
                  <Icon className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};