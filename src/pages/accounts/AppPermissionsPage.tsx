import type React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Image,
  MapPin,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const AppPermissionsPage: React.FC = () => {
  const navigate = useNavigate();

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
            앱 권한 안내
          </h1>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="px-4 py-6 space-y-6">
        {/* 안내 메시지 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                권한 안내
              </h3>
              <p className="text-sm text-blue-700">
                깨비로드는 서비스 제공을 위해 필요한 최소한의 권한만 요청합니다.
                각 권한은 언제든지 설정에서 변경할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 카메라 권한 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">카메라</h2>
                <p className="text-sm text-gray-500">
                  사진 촬영 및 프로필 변경
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                사용 목적
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 플로깅 활동 사진 촬영</li>
                <li>• 프로필 사진 변경</li>
                <li>• 코스 리뷰 사진 업로드</li>
                <li>• 환경 정리 활동 기록</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                권한 거부 시
              </h3>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  사진 촬영 기능을 사용할 수 없습니다. 갤러리에서 기존 사진을
                  선택하는 것은 가능합니다.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                권한 설정 방법
              </h3>
              <p className="text-sm text-gray-700">
                설정 &gt; 개인정보 보호 및 보안 &gt; 카메라에서 권한을 관리할 수
                있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 갤러리 권한 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">갤러리</h2>
                <p className="text-sm text-gray-500">사진 선택 및 저장</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                사용 목적
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 기존 사진을 프로필로 설정</li>
                <li>• 플로깅 활동 사진 저장</li>
                <li>• 코스 리뷰에 사진 첨부</li>
                <li>• 활동 기록 사진 관리</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                권한 거부 시
              </h3>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  사진 업로드 기능을 사용할 수 없습니다. 카메라로 직접 촬영하는
                  것은 가능합니다.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                권한 설정 방법
              </h3>
              <p className="text-sm text-gray-700">
                설정 &gt; 개인정보 보호 및 보안 &gt; 사진에서 권한을 관리할 수
                있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 위치정보 권한 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  위치정보
                </h2>
                <p className="text-sm text-gray-500">위치 기반 서비스 제공</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                사용 목적
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 현재 위치 기반 코스 추천</li>
                <li>• 플로깅 경로 기록</li>
                <li>• 근처 플로거 찾기</li>
                <li>• 거리 측정 및 통계</li>
                <li>• 안전한 플로깅 경로 안내</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                권한 거부 시
              </h3>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  위치 기반 서비스를 사용할 수 없습니다. 코스 추천 및 경로 기록
                  기능이 제한됩니다.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                권한 설정 방법
              </h3>
              <p className="text-sm text-gray-700">
                설정 &gt; 개인정보 보호 및 보안 &gt; 위치 서비스에서 권한을
                관리할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 권한 관리 팁 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              권한 관리 팁
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  언제든지 변경 가능
                </h3>
                <p className="text-sm text-gray-700">
                  권한은 언제든지 설정에서 허용/거부를 변경할 수 있습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  필요한 기능만 사용
                </h3>
                <p className="text-sm text-gray-700">
                  권한을 거부해도 기본적인 서비스 이용은 가능합니다.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  안전한 데이터 처리
                </h3>
                <p className="text-sm text-gray-700">
                  수집된 정보는 서비스 제공 목적으로만 사용되며 안전하게
                  보호됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPermissionsPage;
