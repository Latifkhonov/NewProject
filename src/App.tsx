import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Play, Star, Users, Building2, TrendingUp, Award, CheckCircle, ArrowRight, Phone, Mail, MapPin, Sparkles, Zap, Shield, Factory, Wrench, Truck, Settings, Search } from 'lucide-react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Navigation } from './components/Navigation';
import { Breadcrumb } from './components/Breadcrumb';
import { SearchBar } from './components/SearchBar';
import { useAuth } from './hooks/useAuth';
import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, initializeAuth, logout } = useAuth();


  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);


  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (query: string, location: string, filters: any) => {
    console.log('Search:', { query, location, filters });
    // Implement search logic here
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

            {/* Navigation Component */}
            <Navigation
              isAuthenticated={isAuthenticated}
              user={user}
              onLogin={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              onRegister={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: t.suppliers, active: true }
            ]}
          />
        </div>
      </div>

      {/* Hero Section - Thomas Net Style */}
      <section className="thomas-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {t.heroSubtitle}
            </p>
            
            {/* Enhanced Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              className="max-w-4xl mx-auto mb-8"
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">15,000+</div>
                <div className="text-sm opacity-90">{t.verifiedSuppliers}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">{t.productCategories}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-sm opacity-90">{t.monthlySearches}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories - Thomas Net Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.popularCategories}</h2>
          
          <div className="category-grid">
            {[
              { name: t.manufacturing || 'Manufacturing & Processing', icon: Factory, count: `3,200+ ${t.suppliersCount}`, color: 'bg-blue-500' },
              { name: t.industrialEquipment || 'Industrial Equipment', icon: Settings, count: `2,800+ ${t.suppliersCount}`, color: 'bg-green-500' },
              { name: t.materials || 'Materials & Components', icon: Wrench, count: `4,100+ ${t.suppliersCount}`, color: 'bg-purple-500' },
              { name: t.transportation || 'Transportation & Logistics', icon: Truck, count: `1,900+ ${t.suppliersCount}`, color: 'bg-orange-500' },
              { name: t.electronics, icon: Zap, count: `2,400+ ${t.suppliersCount}`, color: 'bg-indigo-500' },
              { name: t.construction, icon: Building2, count: `3,600+ ${t.suppliersCount}`, color: 'bg-red-500' }
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
                  {t.viewProfile} <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.featuredSuppliers}</h2>
          
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
                      {t.verified}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{supplier.category}</p>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {supplier.location}
                </p>
                <button className="w-full thomas-button py-2 rounded-md text-sm font-medium">
                  {t.viewProfile}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.howItWorks}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. {t.search}</h3>
              <p className="text-gray-600">{t.searchDescription}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. {t.connect}</h3>
              <p className="text-gray-600">{t.connectDescription}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. {t.partner}</h3>
              <p className="text-gray-600">{t.partnerDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 thomas-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t.readyToFind}</h2>
          <p className="text-xl mb-8 opacity-90">{t.joinThousands}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              {t.startSearching}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t.listYourCompany}
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