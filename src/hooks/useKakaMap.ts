import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    kakao: any;
  }
}

export const useKakaoMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const kakaoMapRef = useRef<any>(null)
  const customOverlayRef = useRef<any>(null)

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

  const createLocationOverlayContent = () => {
    return `
      <div style="position: relative; width: 60px; height: 60px;">
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
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      </style>
    `
  }

  const updateLocationOverlay = (lat: number, lng: number) => {
    if (!kakaoMapRef.current || !window.kakao) return

    const position = new window.kakao.maps.LatLng(lat, lng)

    if (customOverlayRef.current) {
      customOverlayRef.current.setMap(null)
    }

    customOverlayRef.current = new window.kakao.maps.CustomOverlay({
      map: kakaoMapRef.current,
      position: position,
      content: createLocationOverlayContent(),
      yAnchor: 0.5,
      xAnchor: 0.5
    })
  }

  const initializeMap = (position: { lat: number; lng: number }) => {
    if (mapLoaded && mapRef.current && window.kakao && position) {
      const options = {
        center: new window.kakao.maps.LatLng(position.lat, position.lng),
        level: 3
      }

      kakaoMapRef.current = new window.kakao.maps.Map(mapRef.current, options)
      updateLocationOverlay(position.lat, position.lng)
    }
  }

  const moveToCurrentLocation = () => {
    if (navigator.geolocation && kakaoMapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

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

  return {
    mapLoaded,
    mapRef,
    kakaoMapRef,
    initializeMap,
    moveToCurrentLocation
  }
}
