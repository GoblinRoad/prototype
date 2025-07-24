"use client"

import type React from "react"
import { useState } from "react"
import type { User, Achievement } from "@/types"
import UserProfileModal from "@/components/ranks/UserProfileModal.tsx"
import RankingsHeader from "@/components/ranks/RankingsHeader"
import RankingsTabNavigation from "@/components/ranks/RankingsTabNavigation"
import RankingPeriodSelector from "@/components/ranks/RankingPeriodSelector"
import RankingTypeSelector from "@/components/ranks/RankingTypeSelector"
import RankingList from "@/components/ranks/RankingList"
import AchievementProgressSummary from "@/components/ranks/AchievementProgressSummary"
import AchievementList from "@/components/ranks/AchievementList"

const RankingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"rankings" | "achievements">("rankings")
  const [rankingPeriod, setRankingPeriod] = useState<"weekly" | "monthly">("weekly")
  const [rankingType, setRankingType] = useState<"distance" | "cleanups" | "points">("distance")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 랭킹 데이터 (주간/월간에 따라 다른 데이터)
  const weeklyUsers: User[] = [
    {
      id: "1",
      name: "김민수",
      avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 28.4, cleanups: 35, points: 890 },
      rank: 1,
    },
    {
      id: "2",
      name: "이영희",
      avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 24.2, cleanups: 31, points: 750 },
      rank: 2,
    },
    {
      id: "3",
      name: "박지훈",
      avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 21.8, cleanups: 28, points: 680 },
      rank: 3,
    },
    {
      id: "4",
      name: "최수진",
      avatar:
          "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 19.5, cleanups: 26, points: 620 },
      rank: 4,
    },
    {
      id: "5",
      name: "정현우",
      avatar:
          "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 17.3, cleanups: 22, points: 580 },
      rank: 5,
    },
  ]

  const monthlyUsers: User[] = [
    {
      id: "1",
      name: "김민수",
      avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 125.7, cleanups: 156, points: 3890 },
      rank: 1,
    },
    {
      id: "2",
      name: "이영희",
      avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 118.4, cleanups: 142, points: 3650 },
      rank: 2,
    },
    {
      id: "3",
      name: "박지훈",
      avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 112.1, cleanups: 128, points: 3480 },
      rank: 3,
    },
    {
      id: "4",
      name: "최수진",
      avatar:
          "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 108.5, cleanups: 134, points: 3350 },
      rank: 4,
    },
    {
      id: "5",
      name: "정현우",
      avatar:
          "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stats: { distance: 104.3, cleanups: 119, points: 3180 },
      rank: 5,
    },
  ]

  const users = rankingPeriod === "weekly" ? weeklyUsers : monthlyUsers

  // 업적 데이터
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "첫 걸음",
      description: "첫 플로깅 완료",
      icon: "star",
      isUnlocked: true,
      unlockedAt: "2024-01-15",
      category: "milestone",
    },
    {
      id: "2",
      title: "10km 달성",
      description: "총 10km 플로깅 완료",
      icon: "target",
      isUnlocked: true,
      unlockedAt: "2024-02-01",
      category: "distance",
    },
    {
      id: "3",
      title: "환경 지킴이",
      description: "100개 쓰레기 수거",
      icon: "trash",
      isUnlocked: true,
      unlockedAt: "2024-02-15",
      category: "cleanup",
    },
    {
      id: "4",
      title: "한강 마스터",
      description: "한강 코스 5개 완주",
      icon: "map",
      isUnlocked: true,
      unlockedAt: "2024-03-01",
      category: "region",
    },
    {
      id: "5",
      title: "연속 달성자",
      description: "7일 연속 플로깅",
      icon: "calendar",
      isUnlocked: false,
      category: "streak",
    },
    {
      id: "6",
      title: "50km 챌린저",
      description: "총 50km 플로깅 완료",
      icon: "target",
      isUnlocked: false,
      category: "distance",
    },
    {
      id: "7",
      title: "완도의 지배자",
      description: "완도군 모든 코스 완주",
      icon: "award",
      isUnlocked: false,
      category: "region",
    },
  ]

  return (
      <>
        <div className="min-h-screen bg-gray-50">
          <RankingsHeader title="랭킹 & 업적" />
          <RankingsTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="pb-20">
            {activeTab === "rankings" ? (
                /* 랭킹 탭 */
                <div className="p-4">
                  <RankingPeriodSelector rankingPeriod={rankingPeriod} setRankingPeriod={setRankingPeriod} />
                  <RankingTypeSelector rankingType={rankingType} setRankingType={setRankingType} />
                  <RankingList users={users} rankingType={rankingType} onUserClick={setSelectedUser} />
                </div>
            ) : (
                /* 업적 탭 */
                <div className="p-4">
                  <AchievementProgressSummary achievements={achievements} />
                  <AchievementList achievements={achievements} />
                </div>
            )}
          </div>
        </div>

        {/* 사용자 프로필 모달 */}
        {selectedUser && <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
      </>
  )
}

export default RankingsPage
