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
} from "lucide-react";
import type { UserProfile } from "@/types";

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
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body 스크롤 막기
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // 모달 닫힐 때 복원
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
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
        <div className="p-6 space-y-6">
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
              <div className="absolute bottom-0 right-0 flex space-x-1">
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
        </div>

        {/* 액션 버튼들 */}
        <div className="flex space-x-3 p-6 border-t border-gray-100">
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
  );
};

export default ProfileEditModal;
