import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import type { NewsItem } from '../types';

const NewsSection: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Global Plastic Waste Reduction Hits Record Low',
      summary: 'New initiatives worldwide show promising results in reducing single-use plastics.',
      imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      publishedAt: '2 hours ago',
      source: 'EcoNews'
    },
    {
      id: '2',
      title: 'Ocean Cleanup Project Removes 50 Tons of Waste',
      summary: 'Latest technology breakthrough enables faster plastic removal from marine environments.',
      imageUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      publishedAt: '4 hours ago',
      source: 'Green Planet'
    },
    {
      id: '3',
      title: 'Community Plogging Events See 300% Growth',
      summary: 'Fitness meets environmental action as more cities adopt plogging programs.',
      imageUrl: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      publishedAt: '6 hours ago',
      source: 'Urban Health'
    }
  ];

  return (
    <section className="bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Environmental News</h2>
          <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <article key={item.id} className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${index === 0 ? 'featured' : ''}`}>
              {index === 0 ? (
                <div className="space-y-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                      <span>{item.source}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.publishedAt}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.summary}</p>
                    <button className="flex items-center text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
                      Read More
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex space-x-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                        <span>{item.source}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.publishedAt}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 text-xs line-clamp-2">{item.summary}</p>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;