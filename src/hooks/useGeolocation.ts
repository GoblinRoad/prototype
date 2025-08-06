import { useState, useEffect } from 'react'
import { LocationStatus } from '../types/certification'

export const useGeolocation = () => {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('loading')
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null)

  const getCurrentLocation = () => {
    setLocationStatus('loading')

    if (!navigator.geolocation) {
      setLocationStatus('unavailable')
      return
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
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

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return {
    locationStatus,
    currentPosition,
    getCurrentLocation
  }
}
