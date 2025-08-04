"use client";

import type React from "react";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseDetailHeaderProps {
  isLiked: boolean;
  onToggleLike: () => void;
  onShare: () => void;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({
  isLiked,
  onToggleLike,
  onShare,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white px-4 py-3 shadow-sm relative">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center pr-10">
          코스 상세정보
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleLike}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
          <button
            onClick={onShare}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Share2 className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;
