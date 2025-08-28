import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Globe, ChevronDown, Play, Star, Users, Building2, TrendingUp, Award, CheckCircle, ArrowRight, Phone, Mail, MapPin, Sparkles, Zap, Shield, Factory, Wrench, Truck, Settings } from 'lucide-react';
import { translations, Translations } from './translations';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { useAuth } from './hooks/useAuth';

type Language = 'en' | 'uz' | 'ru' | 'zh';

const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, initializeAuth, logout } = useAuth();

  const t: Translations = translations[currentLanguage];

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Custom CSS for Thomas Net style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Open Sans', sans-serif;
        }
        
        .thomas-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
        }
        
        .thomas-card {
          background: white;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .thomas-card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        
        .thomas-button {
          background: #dc2626;
          color: white;
          transition: all 0.3s ease;
        }
        
        .thomas-button:hover {
          background: #b91c1c;
          transform: translateY(-1px);
        }
        
        .thomas-search {
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .thomas-search:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .supplier-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .supplier-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        
        .breadcrumb {
          color: #6b7280;
          font-size: 0.875rem;
        }
        
        .breadcrumb a {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .breadcrumb a:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Header - Thomas Net Style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600 flex items-center">
                  <Factory className="h-8 w-8 mr-2" />
                  TopTaklif
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {/* Products & Services */}
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                  {t.productsServices}
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute top-full left-0 mt-2 w-96 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Industrial Products & Services</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Factory className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Manufacturing Equipment</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Industrial Machinery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Tools & Components</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Electronics</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Construction Materials</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Logistics Solutions</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                      <p className="text-xs text-gray-600">Browse over 500+ product categories from verified suppliers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suppliers */}
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                  {t.suppliers}
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute top-full left-0 mt-2 w-80 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Trusted Suppliers</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">15,000+ Verified Suppliers</p>
                          <p className="text-xs text-gray-600">All suppliers undergo rigorous verification</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Nationwide Coverage</p>
                          <p className="text-xs text-gray-600">Suppliers across all regions of Uzbekistan</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Award className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Quality Certified</p>
                          <p className="text-xs text-gray-600">ISO, CE, and local certifications verified</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                        Browse All Suppliers
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network */}
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                  {t.network}
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute top-full left-0 mt-2 w-72 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Network</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Active Members</span>
                        <span className="text-sm font-semibold text-blue-600">25,000+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Monthly Connections</span>
                        <span className="text-sm font-semibold text-green-600">50,000+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Success Rate</span>
                        <span className="text-sm font-semibold text-purple-600">94%</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                      <p className="text-xs text-gray-600 mb-3">Join Uzbekistan's largest B2B industrial network</p>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gray-100 text-gray-700 py-1.5 px-3 rounded text-xs font-medium hover:bg-gray-200 transition-colors">
                          Learn More
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                          Join Network
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                  {t.insights}
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute top-full left-0 mt-2 w-84 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">Industry Trends</span>
                        </div>
                        <p className="text-xs text-gray-600">Real-time market analysis and forecasting</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">Supplier Rankings</span>
                        </div>
                        <p className="text-xs text-gray-600">Performance metrics and quality ratings</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-gray-900">Price Intelligence</span>
                        </div>
                        <p className="text-xs text-gray-600">Competitive pricing and cost optimization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>{t.languages[currentLanguage]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {Object.entries(t.languages).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code as Language)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          currentLanguage === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                    className="thomas-button px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {t.register}
                  </button>
                </>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">
                  {t.productsServices}
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">
                  {t.suppliers}
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">
                  {t.network}
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">
                  {t.insights}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="breadcrumb">
            <a href="#">{t.home}</a> &gt; Industrial Suppliers
          </div>
        </div>
      </div>

      {/* Hero Section - Thomas Net Style */}
      <section className="thomas-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Industrial Suppliers in Uzbekistan
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Connect with verified suppliers, manufacturers, and distributors across all industrial sectors
            </p>
            
            {/* Search Bar - Thomas Net Style */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-lg p-2 shadow-lg">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="What product or service are you looking for?"
                      className="w-full pl-10 pr-4 py-3 text-gray-900 thomas-search rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location (City, Region)"
                      className="w-full pl-10 pr-4 py-3 text-gray-900 thomas-search rounded-md focus:outline-none"
                    />
                  </div>
                  <button className="thomas-button px-8 py-3 rounded-md font-semibold flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">15,000+</div>
                <div className="text-sm opacity-90">Verified Suppliers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">Product Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-sm opacity-90">Monthly Searches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories - Thomas Net Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
          
          <div className="category-grid">
            {[
              { name: 'Manufacturing & Processing', icon: Factory, count: '3,200+ suppliers', color: 'bg-blue-500' },
              { name: 'Industrial Equipment', icon: Settings, count: '2,800+ suppliers', color: 'bg-green-500' },
              { name: 'Materials & Components', icon: Wrench, count: '4,100+ suppliers', color: 'bg-purple-500' },
              { name: 'Transportation & Logistics', icon: Truck, count: '1,900+ suppliers', color: 'bg-orange-500' },
              { name: 'Electronics & Technology', icon: Zap, count: '2,400+ suppliers', color: 'bg-indigo-500' },
              { name: 'Construction & Building', icon: Building2, count: '3,600+ suppliers', color: 'bg-red-500' }
            ].map((category, index) => (
              <div key={index} className="thomas-card p-6 rounded-lg cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className={`${category.color} p-3 rounded-lg mr-4`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </div>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  View Suppliers <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Suppliers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Uzbekistan Steel Works', location: 'Tashkent', category: 'Steel Manufacturing', verified: true },
              { name: 'Central Asia Electronics', location: 'Samarkand', category: 'Electronics Components', verified: true },
              { name: 'Silk Road Textiles', location: 'Bukhara', category: 'Textile Manufacturing', verified: true },
              { name: 'Fergana Valley Machinery', location: 'Fergana', category: 'Industrial Equipment', verified: true },
              { name: 'Navoi Mining Solutions', location: 'Navoi', category: 'Mining Equipment', verified: true },
              { name: 'Andijan Auto Parts', location: 'Andijan', category: 'Automotive Components', verified: true }
            ].map((supplier, index) => (
              <div key={index} className="supplier-card">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                  {supplier.verified && (
                    <div className="flex items-center text-green-600 text-xs">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{supplier.category}</p>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {supplier.location}
                </p>
                <button className="w-full thomas-button py-2 rounded-md text-sm font-medium">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Search</h3>
              <p className="text-gray-600">Search our database of verified suppliers by product, service, or location</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Connect</h3>
              <p className="text-gray-600">Review supplier profiles and connect directly with the right companies</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Partner</h3>
              <p className="text-gray-600">Build lasting partnerships with trusted suppliers for your business needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 thomas-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Supplier?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of businesses connecting with suppliers in Uzbekistan</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Start Searching
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              List Your Company
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Factory className="h-6 w-6 mr-2" />
                TopTaklif
              </h3>
              <p className="text-gray-400 mb-4">{t.footerDescription}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.products}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.supplierSearch}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.rfqManagement}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.marketIntelligence}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.resources}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.industryInsights}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.webinars}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.supportCenter}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.company}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.aboutUs}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.careers}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.contact}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">{t.allRightsReserved}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{t.privacyPolicy}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{t.termsOfService}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            
            {authMode === 'login' ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={() => setAuthMode('register')}
              />
            ) : (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;