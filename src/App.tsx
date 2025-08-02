import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Search, Building2, FileText, BarChart3, Users, Star, MapPin, Shield, Filter, ChevronRight, Menu, X, Globe, Award, TrendingUp, CheckCircle, ArrowRight, Play, Download, Calendar, Mail, Phone, ExternalLink, Languages, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { translations, Translations } from './translations';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { user, isAuthenticated, logout, initializeAuth } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showRFQForm, setShowRFQForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLNavElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize auth on component mount
  useEffect(() => {
    initializeAuth();
    
    // Header entrance animation
    if (headerRef.current) {
      anime({
        targets: headerRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }

    // Logo animation
    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        scale: [0.8, 1],
        rotate: [0, 360],
        duration: 1200,
        easing: 'easeOutElastic(1, .8)',
        delay: 300
      });
    }

    // Navigation items stagger animation
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll('button');
      anime({
        targets: navItems,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutQuart'
      });
    }

    // Avatar pulse animation (if authenticated)
    if (avatarRef.current && isAuthenticated) {
      anime({
        targets: avatarRef.current,
        scale: [0, 1],
        duration: 600,
        easing: 'easeOutBack',
        delay: 800,
        complete: () => {
          // Continuous subtle pulse
          anime({
            targets: avatarRef.current,
            scale: [1, 1.05, 1],
            duration: 2000,
            loop: true,
            easing: 'easeInOutSine'
          });
        }
      });
    }
  }, [initializeAuth]);

  // Avatar animation when authentication state changes
  useEffect(() => {
    if (avatarRef.current && isAuthenticated) {
      anime({
        targets: avatarRef.current,
        scale: [0, 1.2, 1],
        rotate: [0, 360],
        duration: 800,
        easing: 'easeOutBack'
      });
    }
  }, [isAuthenticated]);

  const t: Translations = translations[currentLanguage];

  const handleNavigation = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const handleSearch = () => {
    setCurrentView('search-results');
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setCurrentView('industry-suppliers');
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    if (plan === 'free') {
      setCurrentView('registration');
    } else if (plan === 'professional') {
      setCurrentView('trial-signup');
    } else {
      setShowContactForm(true);
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    setShowLanguageSelector(false);
  };

  const handleLoginSuccess = () => {
    setCurrentView('home');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('home');
  };

  const handleLogout = () => {
    // Logout animation
    if (avatarRef.current) {
      anime({
        targets: avatarRef.current,
        scale: [1, 0],
        rotate: [0, -180],
        duration: 400,
        easing: 'easeInBack',
        complete: () => {
          logout();
          setShowUserDropdown(false);
        }
      });
    } else {
      logout();
      setShowUserDropdown(false);
    }
  };

  const handleNavClick = (view: string) => {
    // Navigation click animation
    anime({
      targets: headerRef.current,
      scale: [1, 0.98, 1],
      duration: 200,
      easing: 'easeOutQuart',
      complete: () => {
        setCurrentView(view);
      }
    });
  };

  const handleDropdownToggle = () => {
    if (!showUserDropdown && dropdownRef.current) {
      setShowUserDropdown(true);
      // Dropdown entrance animation
      anime({
        targets: dropdownRef.current,
        translateY: [-10, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 300,
        easing: 'easeOutQuart'
      });
    } else {
      // Dropdown exit animation
      if (dropdownRef.current) {
        anime({
          targets: dropdownRef.current,
          translateY: [0, -10],
          opacity: [1, 0],
          scale: [1, 0.95],
          duration: 200,
          easing: 'easeInQuart',
          complete: () => {
            setShowUserDropdown(false);
          }
        });
      } else {
        setShowUserDropdown(false);
      }
    }
  };

  const originalHandleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderLanguageSelector = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{t.selectLanguage}</h3>
          <button 
            onClick={() => setShowLanguageSelector(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-3">
          {Object.entries(t.languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                currentLanguage === code 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{name}</span>
                {currentLanguage === code && (
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <header 
      ref={headerRef}
      className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50"
      style={{ 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div ref={logoRef} className="flex items-center cursor-pointer" onClick={() => handleNavigation('home')}>
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TopTaklif</span>
          </div>
          
          <nav ref={navRef} className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavClick('products')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t.productsServices}
            </button>
            <button 
              onClick={() => handleNavClick('suppliers')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'suppliers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t.suppliers}
            </button>
            <button 
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t.network}
            </button>
            <button 
              onClick={() => handleNavClick('insights')}
            >
              Insights
            </button>
            <button 
              onClick={() => handleNavClick('cad-models')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'cad-models' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              CAD Models
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div ref={avatarRef} className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name ? getUserInitials(user.name) : 'U'}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.companyName}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                
                {showUserDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 py-2 z-50"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                          {user?.name ? getUserInitials(user.name) : 'U'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user?.name}</div>
                          <div className="text-sm text-gray-500">{user?.email}</div>
                          <div className="text-xs text-gray-400">{user?.companyName}</div>
                        </div>
                      </div>
                      {user?.role && (
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'buyer' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'buyer' ? 'Buyer' : 'Supplier'}
                          </span>
                          {user.isVerified && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          handleNavClick('profile');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="h-4 w-4 mr-3" />
                        View Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          handleNavClick('settings');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Account Settings
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          handleNavClick('dashboard');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <BarChart3 className="h-4 w-4 mr-3" />
                        Dashboard
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          handleLogout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => handleNavClick('login')}
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                >
                  Log In
                </button>
                <button 
                  onClick={() => handleNavClick('registration')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Register
                </button>
              </>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => handleNavigation('products')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {t.productsServices}
            </button>
            <button 
              onClick={() => handleNavigation('suppliers')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'suppliers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t.suppliers}
            </button>
            <button 
              onClick={() => handleNavigation('home')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t.network}
            </button>
            <button 
              onClick={() => handleNavigation('insights')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'insights' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t.insights}
            </button>
            <button 
              onClick={() => handleNavigation('cad-models')}
              className={`px-3 py-2 text-sm font-medium ${currentView === 'cad-models' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t.cadModels}
            </button>
            
            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                    {user?.name ? getUserInitials(user.name) : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.companyName}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigation('profile')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleNavigation('dashboard')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );

  const renderSearchResults = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.searchResultsFor} "{searchQuery}"</h2>
        <p className="text-gray-600">{t.foundSuppliersIn}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Uzbekistan Steel Works', location: 'Tashkent, Uzbekistan', category: 'Steel Manufacturing', verified: true },
          { name: 'Samarkand Textiles Ltd', location: 'Samarkand, Uzbekistan', category: 'Textile Manufacturing', verified: true },
          { name: 'Bukhara Chemical Industries', location: 'Bukhara, Uzbekistan', category: 'Chemical Processing', verified: false },
          { name: 'Fergana Valley Electronics', location: 'Fergana, Uzbekistan', category: 'Electronics Manufacturing', verified: true },
          { name: 'Andijan Auto Parts', location: 'Andijan, Uzbekistan', category: 'Automotive Components', verified: true },
          { name: 'Nukus Energy Solutions', location: 'Nukus, Uzbekistan', category: 'Energy Equipment', verified: false }
        ].map((supplier, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
              {supplier.verified && (
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t.verified}
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{supplier.category}</p>
            <p className="text-gray-500 text-sm mb-4 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {supplier.location}
            </p>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                {t.viewProfile}
              </button>
              <button 
                onClick={() => setShowRFQForm(true)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                {t.sendRfq}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDemo = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{t.platformDemo}</h3>
          <button 
            onClick={() => setShowDemo(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <Play className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{t.demoVideo}</h4>
          <p className="text-gray-600 mb-6">
            {t.demoDescription}
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {t.playDemo}
          </button>
        </div>
      </div>
    </div>
  );

  const renderRFQForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{t.sendRfq}</h3>
          <button 
            onClick={() => setShowRFQForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.productService}</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder={t.whatDoYouNeed} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.quantity}</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder={t.requiredQuantity} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.timeline}</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>{t.asap}</option>
              <option>{t.withinOneWeek}</option>
              <option>{t.withinOneMonth}</option>
              <option>{t.withinThreeMonths}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.additionalDetails}</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} placeholder={t.specificationsRequirements}></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.sendRfq}
          </button>
        </form>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{t.contactSales}</h3>
          <button 
            onClick={() => setShowContactForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.companyName}</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.yourName}</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
            <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.companySize}</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>{t.employees1to10}</option>
              <option>{t.employees11to50}</option>
              <option>{t.employees51to200}</option>
              <option>{t.employees200plus}</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.contactSales}
          </button>
        </form>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button onClick={() => handleNavigation('home')} className="hover:text-blue-600">{t.home}</button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">{t.network}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {t.searchNetwork}
                </button>
                <button 
                  onClick={() => setShowDemo(true)}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {t.watchDemo}
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Industrial Network"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">50,000+</div>
                    <div className="text-sm text-gray-600">{t.verifiedSuppliers}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.statsTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t.statsSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">{t.verifiedSuppliers}</div>
              <div className="text-sm text-gray-500 mt-1">{t.acrossUzbekistan}</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600 font-medium">{t.productCategories}</div>
              <div className="text-sm text-gray-500 mt-1">{t.fromAerospaceToTextiles}</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">200K+</div>
              <div className="text-gray-600 font-medium">{t.monthlySearches}</div>
              <div className="text-sm text-gray-500 mt-1">{t.byQualifiedBuyers}</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600 font-medium">{t.yearsExperience}</div>
              <div className="text-sm text-gray-500 mt-1">{t.industryExpertise}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Features */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.featuresSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.advancedSearch}</h3>
              <p className="text-gray-600 mb-4">
                {t.advancedSearchDesc}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.geographicProximity}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.certificationFiltering}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.capabilityMatching}
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.verifiedProfiles}</h3>
              <p className="text-gray-600 mb-4">
                {t.verifiedProfilesDesc}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.thirdPartyVerification}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.realTimeUpdates}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.comprehensiveProfiles}
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.marketIntelligence}</h3>
              <p className="text-gray-600 mb-4">
                {t.marketIntelligenceDesc}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.industryTrendAnalysis}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.supplierPerformanceMetrics}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {t.competitiveIntelligence}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Coverage */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.industryCoverageTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.industryCoverageSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: t.aerospace, icon: '✈️', count: '1,250+' },
              { name: t.automotive, icon: '🚗', count: '2,500+' },
              { name: t.electronics, icon: '💻', count: '1,800+' },
              { name: t.medical, icon: '🏥', count: '850+' },
              { name: t.energy, icon: '⚡', count: '1,500+' },
              { name: t.construction, icon: '🏗️', count: '2,200+' },
              { name: t.foodBeverage, icon: '🍽️', count: '950+' },
              { name: t.chemicals, icon: '🧪', count: '1,100+' },
              { name: t.textiles, icon: '🧵', count: '3,500+' },
              { name: t.packaging, icon: '📦', count: '1,350+' },
              { name: t.mining, icon: '⛏️', count: '600+' },
              { name: t.agriculture, icon: '🌾', count: '2,450+' }
            ].map((industry, index) => (
              <button 
                key={index} 
                onClick={() => handleIndustrySelect(industry.name)}
                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="text-3xl mb-2">{industry.icon}</div>
                <div className="font-semibold text-gray-900 text-sm">{industry.name}</div>
                <div className="text-xs text-gray-600">{industry.count} {t.suppliersCount}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.successStoriesTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.successStoriesSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/5691608/pexels-photo-5691608.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop" 
                  alt="Company Logo"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Uzbekistan Airways</div>
                  <div className="text-sm text-gray-600">National Airline</div>
                </div>
              </div>
              <blockquote className="text-gray-600 italic mb-4">
                "TopTaklif Network helped us reduce sourcing time by 60% and identify 3 new strategic suppliers that improved our supply chain resilience."
              </blockquote>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="h-4 w-4 mr-1" />
                <span>60% {t.fasterSourcing}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/5691624/pexels-photo-5691624.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop" 
                  alt="Company Logo"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Tashkent Medical</div>
                  <div className="text-sm text-gray-600">Healthcare Equipment</div>
                </div>
              </div>
              <blockquote className="text-gray-600 italic mb-4">
                "The verified supplier network gave us confidence in our sourcing decisions. We found ISO 13485 certified suppliers within 24 hours."
              </blockquote>
              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>24-hour {t.supplierIdentification}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/5691630/pexels-photo-5691630.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop" 
                  alt="Company Logo"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Uzbekenergo</div>
                  <div className="text-sm text-gray-600">Energy Company</div>
                </div>
              </div>
              <blockquote className="text-gray-600 italic mb-4">
                "Market intelligence from TopTaklif helped us negotiate better terms and identify cost-saving opportunities worth $500K annually."
              </blockquote>
              <div className="flex items-center text-sm text-gray-500">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>$500K {t.annualSavings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Access Plans */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.pricingTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.pricingSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.basicAccess}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">{t.free}</div>
                <div className="text-gray-600">{t.limitedSearchAccess}</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.basicSupplierSearch}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.companyContactInfo}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">5 {t.searchesPerMonth}</span>
                </li>
              </ul>
              <button 
                onClick={() => handlePlanSelect('free')}
                className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                {t.getStarted}
              </button>
            </div>

            <div className="bg-white border-2 border-blue-500 rounded-lg p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {t.mostPopular}
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.professional}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">$99</div>
                <div className="text-gray-600">{t.perMonth}</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.unlimitedSupplierSearch}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.advancedFilteringAnalytics}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.rfqManagementTools}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.marketIntelligenceReports}</span>
                </li>
              </ul>
              <button 
                onClick={() => handlePlanSelect('professional')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {t.startFreeTrial}
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.enterprise}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">{t.custom}</div>
                <div className="text-gray-600">{t.tailoredSolutions}</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.everythingInProfessional}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.apiAccessIntegrations}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.dedicatedAccountManager}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{t.customReportingAnalytics}</span>
                </li>
              </ul>
              <button 
                onClick={() => handlePlanSelect('enterprise')}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                {t.contactSales}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.resourcesTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.resourcesSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button 
              onClick={() => window.open('#', '_blank')}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.buyersGuide}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.buyersGuideDesc}</p>
              <div className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                {t.downloadPdf}
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </button>

            <button 
              onClick={() => handleNavigation('webinars')}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.webinarSeries}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.webinarSeriesDesc}</p>
              <div className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                {t.viewSchedule}
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </button>

            <button 
              onClick={() => handleNavigation('reports')}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.marketReports}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.marketReportsDesc}</p>
              <div className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                {t.browseReports}
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </button>

            <button 
              onClick={() => handleNavigation('support')}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.supportCenter}</h3>
              <p className="text-gray-600 text-sm mb-4">{t.supportCenterDesc}</p>
              <div className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                {t.contactSupport}
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handlePlanSelect('professional')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {t.scheduleDemo}
            </button>
            <button 
              onClick={() => setShowDemo(true)}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              {t.watchDemo}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">TopTaklif</span>
              </div>
              <p className="text-gray-400 mb-4">
                {t.footerDescription}
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white">
                  <Globe className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => window.location.href = 'mailto:toptaklif@gmail.com'}
                  className="text-gray-400 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => window.location.href = 'tel:+998712345678'}
                  className="text-gray-400 hover:text-white"
                >
                  <Phone className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t.products}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavigation('search')} className="hover:text-white">{t.supplierSearch}</button></li>
                <li><button onClick={() => setShowRFQForm(true)} className="hover:text-white">{t.rfqManagement}</button></li>
                <li><button onClick={() => handleNavigation('insights')} className="hover:text-white">Market Intelligence</button></li>
                <li><button onClick={() => handleNavigation('cad-models')} className="hover:text-white">{t.cadModels}</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t.resources}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavigation('insights')} className="hover:text-white">{t.industryInsights}</button></li>
                <li><button onClick={() => window.open('#', '_blank')} className="hover:text-white">{t.buyersGuide}</button></li>
                <li><button onClick={() => handleNavigation('webinars')} className="hover:text-white">{t.webinars}</button></li>
                <li><button onClick={() => handleNavigation('support')} className="hover:text-white">{t.supportCenter}</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t.company}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavigation('about')} className="hover:text-white">{t.aboutUs}</button></li>
                <li><button onClick={() => handleNavigation('careers')} className="hover:text-white">{t.careers}</button></li>
                <li><button onClick={() => handleNavigation('press')} className="hover:text-white">{t.press}</button></li>
                <li><button onClick={() => setShowContactForm(true)} className="hover:text-white">{t.contact}</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t.allRightsReserved}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => handleNavigation('privacy')} className="text-gray-400 hover:text-white text-sm">{t.privacyPolicy}</button>
              <button onClick={() => handleNavigation('terms')} className="text-gray-400 hover:text-white text-sm">{t.termsOfService}</button>
              <button onClick={() => handleNavigation('cookies')} className="text-gray-400 hover:text-white text-sm">{t.cookiePolicy}</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      {renderHeader()}
      
      {/* Click outside to close dropdown */}
      {showUserDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserDropdown(false)}
        />
      )}
      
      {currentView === 'home' && renderHomePage()}
      {currentView === 'search-results' && renderSearchResults()}
      
      {/* Authentication Pages */}
      {currentView === 'login' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <LoginForm 
            onSuccess={handleLoginSuccess}
            onSwitchToRegister={() => handleNavigation('registration')}
          />
        </div>
      )}
      
      {currentView === 'registration' && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <RegisterForm 
            onSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => handleNavigation('login')}
          />
        </div>
      )}
      
      {/* Modals */}
      {showDemo && renderDemo()}
      {showRFQForm && renderRFQForm()}
      {showContactForm && renderContactForm()}
      {showLanguageSelector && renderLanguageSelector()}
      
      {/* Simple placeholder views for other pages */}
      {currentView !== 'home' && 
       currentView !== 'search-results' && 
       currentView !== 'login' && 
       currentView !== 'registration' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')} Page
          </h1>
          <p className="text-gray-600 mb-8">This page is under construction.</p>
          <button 
            onClick={() => handleNavigation('home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Network
          </button>
        </div>
      )}
    </div>
  );
};

export default App;