import React, { useState, useEffect } from "react";
import { X, Trophy, Target, Zap, Leaf, Star, Calendar } from "lucide-react";
import type { Badge } from "@/types";
import BadgeDetailViewModal from "./BadgeDetailViewModal";

interface BadgeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  // 뱃지 데이터 (실제로는 API에서 가져올 데이터)
  const [badges] = useState<Badge[]>([
    // 보유 뱃지들 (최신 날짜 순)
    {
      id: "1",
      name: "첫 걸음",
      description: "첫 번째 플로깅을 완료했습니다",
      icon: "🎯",
      category: "achievement",
      tier: "bronze",
      isObtained: true,
      obtainedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "거리 달성자",
      description: "총 10km를 달성했습니다",
      icon: "🏃",
      category: "distance",
      tier: "silver",
      isObtained: true,
      obtainedDate: "2024-01-10",
    },
    {
      id: "3",
      name: "정리 챔피언",
      description: "10회 정리를 완료했습니다",
      icon: "🧹",
      category: "cleanup",
      tier: "bronze",
      isObtained: true,
      obtainedDate: "2024-01-05",
    },
    {
      id: "4",
      name: "환경 지킴이",
      description: "총 50개의 쓰레기를 수거했습니다",
      icon: "🌱",
      category: "environment",
      tier: "gold",
      isObtained: true,
      obtainedDate: "2024-01-01",
    },
    {
      id: "5",
      name: "연속 달성자",
      description: "7일 연속으로 플로깅을 완료했습니다",
      icon: "🔥",
      category: "achievement",
      tier: "silver",
      isObtained: true,
      obtainedDate: "2023-12-25",
    },
    // 미보유 뱃지들
    {
      id: "6",
      name: "100km 마스터",
      description: "총 100km를 달성하세요",
      icon: "🏆",
      category: "distance",
      tier: "platinum",
      isObtained: false,
      progress: 45,
      maxProgress: 100,
    },
    {
      id: "7",
      name: "정리 마스터",
      description: "100회 정리를 완료하세요",
      icon: "👑",
      category: "cleanup",
      tier: "gold",
      isObtained: false,
      progress: 23,
      maxProgress: 100,
    },
    {
      id: "8",
      name: "월간 챔피언",
      description: "한 달 동안 매일 플로깅을 완료하세요",
      icon: "⭐",
      category: "achievement",
      tier: "gold",
      isObtained: false,
      progress: 15,
      maxProgress: 30,
    },
    {
      id: "9",
      name: "자연 보호자",
      description: "총 500개의 쓰레기를 수거하세요",
      icon: "🌿",
      category: "environment",
      tier: "platinum",
      isObtained: false,
      progress: 89,
      maxProgress: 500,
    },
    {
      id: "10",
      name: "히든 뱃지",
      description: "특별한 조건을 만족하면 획득할 수 있습니다",
      icon: "💎",
      category: "special",
      tier: "platinum",
      isObtained: false,
    },
  ]);

  // 보유 뱃지와 미보유 뱃지 분리
  const obtainedBadges = badges
    .filter((badge) => badge.isObtained)
    .sort((a, b) => {
      if (!a.obtainedDate || !b.obtainedDate) return 0;
      return (
        new Date(b.obtainedDate).getTime() - new Date(a.obtainedDate).getTime()
      );
    });

  const unobtainedBadges = badges.filter((badge) => !badge.isObtained);

  // 모달이 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "distance":
        return <Target className="w-4 h-4" />;
      case "cleanup":
        return <Zap className="w-4 h-4" />;
      case "achievement":
        return <Trophy className="w-4 h-4" />;
      case "environment":
        return <Leaf className="w-4 h-4" />;
      case "special":
        return <Star className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const getProgressPercentage = (badge: Badge) => {
    if (!badge.progress || !badge.maxProgress) return 0;
    return Math.min((badge.progress / badge.maxProgress) * 100, 100);
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "브론즈";
      case "silver":
        return "실버";
      case "gold":
        return "골드";
      case "platinum":
        return "플래티넘";
      default:
        return "브론즈";
    }
  };

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setIsDetailViewOpen(true);
  };

  const handleDetailViewClose = () => {
    setIsDetailViewOpen(false);
    setSelectedBadge(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">뱃지 컬렉션</h2>
            <p className="text-sm text-gray-500 mt-1">
              총 {badges.length}개의 뱃지
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 뱃지 목록 */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* 보유 뱃지 섹션 */}
          {obtainedBadges.length > 0 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                보유 뱃지 ({obtainedBadges.length}개)
              </h3>
              <div className="space-y-3">
                {obtainedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-start p-4 bg-emerald-50 rounded-xl border border-emerald-200 min-h-[80px] cursor-pointer hover:bg-emerald-100 transition-colors"
                    onClick={() => handleBadgeClick(badge)}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={
                          badge.tier === "gold"
                            ? "/images/gold_goblin.png"
                            : `/images/${badge.tier}.png`
                        }
                        alt={`${getTierName(badge.tier)} 뱃지`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-start">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {badge.name}
                        </h4>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                          {getTierName(badge.tier)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1 leading-relaxed">
                        {badge.description}
                      </p>
                      {badge.obtainedDate && (
                        <p className="text-xs text-emerald-600 mb-2">
                          획득일:{" "}
                          {new Date(badge.obtainedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 구분선 */}
          {obtainedBadges.length > 0 && unobtainedBadges.length > 0 && (
            <div className="px-6 py-4">
              <div className="border-t border-gray-200"></div>
            </div>
          )}

          {/* 미보유 뱃지 섹션 */}
          {unobtainedBadges.length > 0 && (
            <div className="p-6 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                미보유 뱃지 ({unobtainedBadges.length}개)
              </h3>
              <div className="space-y-3">
                {unobtainedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[80px] cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleBadgeClick(badge)}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={
                          badge.tier === "gold"
                            ? "/images/gold_goblin.png"
                            : `/images/${badge.tier}.png`
                        }
                        alt={`${getTierName(badge.tier)} 뱃지`}
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-start">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-500">
                          {badge.name}
                        </h4>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {getTierName(badge.tier)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2 leading-relaxed">
                        {badge.description}
                      </p>
                      {badge.progress !== undefined && badge.maxProgress && (
                        <div className="w-full">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>진행률</span>
                            <span>
                              {badge.progress}/{badge.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${getProgressPercentage(badge)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 하단 통계 */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">
                {obtainedBadges.length}
              </div>
              <div className="text-xs text-gray-500">보유 뱃지</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {unobtainedBadges.length}
              </div>
              <div className="text-xs text-gray-500">미보유 뱃지</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-600">
                {Math.round((obtainedBadges.length / badges.length) * 100)}%
              </div>
              <div className="text-xs text-gray-500">달성률</div>
            </div>
          </div>
        </div>
      </div>

      {/* 뱃지 상세 보기 모달 */}
      {selectedBadge && (
        <BadgeDetailViewModal
          badge={selectedBadge}
          isOpen={isDetailViewOpen}
          onClose={handleDetailViewClose}
        />
      )}
    </div>
  );
};

export default BadgeDetailModal;
