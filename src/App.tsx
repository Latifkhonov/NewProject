import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Globe, ChevronDown, Play, Star, Users, Building2, TrendingUp, Award, CheckCircle, ArrowRight, Phone, Mail, MapPin, Sparkles, Zap, Shield } from 'lucide-react';
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

  useEffect(() => {
    // Enhanced fade-in animation for hero elements
    const heroElements = document.querySelectorAll('.hero-animate');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, index * 300);
    });

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.parallax-bg');
      if (parallax) {
        (parallax as HTMLElement).style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Custom CSS for stunning effects */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .hero-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stunning-gradient {
          background: linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.3), rgba(245, 87, 108, 0.3));
          filter: blur(40px);
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-orb:nth-child(1) {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .floating-orb:nth-child(2) {
          width: 200px;
          height: 200px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }
        
        .floating-orb:nth-child(3) {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 60%;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        .search-glow {
          box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
          transition: all 0.3s ease;
        }
        
        .search-glow:focus {
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3), 0 0 20px rgba(102, 126, 234, 0.2);
        }
        
        .magical-card {
          position: relative;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
        }
        
        .magical-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
          transition: left 0.6s ease;
        }
        
        .magical-card:hover::before {
          left: 100%;
        }
        
        .magical-card:hover {
          transform: translateY(-15px) scale(1.03);
          box-shadow: 0 30px 60px rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.4);
        }
        
        .icon-magic {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        
        .magical-card:hover .icon-magic {
          transform: scale(1.2) rotate(10deg);
          background: linear-gradient(135deg, #667eea, #764ba2);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .magical-card:hover .icon-magic svg {
          color: white;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
        
        .scribble-underline {
          position: relative;
          display: inline-block;
        }
        
        .scribble-underline::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 10'%3E%3Cpath d='M0,5 Q25,0 50,5 T100,5' stroke='%23667eea' stroke-width='3' fill='none'/%3E%3C/svg%3E") repeat-x;
          background-size: 100px 10px;
          opacity: 0;
          animation: scribbleDraw 2s ease-in-out 1s forwards;
        }
        
        @keyframes scribbleDraw {
          to {
            opacity: 1;
            background-position: 200px 0;
          }
        }
        
        .sparkle-text {
          position: relative;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sparkleShine 3s ease-in-out infinite;
        }
        
        @keyframes sparkleShine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            opacity: 1; 
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
          }
          50% { 
            opacity: 0.7; 
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
          }
        }
        
        .industry-card {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border: 1px solid rgba(102, 126, 234, 0.1);
        }
        
        .industry-card:hover {
          transform: translateY(-8px) scale(1.05);
          background: linear-gradient(145deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }
        
        .industry-card:hover .industry-emoji {
          transform: scale(1.3) rotate(10deg);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }
        
        .stats-counter {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          backdrop-filter: blur(15px);
          border: 1px solid rgba(102, 126, 234, 0.2);
          transition: all 0.3s ease;
        }
        
        .stats-counter:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.4);
        }
        
        .cta-button {
          background: linear-gradient(45deg, #667eea, #764ba2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        
        .parallax-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 120%;
          z-index: -1;
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .feature-list-item {
          transition: all 0.3s ease;
        }
        
        .magical-card:hover .feature-list-item {
          transform: translateX(8px);
        }
        
        .industry-emoji {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>

      {/* Header with enhanced glass morphism */}
      <header className="glass-morphism sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with sparkle effect */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2" />
                  TopTaklif
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                {t.productsServices}
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                {t.suppliers}
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                {t.network}
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                {t.insights}
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
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
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-300"
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
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                    className="cta-button text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {t.register}
                  </button>
                </>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-300">
                  {t.productsServices}
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-300">
                  {t.suppliers}
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-300">
                  {t.network}
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-300">
                  {t.insights}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with stunning gradient and floating orbs */}
      <section className="stunning-gradient text-white py-32 relative overflow-hidden">
        <div className="parallax-bg stunning-gradient"></div>
        
        {/* Floating orbs */}
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="hero-animate text-5xl md:text-7xl font-black mb-8 text-shadow-glow">
              <span className="scribble-underline">{t.heroTitle}</span>
            </h1>
            <p className="hero-animate text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-95 leading-relaxed">
              {t.heroSubtitle}
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="hero-animate max-w-3xl mx-auto mb-12">
              <div className="relative glass-morphism rounded-2xl p-2">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/70" />
                <input
                  type="text"
                  placeholder={t.searchNetwork}
                  className="w-full pl-16 pr-32 py-6 text-white bg-transparent rounded-xl search-glow focus:outline-none placeholder-white/70 text-lg"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 cta-button text-white px-8 py-3 rounded-xl font-semibold flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="hero-animate flex flex-col sm:flex-row gap-6 justify-center">
              <button className="glass-morphism text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                <Shield className="h-6 w-6 mr-3" />
                {t.searchNetwork}
              </button>
              <button className="border-2 border-white/30 glass-morphism text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                <Play className="h-6 w-6 mr-3" />
                {t.watchDemo}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scribble-underline">
              {t.statsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t.statsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center stats-counter p-8 rounded-2xl">
              <div className="text-5xl font-black sparkle-text mb-4">15,000+</div>
              <div className="text-xl font-bold text-gray-900 mb-2">{t.verifiedSuppliers}</div>
              <div className="text-gray-600">{t.acrossUzbekistan}</div>
            </div>
            <div className="text-center stats-counter p-8 rounded-2xl">
              <div className="text-5xl font-black sparkle-text mb-4">500+</div>
              <div className="text-xl font-bold text-gray-900 mb-2">{t.productCategories}</div>
              <div className="text-gray-600">{t.fromAerospaceToTextiles}</div>
            </div>
            <div className="text-center stats-counter p-8 rounded-2xl">
              <div className="text-5xl font-black sparkle-text mb-4">50,000+</div>
              <div className="text-xl font-bold text-gray-900 mb-2">{t.monthlySearches}</div>
              <div className="text-gray-600">{t.byQualifiedBuyers}</div>
            </div>
            <div className="text-center stats-counter p-8 rounded-2xl">
              <div className="text-5xl font-black sparkle-text mb-4">30+</div>
              <div className="text-xl font-bold text-gray-900 mb-2">{t.yearsExperience}</div>
              <div className="text-gray-600">{t.industryExpertise}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scribble-underline sparkle-text">
              {t.featuresTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="magical-card p-10 rounded-3xl shadow-xl">
              <div className="icon-magic w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 scribble-underline">{t.advancedSearch}</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{t.advancedSearchDesc}</p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 pulse-glow"></div>
                  {t.geographicProximity}
                </li>
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 pulse-glow"></div>
                  {t.certificationFiltering}
                </li>
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 pulse-glow"></div>
                  {t.capabilityMatching}
                </li>
              </ul>
            </div>

            <div className="magical-card p-10 rounded-3xl shadow-xl" style={{animationDelay: '0.2s'}}>
              <div className="icon-magic w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 scribble-underline">{t.verifiedProfiles}</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{t.verifiedProfilesDesc}</p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4 pulse-glow"></div>
                  {t.thirdPartyVerification}
                </li>
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4 pulse-glow"></div>
                  {t.realTimeUpdates}
                </li>
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4 pulse-glow"></div>
                  {t.comprehensiveProfiles}
                </li>
              </ul>
            </div>

            <div className="magical-card p-10 rounded-3xl shadow-xl" style={{animationDelay: '0.4s'}}>
              <div className="icon-magic w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 scribble-underline">{t.marketIntelligence}</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{t.marketIntelligenceDesc}</p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 pulse-glow"></div>
                  {t.industryTrendAnalysis}
                </li>
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 pulse-glow"></div>
                  {t.supplierPerformanceMetrics}
                </li>
                <li className="flex items-center text-gray-600 feature-list-item">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 pulse-glow"></div>
                  {t.competitiveIntelligence}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Industry Coverage */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scribble-underline sparkle-text">
              {t.industryCoverageTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t.industryCoverageSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: t.aerospace, count: '1,200+', icon: '✈️' },
              { name: t.automotive, count: '2,800+', icon: '🚗' },
              { name: t.electronics, count: '3,500+', icon: '💻' },
              { name: t.medical, count: '800+', icon: '🏥' },
              { name: t.energy, count: '1,500+', icon: '⚡' },
              { name: t.construction, count: '2,200+', icon: '🏗️' },
              { name: t.foodBeverage, count: '1,800+', icon: '🍽️' },
              { name: t.chemicals, count: '900+', icon: '🧪' },
              { name: t.textiles, count: '1,600+', icon: '🧵' },
              { name: t.packaging, count: '700+', icon: '📦' },
              { name: t.mining, count: '400+', icon: '⛏️' },
              { name: t.agriculture, count: '1,100+', icon: '🌾' }
            ].map((industry, index) => (
              <div key={index} className="industry-card p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl mb-4 industry-emoji">{industry.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{industry.name}</h3>
                <p className="text-blue-600 font-bold text-lg">{industry.count} {t.suppliersCount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 stunning-gradient text-white relative overflow-hidden">
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-shadow-glow scribble-underline">
            {t.ctaTitle}
          </h2>
          <p className="text-xl mb-12 max-w-4xl mx-auto opacity-95 leading-relaxed">
            {t.ctaSubtitle}
          </p>
          <button className="cta-button text-white px-12 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto">
            <Sparkles className="h-6 w-6 mr-3" />
            {t.scheduleDemo}
          </button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-3xl font-bold sparkle-text mb-6 flex items-center">
                <Sparkles className="h-8 w-8 mr-3" />
                TopTaklif
              </h3>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">{t.footerDescription}</p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <Mail className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <Phone className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <MapPin className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl">{t.products}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.supplierSearch}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.rfqManagement}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.marketIntelligence}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl">{t.resources}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.industryInsights}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.webinars}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.supportCenter}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl">{t.company}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.aboutUs}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.careers}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.press}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2">{t.contact}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">{t.allRightsReserved}</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">{t.privacyPolicy}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">{t.termsOfService}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105">{t.cookiePolicy}</a>
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
              className="absolute -top-4 -right-4 glass-morphism rounded-full p-3 shadow-lg hover:bg-white/20 transition-all duration-300 z-10"
            >
              <X className="h-5 w-5 text-white" />
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