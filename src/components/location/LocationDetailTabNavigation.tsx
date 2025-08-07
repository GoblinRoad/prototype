import type React from "react";
import { FileText, MessageCircle } from "lucide-react";

interface LocationDetailTabNavigationProps {
  activeTab: "overview" | "reviews";
  setActiveTab: (tab: "overview" | "reviews") => void;
}

const LocationDetailTabNavigation: React.FC<LocationDetailTabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200">
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
            activeTab === "overview"
              ? "bg-white text-emerald-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>장소 정보</span>
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
            activeTab === "reviews"
              ? "bg-white text-emerald-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>리뷰</span>
        </button>
      </div>
    </div>
  );
};

export default LocationDetailTabNavigation;
