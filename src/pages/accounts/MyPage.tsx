"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
  Trophy,
  Target,
  Zap,
  Calendar,
  ChevronRight,
  Star,
  User,
  Plus,
} from "lucide-react";
import type { UserProfile } from "@/types";
import ProfileEditModal from "@/components/accounts/ProfileEditModal";
import ActivityHistoryModal from "@/components/accounts/ActivityHistoryModal";
import LogoutConfirmModal from "@/components/accounts/LogoutConfirmModal";
import BubbleAnimation from "@/components/accounts/BubbleAnimation";
import BadgeDetailModal from "@/components/accounts/BadgeDetailModal";
import PreferencesSummary from "@/components/preferences/PreferencesSummary";
import type { UserPreferences } from "@/types";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showBadgeDetail, setShowBadgeDetail] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 실제로는 로컬스토리지나 쿠키에서 확인
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "1",
    name: "김플로깅",
    email: "plogging@email.com",
    avatar: "/images/green-goblin.png",
    joinDate: "2023-08-15",
    level: 12,
    totalDistance: 127.5,
    totalCleanups: 89,
    totalPoints: 2340,
    rank: 8,
    badges: [
      { name: "정리 챔피언", tier: "bronze" },
      { name: "환경 지킴이", tier: "platinum" },
      { name: "연속 달성자", tier: "diamond" },
    ],
  });
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // 프로필 저장 핸들러
  const handleSaveProfile = (updatedProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedProfile,
    }));
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 실제로는 로그아웃 API 호출
    console.log("로그아웃 처리");
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
  };

  const handleEditPreferences = () => {
    navigate("/preferences/setup");
  };

  const menuItems = [
    { icon: Shield, label: "개인정보 및 보안", hasChevron: true },
    { icon: HelpCircle, label: "도움말 및 지원", hasChevron: true },
    { icon: LogOut, label: "로그아웃", hasChevron: false, isDestructive: true },
  ];

  // 로그인되지 않은 경우 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    // max-w-md mx-auto 클래스를 App.tsx의 Layout 컴포넌트로 이동했습니다.
    <div className="bg-gray-50 min-h-screen">
      {/* 프로필 헤더 */}
      <div className="bg-gradient-to-br from-emerald-500 to-sky-500 px-4 pt-8 pb-6 relative z-0">
        {/* 버블 애니메이션 */}
        <BubbleAnimation />
        <div className="text-center relative z-30 pointer-events-none">
          <div className="relative inline-block mb-4">
            <img
              src={userProfile.avatar || "/placeholder.svg"}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {userProfile.name}
          </h1>

          {/* 순위 배지 - 닉네임 하단 */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                순위 #{userProfile.rank}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowEditProfile(true)}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-white/30 transition-colors flex items-center mx-auto pointer-events-auto relative z-40"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            프로필 편집
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="px-4 -mt-2 mb-6 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">
                {userProfile.totalDistance}km
              </div>
              <div className="text-xs text-gray-600">총 거리</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-sky-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">
                {userProfile.totalCleanups}
              </div>
              <div className="text-xs text-gray-600">정리한 개수</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">
                {userProfile.totalPoints}
              </div>
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
            <button
              onClick={() => setShowActivityHistory(true)}
              className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
            >
              전체보기
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="/images/plogging1.jpg"
                  alt="한강공원 플로깅"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='10'%3E플로깅%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  한강공원 플로깅
                </p>
                <p className="text-xs text-gray-500">
                  2024-01-15 • 3.2km • 5개 정리
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="/images/plogging2.jpg"
                  alt="올림픽공원 둘레길"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='10'%3E플로깅%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  올림픽공원 둘레길
                </p>
                <p className="text-xs text-gray-500">
                  2024-01-12 • 5.1km • 8개 정리
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="/images/plogging3.jpg"
                  alt="청계천 산책로"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='10'%3E플로깅%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  청계천 산책로
                </p>
                <p className="text-xs text-gray-500">
                  2024-01-10 • 2.8km • 3개 정리
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI 추천 설정 */}
      <div className="px-4 mb-6">
        {userPreferences ? (
          <PreferencesSummary
            preferences={userPreferences}
            onEdit={handleEditPreferences}
          />
        ) : (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                맞춤 추천 설정
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                선호도를 설정하면 더 정확한 코스 추천을 받을 수 있어요
              </p>
              <button
                onClick={handleEditPreferences}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                선호도 설정하기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 뱃지 */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">획득한 뱃지</h3>

          {/* 반응형 뱃지 컨테이너 */}
          <div className="grid grid-cols-4 gap-4 sm:flex sm:gap-4 sm:overflow-x-auto sm:pb-2">
            {/* 획득한 뱃지들 */}
            {userProfile.badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[80px] flex-shrink-0"
              >
                {/* 뱃지 이미지 */}
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-2">
                  <img
                    src={
                      badge.tier === "gold"
                        ? "/images/gold_goblin.png"
                        : `/images/${badge.tier}.png`
                    }
                    alt={`${badge.name} 뱃지`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 뱃지 이름 */}
                <span className="text-sm font-medium text-gray-900 text-center leading-tight">
                  {badge.name}
                </span>
              </div>
            ))}

            {/* 더 많은 뱃지 버튼 - 동일한 구조와 크기 */}
            <div className="flex flex-col items-center min-w-[80px] flex-shrink-0">
              {/* 버튼 - 뱃지와 동일한 크기 */}
              <button
                className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-2 border-2 border-dashed border-gray-400 hover:border-gray-500 hover:bg-gray-300 transition-colors"
                onClick={() => setShowBadgeDetail(true)}
              >
                <Plus className="w-6 h-6 text-gray-600" />
              </button>
              {/* 버튼 텍스트 */}
              <span className="text-sm font-medium text-gray-600 text-center leading-tight">
                더 많은 뱃지
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 메뉴 항목 */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.label === "개인정보 및 보안") {
                  navigate("/privacy-security");
                } else if (item.label === "도움말 및 지원") {
                  navigate("/help-support");
                } else if (item.label === "로그아웃") {
                  // 로그아웃 확인 모달 표시
                  setShowLogoutConfirm(true);
                }
                // 다른 메뉴 항목들은 추후 구현
              }}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              } ${item.isDestructive ? "text-red-600" : "text-gray-900"}`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`w-5 h-5 ${
                    item.isDestructive ? "text-red-600" : "text-gray-600"
                  }`}
                />
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
      <div className="px-4 pb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {new Date(userProfile.joinDate).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
            })}{" "}
            가입
          </p>
        </div>
      </div>

      {/* 프로필 편집 모달 */}
      <ProfileEditModal
        userProfile={userProfile}
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
      />

      {/* 활동 내역 모달 */}
      <ActivityHistoryModal
        isOpen={showActivityHistory}
        onClose={() => setShowActivityHistory(false)}
      />

      {/* 로그아웃 확인 모달 */}
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />

      {/* 뱃지 상세 모달 */}
      <BadgeDetailModal
        isOpen={showBadgeDetail}
        onClose={() => setShowBadgeDetail(false)}
      />
    </div>
  );
};

export default MyPage;
