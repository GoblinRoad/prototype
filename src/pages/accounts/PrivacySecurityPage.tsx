import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, User, Trash2, AlertTriangle } from "lucide-react";

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              회원탈퇴 확인
            </h3>
            <p className="text-gray-600 text-center mb-6">
              정말로 회원탈퇴를 하시겠습니까?
              <br />
              모든 데이터가 영구적으로 삭제됩니다.
            </p>
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
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySecurityPage;
