import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Award, 
  Building2, 
  MapPin, 
  Calendar, 
  Download, 
  Filter, 
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  Share2,
  Bookmark,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  Target,
  Globe,
  Users,
  Factory,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { SearchBar } from './SearchBar';
import { Breadcrumb } from './Breadcrumb';

interface MarketReport {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  author: string;
  summary: string;
  keyFindings: string[];
  downloadCount: number;
  rating: number;
  isPremium: boolean;
  tags: string[];
}

interface PriceData {
  id: string;
  product: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  unit: string;
}

interface SupplierRanking {
  id: string;
  name: string;
  location: string;
  category: string;
  score: number;
  rank: number;
  previousRank: number;
  metrics: {
    quality: number;
    delivery: number;
    pricing: number;
    service: number;
  };
  verified: boolean;
}

interface IndustryNews {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  source: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export const InsightsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'reports' | 'pricing' | 'rankings' | 'news'>('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleBack = () => {
    window.history.back();
  };

  // Mock market reports data
  const marketReports: MarketReport[] = [
    {
      id: '1',
      title: 'Uzbekistan Steel Industry Outlook 2024',
      category: 'Steel & Metals',
      publishDate: '2024-01-15',
      author: 'Industrial Research Institute',
      summary: 'Comprehensive analysis of the steel industry in Uzbekistan, covering market trends, production capacity, and future growth projections.',
      keyFindings: [
        '15% growth in steel production capacity',
        'Increased demand from construction sector',
        'New environmental regulations impact',
        'Export opportunities in Central Asia'
      ],
      downloadCount: 1247,
      rating: 4.8,
      isPremium: false,
      tags: ['Steel', 'Manufacturing', 'Export', 'Growth']
    },
    {
      id: '2',
      title: 'Electronics Manufacturing Trends Q4 2023',
      category: 'Electronics',
      publishDate: '2024-01-10',
      author: 'Tech Market Analytics',
      summary: 'Latest trends in electronics manufacturing, including automation adoption, supply chain optimization, and emerging technologies.',
      keyFindings: [
        'Automation adoption increased by 25%',
        'Supply chain resilience improvements',
        'Growing demand for IoT components',
        'Skilled workforce development needs'
      ],
      downloadCount: 892,
      rating: 4.6,
      isPremium: true,
      tags: ['Electronics', 'Automation', 'IoT', 'Technology']
    },
    {
      id: '3',
      title: 'Textile Industry Digital Transformation',
      category: 'Textiles',
      publishDate: '2024-01-05',
      author: 'Uzbekistan Textile Association',
      summary: 'How digital technologies are reshaping the textile industry in Uzbekistan, from smart manufacturing to e-commerce integration.',
      keyFindings: [
        'Digital adoption rate at 60%',
        'E-commerce sales growth of 40%',
        'Smart manufacturing investments',
        'Sustainability initiatives impact'
      ],
      downloadCount: 634,
      rating: 4.7,
      isPremium: false,
      tags: ['Textiles', 'Digital', 'E-commerce', 'Sustainability']
    }
  ];

  // Mock pricing data
  const pricingData: PriceData[] = [
    {
      id: '1',
      product: 'Steel Rebar (Grade 60)',
      category: 'Steel & Metals',
      currentPrice: 850,
      previousPrice: 820,
      change: 30,
      changePercent: 3.7,
      trend: 'up',
      lastUpdated: '2024-01-15T10:30:00Z',
      unit: 'USD/ton'
    },
    {
      id: '2',
      product: 'Aluminum Sheets (6061-T6)',
      category: 'Metals',
      currentPrice: 2150,
      previousPrice: 2200,
      change: -50,
      changePercent: -2.3,
      trend: 'down',
      lastUpdated: '2024-01-15T09:15:00Z',
      unit: 'USD/ton'
    },
    {
      id: '3',
      product: 'Cotton Yarn (40s)',
      category: 'Textiles',
      currentPrice: 4.2,
      previousPrice: 4.2,
      change: 0,
      changePercent: 0,
      trend: 'stable',
      lastUpdated: '2024-01-15T08:45:00Z',
      unit: 'USD/kg'
    }
  ];

  // Mock supplier rankings
  const supplierRankings: SupplierRanking[] = [
    {
      id: '1',
      name: 'Uzbekistan Steel Works',
      location: 'Tashkent',
      category: 'Steel Manufacturing',
      score: 94.5,
      rank: 1,
      previousRank: 2,
      metrics: {
        quality: 96,
        delivery: 94,
        pricing: 92,
        service: 95
      },
      verified: true
    },
    {
      id: '2',
      name: 'Central Asia Electronics',
      location: 'Samarkand',
      category: 'Electronics',
      score: 92.8,
      rank: 2,
      previousRank: 1,
      metrics: {
        quality: 94,
        delivery: 91,
        pricing: 93,
        service: 93
      },
      verified: true
    },
    {
      id: '3',
      name: 'Silk Road Textiles',
      location: 'Bukhara',
      category: 'Textiles',
      score: 91.2,
      rank: 3,
      previousRank: 3,
      metrics: {
        quality: 92,
        delivery: 90,
        pricing: 91,
        service: 92
      },
      verified: true
    }
  ];

