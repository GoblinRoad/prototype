import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
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
import CourseReviewModal from "@/components/certification/CourseReviewModal.tsx";

interface CourseGpxData {
    courseId: string;
    courseName: string;
    gpxPath: Array<{lat: number, lng: number}>;
    targetDistance: number;
    difficulty: string;
}

interface GeneralPloggingRecord {
    sessionId: string;
    title: string;
    totalDistance: number;
    duration: string;
    score: number;
    path: Array<{lat: number, lng: number, timestamp: string}>;
    date: string;
}

interface PloggingSession {
    sessionId: string;
    isActive: boolean;
    startTime: string;
    courseId?: string;
    courseName?: string;
    currentPath: Array<{lat: number, lng: number, timestamp: string}>;
    totalDistance: number;
    status: 'in_progress' | 'completed' | 'paused';
}

interface CourseReview {
    courseId: string;
    sessionId: string;
    rating: number;
    comment: string;
    difficulty: number;
    cleanliness: number;
    scenery: number;
    tags: string[];
}

interface LocationData {
    lat: number;
    lng: number;
    timestamp: Date;
    accuracy?: number;
}

interface EnhancedTrackingData extends TrackingData {
    courseName?: string;
    targetDistance?: string;
    completionRate?: number;
}

const CertificationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const courseIdFromUrl = searchParams.get('courseId');

    const [isTracking, setIsTracking] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);
    const [isStatusMinimized, setIsStatusMinimized] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isPhotoConfirmOpen, setIsPhotoConfirmOpen] = useState(false);

    const [routePath, setRoutePath] = useState<LocationData[]>([]);
    const [polyline, setPolyline] = useState<any>(null);
    const [watchId, setWatchId] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [totalDistance, setTotalDistance] = useState(0);

    const [isSessionLoading, setIsSessionLoading] = useState(true);
    const [activeSession, setActiveSession] = useState<PloggingSession | null>(null);

    const [courseData, setCourseData] = useState<CourseGpxData | null>(null);
    const [coursePolyline, setCoursePolyline] = useState<any>(null);
    const [isCourseBased, setIsCourseBased] = useState(false);

    const [showCourseReviewModal, setShowCourseReviewModal] = useState(false);
    const [reviewModalData, setReviewModalData] = useState<{
        sessionData: PloggingSession | null;
        courseData: CourseGpxData | null;
    }>({ sessionData: null, courseData: null });

    const [trackingData, setTrackingData] = useState<EnhancedTrackingData>({
        duration: "00:00:00",
        distance: "0.0",
        score: 0,
        currentLocation: "위치 정보 없음",
    });

    const { locationStatus, currentPosition, getCurrentLocation } = useGeolocation();
    const { mapLoaded, mapInitialized, mapRef, initializeMap, moveToCurrentLocation, kakaoMapRef } = useKakaoMap();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const lastSentTimeRef = useRef<Date | null>(null);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const calculateTotalDistance = (path: LocationData[]): number => {
        if (path.length < 2) return 0;

        let total = 0;
        for (let i = 1; i < path.length; i++) {
            total += calculateDistance(
                path[i-1].lat, path[i-1].lng,
                path[i].lat, path[i].lng
            );
        }
        return total;
    };

    const formatDuration = (startTime: Date): string => {
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const calculateCourseCompletion = (userPath: LocationData[], coursePath: Array<{lat: number, lng: number}>): number => {
        if (coursePath.length === 0 || userPath.length === 0) return 0;

        let completedPoints = 0;
        const threshold = 0.0001;

        coursePath.forEach(coursePoint => {
            const nearbyUserPoint = userPath.find(userPoint => {
                const distance = Math.abs(userPoint.lat - coursePoint.lat) + Math.abs(userPoint.lng - coursePoint.lng);
                return distance < threshold;
            });
            if (nearbyUserPoint) completedPoints++;
        });

        return Math.round((completedPoints / coursePath.length) * 100);
    };

    const calculateScore = (distance: number, duration: number, pathPoints: number): number => {
        return Math.floor(distance * 10 + duration + pathPoints);
    };

    const checkActiveSession = async (): Promise<PloggingSession | null> => {
        try {
            const mockActiveSession = null;

            // 실제 API 호출 코드:
            /*
            const response = await fetch('/api/plogging/active-session', {
              headers: {
                'Authorization': `Bearer ${getAuthToken()}`
              }
            });

            if (response.ok) {
              const session = await response.json();
              return session;
            }
            */

            return mockActiveSession;
        } catch (error) {
            console.error('활성 세션 확인 실패:', error);
            return null;
        }
    };

    const fetchCourseGpx = async (courseId: string): Promise<CourseGpxData> => {
        try {
            if (courseId === '1') {
                return {
                    courseId: courseId,
                    courseName: "서울숲 생태 플로깅 코스",
                    gpxPath: [
                        { lat: 37.5447, lng: 127.0398 }, // 출발점: 서울숲
                        { lat: 37.5439, lng: 127.0412 },
                        { lat: 37.5432, lng: 127.0425 },
                        { lat: 37.5425, lng: 127.0438 },
                        { lat: 37.5417, lng: 127.0451 },
                        { lat: 37.5410, lng: 127.0465 },
                        { lat: 37.5403, lng: 127.0478 },
                        { lat: 37.5396, lng: 127.0492 },
                        { lat: 37.5388, lng: 127.0505 },
                        { lat: 37.5381, lng: 127.0518 },
                        { lat: 37.5374, lng: 127.0532 },
                        { lat: 37.5367, lng: 127.0545 },
                        { lat: 37.5360, lng: 127.0558 },
                        { lat: 37.5352, lng: 127.0572 },
                        { lat: 37.5345, lng: 127.0585 },
                        { lat: 37.5338, lng: 127.0598 },
                        { lat: 37.5331, lng: 127.0612 },
                        { lat: 37.5323, lng: 127.0625 },
                        { lat: 37.5316, lng: 127.0638 },
                        { lat: 37.5309, lng: 127.0652 },
                        { lat: 37.5302, lng: 127.0665 },
                        { lat: 37.5294, lng: 127.0678 },
                        { lat: 37.5287, lng: 127.0692 },
                        { lat: 37.5280, lng: 127.0705 },
                        { lat: 37.5273, lng: 127.0718 },
                        { lat: 37.5266, lng: 127.0732 },
                        { lat: 37.5258, lng: 127.0745 },
                        { lat: 37.5251, lng: 127.0758 },
                        { lat: 37.5244, lng: 127.0772 },
                        { lat: 37.5237, lng: 127.0785 },
                        { lat: 37.5062, lng: 127.0906 }, // 도착점
                    ],
                    targetDistance: 2.8,
                    difficulty: "보통"
                };
            }

            if (courseId === '2') {
                return {
                    courseId: courseId,
                    courseName: "탄천 산책로 플로깅 코스",
                    gpxPath: [
                        { lat: 37.5100, lng: 127.0920 }, // 출발점
                        { lat: 37.5095, lng: 127.0922 },
                        { lat: 37.5090, lng: 127.09185 },
                        { lat: 37.5085, lng: 127.0913 },
                        { lat: 37.5080, lng: 127.0908 },
                        { lat: 37.5074, lng: 127.0903 },
                        { lat: 37.5077, lng: 127.089 }, // 탄천 주변
                        { lat: 37.5075, lng: 127.0890 }  // 도착점
                    ],
                    targetDistance: 0.5,
                    difficulty: "쉬움"
                };
            }



            // 실제 백엔드 API 호출 (현재는 목업 데이터)
            /*
            const response = await fetch(`/api/courses/${courseId}/gpx`);
            if (!response.ok) {
              throw new Error('코스 데이터 로드 실패');
            }
            return await response.json();
            */

            // 임시 목업 데이터
            return {
                courseId: courseId,
                courseName: "한강공원 플로깅 코스",
                gpxPath: [
                    {lat: 37.5665, lng: 126.9780},
                    {lat: 37.5660, lng: 126.9785},
                    {lat: 37.5655, lng: 126.9790},
                    {lat: 37.5650, lng: 126.9795},
                    {lat: 37.5645, lng: 126.9800},
                ],
                targetDistance: 3.2,
                difficulty: "쉬움"
            };
        } catch (error) {
            console.error('코스 GPX 데이터 로드 실패:', error);
            throw error;
        }
    };

    const displayCourseRoute = (gpxPath: Array<{lat: number, lng: number}>) => {
        if (!mapInitialized || gpxPath.length === 0) return;

        if (coursePolyline) {
            coursePolyline.setMap(null);
        }

        const courseLinePath = gpxPath.map(point =>
            new window.kakao.maps.LatLng(point.lat, point.lng)
        );

        const newCoursePolyline = new window.kakao.maps.Polyline({
            path: courseLinePath,
            strokeWeight: 5,
            strokeColor: '#3b82f6',
            strokeOpacity: 0.7,
            strokeStyle: 'solid'
        });

        newCoursePolyline.setMap(kakaoMapRef.current);
        setCoursePolyline(newCoursePolyline);

        const bounds = new window.kakao.maps.LatLngBounds();
        gpxPath.forEach(point => {
            bounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
        });
        kakaoMapRef.current.setBounds(bounds);
    };

    const recoverSession = async (session: PloggingSession) => {
        try {
            console.log('세션 복구 중:', session);

            setIsTracking(true);
            setStartTime(new Date(session.startTime));
            setTotalDistance(session.totalDistance);

            const recoveredPath = session.currentPath.map(point => ({
                lat: point.lat,
                lng: point.lng,
                timestamp: new Date(point.timestamp)
            }));
            setRoutePath(recoveredPath);
            console.log("1")
            if (session.courseId) {
                setIsCourseBased(true);
                const courseData = await fetchCourseGpx(session.courseId);
                setCourseData(courseData);
                if (mapLoaded && kakaoMapRef.current) {
                    displayCourseRoute(courseData.gpxPath);
                    updateUserPolyline(recoveredPath);
                }
            } else {
                setIsCourseBased(false);
                if (mapLoaded && kakaoMapRef.current) {
                    updateUserPolyline(recoveredPath);
                }
            }

            startLocationTracking();
            alert('이전 플로깅 세션이 복구되었습니다.');

        } catch (error) {
            console.error('세션 복구 실패:', error);
            alert('세션 복구에 실패했습니다. 새로운 플로깅을 시작해주세요.');
        }
    };

    const startNewSession = async (courseId?: string) => {
        try {
            if (courseId) {
                setIsCourseBased(true);
                const courseData = await fetchCourseGpx(courseId);
                setCourseData(courseData);
            } else {
                setIsCourseBased(false);
            }
        } catch (error) {
            console.error('새 세션 준비 실패:', error);
            setIsCourseBased(false);
        }
    };

    // 5초마다 좌표 전송 (백엔드 연결 시 사용) 이후에 로직이 정해지면 수정할 예정 아마 시간 + 거리로 할 예정
    const sendLocationToServer = async (locationData: LocationData) => {
        const now = new Date();

        if (lastSentTimeRef.current && now.getTime() - lastSentTimeRef.current.getTime() < 5000) {
            return;
        }

        lastSentTimeRef.current = now;

        try {
            console.log('좌표 전송:', {
                latitude: locationData.lat,
                longitude: locationData.lng,
                timestamp: locationData.timestamp.toISOString(),
                accuracy: locationData.accuracy,
                sessionId: activeSession?.sessionId
            });

            // 실제 백엔드 API 호출:
            /*
            const response = await fetch('/api/plogging/track', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
              },
              body: JSON.stringify({
                sessionId: activeSession?.sessionId,
                latitude: locationData.lat,
                longitude: locationData.lng,
                timestamp: locationData.timestamp.toISOString(),
                accuracy: locationData.accuracy,
              })
            });

            if (!response.ok) {
              throw new Error('Failed to send location');
            }
            */

        } catch (error) {
            console.error('좌표 전송 실패:', error);
        }
    };

    const updateUserPolyline = (path: LocationData[]) => {
        if (!kakaoMapRef.current || !window.kakao || path.length < 2) return;

        if (polyline) {
            polyline.setMap(null);
        }

        const linePath = path.map(point =>
            new window.kakao.maps.LatLng(point.lat, point.lng)
        );

        const newPolyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 4,
            strokeColor: '#10b981',
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
        });

        newPolyline.setMap(kakaoMapRef.current);
        setPolyline(newPolyline);
    };

    const startLocationTracking = () => {
        if (!navigator.geolocation) return;

        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        };

        const watchIdValue = navigator.geolocation.watchPosition(
            (position) => {
                const newLocation: LocationData = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    timestamp: new Date(),
                    accuracy: position.coords.accuracy
                };

                setRoutePath(prevPath => {
                    if (prevPath.length === 0) {
                        return [newLocation];
                    }

                    const lastPoint = prevPath[prevPath.length - 1];
                    const distance = calculateDistance(
                        lastPoint.lat, lastPoint.lng,
                        newLocation.lat, newLocation.lng
                    );

                    if (distance > 0.005) {
                        const newPath = [...prevPath, newLocation];
                        updateUserPolyline(newPath);
                        const totalDist = calculateTotalDistance(newPath);
                        setTotalDistance(totalDist);
                        sendLocationToServer(newLocation);
                        return newPath;
                    }

                    return prevPath;
                });
            },
            (error) => {
                console.error('위치 추적 오류:', error);
            },
            options
        );

        setWatchId(watchIdValue);
    };

    const stopLocationTracking = () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    };

    const createPloggingSession = async (data: {
        courseId?: string;
        startTime: string;
        startLocation: any;
    }): Promise<PloggingSession> => {
        const mockSession: PloggingSession = {
            sessionId: 'session-' + Date.now(),
            isActive: true,
            startTime: data.startTime,
            courseId: data.courseId,
            courseName: courseData?.courseName,
            currentPath: [],
            totalDistance: 0,
            status: 'in_progress'
        };

        // 실제 API 호출:
        /*
        const response = await fetch('/api/plogging/session/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('세션 생성 실패');
        return await response.json();
        */

        return mockSession;
    };

    const completePloggingSession = async (data: any) => {
        console.log('세션 완료 데이터 전송:', data);

        // 실제 API 호출:
        /*
        const response = await fetch('/api/plogging/session/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('세션 완료 실패');
        return await response.json();
        */
    };

    useEffect(() => {
        const initializePage = async () => {
            setIsSessionLoading(true);

            try {
                const activeSession = await checkActiveSession();

                if (activeSession && activeSession.status === 'in_progress') {
                    console.log('활성 세션 발견, 복구 진행');
                    setActiveSession(activeSession);
                    await recoverSession(activeSession);
                } else {
                    if (courseIdFromUrl) {
                        console.log('URL에서 courseId 발견, 새 코스 세션 준비');
                        await startNewSession(courseIdFromUrl);
                    } else {
                        console.log('일반 플로깅 모드 준비');
                        await startNewSession();
                    }
                }
            } catch (error) {
                console.error('페이지 초기화 실패:', error);
            } finally {
                setIsSessionLoading(false);
            }
        };

        initializePage();
    }, [courseIdFromUrl]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTracking && startTime) {
            interval = setInterval(() => {
                const duration = formatDuration(startTime);
                const durationInMinutes = (new Date().getTime() - startTime.getTime()) / (1000 * 60);
                const score = calculateScore(totalDistance, durationInMinutes, routePath.length);

                const enhancedData: EnhancedTrackingData = {
                    duration: duration,
                    distance: totalDistance.toFixed(1),
                    score: score,
                    currentLocation: "위치 추적 중",
                    ...(isCourseBased && courseData && {
                        courseName: courseData.courseName,
                        targetDistance: courseData.targetDistance.toFixed(1),
                        completionRate: routePath.length > 0 ? calculateCourseCompletion(routePath, courseData.gpxPath) : 0
                    })
                };

                setTrackingData(enhancedData);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTracking, startTime, totalDistance, routePath.length, isCourseBased, courseData]);

    useEffect(() => {
        if (mapLoaded && courseData && mapInitialized ) {
            displayCourseRoute(courseData.gpxPath);
        }
    }, [mapLoaded, courseData, mapInitialized]);

    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
            setIsMobile(!!isMobileDevice);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (mapLoaded && currentPosition && locationStatus === 'granted') {
            initializeMap(currentPosition);
            setTrackingData(prev => ({
                ...prev,
                currentLocation: "위치 정보 확인됨"
            }));
        }
    }, [mapLoaded, currentPosition, locationStatus]);

    useEffect(() => {
        return () => {
            stopLocationTracking();
            if (polyline) {
                polyline.setMap(null);
            }
            if (coursePolyline) {
                coursePolyline.setMap(null);
            }
        };
    }, [polyline, coursePolyline]);

    const handleStartPlogging = useCallback(async () => {
        if (locationStatus !== 'granted') {
            alert('위치 정보가 필요합니다. GPS를 활성화해주세요.');
            return;
        }

        try {
            const newSession = await createPloggingSession({
                courseId: courseData?.courseId,
                startTime: new Date().toISOString(),
                startLocation: currentPosition
            });

            setActiveSession(newSession);
            setIsTracking(true);
            setShowMenu(false);
            setShowStartModal(false);
            setStartTime(new Date());
            setRoutePath([]);
            setTotalDistance(0);
            lastSentTimeRef.current = null;

            startLocationTracking();
            moveToCurrentLocation();

        } catch (error) {
            console.error('세션 시작 실패:', error);
            alert('플로깅 시작에 실패했습니다. 다시 시도해주세요.');
        }
    }, [locationStatus, courseData, currentPosition, moveToCurrentLocation]);

    const handleStopPlogging = useCallback(async () => {
        setIsTracking(false);
        setShowMenu(false);
        stopLocationTracking();

        if (routePath.length > 0 && activeSession) {
            const finalData = {
                sessionId: activeSession.sessionId,
                totalDistance: totalDistance,
                duration: startTime ? (new Date().getTime() - startTime.getTime()) / 1000 : 0,
                path: routePath,
                startTime: startTime,
                endTime: new Date(),
                score: trackingData.score,
                ...(isCourseBased && courseData && {
                    courseId: courseData.courseId,
                    courseName: courseData.courseName,
                    completionRate: calculateCourseCompletion(routePath, courseData.gpxPath),
                    targetDistance: courseData.targetDistance
                })
            };

            try {
                await completePloggingSession(finalData);

                const sessionForReview: PloggingSession = {
                    ...activeSession,
                    status: 'completed',
                    currentPath: routePath.map(p => ({
                        lat: p.lat,
                        lng: p.lng,
                        timestamp: p.timestamp.toISOString()
                    })),
                    totalDistance: totalDistance
                };

                setReviewModalData({
                    sessionData: sessionForReview,
                    courseData: isCourseBased ? courseData : null
                });
                setShowCourseReviewModal(true);

            } catch (error) {
                console.error('세션 저장 실패:', error);
                alert('플로깅 데이터 저장에 실패했습니다.');
            }
        }

        setActiveSession(null);
        setStartTime(null);
        setRoutePath([]);
        setTotalDistance(0);
    }, [routePath, totalDistance, startTime, trackingData, isCourseBased, courseData, activeSession]);

    const handleTakePhoto = useCallback(() => {
        setShowMenu(false);
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const preview = URL.createObjectURL(file);
            setCapturedPhoto({
                file,
                preview,
                timestamp: new Date()
            });
            setIsPhotoConfirmOpen(true);
        }

        if (event.target) {
            event.target.value = '';
        }
    }, []);

    const confirmPhoto = useCallback(() => {
        if (capturedPhoto) {
            console.log('사진 저장:', capturedPhoto);
            alert('인증 사진이 저장되었습니다!');
            URL.revokeObjectURL(capturedPhoto.preview);
            setCapturedPhoto(null);
            setIsPhotoConfirmOpen(false);
        }
    }, [capturedPhoto]);

    const retakePhoto = useCallback(() => {
        if (capturedPhoto) {
            URL.revokeObjectURL(capturedPhoto.preview);
            setCapturedPhoto(null);
        }
        setIsPhotoConfirmOpen(false);

        setTimeout(() => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }, 100);
    }, [capturedPhoto]);

    const cancelPhoto = useCallback(() => {
        if (capturedPhoto) {
            URL.revokeObjectURL(capturedPhoto.preview);
            setCapturedPhoto(null);
        }
        setIsPhotoConfirmOpen(false);
    }, [capturedPhoto]);

    const handleMainButtonClick = useCallback(() => {
        if (!isTracking) {
            if (locationStatus !== 'granted') {
                getCurrentLocation();
                return;
            }
            setShowStartModal(true);
        } else {
            setShowMenu(!showMenu);
        }
    }, [isTracking, locationStatus, getCurrentLocation, showMenu]);

    const handleReviewSubmit = (reviewData: CourseReview) => {
        console.log('코스 리뷰 제출:', reviewData);

        // 실제 API 호출:
        /*
        fetch('/api/courses/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify(reviewData)
        });
        */

        setShowCourseReviewModal(false);
        setReviewModalData({ sessionData: null, courseData: null });
        alert('코스 리뷰가 성공적으로 제출되었습니다!');
    };

    const handleSaveRecord = (recordData: GeneralPloggingRecord) => {
        console.log('일반 플로깅 기록 저장:', recordData);

        // 실제 API 호출:
        /*
        fetch('/api/plogging/records', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify(recordData)
        });
        */

        setShowCourseReviewModal(false);
        setReviewModalData({ sessionData: null, courseData: null });
        alert(`플로깅 기록이 "${recordData.title}"으로 저장되었습니다!`);
    };

    const handleSkipReview = () => {
        setShowCourseReviewModal(false);
        setReviewModalData({ sessionData: null, courseData: null });
    };

    if (isSessionLoading) {
        return (
            <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">플로깅 상태를 확인하는 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-50 flex flex-col overflow-hidden max-w-md mx-auto">
            <CertificationHeader
                isTracking={isTracking}
                courseInfo={isCourseBased ? courseData : undefined}
            />

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
                                isCourseBased={isCourseBased}
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
                    courseInfo={isCourseBased ? courseData : undefined}
                />

                <PhotoModal
                    isOpen={isPhotoConfirmOpen}
                    photo={capturedPhoto}
                    onConfirm={confirmPhoto}
                    onRetake={retakePhoto}
                    onCancel={cancelPhoto}
                />

                {/* 코스 리뷰 모달 */}
                <CourseReviewModal
                    isOpen={showCourseReviewModal}
                    sessionData={reviewModalData.sessionData}
                    courseData={reviewModalData.courseData}
                    onSubmit={handleReviewSubmit}
                    onSaveRecord={handleSaveRecord}
                    onSkip={handleSkipReview}
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
    );
};

export default CertificationPage;