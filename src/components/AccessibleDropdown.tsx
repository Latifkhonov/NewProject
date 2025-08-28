import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface DropdownOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

interface AccessibleDropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
  maxHeight?: string;
}

export const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  multiple = false,
  searchable = false,
  disabled = false,
  error,
  label,
  required = false,
  className = '',
  maxHeight = 'max-h-60'
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [announceText, setAnnounceText] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group options if they have groups
  const groupedOptions = filteredOptions.reduce((groups, option) => {
    const group = option.group || 'default';
    if (!groups[group]) groups[group] = [];
    groups[group].push(option);
    return groups;
  }, {} as Record<string, DropdownOption[]>);

  // Get selected options
  const selectedOptions = multiple
    ? options.filter(option => Array.isArray(value) && value.includes(option.value))
    : options.find(option => option.value === value);

  // Handle option selection
  const handleSelect = useCallback((optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
      
      const option = options.find(opt => opt.value === optionValue);
      setAnnounceText(
        currentValues.includes(optionValue)
          ? `${option?.label} ${t.deselected || 'deselected'}`
          : `${option?.label} ${t.selected || 'selected'}`
      );
    } else {
      onChange(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
      
      const option = options.find(opt => opt.value === optionValue);
      setAnnounceText(`${option?.label} ${t.selected || 'selected'}`);
    }
    
    // Clear announcement after delay
    setTimeout(() => setAnnounceText(''), 1000);
  }, [multiple, value, onChange, options, t.selected, t.deselected]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex].value);
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  }, [isOpen, focusedIndex, filteredOptions, handleSelect]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus management
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Reset focused index when options change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchTerm]);

  const displayValue = multiple
    ? Array.isArray(selectedOptions) && selectedOptions.length > 0
      ? `${selectedOptions.length} ${t.itemsSelected || 'items selected'}`
      : placeholder
    : selectedOptions
      ? (selectedOptions as DropdownOption).label
      : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announceText}
      </div>

      {/* Label */}
      {label && (
        <label
          htmlFor="dropdown-trigger"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Trigger button */}
      <button
        ref={triggerRef}
        id="dropdown-trigger"
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2 text-left
          border rounded-lg transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${disabled 
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
          }
          ${error 
            ? 'border-red-300 dark:border-red-600' 
            : 'border-gray-300 dark:border-gray-600'
          }
          ${isOpen ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? 'dropdown-trigger' : undefined}
        aria-describedby={error ? 'dropdown-error' : undefined}
        aria-required={required}
      >
        <span className={displayValue === placeholder ? 'text-gray-500 dark:text-gray-400' : ''}>
          {displayValue}
        </span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${disabled ? 'text-gray-400' : 'text-gray-500'}`}
        />
      </button>

      {/* Error message */}
      {error && (
        <p id="dropdown-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {/* Search input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchPlaceholder || 'Search options...'}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={t.searchOptions || 'Search options'}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={t.clearSearch || 'Clear search'}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options list */}
          <ul
            ref={listRef}
            role="listbox"
            aria-multiselectable={multiple}
            className={`py-1 ${maxHeight} overflow-y-auto`}
            onKeyDown={handleKeyDown}
          >
            {Object.keys(groupedOptions).length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                {t.noOptionsFound || 'No options found'}
              </li>
            ) : (
              Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <React.Fragment key={groupName}>
                  {groupName !== 'default' && (
                    <li className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900">
                      {groupName}
                    </li>
                  )}
                  {groupOptions.map((option, index) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    const isSelected = multiple
                      ? Array.isArray(value) && value.includes(option.value)
                      : value === option.value;
                    const isFocused = globalIndex === focusedIndex;

                    return (
                      <li
                        key={option.id}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        className={`
                          px-3 py-2 cursor-pointer transition-colors duration-150
                          ${isFocused ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                          ${isSelected ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                          ${option.disabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-900 dark:text-gray-100'}
                          hover:bg-gray-50 dark:hover:bg-gray-700
                        `}
                        onClick={() => !option.disabled && handleSelect(option.value)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              {multiple && (
                                <div className={`
                                  w-4 h-4 mr-2 border rounded flex items-center justify-center
                                  ${isSelected 
                                    ? 'bg-blue-600 border-blue-600 text-white' 
                                    : 'border-gray-300 dark:border-gray-600'
                                  }
                                `}>
                                  {isSelected && <Check className="h-3 w-3" />}
                                </div>
                              )}
                              <span className={option.disabled ? 'line-through' : ''}>
                                {option.label}
                              </span>
                            </div>
                            {option.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {option.description}
                              </p>
                            )}
                          </div>
                          {!multiple && isSelected && (
                            <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </React.Fragment>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};