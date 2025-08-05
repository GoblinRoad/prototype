import type React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
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
            개인정보처리방침
          </h1>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            {/* 1. 목적 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. 개인정보처리방침의 목적
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 개인정보처리방침은 깨비로드 ("회사")가 제공하는 서비스 이용과
                관련하여 이용자의 개인정보를 어떻게 수집·이용·보관·파기하는지에
                대해 설명합니다. 이용자는 본 방침을 충분히 읽고 이해한 후 서비스
                이용에 동의해야 합니다.
              </p>
            </section>

            {/* 2. 수집하는 개인정보 항목 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. 수집하는 개인정보 항목
              </h2>
              <p className="text-gray-700 mb-3">
                회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>
                  • 필수 정보: 이름, 이메일 주소, 로그인 ID (소셜 로그인 시에는
                  해당 정보 포함)
                </li>
                <li>• 선택 정보: 프로필 사진, 연락처, 생년월일 등</li>
                <li>
                  • 위치정보: GPS 기반 위치 데이터 (서비스 맞춤형 코스 추천
                  목적)
                </li>
                <li>• 서비스 이용 기록: 접속 로그, 쿠키, 기기 정보 등</li>
              </ul>
            </section>

            {/* 3. 개인정보 수집 방법 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. 개인정보 수집 방법
              </h2>
              <p className="text-gray-700 mb-3">
                개인정보는 다음과 같은 방법으로 수집합니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>
                  • 회원가입 및 서비스 이용 과정에서 이용자가 직접 입력한 정보
                </li>
                <li>• 소셜 로그인 API를 통한 제공 정보</li>
                <li>
                  • 서비스 이용 과정에서 자동으로 생성되는 로그 및 위치정보
                </li>
              </ul>
            </section>

            {/* 4. 개인정보의 이용 목적 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. 개인정보의 이용 목적
              </h2>
              <p className="text-gray-700 mb-3">
                수집한 개인정보는 다음의 목적으로 사용됩니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• 서비스 제공 및 운영 (회원관리, 맞춤형 서비스 제공 등)</li>
                <li>• 위치기반 서비스 제공 및 코스 추천</li>
                <li>• 고객 상담 및 불만 처리</li>
                <li>• 서비스 개선 및 신규 서비스 개발</li>
                <li>• 법적 의무 이행</li>
              </ul>
            </section>

            {/* 5. 개인정보 보유 및 이용 기간 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. 개인정보 보유 및 이용 기간
              </h2>
              <p className="text-gray-700 leading-relaxed">
                이용자의 개인정보는 원칙적으로 개인정보 수집 및 이용 목적이
                달성된 후 즉시 파기합니다. 단, 관련 법령에 따라 보존이 필요한
                경우에는 일정 기간 동안 안전하게 보관합니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4 mt-3">
                <li>• 회원 탈퇴 시: 즉시 파기</li>
                <li>
                  • 관련 법령에 따른 보관 기간: 예) 전자상거래법에 따른 5년 등
                </li>
              </ul>
            </section>

            {/* 6. 개인정보 제3자 제공 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. 개인정보 제3자 제공
              </h2>
              <p className="text-gray-700 mb-3">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                단, 다음과 같은 경우에는 예외로 합니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• 이용자가 사전에 동의한 경우</li>
                <li>• 법령에 의해 요구되는 경우</li>
                <li>
                  • 서비스 제공을 위해 제휴사 및 외부 업체(예: 지도 API
                  제공사)와 공유하는 경우
                </li>
              </ul>
            </section>

            {/* 7. 개인정보 처리 위탁 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                7. 개인정보 처리 위탁
              </h2>
              <p className="text-gray-700 mb-3">
                회사는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를
                위탁하고 있습니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• 위탁 대상자: 7Layers</li>
                <li>• 위탁 업무 내용: 서버 관리, 결제 처리, 고객 상담 등</li>
                <li>• 위탁 기간: 위탁 계약 종료 시까지</li>
              </ul>
            </section>

            {/* 8. 이용자의 권리 및 행사 방법 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                8. 이용자의 권리 및 행사 방법
              </h2>
              <p className="text-gray-700 mb-3">
                이용자는 언제든지 아래의 권리를 행사할 수 있습니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4 mb-3">
                <li>• 개인정보 열람, 수정, 삭제 요구</li>
                <li>• 개인정보 처리 정지 요구</li>
                <li>• 동의 철회</li>
              </ul>
            </section>

            {/* 9. 개인정보 보호를 위한 기술적·관리적 조치 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                9. 개인정보 보호를 위한 기술적·관리적 조치
              </h2>
              <p className="text-gray-700 mb-3">
                회사는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은
                조치를 시행하고 있습니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• 개인정보 암호화</li>
                <li>• 접근 권한 제한 및 관리</li>
                <li>• 개인정보 처리 직원 교육</li>
                <li>• 보안 프로그램 설치 및 점검</li>
              </ul>
            </section>

            {/* 10. 쿠키 사용 및 관리 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                10. 쿠키 사용 및 관리
              </h2>
              <p className="text-gray-700 leading-relaxed">
                서비스는 이용자 편의 제공을 위해 쿠키를 사용할 수 있습니다.
                쿠키는 이용자의 기기에 저장되는 작은 텍스트 파일로, 서비스 이용
                기록 등을 저장합니다.
              </p>
              <p className="text-gray-700 mt-3">
                이용자는 쿠키 수집을 거부할 수 있으며, 거부 시 일부 서비스
                이용에 제한이 있을 수 있습니다.
              </p>
            </section>

            {/* 11. 위치정보 수집 및 이용 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                11. 위치정보 수집 및 이용 (플로깅 서비스 특화)
              </h2>
              <p className="text-gray-700 mb-3">
                본 서비스는 맞춤형 코스 추천 및 위치 기반 서비스 제공을 위해
                이용자의 위치정보를 수집합니다.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• 수집 항목: GPS 좌표, IP 주소</li>
                <li>• 이용 목적: 코스 추천, 위치 기반 서비스 제공 및 개선</li>
                <li>
                  • 보관 기간: 서비스 이용 기간 동안 보관하며, 탈퇴 시 즉시 파기
                </li>
                <li>
                  • 제3자 제공: 지도 API 제공 업체 등과 공유될 수 있습니다.
                </li>
                <li>
                  • 동의 철회: 이용자는 언제든 위치정보 제공 동의를 철회할 수
                  있습니다.
                </li>
              </ul>
            </section>

            {/* 12. 개인정보처리방침 변경 안내 */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                12. 개인정보처리방침 변경 안내
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 방침은 관련 법령 및 회사 정책에 따라 변경될 수 있습니다. 변경
                시 홈페이지 공지 또는 앱 내 알림을 통해 안내할 것입니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
