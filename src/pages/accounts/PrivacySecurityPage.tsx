import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  User,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";

const PrivacySecurityPage: React.FC = () => {
  const navigate = useNavigate();
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  const handleWithdraw = () => {
    // 실제로는 회원탈퇴 API 호출
    console.log("회원탈퇴 처리");
    setShowWithdrawConfirm(false);
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 ml-2">
            개인정보 및 보안
          </h1>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="px-4 py-6 space-y-6">
        {/* 계정 정보 섹션 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 text-gray-600 mr-2" />
              계정 정보
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">이메일</span>
                <span className="text-gray-900 font-medium">
                  plogging@email.com
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">로그인 방식</span>
                <div className="flex items-center">
                  <img
                    src="/images/kakaotalk_logo_icon.png"
                    alt="카카오 로고"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  <span className="text-gray-900 font-medium">카카오</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">가입일</span>
                <span className="text-gray-900 font-medium">2023년 8월</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">마지막 로그인</span>
                <span className="text-gray-900 font-medium">오늘</span>
              </div>
            </div>
          </div>
        </div>

        {/* 개인정보 및 권한 섹션 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="w-5 h-5 text-gray-600 mr-2" />
              개인정보 및 권한
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-700 font-medium">
                    개인정보처리방침
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    개인정보 수집 및 이용에 대한 안내
                  </p>
                </div>
                <button
                  onClick={() => navigate("/privacy-policy")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  보기
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-700 font-medium">
                    앱 권한 안내
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    카메라, 갤러리, 위치정보 사용 권한 안내
                  </p>
                </div>
                <button
                  onClick={() => navigate("/app-permissions")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  보기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 회원탈퇴 섹션 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Trash2 className="w-5 h-5 text-gray-600 mr-2" />
              회원탈퇴
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  회원탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수
                  없습니다. 신중하게 결정해 주세요.
                </p>
              </div>
              <button
                onClick={() => setShowWithdrawConfirm(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 회원탈퇴 확인 모달 */}
      {showWithdrawConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
            {/* 헤더 */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setShowWithdrawConfirm(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 아이콘 및 제목 */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <div className="relative">
                  <User className="w-8 h-8 text-red-600" />
                  <X className="w-4 h-4 text-red-600 absolute -top-1 -right-1" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
                회원탈퇴
              </h3>

              {/* 주의사항 */}
              <div className="border border-red-200 rounded-xl p-4 mb-6 bg-red-50">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-semibold text-red-700">주의사항</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-red-700 text-sm">
                      모든 활동 기록이 영구 삭제됩니다
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-red-700 text-sm">
                      획득한 뱃지와 업적이 사라집니다
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-red-700 text-sm">
                      7일 내에 복구가 가능합니다
                    </span>
                  </li>
                </ul>
              </div>

              {/* 동의 체크박스 */}
              <div className="flex items-start mb-6">
                <input
                  type="checkbox"
                  id="withdraw-agreement"
                  className="mt-1 mr-3 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <label
                  htmlFor="withdraw-agreement"
                  className="text-sm text-gray-700 leading-relaxed"
                >
                  위 내용을 모두 확인했으며, 회원탈퇴에 동의합니다
                </label>
              </div>

              {/* 버튼 */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowWithdrawConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleWithdraw}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySecurityPage;