  // Mock industry news
  const industryNews: IndustryNews[] = [
    {
      id: '1',
      title: 'Uzbekistan Announces New Industrial Zone in Tashkent',
      summary: 'Government unveils plans for a 500-hectare industrial zone focused on high-tech manufacturing and export-oriented industries.',
      category: 'Government Policy',
      publishDate: '2024-01-14',
      source: 'Industrial Times Uzbekistan',
      readTime: 3,
      tags: ['Government', 'Industrial Zone', 'Manufacturing', 'Investment'],
      featured: true
    },
    {
      id: '2',
      title: 'Steel Prices Show Upward Trend in Central Asia',
      summary: 'Regional steel prices have increased by 5% over the past month due to increased construction activity and infrastructure projects.',
      category: 'Market Analysis',
      publishDate: '2024-01-13',
      source: 'Metal Market Weekly',
      readTime: 2,
      tags: ['Steel', 'Pricing', 'Construction', 'Infrastructure'],
      featured: false
    },
    {
      id: '3',
      title: 'Electronics Sector Sees Record Investment in Q4 2023',
      summary: 'Foreign direct investment in Uzbekistan\'s electronics sector reached $120 million in the fourth quarter, marking a 40% increase year-over-year.',
      category: 'Investment',
      publishDate: '2024-01-12',
      source: 'Tech Investment Journal',
      readTime: 4,
      tags: ['Electronics', 'Investment', 'FDI', 'Growth'],
      featured: true
    }
  ];

  const handleSearch = (query: string, location: string, filters: any) => {
    setSearchQuery(query);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      case 'stable': return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) return { icon: ArrowUp, color: 'text-green-500', text: `+${previous - current}` };
    if (current > previous) return { icon: ArrowDown, color: 'text-red-500', text: `-${current - previous}` };
    return { icon: Minus, color: 'text-gray-500', text: '0' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.back}</span>
            </button>
          </div>
          
          <Breadcrumb
            items={[
              { label: t.insights, active: true }
            ]}
          />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 flex items-center">
                <TrendingUp className="h-8 w-8 mr-3 text-blue-600 dark:text-blue-400" />
                {t.insights}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
                Market intelligence and industry analysis for informed decision making
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar
            onSearch={handleSearch}
            className="mb-6"
          />
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { id: 'reports', label: 'Market Reports', icon: BarChart3 },
              { id: 'pricing', label: 'Price Intelligence', icon: DollarSign },
              { id: 'rankings', label: 'Supplier Rankings', icon: Award },
              { id: 'news', label: 'Industry News', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Market Reports</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Categories</option>
                  <option value="steel">Steel & Metals</option>
                  <option value="electronics">Electronics</option>
                  <option value="textiles">Textiles</option>
                  <option value="automotive">Automotive</option>
                </select>
                <button className="flex items-center space-x-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export All</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {marketReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{report.title}</h3>
                        {report.isPremium && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{report.summary}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Findings:</h4>
                    <ul className="space-y-1">
                      {report.keyFindings.slice(0, 3).map((finding, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(report.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {report.downloadCount}
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-yellow-500" />
                        {report.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    {report.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Intelligence Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Price Intelligence</h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {pricingData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{item.product}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            ${item.currentPrice.toLocaleString()} {item.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                            {item.change > 0 ? '+' : ''}{item.change} ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getTrendIcon(item.trend)}
                            <span className={`ml-2 text-sm ${getTrendColor(item.trend)}`}>
                              {item.trend}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(item.lastUpdated).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Supplier Rankings Tab */}
        {activeTab === 'rankings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Supplier Rankings</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Updated monthly based on performance metrics
              </div>
            </div>

            <div className="space-y-4">
              {supplierRankings.map((supplier) => {
                const rankChange = getRankChange(supplier.rank, supplier.previousRank);
                const RankIcon = rankChange.icon;

                return (
                  <div
                    key={supplier.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">#{supplier.rank}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{supplier.name}</h3>
                            {supplier.verified && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {supplier.location}
                            </div>
                            <div className="flex items-center">
                              <Building2 className="h-4 w-4 mr-1" />
                              {supplier.category}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{supplier.score}</div>
                        <div className={`flex items-center text-sm ${rankChange.color}`}>
                          <RankIcon className="h-4 w-4 mr-1" />
                          {rankChange.text}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(supplier.metrics).map(([metric, score]) => (
                        <div key={metric} className="text-center">
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">{score}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{metric}</div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Industry News Tab */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Industry News</h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {industryNews.map((article) => (
                <div
                  key={article.id}
                  className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 ${
                    article.featured ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{article.title}</h3>
                        {article.featured && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{article.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {article.source}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} min read
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                      <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Insights Stats Section */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Market Intelligence Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Market Reports</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Price Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tracked Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Data Accuracy</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};