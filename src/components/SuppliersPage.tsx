import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, CheckCircle, Building2, Phone, Mail, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { SearchBar } from './SearchBar';
import { Breadcrumb } from './Breadcrumb';

interface Supplier {
  id: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  verified: boolean;
  description: string;
  specialties: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export const SuppliersPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleBack = () => {
    window.history.back();
  };

  // Mock suppliers data
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Uzbekistan Steel Works',
      location: 'Tashkent',
      category: 'Steel Manufacturing',
      rating: 4.8,
      verified: true,
      description: 'Leading steel manufacturer with 25+ years of experience in industrial steel production.',
      specialties: ['Steel Fabrication', 'Custom Alloys', 'Industrial Components'],
      contact: {
        phone: '+998 71 123 4567',
        email: 'info@uzsteelworks.uz',
        website: 'www.uzsteelworks.uz'
      }
    },
    {
      id: '2',
      name: 'Central Asia Electronics',
      location: 'Samarkand',
      category: 'Electronics Components',
      rating: 4.6,
      verified: true,
      description: 'Specialized in electronic components and PCB manufacturing for industrial applications.',
      specialties: ['PCB Manufacturing', 'Electronic Assembly', 'Testing Services'],
      contact: {
        phone: '+998 66 234 5678',
        email: 'sales@caelectronics.uz'
      }
    },
    {
      id: '3',
      name: 'Silk Road Textiles',
      location: 'Bukhara',
      category: 'Textile Manufacturing',
      rating: 4.7,
      verified: true,
      description: 'Premium textile manufacturer specializing in industrial fabrics and materials.',
      specialties: ['Industrial Fabrics', 'Technical Textiles', 'Custom Weaving'],
      contact: {
        phone: '+998 65 345 6789',
        email: 'orders@silkroadtextiles.uz',
        website: 'www.silkroadtextiles.uz'
      }
    }
  ];

  const categories = [
    'All Categories',
    'Steel Manufacturing',
    'Electronics Components',
    'Textile Manufacturing',
    'Industrial Equipment',
    'Automotive Components',
    'Chemical Processing'
  ];

  const locations = [
    'All Locations',
    'Tashkent',
    'Samarkand',
    'Bukhara',
    'Fergana',
    'Navoi',
    'Andijan'
  ];

  const handleSearch = (query: string, location: string, filters: any) => {
    setSearchQuery(query);
    setSelectedLocation(location);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesQuery = !searchQuery || 
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
      supplier.category === selectedCategory;
    
    const matchesLocation = !selectedLocation || selectedLocation === 'All Locations' || 
      supplier.location === selectedLocation;

    return matchesQuery && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb
            items={[
              { label: t.suppliers, active: true }
            ]}
          />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {t.suppliers}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
                {t.foundSuppliersIn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar
            onSearch={handleSearch}
            className="mb-6"
          />
          
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 min-w-48">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Showing {filteredSuppliers.length} of {suppliers.length} suppliers
          </p>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      {supplier.name}
                    </h3>
                    {supplier.verified && (
                      <div className="flex items-center text-green-600 dark:text-green-400 text-sm transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {t.verified}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {supplier.category}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {supplier.rating}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                {supplier.description}
              </p>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {supplier.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full transition-colors duration-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">
                {supplier.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {supplier.contact.phone}
                  </div>
                )}
                {supplier.contact.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {supplier.contact.email}
                  </div>
                )}
                {supplier.contact.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {supplier.contact.website}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center">
                  {t.viewProfile}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              {t.noResults}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {t.tryAgain}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};