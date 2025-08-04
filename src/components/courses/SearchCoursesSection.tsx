"use client";

import type React from "react";
import { useState } from "react";
import { Search, Filter, Mountain, Waves, Building } from "lucide-react";
import type { Course } from "../../types";
import CourseCard from "./CourseCard";

interface SearchCoursesSectionProps {
  allCourses: Course[];
  onCourseClick: (courseId: string) => void;
}

const SearchCoursesSection: React.FC<SearchCoursesSectionProps> = ({
  allCourses,
  onCourseClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedTheme, setSelectedTheme] = useState("전체");
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [selectedTimes, setSelectedTimes] = useState("전체");

  // 지역 옵션
  const regions = [
    "전체",
    "서울",
    "경기",
    "인천",
    "부산",
    "대구",
    "대전",
    "광주",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  // 테마 옵션
  const themes = [
    { value: "전체", label: "전체", icon: null },
    { value: "산", label: "산/숲", icon: Mountain },
    { value: "바다", label: "바다", icon: Waves },
    { value: "도시", label: "도시", icon: Building },
  ];

  // 시간간 옵션
  const times = [
    { value: "전체", label: "전체", icon: null },
    { value: "3시간 이내", label: "3", icon: Mountain },
    { value: "5시간", label: "5", icon: Waves },
    { value: "7시간 이상", label: "7", icon: Building },
  ];

  // 난이도 옵션
  const difficulties = ["전체", "쉬움", "보통", "어려움"];

  const getThemeIcon = (theme: string) => {
    const themeObj = themes.find((t) => t.value === theme);
    if (themeObj?.icon) {
      const IconComponent = themeObj.icon;
      return <IconComponent className="w-4 h-4" />;
    }
    return null;
  };

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "전체" || course.location.includes(selectedRegion);
    const matchesDifficulty =
      selectedDifficulty === "전체" || course.difficulty === selectedDifficulty;
    // TODO: 테마 필터링 로직 추가 (현재 Course 타입에 테마 정보 없음)
    // const matchesTheme = selectedTheme === '전체' || course.theme === selectedTheme;
    // const matchesTimes = selectedTimes === "전체" || course.times === selectedTimes;

    return matchesSearch && matchesRegion && matchesDifficulty; // && matchesTheme && matchesTimes;
  });

  return (
    <div className="p-4">
      {/* 필터 옵션 */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm space-y-4">
        {/* 지역 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            지역
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* 테마 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            테마
          </label>
          <div className="flex space-x-2">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => setSelectedTheme(theme.value)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-1 ${
                  selectedTheme === theme.value
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {getThemeIcon(theme.value)}
                <span className="text-sm font-medium">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 난이도 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            난이도
          </label>
          <div className="flex space-x-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                  selectedDifficulty === difficulty
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 검색바 */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="코스명 또는 지역을 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            검색 결과 ({filteredCourses.length}개)
          </h3>
        </div>

        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onCourseClick={onCourseClick}
          />
        ))}

        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">검색 결과가 없습니다</div>
            <div className="text-sm text-gray-500">
              다른 조건으로 검색해보세요
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCoursesSection;
