import type React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

interface LoginPageProps {
  onLogin: (provider: "kakao" | "google") => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSocialLogin = (provider: "kakao" | "google") => {
    // 실제로는 소셜 로그인 API 호출
    console.log(`${provider} 로그인 처리`);
    onLogin(provider);
    navigate("/profile");
  };

  return (
    <div className="bg-gray-50 h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-8 text-center shadow-lg">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          로그인이 필요합니다
        </h1>
        <p className="text-gray-600 mb-8">
          소셜 계정으로 간편하게 로그인하세요
        </p>

        <div className="space-y-4">
          {/* 카카오 로그인 */}
          <button
            onClick={() => handleSocialLogin("kakao")}
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
            onClick={() => handleSocialLogin("google")}
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

        <p className="text-xs text-gray-500 mt-6">
          로그인 시 개인정보 처리방침과 이용약관에 <br /> 동의하는 것으로
          간주됩니다
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
