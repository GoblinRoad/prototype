import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { LocationStatus } from '../../types/certification'

interface LocationStatusScreenProps {
  locationStatus: LocationStatus
  onRetry: () => void
}

export const LocationStatusScreen: React.FC<LocationStatusScreenProps> = ({
  locationStatus,
  onRetry
}) => {
  const getStatusContent = () => {
    switch (locationStatus) {
      case 'loading':
        return {
          icon: <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>,
          title: "GPS 위치 확인 중...",
          message: "잠시만 기다려주세요.",
          showRetryButton: false
        }
      case 'denied':
        return {
          icon: <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />,
          title: "위치 권한이 거부되었습니다",
          message: "플로깅을 위해서는 위치 권한이 필요합니다.\n브라우저 설정에서 위치 권한을 허용해주세요.",
          showRetryButton: true
        }
      case 'unavailable':
        return {
          icon: <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />,
          title: "GPS가 연결되지 않았습니다",
          message: "위치 서비스를 사용할 수 없습니다.\n• GPS가 켜져 있는지 확인해주세요\n• 실외에서 시도해보세요\n• 잠시 후 다시 시도해주세요",
          showRetryButton: true
        }
      case 'timeout':
        return {
          icon: <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />,
          title: "GPS 연결 시간 초과",
          message: "위치를 찾는데 시간이 오래 걸리고 있습니다.\n실외로 이동하거나 잠시 후 다시 시도해주세요.",
          showRetryButton: true
        }
      default:
        return null
    }
  }

  const content = getStatusContent()
  if (!content) return null

  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        {content.icon}
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {content.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
          {content.message}
        </p>
        {content.showRetryButton && (
          <div className="flex justify-center">
            <button
              onClick={onRetry}
              className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
