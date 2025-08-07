import React from 'react'
import { ChevronUp, ChevronDown, Target } from 'lucide-react'
import { TrackingData } from '../../types/certification'

interface EnhancedTrackingData extends TrackingData {
    courseName?: string;
    targetDistance?: string;
    completionRate?: number;
}

interface TrackingStatusProps {
    trackingData: EnhancedTrackingData;
    isMinimized: boolean;
    onToggleMinimize: () => void;
    isCourseBased: boolean;
}

export const TrackingStatus: React.FC<TrackingStatusProps> = ({
                                                                  trackingData,
                                                                  isMinimized,
                                                                  onToggleMinimize,
                                                                  isCourseBased
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
                            {/* 코스 기반일 때 완주율 표시 */}
                            {isCourseBased && trackingData.completionRate !== undefined && (
                                <span className="text-sm font-medium text-blue-600">
                      {trackingData.completionRate}%
                    </span>
                            )}
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
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">실시간 플로깅 정보</h3>
                                {isCourseBased && trackingData.courseName && (
                                    <p className="text-xs text-blue-600 mt-1">{trackingData.courseName}</p>
                                )}
                            </div>
                            <button
                                onClick={onToggleMinimize}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronUp className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        <div className={`grid ${'grid-cols-3'} gap-4`}>
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
                                {/* 코스 기반일 때 목표 거리 표시 */}
                                {isCourseBased && trackingData.targetDistance && (
                                    <div className="text-xs text-gray-400 mt-1">
                                        / {trackingData.targetDistance}km
                                    </div>
                                )}
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