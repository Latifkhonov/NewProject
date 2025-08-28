import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Filter, X, Clock, TrendingUp } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string, location: string, filters: any) => void;
  placeholder?: string;
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
  placeholder = "What product or service are you looking for?",
  showFilters = true,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFiltersPanel] = useState(false);
  const [recentSearches] = useState([
    'CNC Machining',
    'Steel Suppliers',
    'Electronic Components',
    'Injection Molding'
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
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Main Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Location Input */}
          <div className="lg:w-80 relative border-t lg:border-t-0 lg:border-l border-gray-200">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Location (City, Region)"
              className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex border-t lg:border-t-0 lg:border-l border-gray-200">
            {showFilters && (
              <button
                onClick={() => setShowFiltersPanel(!showFilters)}
                className="px-4 py-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-200"
              >
                <Filter className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (query || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {query ? (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search Suggestions
              </h3>
              {filteredSuggestions.length > 0 ? (
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
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
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                              {suggestion.text}
                            </p>
                            {suggestion.category && (
                              <p className="text-xs text-gray-500">{suggestion.category}</p>
                            )}
                          </div>
                        </div>
                        {suggestion.count && (
                          <span className="text-xs text-gray-400">{suggestion.count}+ results</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-4">No suggestions found</p>
              )}
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Recent Searches
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
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 hover:text-blue-600"
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