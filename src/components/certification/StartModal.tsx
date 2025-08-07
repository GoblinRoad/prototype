import React from 'react'
import { Play, MapPin, Target } from 'lucide-react'

interface CourseGpxData {
  courseId: string;
  courseName: string;
  gpxPath: Array<{lat: number, lng: number}>;
  targetDistance: number;
  difficulty: string;
}

interface StartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  courseInfo?: CourseGpxData | null;
}

export const StartModal: React.FC<StartModalProps> = ({
                                                        isOpen,
                                                        onClose,
                                                        onStart,
                                                        courseInfo
                                                      }) => {
  if (!isOpen) return null

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-emerald-600 ml-1" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {courseInfo ? '코스 플로깅을 시작하시겠습니까?' : '플로깅을 시작하시겠습니까?'}
            </h3>

            {/* 코스 정보가 있을 때 표시 */}
            {courseInfo && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800 font-medium">{courseInfo.courseName}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-blue-700">
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{courseInfo.targetDistance}km</span>
                    </div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    <span>{courseInfo.difficulty}</span>
                  </div>
                </div>
            )}

            <ul className="text-gray-600 text-sm mb-6 leading-relaxed list-disc list-inside inline-block text-left space-y-1">
              <li>GPS 위치 서비스를 켜주세요</li>
              <li>안전한 장소에서 시작하세요</li>
              <li>쓰레기 봉투를 준비해주세요</li>
              {courseInfo && (
                  <li>코스 경로를 따라 이동해주세요</li>
              )}
            </ul>

            <div className="flex space-x-3">
              <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                  onClick={onStart}
                  className="flex-1 px-4 py-3 text-white bg-emerald-600 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}