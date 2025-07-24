import React, { useState } from 'react';
import { Trophy, Zap, Trash2 } from 'lucide-react';
import type { User } from '../types';
import UserProfileModal from './UserProfileModal';

const Rankings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distance' | 'cleanups'>('distance');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: '1',
      name: '김민수',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 89.2, cleanups: 156, points: 2890 },
      rank: 1
    },
    {
      id: '2',
      name: '이영희',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 76.8, cleanups: 142, points: 2650 },
      rank: 2
    },
    {
      id: '3',
      name: '박지훈',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 72.1, cleanups: 128, points: 2480 },
      rank: 3
    },
    {
      id: '4',
      name: '최수진',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 68.5, cleanups: 134, points: 2350 },
      rank: 4
    },
    {
      id: '5',
      name: '정현우',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 64.3, cleanups: 119, points: 2180 },
      rank: 5
    }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-orange-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500';
    return 'bg-gradient-to-r from-emerald-400 to-emerald-500';
  };

  return (
      <>
        <section className="bg-gray-50 px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">오늘의 랭킹</h2>
              <div className="bg-white rounded-lg p-1 flex shadow-sm">
                <button
                    onClick={() => setActiveTab('distance')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'distance'
                            ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  거리
                </button>
                <button
                    onClick={() => setActiveTab('cleanups')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'cleanups'
                            ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  정리
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {users.map((user) => (
                  <div
                      key={user.id}
                      className="bg-white rounded-xl p-4 shadow-sm active:scale-95 transition-transform duration-200 cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}>
                        {getRankIcon(user.rank)}
                      </div>

                      <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            {activeTab === 'distance' ? `${user.stats.distance}km` : `${user.stats.cleanups}개`}
                          </div>
                          <div className="flex items-center">
                            <Trash2 className="w-3 h-3 mr-1" />
                            {user.stats.points}점
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">
                          {activeTab === 'distance' ? `${user.stats.distance}` : user.stats.cleanups}
                        </div>
                        <div className="text-xs text-gray-500">
                          {activeTab === 'distance' ? 'km' : '개'}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors">
                전체 순위표 보기
              </button>
            </div>
          </div>
        </section>

        {/* 사용자 프로필 모달 */}
        {selectedUser && (
            <UserProfileModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
            />
        )}
      </>
  );
};

export default Rankings;