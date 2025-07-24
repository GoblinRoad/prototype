"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, MapPin, Play, Square, Camera, Clock, Target } from "lucide-react"

const CertificationPage: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [trackingData, setTrackingData] = useState({
    duration: "00:00:00",
    distance: "0.0",
    currentLocation: "서울특별시 강남구",
  })

  const handleStartPlogging = () => {
    setIsTracking(true)
    setIsPaused(false)
    // GPS 추적 시작 로직 (추후 구현)
  }

  const handlePausePlogging = () => {
    setIsPaused(!isPaused)
    // GPS 추적 일시정지 로직 (추후 구현)
  }

  const handleStopPlogging = () => {
    setIsTracking(false)
    setIsPaused(false)
    // GPS 추적 종료 및 결과 저장 로직 (추후 구현)
  }

  const handleTakePhoto = () => {
    // 사진 촬영 로직 (추후 구현)
  }

  return (
      // max-w-md mx-auto 클래스를 App.tsx의 Layout 컴포넌트로 이동했습니다.
      <div className="bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{isTracking ? "플로깅 진행중" : "플로깅 시작"}</h1>
          </div>
        </div>

        {/* 지도 영역 */}
        <div className="relative">
          <div className="h-64 sm:h-80 bg-gray-200 flex items-center justify-center">
            {/* 카카오맵이 들어갈 자리 */}
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">카카오맵 영역</p>
              <p className="text-sm text-gray-400 mt-1">현재 위치: {trackingData.currentLocation}</p>
            </div>
          </div>

          {/* 현재 위치 버튼 */}
          <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        {/* 추적 정보 (진행 중일 때만 표시) */}
        {isTracking && (
            <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-sm font-medium text-gray-600">시간</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{trackingData.duration}</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Target className="w-4 h-4 text-emerald-500 mr-1" />
                    <span className="text-sm font-medium text-gray-600">거리</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                {trackingData.distance}
                    <span className="text-sm text-gray-500 ml-1">km</span>
              </span>
                </div>
              </div>
            </div>
        )}

        {/* 컨트롤 버튼 */}
        <div className="fixed bottom-20 left-0 right-0 px-4">
          {/* max-w-md mx-auto 클래스를 App.tsx의 Layout 컴포넌트로 이동했습니다. */}
          <div className="max-w-md mx-auto">
            {!isTracking ? (
                /* 시작하기 버튼 */
                <button
                    onClick={handleStartPlogging}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="w-6 h-6" />
                  <span>플로깅 시작하기</span>
                </button>
            ) : (
                /* 진행 중 컨트롤 */
                <div className="space-y-3">
                  {/* 사진 촬영 버튼 */}

                  {/* 일시정지/재개 및 종료 버튼 */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleTakePhoto}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                    >
                      <Camera className="w-5 h-5" />
                      <span>인증 사진 촬영</span>
                    </button>

                    <button
                        onClick={handleStopPlogging}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                    >
                      <Square className="w-5 h-5" />
                      <span>종료</span>
                    </button>
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* 안내 메시지 */}
        {!isTracking && (
            <div className="px-4 mt-6 mb-32">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <h3 className="font-semibold text-emerald-800 mb-2">플로깅 시작 전 안내</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• GPS 위치 서비스를 켜주세요</li>
                  <li>• 안전한 장소에서 플로깅을 시작하세요</li>
                  <li>• 쓰레기 수거용 봉투를 준비해주세요</li>
                  <li>• 운동화와 편안한 복장을 착용하세요</li>
                </ul>
              </div>
            </div>
        )}
      </div>
  )
}

export default CertificationPage
