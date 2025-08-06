import React, { useState } from 'react';
import RankingsHeader from '../../components/ranks/RankingsHeader';
import RankingPeriodSelector from '../../components/ranks/RankingPeriodSelector';
import RankingList, { TopThreeRanking } from '../../components/ranks/RankingList';
import UserProfileModal from '../../components/ranks/UserProfileModal';
import type { User } from '../../types';

const RankingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const currentUserId = '11';

  const users: User[] = [
    {
      id: '1',
      name: '김김김',
      avatar: 'public/images/red-goblin.png',
      stats: { distance: 89.2, cleanups: 156, points: 245 },
      rank: 1
    },
    {
      id: '2',
      name: '민민민',
      avatar: 'public/images/blue-goblin.png',
      stats: { distance: 76.8, cleanups: 142, points: 256 },
      rank: 2
    },
    {
      id: '3',
      name: '우우우',
      avatar: 'public/images/green-goblin.png',
      stats: { distance: 72.1, cleanups: 128, points: 236 },
      rank: 3
    },
    {
      id: '4',
      name: '귀귀귀',
      avatar: 'public/images/blue-goblin.png',
      stats: { distance: 68.5, cleanups: 134, points: 230 },
      rank: 4
    },
    {
      id: '5',
      name: '태태태',
      avatar: 'public/images/red-goblin.png',
      stats: { distance: 64.3, cleanups: 119, points: 183 },
      rank: 5
    },
    {
      id: '6',
      name: '초코',
      avatar: 'public/images/green-goblin.png',
      stats: { distance: 62.1, cleanups: 115, points: 177 },
      rank: 6
    },
    {
      id: '7',
      name: '윤성호',
      avatar: 'public/images/red-goblin.png',
      stats: { distance: 59.8, cleanups: 108, points: 165 },
      rank: 7
    },
    {
      id: '8',
      name: '한지원',
      avatar: 'public/images/green-goblin.png',
      stats: { distance: 57.2, cleanups: 102, points: 155 },
      rank: 8
    },
    {
      id: '9',
      name: '조민석',
      avatar: 'public/images/purple-goblin.png',
      stats: { distance: 54.6, cleanups: 98, points: 150 },
      rank: 9
    },
    {
      id: '10',
      name: '강예은',
      avatar: 'public/images/blue-goblin.png',
      stats: { distance: 52.3, cleanups: 94, points: 145 },
      rank: 10
    },
    // 현재 사용자 (124등)
    {
      id: '11',
      name: '김철수',
      avatar: 'public/images/purple-goblin.png',
      stats: { distance: 48.9, cleanups: 87, points: 124 },
      rank: 124
    }
  ];

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
      <>
        <div className="min-h-screen bg-gray-50">
          {/* 헤더 */}
          <RankingsHeader title="랭킹" />

          {/* 메인 컨텐츠 */}
          <div className="px-4 pt-4">
            <div className="max-w-md mx-auto">
              {/* 탭 버튼 */}
              <RankingPeriodSelector
                  rankingPeriod={activeTab}
                  setRankingPeriod={setActiveTab}
              />

              {/* 상위 3명 표시 */}
              <div className="bg-white rounded-2xl shadow-sm mb-4">
                <TopThreeRanking
                    users={users}
                    onUserClick={handleUserClick}
                />
              </div>

              {/* 4등부터 리스트 */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <RankingList
                    users={users}
                    currentUserId={currentUserId}
                    onUserClick={handleUserClick}
                />
              </div>
            </div>
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