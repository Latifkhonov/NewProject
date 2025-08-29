import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Search, 
  Building2, 
  Users, 
  TrendingUp, 
  Factory, 
  Settings, 
  Zap, 
  Award,
  MapPin,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Globe,
  Star,
  Shield,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { DarkModeToggle } from './DarkModeToggle';

interface NavigationProps {
  isAuthenticated: boolean;
  user: any;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onNavigateToSuppliers?: () => void;
  onNavigateToNetwork?: () => void;
  onNavigateToInsights?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  type: 'simple' | 'dropdown' | 'mega';
  items?: any[];
}

export const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated,
  user,
  onLogin,
  onRegister,
  onLogout,
  onNavigateToSuppliers,
  onNavigateToNetwork,
  onNavigateToInsights
}) => {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Navigation structure with improved UX
  const navigationItems: NavItem[] = [
    {
      id: 'products',
      label: t.productsServices,
      type: 'mega',
      items: [
        {
          category: 'Manufacturing',
          icon: Factory,
          items: [
            { name: 'CNC Machining', count: '1,200+', popular: true },
            { name: '3D Printing', count: '800+', popular: true },
            { name: 'Injection Molding', count: '600+' },
            { name: 'Metal Fabrication', count: '900+' },
            { name: 'Assembly Services', count: '500+' }
          ]
        },
        {
          category: 'Electronics',
          icon: Zap,
          items: [
            { name: 'PCB Manufacturing', count: '400+', popular: true },
            { name: 'Cable Assemblies', count: '300+' },
            { name: 'Electronic Components', count: '1,500+', popular: true },
            { name: 'Testing Equipment', count: '200+' }
          ]
        },
        {
          category: 'Materials',
          icon: Building2,
          items: [
            { name: 'Steel & Metals', count: '800+', popular: true },
            { name: 'Plastics', count: '600+' },
            { name: 'Composites', count: '300+' },
            { name: 'Raw Materials', count: '1,000+' }
          ]
        }
      ]
    },
    {
      id: 'suppliers',
      label: t.suppliers,
      type: 'dropdown',
      items: [
        { name: 'Find Suppliers', icon: Search, description: 'Search verified suppliers', href: '/suppliers', onClick: () => navigateToSuppliers() },
        { name: 'Supplier Directory', icon: Building2, description: 'Browse by category', href: '/directory' },
        { name: 'Top Rated', icon: Star, description: 'Highest rated suppliers', href: '/top-rated' },
        { name: 'Recently Added', icon: Sparkles, description: 'New suppliers', href: '/new' }
      ]
    },
    {
      id: 'network',
      label: t.network,
      type: 'dropdown',
      items: [
        { name: 'Business Network', icon: Users, description: 'Connect with businesses', href: '/network', onClick: onNavigateToNetwork },
        { name: 'Industry Events', icon: Award, description: 'Networking events', href: '/events' },
        { name: 'Partner Program', icon: Shield, description: 'Become a partner', href: '/partners' },
        { name: 'Success Stories', icon: TrendingUp, description: 'Customer testimonials', href: '/success' }
      ]
    },
    {
      id: 'insights',
      label: t.insights,
      type: 'dropdown',
      items: [
        { name: 'Market Reports', icon: TrendingUp, description: 'Industry analysis', href: '/reports' },
        { name: 'Price Intelligence', icon: Sparkles, description: 'Pricing trends', href: '/insights', onClick: onNavigateToInsights },
        { name: 'Supplier Rankings', icon: Award, description: 'Performance metrics', href: '/rankings' },
        { name: 'Industry News', icon: Building2, description: 'Latest updates', href: '/news' }
      ]
    }
  ];

  // Handle dropdown interactions with improved UX
  const handleMouseEnter = (itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay for better UX
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideDropdown = Object.values(dropdownRefs.current).some(ref => 
        ref && ref.contains(target)
      );
      
      if (!isInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Render mega menu for products
  const renderMegaMenu = (items: any[]) => (
    <div className="absolute top-full left-0 mt-1 w-[800px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden transition-colors duration-300">
      <div className="p-8">
        <div className="grid grid-cols-3 gap-8">
          {items.map((category, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg transition-colors duration-300">
                  <category.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">{category.category}</h3>
              </div>
              
              <div className="space-y-2">
                {category.items.map((item: any, itemIndex: number) => (
                  <a
                    key={itemIndex}
                    href="#"
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {item.name}
                      </span>
                      {item.popular && (
                        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded-full transition-colors duration-300">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{item.count}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 flex justify-between items-center transition-colors duration-300">
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Browse 500+ product categories</p>
          <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );

  // Render simple dropdown
  const renderDropdown = (items: any[]) => (
    <div className="absolute top-full left-0 mt-1 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden transition-colors duration-300">
      <div className="p-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick || (() => window.location.href = item.href)}
            className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300 w-full text-left"
          >
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
              <item.icon className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">{item.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </button>
        ))}
      </div>
    </div>
  );

  // Mobile menu component
  const renderMobileMenu = () => (
    <div className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ${
      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="bg-black/50 dark:bg-black/70 backdrop-blur-sm absolute inset-0 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)} />
      
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{t.menu}</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search products, suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Mobile Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100 dark:border-gray-800 pb-2 transition-colors duration-300">
                <button className="w-full text-left p-3 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300">
                  {item.label}
                </button>
                {item.type === 'dropdown' && item.items && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.items.map((subItem, index) => (
                      <a
                        key={index}
                        href={subItem.href}
                        className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors duration-300"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Auth */}
          <div className="mt-8 space-y-3">
            {isAuthenticated && user ? (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{t.welcome}, {user.name}</p>
                <button
                  onClick={onLogout}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  {t.login}
                </button>
                <button
                  onClick={onRegister}
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  {t.register}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            ref={(el) => (dropdownRefs.current[item.id] = el)}
          >
            <button 
              className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
              onClick={
                item.id === 'suppliers' ? onNavigateToSuppliers :
                item.id === 'network' ? onNavigateToNetwork :
                item.id === 'insights' ? onNavigateToInsights :
                undefined
              }
            >
              <span>{item.label}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                activeDropdown === item.id ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown Content */}
            {activeDropdown === item.id && (
              <>
                {item.type === 'mega' && item.items && renderMegaMenu(item.items)}
                {item.type === 'dropdown' && item.items && renderDropdown(item.items)}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu */}
      {renderMobileMenu()}

      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{t.languages[currentLanguage]}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {showLanguageDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
            {Object.entries(t.languages).map(([code, name]) => (
              <React.Fragment key={code}>
               {user && user.role === 'admin' && (
                  <button
                    onClick={() => {
                      window.history.pushState({}, '', '/admin');
                      window.location.reload();
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={() => {
                    changeLanguage(code as any);
                    setShowLanguageDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentLanguage === code 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {name}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Dark Mode Toggle */}
      <DarkModeToggle variant="dropdown" />

      {/* Auth Section */}
      <div className="flex items-center space-x-3">
        {isAuthenticated && user ? (
          <>
            <span className="hidden sm:inline text-sm text-gray-700">{t.welcome}, {user.name}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t.logout}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLogin}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t.login}
            </button>
            <button
              onClick={onRegister}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              {t.register}
            </button>
          </>
        )}
      </div>
    </>
  );
};