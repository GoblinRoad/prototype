import React, { useState } from 'react';
import { Trophy, Zap, Trash2, Medal, Crown, Award } from 'lucide-react';
import type { User } from '../types';

const RankingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distance' | 'cleanups' | 'points'>('distance');
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('month');

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 89.2, cleanups: 156, points: 2890 },
      rank: 1
    },
    {
      id: '2',
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 76.8, cleanups: 142, points: 2650 },
      rank: 2
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 72.1, cleanups: 128, points: 2480 },
      rank: 3
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 68.5, cleanups: 134, points: 2350 },
      rank: 4
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 64.3, cleanups: 119, points: 2180 },
      rank: 5
    },
    {
      id: '6',
      name: 'Alex Rivera',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 61.7, cleanups: 115, points: 2050 },
      rank: 6
    },
    {
      id: '7',
      name: 'Jessica Park',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 58.9, cleanups: 108, points: 1920 },
      rank: 7
    },
    {
      id: '8',
      name: 'You',
      avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 45.2, cleanups: 87, points: 1650 },
      rank: 12
    }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500';
    return 'bg-gradient-to-r from-emerald-400 to-emerald-500';
  };

  const getCurrentValue = (user: User) => {
    switch (activeTab) {
      case 'distance': return `${user.stats.distance}km`;
      case 'cleanups': return `${user.stats.cleanups} items`;
      case 'points': return `${user.stats.points} pts`;
      default: return '';
    }
  };

  const topThree = users.slice(0, 3);
  const otherUsers = users.slice(3);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Community Rankings</h1>
          
          {/* Tab Filters */}
          <div className="bg-gray-100 rounded-lg p-1 flex mb-4">
            <button
              onClick={() => setActiveTab('distance')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'distance'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Distance
            </button>
            <button
              onClick={() => setActiveTab('cleanups')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'cleanups'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Clean-ups
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'points'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Points
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex space-x-2">
            {(['week', 'month', 'all'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  timeFilter === period
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period === 'all' ? 'All Time' : `This ${period.charAt(0).toUpperCase() + period.slice(1)}`}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-gradient-to-br from-emerald-50 to-sky-50 p-6">
          <div className="flex items-end justify-center space-x-4 mb-6">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative mb-2">
                <img
                  src={topThree[1]?.avatar}
                  alt={topThree[1]?.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-300"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
              </div>
              <div className="bg-gray-200 h-16 w-20 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-sm font-bold text-gray-700">{getCurrentValue(topThree[1])}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mt-2">{topThree[1]?.name}</p>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="relative mb-2">
                <img
                  src={topThree[0]?.avatar}
                  alt={topThree[0]?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="bg-yellow-400 h-20 w-24 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-sm font-bold text-yellow-900">{getCurrentValue(topThree[0])}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mt-2">{topThree[0]?.name}</p>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative mb-2">
                <img
                  src={topThree[2]?.avatar}
                  alt={topThree[2]?.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-orange-400"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
              <div className="bg-orange-300 h-12 w-20 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-sm font-bold text-orange-900">{getCurrentValue(topThree[2])}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mt-2">{topThree[2]?.name}</p>
            </div>
          </div>
        </div>

        {/* Other Rankings */}
        <div className="p-4 space-y-3">
          {otherUsers.map((user) => (
            <div 
              key={user.id} 
              className={`rounded-xl p-4 transition-all ${
                user.name === 'You' 
                  ? 'bg-emerald-50 border-2 border-emerald-200 shadow-md' 
                  : 'bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>
                
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    {user.name === 'You' && (
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      {user.stats.distance}km
                    </div>
                    <div className="flex items-center">
                      <Trash2 className="w-3 h-3 mr-1" />
                      {user.stats.cleanups} items
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">
                    {getCurrentValue(user)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Rank #{user.rank}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingsPage;