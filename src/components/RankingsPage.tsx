import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Star, Target, MapPin, Calendar, Zap, Trash2, Award, Lock } from 'lucide-react';
import type { User, Achievement } from '../types';
import UserProfileModal from './UserProfileModal';

const RankingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rankings' | 'achievements'>('rankings');
  const [rankingPeriod, setRankingPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [rankingType, setRankingType] = useState<'distance' | 'cleanups' | 'points'>('distance');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 랭킹 데이터 (주간/월간에 따라 다른 데이터)
  const weeklyUsers: User[] = [
    {
      id: '1',
      name: '김민수',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 28.4, cleanups: 35, points: 890 },
      rank: 1
    },
    {
      id: '2',
      name: '이영희',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 24.2, cleanups: 31, points: 750 },
      rank: 2
    },
    {
      id: '3',
      name: '박지훈',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 21.8, cleanups: 28, points: 680 },
      rank: 3
    },
    {
      id: '4',
      name: '최수진',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 19.5, cleanups: 26, points: 620 },
      rank: 4
    },
    {
      id: '5',
      name: '정현우',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 17.3, cleanups: 22, points: 580 },
      rank: 5
    }
  ];

  const monthlyUsers: User[] = [
    {
      id: '1',
      name: '김민수',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 125.7, cleanups: 156, points: 3890 },
      rank: 1
    },
    {
      id: '2',
      name: '이영희',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 118.4, cleanups: 142, points: 3650 },
      rank: 2
    },
    {
      id: '3',
      name: '박지훈',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 112.1, cleanups: 128, points: 3480 },
      rank: 3
    },
    {
      id: '4',
      name: '최수진',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 108.5, cleanups: 134, points: 3350 },
      rank: 4
    },
    {
      id: '5',
      name: '정현우',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      stats: { distance: 104.3, cleanups: 119, points: 3180 },
      rank: 5
    }
  ];

  const users = rankingPeriod === 'weekly' ? weeklyUsers : monthlyUsers;

  // 업적 데이터
  const achievements: Achievement[] = [
    {
      id: '1',
      title: '첫 걸음',
      description: '첫 플로깅 완료',
      icon: 'star',
      isUnlocked: true,
      unlockedAt: '2024-01-15',
      category: 'milestone'
    },
    {
      id: '2',
      title: '10km 달성',
      description: '총 10km 플로깅 완료',
      icon: 'target',
      isUnlocked: true,
      unlockedAt: '2024-02-01',
      category: 'distance'
    },
    {
      id: '3',
      title: '환경 지킴이',
      description: '100개 쓰레기 수거',
      icon: 'trash',
      isUnlocked: true,
      unlockedAt: '2024-02-15',
      category: 'cleanup'
    },
    {
      id: '4',
      title: '한강 마스터',
      description: '한강 코스 5개 완주',
      icon: 'map',
      isUnlocked: true,
      unlockedAt: '2024-03-01',
      category: 'region'
    },
    {
      id: '5',
      title: '연속 달성자',
      description: '7일 연속 플로깅',
      icon: 'calendar',
      isUnlocked: false,
      category: 'streak'
    },
    {
      id: '6',
      title: '50km 챌린저',
      description: '총 50km 플로깅 완료',
      icon: 'target',
      isUnlocked: false,
      category: 'distance'
    },
    {
      id: '7',
      title: '완도의 지배자',
      description: '완도군 모든 코스 완주',
      icon: 'award',
      isUnlocked: false,
      category: 'region'
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

  const getAchievementIcon = (iconType: string) => {
    switch (iconType) {
      case 'star': return <Star className="w-6 h-6" />;
      case 'target': return <Target className="w-6 h-6" />;
      case 'trash': return <Trash2 className="w-6 h-6" />;
      case 'map': return <MapPin className="w-6 h-6" />;
      case 'calendar': return <Calendar className="w-6 h-6" />;
      case 'award': return <Award className="w-6 h-6" />;
      default: return <Medal className="w-6 h-6" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'milestone': return '기념일';
      case 'distance': return '거리';
      case 'cleanup': return '정리';
      case 'region': return '지역';
      case 'streak': return '연속';
      default: return '기타';
    }
  };

  return (
      <>
        <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
          {/* 헤더 */}
          <div className="bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">랭킹 & 업적</h1>
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="bg-white px-4 py-3 border-b">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                  onClick={() => setActiveTab('rankings')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'rankings'
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                랭킹
              </button>
              <button
                  onClick={() => setActiveTab('achievements')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'achievements'
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                업적
              </button>
            </div>
          </div>

          <div className="pb-20">
            {activeTab === 'rankings' ? (
                /* 랭킹 탭 */
                <div className="p-4">
                  {/* 주간/월간 선택 */}
                  <div className="bg-white rounded-lg p-1 flex mb-4 shadow-sm">
                    <button
                        onClick={() => setRankingPeriod('weekly')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            rankingPeriod === 'weekly'
                                ? 'bg-blue-100 text-blue-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      주간
                    </button>
                    <button
                        onClick={() => setRankingPeriod('monthly')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            rankingPeriod === 'monthly'
                                ? 'bg-blue-100 text-blue-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      월간
                    </button>
                  </div>

                  {/* 랭킹 타입 선택 */}
                  <div className="bg-white rounded-lg p-1 flex mb-6 shadow-sm">
                    <button
                        onClick={() => setRankingType('distance')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            rankingType === 'distance'
                                ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      거리
                    </button>
                    <button
                        onClick={() => setRankingType('cleanups')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            rankingType === 'cleanups'
                                ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      정리
                    </button>
                    <button
                        onClick={() => setRankingType('points')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            rankingType === 'points'
                                ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      점수
                    </button>
                  </div>

                  {/* 랭킹 리스트 */}
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
                                  {rankingType === 'distance' && `${user.stats.distance}km`}
                                  {rankingType === 'cleanups' && `${user.stats.cleanups}개`}
                                  {rankingType === 'points' && `${user.stats.points}점`}
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-bold text-emerald-600">
                                {rankingType === 'distance' && user.stats.distance}
                                {rankingType === 'cleanups' && user.stats.cleanups}
                                {rankingType === 'points' && user.stats.points}
                              </div>
                              <div className="text-xs text-gray-500">
                                {rankingType === 'distance' && 'km'}
                                {rankingType === 'cleanups' && '개'}
                                {rankingType === 'points' && '점'}
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            ) : (
                /* 업적 탭 */
                <div className="p-4">
                  {/* 업적 진행률 요약 */}
                  <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">업적 진행률</h3>
                      <span className="text-sm text-emerald-600 font-medium">
                  {achievements.filter(a => a.isUnlocked).length}/{achievements.length}
                </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${(achievements.filter(a => a.isUnlocked).length / achievements.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 업적 리스트 */}
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`rounded-xl p-4 ${
                                achievement.isUnlocked
                                    ? 'bg-white shadow-sm'
                                    : 'bg-gray-100 border-2 border-dashed border-gray-300'
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.isUnlocked
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : 'bg-gray-200 text-gray-400'
                            }`}>
                              {achievement.isUnlocked ? getAchievementIcon(achievement.icon) : <Lock className="w-6 h-6" />}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className={`font-semibold ${
                                    achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {achievement.title}
                                </h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    achievement.isUnlocked
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                          {getCategoryName(achievement.category)}
                        </span>
                              </div>
                              <p className={`text-sm ${
                                  achievement.isUnlocked ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {achievement.description}
                              </p>
                              {achievement.isUnlocked && achievement.unlockedAt && (
                                  <p className="text-xs text-emerald-600 mt-1">
                                    {achievement.unlockedAt} 달성
                                  </p>
                              )}
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </div>

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

export default RankingsPage;