import React from "react";
import { X } from "lucide-react";
import type { Badge } from "@/types";

interface BadgeDetailViewModalProps {
  badge: Badge;
  isOpen: boolean;
  onClose: () => void;
}

const BadgeDetailViewModal: React.FC<BadgeDetailViewModalProps> = ({
  badge,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

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
      case "diamond":
        return "다이아몬드";
      default:
        return "브론즈";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 뱃지 이미지 */}
        <div className="flex justify-center px-6 pb-6">
          <div className="relative">
            {/* 뱃지 이미지 */}
            <img
              src={
                badge.tier === "gold"
                  ? "/images/gold.png"
                  : badge.tier === "platinum"
                  ? "/images/platinum.png"
                  : badge.tier === "diamond"
                  ? "/images/diamond.png"
                  : `/images/${badge.tier}.png`
              }
              alt={`${getTierName(badge.tier)} 뱃지`}
              className="w-48 h-48 object-contain"
            />

            {/* 등급 표시 */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                {getTierName(badge.tier)}
              </span>
            </div>
          </div>
        </div>

        {/* 뱃지 정보 */}
        <div className="px-6 pb-8">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
            {badge.name}
          </h3>

          <p className="text-gray-600 text-center leading-relaxed mb-6">
            {badge.description}
          </p>

          {/* 획득 정보 */}
          {badge.obtainedDate && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                {new Date(badge.obtainedDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                에 이 배지를 획득했습니다.
              </p>
            </div>
          )}

          {/* 진행률 (미보유 뱃지인 경우) */}
          {!badge.obtainedDate &&
            badge.progress !== undefined &&
            badge.maxProgress && (
              <div className="mt-6">
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                  <span>진행률</span>
                  <span>
                    {badge.progress}/{badge.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-emerald-500/20 rounded-full h-2">
                  <div
                    className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (badge.progress / badge.maxProgress) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BadgeDetailViewModal;
