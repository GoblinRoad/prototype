import React from 'react'
import { Camera, Square } from 'lucide-react'

interface TrackingMenuProps {
  isMobile: boolean
  onTakePhoto: () => void
  onStopPlogging: () => void
}

export const TrackingMenu: React.FC<TrackingMenuProps> = ({
  isMobile,
  onTakePhoto,
  onStopPlogging
}) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 z-40 text-center mobile-secondary-button-container">
      <div className="space-y-3 mb-4">
        <button
          onClick={onTakePhoto}
          disabled={!isMobile}
          className={`flex items-center justify-center w-full px-6 py-3 backdrop-blur-sm rounded-full shadow-lg transition-all touch-friendly-button ${
            isMobile
              ? 'bg-white bg-opacity-95 hover:bg-opacity-100 text-gray-900 cursor-pointer'
              : 'bg-gray-300 bg-opacity-60 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Camera className="w-4 h-4 mr-2" />
          <span className="font-medium">
            {isMobile ? '인증 사진 촬영' : '모바일에서만 가능'}
          </span>
        </button>
        <button
          onClick={onStopPlogging}
          className="flex items-center justify-center w-full px-6 py-3 bg-red-500 bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg hover:bg-opacity-100 transition-all touch-friendly-button"
        >
          <Square className="w-4 h-4 mr-2 text-white" />
          <span className="font-medium text-white">종료하기</span>
        </button>
      </div>
    </div>
  )
}
