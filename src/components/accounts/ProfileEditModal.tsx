"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  X,
  Camera,
  Trash2,
  User,
  Check,
  AlertCircle,
  Loader2,
  Mountain,
  Waves,
  Building,
} from "lucide-react";
import type { UserProfile, RegionData, AreaData } from "@/types";

interface ProfileEditModalProps {
  userProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  userProfile,
  isOpen,
  onClose,
  onSave,
}) => {
  // 모달 열릴 때 뒤쪽 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      // body 스크롤 막기 (더 안전한 방법)
      document.body.style.overflow = "hidden";

      // 모달 닫힐 때 복원
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    avatar: userProfile.avatar,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);
  const [imageError, setImageError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(
    userProfile.region || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    userProfile.district || ""
  );
  const [preferredTheme, setPreferredTheme] = useState<string[]>(
    userProfile.preferredTheme ? [userProfile.preferredTheme] : []
  );
  const [difficultyLevel, setDifficultyLevel] = useState(
    userProfile.difficultyLevel || ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 테마 옵션
  const themeOptions = [
    { value: "전체", label: "전체", icon: null },
    { value: "산", label: "산/숲", icon: Mountain },
    { value: "바다", label: "바다/강", icon: Waves },
    { value: "도시", label: "도시/공원", icon: Building },
  ];

  // 테마 토글 핸들러
  const handleThemeToggle = (theme: string) => {
    setPreferredTheme((prev) => {
      if (theme === "전체") {
        // 전체 버튼 클릭 시 전체 선택 또는 해제
        if (prev.includes("전체")) {
          return [];
        } else {
          return ["전체"];
        }
      }

      if (prev.includes(theme)) {
        // 개별 테마 해제
        const newSelection = prev.filter((t) => t !== theme);
        return newSelection;
      } else {
        // 개별 테마 추가 (전체가 선택되어 있으면 전체 해제)
        const newSelection = prev.includes("전체")
          ? [theme] // 전체가 선택되어 있으면 해당 테마만 선택
          : [...prev, theme];

        // 산, 바다, 도시가 모두 선택되면 전체로 변경
        const individualThemes = ["산", "바다", "도시"];
        const hasAllIndividualThemes = individualThemes.every((t) =>
          newSelection.includes(t)
        );

        if (hasAllIndividualThemes) {
          return ["전체"];
        }

        return newSelection;
      }
    });
  };

  // 지역 데이터 (실제로는 API에서 가져올 데이터)
  const regionData: (RegionData | AreaData)[] = [
    {
      region: "서울특별시",
      districts: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ],
    },
    {
      areaCode: 6,
      areaName: "부산광역시",
      subRegions: [
        { sigunguCode: 1, name: "중구" },
        { sigunguCode: 2, name: "서구" },
        { sigunguCode: 3, name: "동구" },
        { sigunguCode: 4, name: "영도구" },
        { sigunguCode: 5, name: "부산진구" },
        { sigunguCode: 6, name: "동래구" },
        { sigunguCode: 7, name: "남구" },
        { sigunguCode: 8, name: "북구" },
        { sigunguCode: 9, name: "해운대구" },
        { sigunguCode: 10, name: "사하구" },
        { sigunguCode: 11, name: "금정구" },
        { sigunguCode: 12, name: "강서구" },
        { sigunguCode: 13, name: "연제구" },
        { sigunguCode: 14, name: "수영구" },
        { sigunguCode: 15, name: "사상구" },
        { sigunguCode: 16, name: "기장군" },
      ],
    },
  ];

  // 선택된 지역의 시군구 목록 가져오기
  const getDistrictsForRegion = (region: string) => {
    const selectedRegionData = regionData.find((data) =>
      "region" in data ? data.region === region : data.areaName === region
    );

    if (!selectedRegionData) return [];

    if ("districts" in selectedRegionData) {
      return selectedRegionData.districts;
    } else {
      return selectedRegionData.subRegions.map((sub) => sub.name);
    }
  };

  // 닉네임 중복 검사
  const checkNameAvailability = async (name: string) => {
    if (name.length < 2) {
      setNameError("닉네임은 2글자 이상이어야 합니다.");
      setNameAvailable(false);
      return;
    }

    if (name.length > 10) {
      setNameError("닉네임은 10글자 이하여야 합니다.");
      setNameAvailable(false);
      return;
    }

    setIsCheckingName(true);
    setNameError("");

    // 실제로는 API 호출을 통해 중복 검사
    // 여기서는 시뮬레이션
    setTimeout(() => {
      const isAvailable = name !== "김플로깅" && name !== "admin";
      setNameAvailable(isAvailable);
      if (!isAvailable) {
        setNameError("이미 사용 중인 닉네임입니다.");
      }
      setIsCheckingName(false);
    }, 1000);
  };

  // 닉네임 변경 핸들러
  const handleNameChange = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
    setNameError("");
    setNameAvailable(null);

    if (name.length >= 2) {
      checkNameAvailability(name);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (5MB 제한)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setImageError("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 파일 확장자 검증
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError("JPG, PNG, WebP, GIF 형식만 지원됩니다.");
      return;
    }

    // 파일명에서 확장자 확인 (추가 검증)
    const fileName = file.name.toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const hasValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!hasValidExtension) {
      setImageError("JPG, PNG, WebP, GIF 형식만 지원됩니다.");
      return;
    }

    setImageError(""); // 에러 초기화

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData((prev) => ({ ...prev, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
    setImageError(""); // 에러 초기화
  };

  // 저장 핸들러
  const handleSave = async () => {
    if (!formData.name.trim()) {
      setNameError("닉네임을 입력해주세요.");
      return;
    }

    if (nameAvailable === false) {
      return;
    }

    setIsLoading(true);

    // 실제로는 API 호출을 통해 저장
    setTimeout(() => {
      onSave({
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
        region: selectedRegion,
        district: selectedDistrict,
        preferredTheme:
          preferredTheme.length > 0
            ? (preferredTheme[0] as "sea" | "mountain" | undefined)
            : undefined,
        difficultyLevel: difficultyLevel as
          | "easy"
          | "medium"
          | "hard"
          | undefined,
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">프로필 편집</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* 프로필 이미지 */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="프로필 이미지"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* 이미지 편집 버튼들 */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                {formData.avatar && (
                  <button
                    onClick={handleImageDelete}
                    className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.gif"
              onChange={handleImageUpload}
              className="hidden"
            />

            <p className="text-sm text-gray-500">
              프로필 이미지를 변경하거나 삭제할 수 있습니다
            </p>

            {/* 이미지 에러 메시지 */}
            {imageError && (
              <p className="text-sm text-red-600 flex items-center justify-center mt-2">
                <AlertCircle className="w-4 h-4 mr-1" />
                {imageError}
              </p>
            )}
          </div>

          {/* 닉네임 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                  nameError
                    ? "border-red-300 focus:ring-red-200"
                    : nameAvailable === true
                    ? "border-green-300 focus:ring-green-200"
                    : "border-gray-300 focus:ring-emerald-200"
                }`}
                placeholder="닉네임을 입력하세요"
                maxLength={10}
              />

              {/* 상태 아이콘 */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isCheckingName ? (
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                ) : nameAvailable === true ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : nameAvailable === false ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : null}
              </div>
            </div>

            {/* 에러 메시지 */}
            {nameError && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {nameError}
              </p>
            )}

            {/* 사용 가능 메시지 */}
            {nameAvailable === true && (
              <p className="text-sm text-green-600 flex items-center">
                <Check className="w-4 h-4 mr-1" />
                사용 가능한 닉네임입니다
              </p>
            )}
          </div>

          {/* 이메일 표시 (수정 불가) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500">
              이메일은 보안상 변경할 수 없습니다
            </p>
          </div>

          {/* 개인지역 선택 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">선호 지역</h3>

            {/* 지역 선택 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                지역
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedDistrict(""); // 지역 변경 시 시군구 초기화
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">지역을 선택하세요</option>
                {regionData.map((data, index) => (
                  <option
                    key={index}
                    value={"region" in data ? data.region : data.areaName}
                  >
                    {"region" in data ? data.region : data.areaName}
                  </option>
                ))}
              </select>
            </div>

            {/* 시군구 선택 */}
            {selectedRegion && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  시군구
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">시군구를 선택하세요</option>
                  {getDistrictsForRegion(selectedRegion).map(
                    (district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>

          {/* 선호 테마 선택 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              선호 테마
            </label>
            <div className="grid grid-cols-2 gap-3">
              {themeOptions.map((theme) => {
                const IconComponent = theme.icon;
                const isSelected = preferredTheme.includes(theme.value);
                return (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => handleThemeToggle(theme.value)}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      {IconComponent && (
                        <div className="flex justify-center mb-2">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      )}
                      <div
                        className={`font-medium ${
                          theme.value === "전체" ? "text-base" : "text-sm"
                        }`}
                      >
                        {theme.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 플로깅 난이도 선택 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              플로깅 난이도
            </label>
            <div className="grid grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setDifficultyLevel("")}
                className={`p-3 rounded-xl border-2 transition-colors ${
                  difficultyLevel === ""
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium leading-tight">
                    <div>상관</div>
                    <div>없음</div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDifficultyLevel("easy")}
                className={`p-3 rounded-xl border-2 transition-colors ${
                  difficultyLevel === "easy"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">쉬움</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDifficultyLevel("medium")}
                className={`p-3 rounded-xl border-2 transition-colors ${
                  difficultyLevel === "medium"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">보통</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDifficultyLevel("hard")}
                className={`p-3 rounded-xl border-2 transition-colors ${
                  difficultyLevel === "hard"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">어려움</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex justify-center p-6 pb-8 border-t border-gray-100 flex-shrink-0">
          <div className="flex space-x-3 w-full max-w-xs">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={
                isLoading || nameAvailable === false || !formData.name.trim()
              }
              className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                "저장"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
