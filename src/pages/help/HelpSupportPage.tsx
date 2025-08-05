"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpSupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"faq" | "guide">("faq");

  // 페이지 진입 시 스크롤 초기화
  useEffect(() => {
    // 모든 스크롤 가능한 요소를 맨 위로 이동
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 추가로 setTimeout을 사용해서 DOM이 완전히 렌더링된 후 스크롤 처리
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, []);

  // 탭 변경 시 스크롤을 맨 위로 이동
  const handleTabChange = (tab: "faq" | "guide") => {
    setActiveTab(tab);
    // 페이지 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  };

  // FAQ 데이터
  const faqData = [
    {
      question: "플로깅이란 무엇인가요?",
      answer:
        "플로깅은 '조깅(jogging)'과 '쓰레기 줍기(plocka upp)'의 합성어로, 조깅하면서 동시에 쓰레기를 줍는 환경보호 활동입니다. 건강도 챙기고 환경도 보호하는 일석이조의 운동이에요!",
    },
    {
      question: "코스는 어떻게 찾나요?",
      answer:
        "홈 화면의 '코스 찾기' 탭에서 내 주변 코스, 검색, AI 추천 등 다양한 방법으로 코스를 찾을 수 있습니다. 지역, 난이도, 테마별로 필터링도 가능해요.",
    },
    {
      question: "뱃지는 어떻게 획득하나요?",
      answer:
        "플로깅 활동을 통해 다양한 조건을 달성하면 뱃지를 획득할 수 있습니다. 거리 달성, 연속 플로깅, 특정 코스 완주 등 다양한 뱃지가 준비되어 있어요!",
    },
    {
      question: "포인트는 어떻게 적립하나요?",
      answer:
        "플로깅 활동, 뱃지 획득, 연속 달성 등 모든 활동에서 포인트를 적립할 수 있습니다. 더 많은 활동을 할수록 더 많은 포인트를 얻을 수 있어요.",
    },
    {
      question: "랭킹은 어떻게 계산되나요?",
      answer:
        "총 거리, 정리한 쓰레기 개수, 획득한 뱃지 수, 연속 달성일 등을 종합적으로 고려하여 랭킹이 계산됩니다. 꾸준한 활동이 높은 랭킹의 비결이에요!",
    },
    {
      question: "개인정보는 어떻게 보호되나요?",
      answer:
        "저희는 사용자의 개인정보를 최우선으로 보호합니다. 수집된 정보는 서비스 제공 목적으로만 사용되며, 제3자와 공유하지 않습니다.",
    },
  ];

  // 사용법 가이드 데이터
  const guideData = [
    {
      title: "플로깅 시작하기",
      steps: [
        "코스 찾기에서 원하는 코스를 선택하세요",
        "시작 버튼을 눌러 플로깅을 시작하세요",
        "조깅하면서 쓰레기를 줍아주세요",
        "완료 후 종료 버튼을 눌러 활동을 기록하세요",
      ],
    },
    {
      title: "코스 찾는 방법",
      steps: [
        "홈 화면에서 '코스 찾기' 탭을 선택하세요",
        "내 주변, 검색, AI 추천 중 원하는 방법을 선택하세요",
        "지역, 난이도, 테마로 필터링할 수 있어요",
        "마음에 드는 코스를 선택하고 상세 정보를 확인하세요",
      ],
    },
    {
      title: "뱃지 획득 방법",
      steps: [
        "다양한 활동을 통해 조건을 달성하세요",
        "거리 달성, 연속 플로깅 등 다양한 뱃지가 있어요",
        "조건을 달성하면 자동으로 뱃지를 획득합니다",
        "마이페이지에서 획득한 뱃지를 확인할 수 있어요",
      ],
    },
    {
      title: "포인트 적립 방법",
      steps: [
        "플로깅 활동을 완료하면 포인트를 적립받아요",
        "뱃지 획득, 연속 달성 등에서도 포인트를 얻을 수 있어요",
        "더 많은 활동을 할수록 더 많은 포인트를 적립할 수 있어요",
        "적립된 포인트는 랭킹에 반영됩니다",
      ],
    },
    {
      title: "랭킹 확인 방법",
      steps: [
        "하단 네비게이션에서 '랭킹' 탭을 선택하세요",
        "주간/월간 랭킹을 확인할 수 있어요",
        "내 순위와 상위 랭커들을 볼 수 있어요",
        "업적과 뱃지도 함께 확인할 수 있어요",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">도움말 및 지원</h1>
          <div className="w-9"></div> {/* 균형을 위한 빈 공간 */}
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => handleTabChange("faq")}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === "faq"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>자주 묻는 질문</span>
            </div>
          </button>
          <button
            onClick={() => handleTabChange("guide")}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === "guide"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>사용법 가이드</span>
            </div>
          </button>
        </div>
      </div>

      {/* 내용 */}
      <div className="p-4">
        {activeTab === "faq" ? (
          /* FAQ 섹션 */
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 사용법 가이드 섹션 */
          <div className="space-y-4">
            {guideData.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {guide.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-2">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">
                          {stepIndex + 1}
                        </span>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 액션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-center space-x-8">
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>문의하기</span>
          </button>
          <div className="w-px h-4 bg-gray-300"></div>
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <Info className="w-4 h-4" />
            <span>앱 정보</span>
          </button>
        </div>
      </div>

      {/* 하단 액션을 위한 여백 */}
      <div className="h-20"></div>
    </div>
  );
};

export default HelpSupportPage;
