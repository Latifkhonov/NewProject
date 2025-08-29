import React from 'react';
import { Package, Clock, Building2, ArrowLeft } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { SearchBar } from './SearchBar';
import { useTranslation } from '../hooks/useTranslation';

const ProductsServicesPage: React.FC = () => {
  const t = useTranslation();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: t.home, href: '/' },
            { label: t.productsServices, href: '/products-services' }
          ]} 
        />
        
        <div className="mt-8">
          <SearchBar 
            placeholder={t.searchProductsServices}
            onSearch={() => {}}
          />
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.productsServices}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.comingSoon}! {t.productListingsWillBeAvailable}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-center mb-4">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Product Catalog
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Browse thousands of products from verified suppliers across various industries.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-center mb-4">
                <Building2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Service Directory
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Discover professional services from trusted providers in your region.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Real-time Updates
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get instant notifications about new products, services, and market changes.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Be the First to Know
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sign up to get notified when our product and service listings go live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsServicesPage;

export { ProductsServicesPage }