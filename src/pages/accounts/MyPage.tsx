"use client";

import type React from "react";
import { useState } from "react";
import {
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
  Star,
  User,
  Plus,
} from "lucide-react";
import type { UserProfile } from "@/types";
import ProfileEditModal from "@/components/accounts/ProfileEditModal";
import ActivityHistoryModal from "@/components/accounts/ActivityHistoryModal";
import AccountSettingsModal from "@/components/accounts/AccountSettingsModal";
import LoginModal from "@/components/accounts/LoginModal";
import LogoutConfirmModal from "@/components/accounts/LogoutConfirmModal";
import BubbleAnimation from "@/components/accounts/BubbleAnimation";
import BadgeDetailModal from "@/components/accounts/BadgeDetailModal";

const MyPage: React.FC = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showBadgeDetail, setShowBadgeDetail] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 실제로는 로컬스토리지나 쿠키에서 확인
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "1",
    name: "김플로깅",
    email: "plogging@email.com",
    avatar:
      "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    joinDate: "2023-08-15",
    level: 12,
    totalDistance: 127.5,
    totalCleanups: 89,
    totalPoints: 2340,
    rank: 8,
    badges: ["첫 걸음", "거리 달성자", "정리 챔피언"],
  });

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

  // 회원탈퇴 핸들러
  const handleWithdraw = () => {
    // 실제로는 회원탈퇴 API 호출
    console.log("회원탈퇴 처리");
    setIsLoggedIn(false);
    setShowAccountSettings(false);
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = (provider: "kakao" | "google") => {
    // 실제로는 소셜 로그인 API 호출
    console.log(`${provider} 로그인 처리`);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const menuItems = [
    { icon: Settings, label: "계정 설정", hasChevron: true },
    { icon: Bell, label: "알림 설정", hasChevron: true },
    { icon: Shield, label: "개인정보 및 보안", hasChevron: true },
    { icon: HelpCircle, label: "도움말 및 지원", hasChevron: true },
    { icon: Star, label: "앱 평가하기", hasChevron: true },
    { icon: LogOut, label: "로그아웃", hasChevron: false, isDestructive: true },
  ];

  // 로그인되지 않은 경우 로그인 화면 표시
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            로그인이 필요합니다
          </h1>
          <p className="text-gray-600 mb-8">
            소셜 계정으로 간편하게 로그인하세요
          </p>

          <div className="space-y-4">
            {/* 카카오 로그인 */}
            <button
              onClick={() => handleSocialLogin("kakao")}
              className="w-full flex items-center justify-center px-6 py-4 bg-[#FEE500] hover:bg-[#FDD800] text-black font-medium rounded-xl transition-colors shadow-sm"
            >
              <div className="flex items-center justify-center w-full max-w-xs">
                <img
                  src="/images/kakaotalk_logo_icon.png"
                  alt="카카오 로고"
                  className="w-8 h-8 object-contain"
                />
                <span className="ml-3 text-center">카카오로 로그인</span>
              </div>
            </button>

            {/* 구글 로그인 */}
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-colors shadow-sm border border-gray-300"
            >
              <div className="flex items-center justify-center w-full max-w-xs">
                <img
                  src="/images/google_logo_icon.png"
                  alt="구글 로고"
                  className="w-8 h-8 object-contain"
                />
                <span className="ml-3 text-center">구글로 로그인</span>
              </div>
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            로그인 시 개인정보 처리방침과 이용약관에 <br /> 동의하는 것으로
            간주됩니다
          </p>
        </div>
      </div>
    );
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

          <h1 className="text-2xl font-bold text-white mb-1">
            {userProfile.name}
          </h1>
          <p className="text-emerald-100 text-sm mb-2">{userProfile.email}</p>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-white/20 rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                레벨 {userProfile.level}
              </span>
            </div>
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
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  한강공원 플로깅 완료
                </p>
                <p className="text-xs text-gray-500">2시간 전 • +50점</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  "정리 챔피언" 뱃지 획득
                </p>
                <p className="text-xs text-gray-500">1일 전 • +100점</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  7일 연속 달성!
                </p>
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

          {/* 반응형 뱃지 컨테이너 */}
          <div className="grid grid-cols-4 gap-4 sm:flex sm:gap-4 sm:overflow-x-auto sm:pb-2">
            {/* 획득한 뱃지들 */}
            {userProfile.badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[80px] flex-shrink-0"
              >
                {/* 뱃지 아이콘 - 고정 크기 */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                {/* 뱃지 이름 */}
                <span className="text-sm font-medium text-gray-900 text-center leading-tight">
                  {badge}
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
      <div className="px-4 pb-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.label === "계정 설정") {
                  setShowAccountSettings(true);
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
      <div className="px-4 pb-8">
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

      {/* 계정 설정 모달 */}
      <AccountSettingsModal
        isOpen={showAccountSettings}
        onClose={() => setShowAccountSettings(false)}
        onWithdraw={handleWithdraw}
      />

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleSocialLogin}
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
