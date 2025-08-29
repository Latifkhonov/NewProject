import React from 'react';
import { Factory, Wrench } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Breadcrumb } from './Breadcrumb';
import { SearchBar } from './SearchBar';

export const ProductsServicesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb
            items={[
              { label: t.productsServices, active: true }
            ]}
            className="mb-4"
          />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 flex items-center">
                <Factory className="h-8 w-8 mr-3 text-blue-600 dark:text-blue-400" />
                {t.productsServices}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
                Explore the range of products and services available on our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar
            onSearch={() => {}}
            className="mb-6"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
          <Wrench className="h-16 w-16 text-blue-500 dark:text-blue-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.productsServices} Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We are actively curating a comprehensive catalog of products and services to meet your industrial needs.
            Please check back soon for updates!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            In the meantime, feel free to explore our other sections or contact support for specific inquiries.
          </p>
        </div>
      </div>
    </div>
  );
};