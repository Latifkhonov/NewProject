import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Calendar, 
  Award, 
  TrendingUp, 
  MapPin, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Network,
  Handshake,
  Target,
  Globe,
  MessageCircle,
  UserPlus,
  Filter,
  Search,
  Clock,
  Eye,
  Heart,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { SearchBar } from './SearchBar';
import { Breadcrumb } from './Breadcrumb';

interface NetworkMember {
  id: string;
  name: string;
  company: string;
  location: string;
  industry: string;
  role: string;
  connections: number;
  rating: number;
  verified: boolean;
  avatar?: string;
  specialties: string[];
  recentActivity: string;
  joinDate: string;
}

interface NetworkEvent {
  id: string;
  title: string;
  type: 'webinar' | 'conference' | 'workshop' | 'networking';
  date: string;
  location: string;
  attendees: number;
  description: string;
  organizer: string;
  isOnline: boolean;
}

interface Partnership {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  requirements: string[];
  type: 'strategic' | 'technology' | 'distribution' | 'manufacturing';
  company: string;
  location: string;
}

export const NetworkPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'members' | 'events' | 'partnerships'>('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleBack = () => {
    window.history.back();
  };

  // Mock network members data
  const networkMembers: NetworkMember[] = [
    {
      id: '1',
      name: 'Akmal Karimov',
      company: 'Uzbekistan Steel Works',
      location: 'Tashkent',
      industry: 'Steel Manufacturing',
      role: 'Procurement Manager',
      connections: 245,
      rating: 4.8,
      verified: true,
      specialties: ['Steel Procurement', 'Quality Control', 'Supplier Relations'],
      recentActivity: 'Posted about new steel grades',
      joinDate: '2023-03-15'
    },
    {
      id: '2',
      name: 'Dilnoza Rashidova',
      company: 'Central Asia Electronics',
      location: 'Samarkand',
      industry: 'Electronics',
      role: 'Supply Chain Director',
      connections: 189,
      rating: 4.9,
      verified: true,
      specialties: ['Electronics Sourcing', 'Logistics', 'Vendor Management'],
      recentActivity: 'Shared market insights',
      joinDate: '2023-01-20'
    },
    {
      id: '3',
      name: 'Bobur Tursunov',
      company: 'Silk Road Textiles',
      location: 'Bukhara',
      industry: 'Textiles',
      role: 'Business Development',
      connections: 156,
      rating: 4.7,
      verified: true,
      specialties: ['Textile Innovation', 'Export Markets', 'Partnership Development'],
      recentActivity: 'Announced new product line',
      joinDate: '2023-05-10'
    }
  ];

  // Mock events data
  const networkEvents: NetworkEvent[] = [
    {
      id: '1',
      title: 'Industrial Automation Summit 2024',
      type: 'conference',
      date: '2024-02-15',
      location: 'Tashkent International Business Center',
      attendees: 450,
      description: 'Explore the latest trends in industrial automation and smart manufacturing.',
      organizer: 'Uzbekistan Manufacturing Association',
      isOnline: false
    },
    {
      id: '2',
      title: 'Supply Chain Optimization Webinar',
      type: 'webinar',
      date: '2024-01-25',
      location: 'Online',
      attendees: 280,
      description: 'Learn best practices for optimizing supply chain efficiency in Central Asia.',
      organizer: 'TopTaklif Network',
      isOnline: true
    },
    {
      id: '3',
      title: 'Textile Industry Networking Mixer',
      type: 'networking',
      date: '2024-02-08',
      location: 'Bukhara Business Hub',
      attendees: 120,
      description: 'Connect with textile industry professionals and explore collaboration opportunities.',
      organizer: 'Uzbekistan Textile Association',
      isOnline: false
    }
  ];

  // Mock partnerships data
  const partnerships: Partnership[] = [
    {
      id: '1',
      title: 'Strategic Manufacturing Partnership',
      description: 'Join our strategic partnership program for advanced manufacturing capabilities.',
      benefits: ['Priority supplier status', 'Joint marketing opportunities', 'Technical support'],
      requirements: ['ISO 9001 certification', 'Minimum 5 years experience', 'Quality assurance program'],
      type: 'strategic',
      company: 'Uzbekistan Industrial Group',
      location: 'Tashkent'
    },
    {
      id: '2',
      title: 'Technology Innovation Alliance',
      description: 'Collaborate on cutting-edge technology solutions for industrial applications.',
      benefits: ['R&D collaboration', 'Technology transfer', 'Innovation funding'],
      requirements: ['Technical expertise', 'Innovation track record', 'Investment capability'],
      type: 'technology',
      company: 'Central Asia Tech Hub',
      location: 'Samarkand'
    },
    {
      id: '3',
      title: 'Distribution Network Partnership',
      description: 'Expand your reach through our extensive distribution network across Central Asia.',
      benefits: ['Market access', 'Logistics support', 'Sales channel expansion'],
      requirements: ['Product quality standards', 'Reliable supply capacity', 'Competitive pricing'],
      type: 'distribution',
      company: 'Silk Road Distribution',
      location: 'Bukhara'
    }
  ];

  const handleSearch = (query: string, location: string, filters: any) => {
    setSearchQuery(query);
  };

  const getEventTypeColor = (type: NetworkEvent['type']) => {
    switch (type) {
      case 'conference': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'webinar': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'workshop': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'networking': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getPartnershipTypeColor = (type: Partnership['type']) => {
    switch (type) {
      case 'strategic': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'technology': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'distribution': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'manufacturing': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
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
              { label: t.network, active: true }
            ]}
          />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 flex items-center">
                <Network className="h-8 w-8 mr-3 text-blue-600 dark:text-blue-400" />
                {t.network}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">
                Connect with industry professionals and grow your business network
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
              { id: 'members', label: 'Network Members', icon: Users },
              { id: 'events', label: 'Industry Events', icon: Calendar },
              { id: 'partnerships', label: 'Partnerships', icon: Handshake }
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
        {/* Network Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Network Members</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Industries</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="electronics">Electronics</option>
                  <option value="textiles">Textiles</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {networkMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    {member.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Building2 className="h-4 w-4 mr-2" />
                      {member.company}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {member.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {member.connections} connections
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {member.rating} rating
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {member.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{member.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Industry Events</h2>
              <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {networkEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                      {event.isOnline && (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                          Online
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Building2 className="h-4 w-4 mr-2" />
                      {event.organizer}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                      Register
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Heart className="h-4 w-4" />
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

        {/* Partnerships Tab */}
        {activeTab === 'partnerships' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Partnership Opportunities</h2>
              <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center">
                <Handshake className="h-4 w-4 mr-2" />
                Propose Partnership
              </button>
            </div>

            <div className="space-y-6">
              {partnerships.map((partnership) => (
                <div
                  key={partnership.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{partnership.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPartnershipTypeColor(partnership.type)}`}>
                          {partnership.type}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{partnership.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-green-500" />
                        Benefits
                      </h4>
                      <ul className="space-y-2">
                        {partnership.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-blue-500" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {partnership.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {partnership.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {partnership.location}
                      </div>
                    </div>
                    
                    <button className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center">
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Network Stats Section */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Network Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2,500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">150+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Partnerships Formed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};