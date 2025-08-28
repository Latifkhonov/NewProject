import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Filter, X, Clock, TrendingUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface SearchBarProps {
  onSearch?: (query: string, location: string, filters: any) => void;
  showFilters?: boolean;
  className?: string;
}

interface SearchSuggestion {
  type: 'product' | 'supplier' | 'category';
  text: string;
  category?: string;
  count?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  showFilters = true,
  className = ''
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [recentSearches] = useState([
    t.searchSuggestions || 'CNC Machining',
    t.searchSuggestions || 'Steel Suppliers',
    t.searchSuggestions || 'Electronic Components',
    t.searchSuggestions || 'Injection Molding'
  ]);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions - in real app, these would come from API
  const suggestions: SearchSuggestion[] = [
    { type: 'product', text: 'CNC Machining Services', category: 'Manufacturing', count: 1200 },
    { type: 'product', text: 'Steel Fabrication', category: 'Materials', count: 800 },
    { type: 'supplier', text: 'Uzbekistan Steel Works', category: 'Supplier' },
    { type: 'category', text: 'Electronics Components', count: 1500 },
  ];

  const filteredSuggestions = suggestions.filter(s => 
    s.text.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, location, {});
    }
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion.text, location, {});
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Main Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset transition-colors duration-300"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Location Input */}
          <div className="lg:w-80 relative border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.locationPlaceholder}
              className="w-full pl-12 pr-4 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset transition-colors duration-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 transition-colors duration-300">
            {showFilters && (
              <button
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                className="px-4 py-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300 border-r border-gray-200 dark:border-gray-700"
              >
                <Filter className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
            >
              {t.searchButton}
            </button>
          </div>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (query || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto transition-colors duration-300">
          {query ? (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center transition-colors duration-300">
                <Search className="h-4 w-4 mr-2" />
                {t.searchSuggestions}
              </h3>
              {filteredSuggestions.length > 0 ? (
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded ${
                            suggestion.type === 'product' ? 'bg-blue-100 text-blue-600' :
                            suggestion.type === 'supplier' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {suggestion.type === 'product' && <Search className="h-3 w-3" />}
                            {suggestion.type === 'supplier' && <MapPin className="h-3 w-3" />}
                            {suggestion.type === 'category' && <Filter className="h-3 w-3" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {suggestion.text}
                            </p>
                            {suggestion.category && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{suggestion.category}</p>
                            )}
                          </div>
                        </div>
                        {suggestion.count && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">{suggestion.count}+ {t.results}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 py-4 transition-colors duration-300">{t.noSuggestions}</p>
              )}
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center transition-colors duration-300">
                <Clock className="h-4 w-4 mr-2" />
                {t.recentSearches}
              </h3>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      setShowSuggestions(false);
                      if (onSearch) onSearch(search, location, {});
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};