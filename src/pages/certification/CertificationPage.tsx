import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CapturedPhoto, TrackingData } from '../../types/certification'
import { useGeolocation } from '../../hooks/useGeolocation'
import { useKakaoMap } from '../../hooks/useKakaMap'
import { CertificationHeader } from '../../components/certification/CertificationHeader'
import { LocationStatusScreen } from '../../components/certification/LocationStatusScreen'
import { MapComponent } from '../../components/certification/MapComponent'
import { PloggingButton } from '../../components/certification/PloggingButton'
import { TrackingMenu } from '../../components/certification/TrackingMenu'
import { TrackingStatus } from '../../components/certification/TrackingStatus'
import { StartModal } from '../../components/certification/StartModal'
import { PhotoModal } from '../../components/certification/PhotoModal'

const CertificationPage: React.FC = () => {
  // 상태 관리
  const [isTracking, setIsTracking] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showStartModal, setShowStartModal] = useState(false)
  const [isStatusMinimized, setIsStatusMinimized] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isPhotoConfirmOpen, setIsPhotoConfirmOpen] = useState(false)
  const [trackingData, setTrackingData] = useState<TrackingData>({
    duration: "00:00:00",
    distance: "0.0",
    score: 0,
    currentLocation: "위치 정보 없음",
  })

  // 커스텀 훅 사용
  const { locationStatus, currentPosition, getCurrentLocation } = useGeolocation()
  const { mapLoaded, mapRef, initializeMap, moveToCurrentLocation } = useKakaoMap()

  // refs
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateScore = (newDistance: number, newDuration: number) => {
    // 거리와 시간을 기반으로 점수 계산 (예시 로직)
    const score = Math.floor(newDistance * 10 + (newDuration / 60) * 5)
    return score
  }

// 트래킹 데이터 업데이트 시 점수도 함께 업데이트
  const updateTrackingData = (duration: string, distance: string) => {
    const distanceNum = parseFloat(distance)
    const durationParts = duration.split(':')
    const durationMinutes = parseInt(durationParts[1]) + parseInt(durationParts[0]) * 60
    const newScore = updateScore(distanceNum, durationMinutes)

    setTrackingData(prev => ({
      ...prev,
      duration,
      distance,
      score: newScore
    }))
  }

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
      setIsMobile(!!isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 지도 초기화 - useCallback으로 memoization하거나 의존성 배열에서 initializeMap 제거
  useEffect(() => {
    if (mapLoaded && currentPosition && locationStatus === 'granted') {
      initializeMap(currentPosition)
      setTrackingData(prev => ({
        ...prev,
        currentLocation: "위치 정보 확인됨"
      }))
    }
    // initializeMap을 의존성에서 제거하여 무한 루프 방지
  }, [mapLoaded, currentPosition, locationStatus])

  // 이벤트 핸들러들
  const handleStartPlogging = useCallback(() => {
    if (locationStatus !== 'granted') {
      alert('위치 정보가 필요합니다. GPS를 활성화해주세요.')
      return
    }

    setIsTracking(true)
    setShowMenu(false)
    setShowStartModal(false)
    moveToCurrentLocation()
  }, [locationStatus, moveToCurrentLocation])

  const handleStopPlogging = useCallback(() => {
    setIsTracking(false)
    setShowMenu(false)
  }, [])

  const handleTakePhoto = useCallback(() => {
    setShowMenu(false)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const preview = URL.createObjectURL(file)
      setCapturedPhoto({
        file,
        preview,
        timestamp: new Date()
      })
      setIsPhotoConfirmOpen(true)
    }

    if (event.target) {
      event.target.value = ''
    }
  }, [])

  const confirmPhoto = useCallback(() => {
    if (capturedPhoto) {
      console.log('사진 저장:', capturedPhoto)
      alert('인증 사진이 저장되었습니다!')
      URL.revokeObjectURL(capturedPhoto.preview)
      setCapturedPhoto(null)
      setIsPhotoConfirmOpen(false)
    }
  }, [capturedPhoto])

  const retakePhoto = useCallback(() => {
    if (capturedPhoto) {
      URL.revokeObjectURL(capturedPhoto.preview)
      setCapturedPhoto(null)
    }
    setIsPhotoConfirmOpen(false)

    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }, 100)
  }, [capturedPhoto])

  const cancelPhoto = useCallback(() => {
    if (capturedPhoto) {
      URL.revokeObjectURL(capturedPhoto.preview)
      setCapturedPhoto(null)
    }
    setIsPhotoConfirmOpen(false)
  }, [capturedPhoto])

  const handleMainButtonClick = useCallback(() => {
    if (!isTracking) {
      if (locationStatus !== 'granted') {
        getCurrentLocation()
        return
      }
      setShowStartModal(true)
    } else {
      setShowMenu(!showMenu)
    }
  }, [isTracking, locationStatus, getCurrentLocation, showMenu])

  return (
      <div className="fixed inset-0 bg-gray-50 flex flex-col overflow-hidden max-w-md mx-auto">
        <CertificationHeader isTracking={isTracking} />

        <div className="flex-1 overflow-hidden relative">
          {locationStatus === 'granted' && mapLoaded && currentPosition ? (
              <>
                <MapComponent
                    mapRef={mapRef}
                    onCurrentLocationClick={moveToCurrentLocation}
                />

                {isTracking && showMenu && (
                    <TrackingMenu
                        isMobile={isMobile}
                        onTakePhoto={handleTakePhoto}
                        onStopPlogging={handleStopPlogging}
                    />
                )}

                {(locationStatus === 'granted' || isTracking) && (
                    <PloggingButton
                        isTracking={isTracking}
                        onClick={handleMainButtonClick}
                    />
                )}

                {isTracking && (
                    <TrackingStatus
                        trackingData={trackingData}
                        isMinimized={isStatusMinimized}
                        onToggleMinimize={() => setIsStatusMinimized(!isStatusMinimized)}
                    />
                )}
              </>
          ) : (
              <LocationStatusScreen
                  locationStatus={locationStatus}
                  onRetry={getCurrentLocation}
              />
          )}

          <StartModal
              isOpen={showStartModal}
              onClose={() => setShowStartModal(false)}
              onStart={handleStartPlogging}
          />

          <PhotoModal
              isOpen={isPhotoConfirmOpen}
              photo={capturedPhoto}
              onConfirm={confirmPhoto}
              onRetake={retakePhoto}
              onCancel={cancelPhoto}
          />

          <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
          />
        </div>
      </div>
  )
}

export default CertificationPage