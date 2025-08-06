import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { TrackingData } from '../../types/certification'

interface TrackingStatusProps {
  trackingData: TrackingData
  isMinimized: boolean
  onToggleMinimize: () => void
}

export const TrackingStatus: React.FC<TrackingStatusProps> = ({
                                                                trackingData,
                                                                isMinimized,
                                                                onToggleMinimize
                                                              }) => {
  return (
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300">
          {isMinimized ? (
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900">
                {trackingData.duration}
              </span>
                  <span className="text-sm font-medium text-gray-900">
                {trackingData.distance}km
              </span>
                  <span className="text-sm font-medium text-emerald-600">
                {trackingData.score}점
              </span>
                </div>
                <button
                    onClick={onToggleMinimize}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>
          ) : (
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">실시간 플로깅 정보</h3>
                  <button
                      onClick={onToggleMinimize}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">시간</div>
                    <div className="text-lg font-bold text-gray-900">{trackingData.duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">거리</div>
                    <div className="text-lg font-bold text-gray-900">
                      {trackingData.distance}
                      <span className="text-sm text-gray-500 ml-1">km</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">점수</div>
                    <div className="text-lg font-bold text-emerald-600">
                      {trackingData.score}
                      <span className="text-sm text-gray-500 ml-1">점</span>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  )
}