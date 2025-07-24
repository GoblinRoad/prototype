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
import type { UserProfile } from '../../types';

const MyPage: React.FC = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const userProfile: UserProfile = {
    id: '1',
    name: '김플로깅',
    email: 'plogging@email.com',
    avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinDate: '2023-08-15',
    level: 12,
    totalDistance: 127.5,
    totalCleanups: 89,
    totalPoints: 2340,
    rank: 8,
    badges: ['첫 걸음', '거리 달성자', '정리 챔피언']
  };

  const menuItems = [
    { icon: Settings, label: '계정 설정', hasChevron: true },
    { icon: Bell, label: '알림 설정', hasChevron: true },
    { icon: Shield, label: '개인정보 및 보안', hasChevron: true },
    { icon: HelpCircle, label: '도움말 및 지원', hasChevron: true },
    { icon: Star, label: '앱 평가하기', hasChevron: true },
    { icon: LogOut, label: '로그아웃', hasChevron: false, isDestructive: true }
  ];

  return (
      <div className="bg-gray-50 min-h-screen max-w-md mx-auto">
        {/* 프로필 헤더 */}
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
                <span className="text-white text-sm font-medium">레벨 {userProfile.level}</span>
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">순위 #{userProfile.rank}</span>
              </div>
            </div>

            <button
                onClick={() => setShowEditProfile(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-white/30 transition-colors flex items-center mx-auto"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              프로필 편집
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="px-4 -mt-2 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{userProfile.totalDistance}km</div>
                <div className="text-xs text-gray-600">총 거리</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-sky-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{userProfile.totalCleanups}</div>
                <div className="text-xs text-gray-600">정리한 개수</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{userProfile.totalPoints}</div>
                <div className="text-xs text-gray-600">총 점수</div>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">최근 활동</h3>
              <button className="text-emerald-600 text-sm font-medium">전체보기</button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">한강공원 플로깅 완료</p>
                  <p className="text-xs text-gray-500">2시간 전 • +50점</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">"정리 챔피언" 뱃지 획득</p>
                  <p className="text-xs text-gray-500">1일 전 • +100점</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">7일 연속 달성!</p>
                  <p className="text-xs text-gray-500">3일 전 • +75점</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 뱃지 */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">획득한 뱃지</h3>
            <div className="grid grid-cols-4 gap-3">
              {userProfile.badges.map((badge, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-medium text-gray-900 break-words">{badge}</p>
                  </div>
              ))}
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2 border-2 border-dashed border-gray-300">
                  <span className="text-gray-400 text-lg">+</span>
                </div>
                <p className="text-xs text-gray-500">더 많은 뱃지</p>
              </div>
            </div>
          </div>
        </div>

        {/* 메뉴 항목 */}
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

        {/* 가입 정보 */}
        <div className="px-4 pb-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {new Date(userProfile.joinDate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long'
              })} 가입
            </p>
          </div>
        </div>
      </div>
  );
};

export default MyPage;