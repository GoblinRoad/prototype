import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CertificationHeaderProps {
  isTracking: boolean
}

export const CertificationHeader: React.FC<CertificationHeaderProps> = ({ isTracking }) => {
  const navigate = useNavigate()

  return (
    <div className="relative z-50 bg-white px-4 py-3 shadow-sm flex-shrink-0">
      <div className="flex items-center space-x-3">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          {isTracking ? "플로깅 진행중" : "플로깅 시작"}
        </h1>
      </div>
    </div>
  )
}
