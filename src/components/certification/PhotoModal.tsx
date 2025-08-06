import React from 'react'
import { X, RotateCcw, Check } from 'lucide-react'
import { CapturedPhoto } from '../../types/certification'

interface PhotoModalProps {
  isOpen: boolean
  photo: CapturedPhoto | null
  onConfirm: () => void
  onRetake: () => void
  onCancel: () => void
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  photo,
  onConfirm,
  onRetake,
  onCancel
}) => {
  if (!isOpen || !photo) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">사진 확인</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={photo.preview}
              alt="촬영된 사진"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-500">
              촬영 시간: {photo.timestamp.toLocaleString('ko-KR')}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onRetake}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              다시 촬영
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              사용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
