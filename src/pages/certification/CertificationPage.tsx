import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, MapPin, Play, Square, Camera, ChevronUp, ChevronDown, X, Check, RotateCcw, RefreshCw, AlertCircle } from "lucide-react"
import {useNavigate} from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

interface CapturedPhoto {
  file: File;
  preview: string;
  timestamp: Date;
}

// GPS 상태 타입 정의
type LocationStatus = 'loading' | 'granted' | 'denied' | 'unavailable' | 'timeout'

const CertificationPage: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showStartModal, setShowStartModal] = useState(false)
  const [isStatusMinimized, setIsStatusMinimized] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  // GPS 관련 상태 추가
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('loading')
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null)

  // 카메라 관련 상태
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isPhotoConfirmOpen, setIsPhotoConfirmOpen] = useState(false)

  const mapRef = useRef<HTMLDivElement>(null)
  const kakaoMapRef = useRef<any>(null)
  const customOverlayRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const [trackingData, setTrackingData] = useState({
    duration: "00:00:00",
    distance: "0.0",
    currentLocation: "위치 정보 없음",
  })

  // 모바일 디바이스 감지
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform))
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_API_KEY}&autoload=false&libraries=services`

    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapLoaded(true)
      })
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // GPS 위치 정보 가져오기 함수
  const getCurrentLocation = () => {
    setLocationStatus('loading')

    if (!navigator.geolocation) {
      setLocationStatus('unavailable')
      return
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10초 타임아웃
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setCurrentPosition(newPosition)
          setLocationStatus('granted')
          setTrackingData(prev => ({
            ...prev,
            currentLocation: "위치 정보 확인됨"
          }))
        },
        (error) => {
          console.log("위치 정보를 가져올 수 없습니다:", error)
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationStatus('denied')
              break
            case error.POSITION_UNAVAILABLE:
              setLocationStatus('unavailable')
              break
            case error.TIMEOUT:
              setLocationStatus('timeout')
              break
            default:
              setLocationStatus('unavailable')
              break
          }
        },
        options
    )
  }

  // 초기 위치 정보 가져오기
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // 원형 애니메이션 HTML 생성 함수
  const createLocationOverlayContent = () => {
    return `
      <div style="position: relative; width: 60px; height: 60px;">
        <!-- 중간 펄스 -->
        <div style="
          position: absolute;
          top: 10px;
          left: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.4);
          animation: locationPulse 2s infinite 1s;
        "></div>
        <!-- 내부 펄스 -->
        <div style="
          position: absolute;
          top: 20px;
          left: 20px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.6);
          animation: locationPulse 2s infinite 2s;
        "></div>
        <!-- 중심 점 -->
        <div style="
          position: absolute;
          top: 21px;
          left: 21px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: #10b981;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          z-index: 10;
        "></div>
      </div>
      <style>
        @keyframes locationPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      </style>
    `
  }

  // 커스텀 오버레이 생성/업데이트 함수
  const updateLocationOverlay = (lat: number, lng: number) => {
    if (!kakaoMapRef.current || !window.kakao) return

    const position = new window.kakao.maps.LatLng(lat, lng)

    // 기존 오버레이가 있으면 제거
    if (customOverlayRef.current) {
      customOverlayRef.current.setMap(null)
    }

    // 새 커스텀 오버레이 생성
    customOverlayRef.current = new window.kakao.maps.CustomOverlay({
      map: kakaoMapRef.current,
      position: position,
      content: createLocationOverlayContent(),
      yAnchor: 0.5,
      xAnchor: 0.5
    })
  }

  // 카카오맵 초기화 - GPS 위치가 있을 때만
  useEffect(() => {
    if (mapLoaded && mapRef.current && window.kakao && currentPosition && locationStatus === 'granted') {
      const options = {
        center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
        level: 3
      }

      kakaoMapRef.current = new window.kakao.maps.Map(mapRef.current, options)

      // 초기 위치에 원형 애니메이션 오버레이 추가
      updateLocationOverlay(currentPosition.lat, currentPosition.lng)
    }
  }, [mapLoaded, currentPosition, locationStatus])

  const handleStartPlogging = () => {
    if (locationStatus !== 'granted') {
      alert('위치 정보가 필요합니다. GPS를 활성화해주세요.')
      return
    }

    setIsTracking(true)
    setShowMenu(false)
    setShowStartModal(false)
    handleCurrentLocation()
  }

  const handleStopPlogging = () => {
    setIsTracking(false)
    setShowMenu(false)
  }

  // 기본 카메라 앱 열기
  const handleTakePhoto = () => {
    setShowMenu(false)

    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // 카메라에서 사진을 선택했을 때
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  // 사진 확인 후 저장
  const confirmPhoto = () => {
    if (capturedPhoto) {
      console.log('사진 저장:', capturedPhoto)
      alert('인증 사진이 저장되었습니다!')
      URL.revokeObjectURL(capturedPhoto.preview)
      setCapturedPhoto(null)
      setIsPhotoConfirmOpen(false)
    }
  }

  // 사진 재촬영
  const retakePhoto = () => {
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
  }

  // 사진 취소
  const cancelPhoto = () => {
    if (capturedPhoto) {
      URL.revokeObjectURL(capturedPhoto.preview)
      setCapturedPhoto(null)
    }
    setIsPhotoConfirmOpen(false)
  }

  const handleMainButtonClick = () => {
    if (!isTracking) {
      if (locationStatus !== 'granted') {
        getCurrentLocation() // GPS 재시도
        return
      }
      setShowStartModal(true)
    } else {
      setShowMenu(!showMenu)
    }
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation && kakaoMapRef.current) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const newPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            setCurrentPosition(newPosition)

            const moveLatLng = new window.kakao.maps.LatLng(newPosition.lat, newPosition.lng)
            kakaoMapRef.current.setCenter(moveLatLng)

            updateLocationOverlay(newPosition.lat, newPosition.lng)
          },
          (error) => {
            console.log("위치 정보를 가져올 수 없습니다:", error)
          },
      )
    }
  }

  // GPS 상태에 따른 메시지 렌더링
  const renderLocationMessage = () => {
    switch (locationStatus) {
      case 'loading':
        return {
          icon: <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>,
          title: "GPS 위치 확인 중...",
          message: "잠시만 기다려주세요.",
          action: null
        }
      case 'denied':
        return {
          icon: <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />,
          title: "위치 권한이 거부되었습니다",
          message: "플로깅을 위해서는 위치 권한이 필요합니다.\n브라우저 설정에서 위치 권한을 허용해주세요.",
          action: (
              <div className="flex justify-center">
                <button
                    onClick={getCurrentLocation}
                    className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도
                </button>
              </div>
          )
        }
      case 'unavailable':
        return {
          icon: <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />,
          title: "GPS가 연결되지 않았습니다",
          message: "위치 서비스를 사용할 수 없습니다.\n• GPS가 켜져 있는지 확인해주세요\n• 실외에서 시도해보세요\n• 잠시 후 다시 시도해주세요",
          action: (
              <div className="flex justify-center">
                <button
                    onClick={getCurrentLocation}
                    className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도
                </button>
              </div>
          )
        }
      case 'timeout':
        return {
          icon: <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />,
          title: "GPS 연결 시간 초과",
          message: "위치를 찾는데 시간이 오래 걸리고 있습니다.\n실외로 이동하거나 잠시 후 다시 시도해주세요.",
          action: (
              <div className="flex justify-center">
                <button
                    onClick={getCurrentLocation}
                    className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도
                </button>
              </div>
          )
        }
      default:
        return null
    }
  }

  return (
      <div className="fixed inset-0 bg-gray-50 flex flex-col overflow-hidden max-w-md mx-auto">
        {/* 네비게이션 바 - 고정 높이 */}
        <div className="relative z-50 bg-white px-4 py-3 shadow-sm flex-shrink-0">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {isTracking ? "플로깅 진행중" : "플로깅 시작"}
            </h1>
          </div>
        </div>

        {/* 지도 영역 또는 GPS 안내 화면 */}
        <div className="map-container">
          {locationStatus === 'granted' && mapLoaded && currentPosition ? (
              <>
                <div ref={mapRef} className="w-full h-full" />

                {/* 현재 위치 버튼 - 오른쪽 아래 */}
                <button
                    onClick={handleCurrentLocation}
                    className="absolute right-6 z-10 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 touch-friendly-button mobile-button-container"
                >
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </button>
              </>
          ) : (
              /* GPS 안내 화면 */
              <div className="w-full h-full bg-gray-100 flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                  {(() => {
                    const messageData = renderLocationMessage()
                    if (!messageData) return null

                    return (
                        <>
                          {messageData.icon}
                          <h2 className="text-xl font-bold text-gray-900 mb-3">
                            {messageData.title}
                          </h2>
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
                            {messageData.message}
                          </p>
                          {messageData.action}
                        </>
                    )
                  })()}
                </div>
              </div>
          )}

          {/* 진행 중 메뉴 */}
          {isTracking && showMenu && locationStatus === 'granted' && (
              <div className="absolute left-1/2 transform -translate-x-1/2 z-40 text-center mobile-secondary-button-container">
                <div className="space-y-3 mb-4">
                  <button
                      onClick={handleTakePhoto}
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
                      onClick={handleStopPlogging}
                      className="flex items-center justify-center w-full px-6 py-3 bg-red-500 bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg hover:bg-opacity-100 transition-all touch-friendly-button"
                  >
                    <Square className="w-4 h-4 mr-2 text-white" />
                    <span className="font-medium text-white">종료하기</span>
                  </button>
                </div>
              </div>
          )}

          {/* 메인 플로깅 버튼 - GPS가 연결된 경우에만 표시 */}
          {(locationStatus === 'granted' || isTracking) && (
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 mobile-button-container">
                <button
                    onClick={handleMainButtonClick}
                    className={`relative w-20 h-20 rounded-full transition-all duration-500 flex items-center justify-center group touch-friendly-button ${
                        isTracking
                            ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.8)]'
                            : 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.9)]'
                    }`}
                >
                  {/* 외부 글로우 링 */}
                  <div className={`absolute -inset-4 rounded-full border-2 border-emerald-400 transition-all duration-1000 ${
                      isTracking ? 'animate-pulse opacity-60' : 'opacity-0 group-hover:opacity-40'
                  }`} />

                  {/* 중간 글로우 링 */}
                  <div className={`absolute -inset-2 rounded-full border border-emerald-300 transition-all duration-700 ${
                      isTracking ? 'animate-ping opacity-40' : 'opacity-0 group-hover:opacity-30'
                  }`} />

                  {/* 아이콘 */}
                  {!isTracking ? (
                      <Play className="w-7 h-7 text-white ml-1 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  ) : (
                      <div className="w-6 h-6 bg-white rounded-full opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                  )}
                </button>
              </div>
          )}

          {/* 진행 중일 때 상태 정보 - 상단에 표시 */}
          {isTracking && (
              <div className="absolute top-4 left-4 right-4 z-10">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300">
                  {/* 최소화된 상태 */}
                  {isStatusMinimized ? (
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-gray-900">
                            {trackingData.duration} • {trackingData.distance}km
                          </span>
                        </div>
                        <button
                            onClick={() => setIsStatusMinimized(false)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                  ) : (
                      /* 확장된 상태 */
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-semibold text-gray-800">실시간 플로깅 정보</h3>
                          <button
                              onClick={() => setIsStatusMinimized(true)}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
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
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                      </div>
                  )}
                </div>
              </div>
          )}

          {/* 플로깅 시작 확인 모달 */}
          {showStartModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
                  <div className="text-center">
                    {/* 아이콘 */}
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-emerald-600 ml-1" />
                    </div>

                    {/* 제목 */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      플로깅을 시작하시겠습니까?
                    </h3>

                    {/* 설명 */}
                    <ul className="text-gray-600 text-sm mb-6 leading-relaxed list-disc list-inside inline-block text-left space-y-1">
                      <li>GPS 위치 서비스를 켜주세요</li>
                      <li>안전한 장소에서 시작하세요</li>
                      <li>쓰레기 봉투를 준비해주세요</li>
                    </ul>

                    {/* 버튼들 */}
                    <div className="flex space-x-3">
                      <button
                          onClick={() => setShowStartModal(false)}
                          className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        취소
                      </button>
                      <button
                          onClick={handleStartPlogging}
                          className="flex-1 px-4 py-3 text-white bg-emerald-600 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        시작하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* 사진 확인 모달 */}
          {isPhotoConfirmOpen && capturedPhoto && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
                  {/* 헤더 */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">사진 확인</h3>
                    <button
                        onClick={cancelPhoto}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* 사진 미리보기 */}
                  <div className="p-4">
                    <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <img
                          src={capturedPhoto.preview}
                          alt="촬영된 사진"
                          className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 촬영 시간 */}
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-500">
                        촬영 시간: {capturedPhoto.timestamp.toLocaleString('ko-KR')}
                      </p>
                    </div>

                    {/* 버튼들 */}
                    <div className="flex space-x-3">
                      <button
                          onClick={retakePhoto}
                          className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        다시 촬영
                      </button>
                      <button
                          onClick={confirmPhoto}
                          className="flex-1 flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        사용하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* 파일 입력 - 기본 카메라 앱 호출용 */}
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