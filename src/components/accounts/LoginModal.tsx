"use client";

import type React from "react";
import { useEffect } from "react";
import { X, User } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (provider: "kakao" | "google") => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-gray-600">소셜 계정으로 간편하게 로그인하세요</p>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="space-y-4 mb-6">
          {/* 카카오 로그인 */}
          <button
            onClick={() => onLogin("kakao")}
            className="w-full flex items-center justify-center px-6 py-4 bg-[#FEE500] hover:bg-[#FDD800] text-black font-medium rounded-xl transition-colors shadow-sm"
          >
            <div className="flex items-center justify-center w-full max-w-xs">
              <img
                src="/images/kakaotalk_logo_icon.png"
                alt="카카오 로고"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  console.error("카카오 로고 이미지 로딩 실패");
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="ml-3 text-center">카카오로 로그인</span>
            </div>
          </button>

          {/* 구글 로그인 */}
          <button
            onClick={() => onLogin("google")}
            className="w-full flex items-center justify-center px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-colors shadow-sm border border-gray-300"
          >
            <div className="flex items-center justify-center w-full max-w-xs">
              <img
                src="/images/google_logo_icon.png"
                alt="구글 로고"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  console.error("구글 로고 이미지 로딩 실패");
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="ml-3 text-center">구글로 로그인</span>
            </div>
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            로그인하면 개인정보 처리방침과 이용약관에 동의하는 것으로 간주됩니다
          </p>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
