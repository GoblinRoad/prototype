"use client";

import type React from "react";
import { MapPin, Trophy, Home, Award, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { TabItem } from "@/types";

type BottomNavigationProps = Record<string, never>;

const BottomNavigation: React.FC<BottomNavigationProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs: TabItem[] = [
    { id: "courses", label: "코스", icon: "MapPin" },
    { id: "rankings", label: "랭킹", icon: "Trophy" },
    { id: "home", label: "홈", icon: "Home" },
    { id: "certification", label: "인증", icon: "Award" },
    { id: "profile", label: "마이", icon: "User" },
  ];

  // 현재 활성화된 탭을 결정하는 로직
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/courses")) return "courses";
    if (path.startsWith("/rankings")) return "rankings";
    if (path.startsWith("/certification")) return "certification";
    if (
      path.startsWith("/profile") ||
      path.startsWith("/help-support") ||
      path.startsWith("/privacy-security") ||
      path.startsWith("/privacy-policy") ||
      path.startsWith("/app-permissions")
    )
      return "profile";
    return "home"; // 기본값
  };

  const currentPage = getCurrentPage();

  const getIcon = (iconName: string, isActive: boolean) => {
    const className = `w-5 h-5 ${
      isActive ? "text-emerald-600" : "text-gray-400"
    }`;

    switch (iconName) {
      case "MapPin":
        return <MapPin className={className} />;
      case "Trophy":
        return <Trophy className={className} />;
      case "Home":
        return <Home className={className} />;
      case "Award":
        return <Award className={className} />;
      case "User":
        return <User className={className} />;
      default:
        return <Home className={className} />;
    }
  };

  const handleTabClick = (id: string) => {
    switch (id) {
      case "home":
        navigate("/");
        break;
      case "courses":
        navigate("/courses");
        break;
      case "rankings":
        navigate("/rankings");
        break;
      case "certification":
        navigate("/certification");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = currentPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-emerald-50 scale-105" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  {getIcon(tab.icon, isActive)}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"></div>
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-emerald-600" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
