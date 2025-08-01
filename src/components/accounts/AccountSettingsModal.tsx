"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  X,
  UserX,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Shield,
  Trash2,
} from "lucide-react";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: () => void;
}

const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  isOpen,
  onClose,
  onWithdraw,
}) => {
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState("");
  const [finalConfirm, setFinalConfirm] = useState(false);

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

  // 탈퇴 사유 옵션
  const withdrawReasons = [
    "서비스가 마음에 들지 않음",
    "개인정보 보호 우려",
    "사용 빈도가 낮음",
    "다른 서비스로 이동",
    "기타",
  ];

  const handleWithdraw = () => {
    if (!finalConfirm) return;

    setShowWithdrawConfirm(false);
    setWithdrawReason("");
    setFinalConfirm(false);
    onWithdraw();
  };

  if (!isOpen) return null;

  // 회원탈퇴 확인 모달
  if (showWithdrawConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">회원탈퇴</h3>
            </div>

            {/* 주의사항 */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="font-bold text-red-600">주의사항</span>
                  </div>
                  <ul className="space-y-1 text-sm text-red-600">
                    <li>• 모든 활동 기록이 영구 삭제됩니다</li>
                    <li>• 획득한 뱃지와 업적이 사라집니다</li>
                    <li>• 7일 내에 복구가 가능합니다</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 탈퇴 사유 선택 */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                탈퇴 사유 (선택사항)
              </label>
              <select
                value={withdrawReason}
                onChange={(e) => setWithdrawReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="">사유를 선택하세요</option>
                {withdrawReasons.map((reason, index) => (
                  <option key={index} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {/* 최종 확인 */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="finalConfirm"
                  checked={finalConfirm}
                  onChange={(e) => setFinalConfirm(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="finalConfirm" className="text-sm text-gray-700">
                  위 내용을 모두 확인했으며, 회원탈퇴에 동의합니다
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowWithdrawConfirm(false);
                  setWithdrawReason("");
                  setFinalConfirm(false);
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleWithdraw}
                disabled={!finalConfirm}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 메인 계정 설정 모달
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">계정 설정</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* 회원탈퇴 */}
          <button
            onClick={() => setShowWithdrawConfirm(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-red-700">회원탈퇴</div>
                <div className="text-sm text-red-500">
                  계정을 영구적으로 삭제합니다
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsModal;
