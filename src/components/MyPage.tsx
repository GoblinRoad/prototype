import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Edit3, 
  Camera,
  Trophy,
  Target,
  Zap,
  Calendar,
  ChevronRight,
  Star
} from 'lucide-react';
import type { UserProfile } from '../types';

const MyPage: React.FC = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const userProfile: UserProfile = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinDate: '2023-08-15',
    level: 12,
    totalDistance: 127.5,
    totalCleanups: 89,
    totalPoints: 2340,
    rank: 8,
    badges: ['First Steps', 'Distance Runner', 'Cleanup Champion']
  };

  const menuItems = [
    { icon: Settings, label: 'Account Settings', hasChevron: true },
    { icon: Bell, label: 'Notifications', hasChevron: true },
    { icon: Shield, label: 'Privacy & Security', hasChevron: true },
    { icon: HelpCircle, label: 'Help & Support', hasChevron: true },
    { icon: Star, label: 'Rate App', hasChevron: true },
    { icon: LogOut, label: 'Sign Out', hasChevron: false, isDestructive: true }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-sky-500 px-4 pt-8 pb-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-1">{userProfile.name}</h1>
            <p className="text-emerald-100 text-sm mb-2">{userProfile.email}</p>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Level {userProfile.level}</span>
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">Rank #{userProfile.rank}</span>
              </div>
            </div>

            <button 
              onClick={() => setShowEditProfile(true)}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-white/30 transition-colors flex items-center mx-auto"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 -mt-8 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{userProfile.totalDistance}km</div>
                <div className="text-xs text-gray-600">Total Distance</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-sky-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{userProfile.totalCleanups}</div>
                <div className="text-xs text-gray-600">Items Cleaned</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{userProfile.totalPoints}</div>
                <div className="text-xs text-gray-600">Total Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-emerald-600 text-sm font-medium">View All</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Completed Central Park Loop</p>
                  <p className="text-xs text-gray-500">2 hours ago • +50 points</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Earned "Cleanup Champion" badge</p>
                  <p className="text-xs text-gray-500">1 day ago • +100 points</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">7-day streak achieved!</p>
                  <p className="text-xs text-gray-500">3 days ago • +75 points</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Your Badges</h3>
            <div className="flex space-x-3">
              {userProfile.badges.map((badge, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-medium text-gray-900">{badge}</p>
                </div>
              ))}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2 border-2 border-dashed border-gray-300">
                  <span className="text-gray-400 text-lg">+</span>
                </div>
                <p className="text-xs text-gray-500">More to earn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 pb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                } ${item.isDestructive ? 'text-red-600' : 'text-gray-900'}`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${item.isDestructive ? 'text-red-600' : 'text-gray-600'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.hasChevron && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Member Since */}
        <div className="px-4 pb-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Member since {new Date(userProfile.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;