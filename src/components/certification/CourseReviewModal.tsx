import React, { useState, useEffect } from 'react';
import { Star, X, Clock, Route, Target } from 'lucide-react';

interface CourseGpxData {
    courseId: string;
    courseName: string;
    gpxPath: Array<{lat: number, lng: number}>;
    targetDistance: number;
    difficulty: string;
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

interface CourseReviewModalProps {
    isOpen: boolean;
    sessionData: PloggingSession | null;
    courseData: CourseGpxData | null;
    onSubmit: (reviewData: CourseReview) => void;
    onSaveRecord: (recordData: GeneralPloggingRecord) => void;
    onSkip: () => void;
}

const CourseReviewModal: React.FC<CourseReviewModalProps> = ({
                                                                 isOpen,
                                                                 sessionData,
                                                                 courseData,
                                                                 onSubmit,
                                                                 onSaveRecord,
                                                                 onSkip
                                                             }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const [recordTitle, setRecordTitle] = useState('');

    const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

    const isCourseFlogging = sessionData?.courseId != null && courseData != null;

    const calculateScore = (distance: number, duration: number): number => {
        const baseScore = distance * 100;
        const timeBonus = Math.max(0, 60 - duration) * 2;
        return Math.round(baseScore + timeBonus);
    };

    const formatDuration = (startTime: string): { formatted: string, minutes: number } => {
        if (!sessionData) return { formatted: '00:00:00', minutes: 0 };
        const start = new Date(startTime);
        const end = new Date();
        const diff = end.getTime() - start.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const totalMinutes = Math.floor(diff / (1000 * 60));
        return {
            formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
            minutes: totalMinutes
        };
    };

    const durationData = formatDuration(sessionData?.startTime || new Date().toISOString());
    const ploggingScore = calculateScore(sessionData?.totalDistance || 0, durationData.minutes);

    useEffect(() => {
        if (!isOpen || !mapContainer || !sessionData?.currentPath || sessionData.currentPath.length === 0) return;

        if (window.kakao && window.kakao.maps) {
            initializeMap();
            return;
        }

        const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
        if (existingScript) {
            const checkKakao = setInterval(() => {
                if (window.kakao && window.kakao.maps) {
                    clearInterval(checkKakao);
                    initializeMap();
                }
            }, 100);
            return () => clearInterval(checkKakao);
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
        script.onload = () => {
            window.kakao.maps.load(() => {
                initializeMap();
            });
        };
        document.head.appendChild(script);

        function initializeMap() {
            if (!mapContainer || !sessionData?.currentPath || sessionData.currentPath.length === 0) return;

            const mapOption = {
                center: new window.kakao.maps.LatLng(
                    sessionData.currentPath[0].lat,
                    sessionData.currentPath[0].lng
                ),
                level: 5
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            const path = sessionData.currentPath.map(point =>
                new window.kakao.maps.LatLng(point.lat, point.lng)
            );

            const polyline = new window.kakao.maps.Polyline({
                path: path,
                strokeWeight: 4,
                strokeColor: '#22c55e',
                strokeOpacity: 0.8,
                strokeStyle: 'solid'
            });

            polyline.setMap(map);

            if (path.length > 0) {
                new window.kakao.maps.Marker({
                    position: path[0],
                    map: map
                });

                if (path.length > 1) {
                    new window.kakao.maps.Marker({
                        position: path[path.length - 1],
                        map: map
                    });
                }
            }

            const bounds = new window.kakao.maps.LatLngBounds();
            path.forEach(point => bounds.extend(point));
            map.setBounds(bounds);
        }
    }, [isOpen, mapContainer, sessionData?.currentPath]);

    const handleSubmit = () => {
        if (!sessionData) return;

        if (isCourseFlogging && courseData) {
            const reviewData: CourseReview = {
                courseId: courseData.courseId,
                sessionId: sessionData.sessionId,
                rating,
                comment: comment.trim()
            };
            onSubmit(reviewData);
        } else {
            const recordData: GeneralPloggingRecord = {
                sessionId: sessionData.sessionId,
                title: recordTitle.trim() || `플로깅 기록 ${new Date().toLocaleDateString()}`,
                totalDistance: sessionData.totalDistance,
                duration: durationData.formatted,
                score: ploggingScore,
                path: sessionData.currentPath,
                date: new Date().toISOString()
            };
            onSaveRecord(recordData);
        }
    };

    if (!isOpen || !sessionData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">
                            {isCourseFlogging ? '코스 리뷰 작성' : '플로깅 기록 저장'}
                        </h2>
                        <button
                            onClick={onSkip}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4">
                    {/* 플로깅 완료 정보 */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="mb-6">
                            <div
                                ref={setMapContainer}
                                className="w-full h-40 bg-gray-100 rounded-xl border"
                            >
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    지도를 로딩 중...
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="flex items-center justify-center mb-1">
                                    <Route className="w-4 h-4 text-gray-600 mr-1" />
                                </div>
                                <p className="text-xs text-gray-500">거리</p>
                                <p className="font-semibold text-green-600">
                                    {sessionData?.totalDistance?.toFixed(1) || '0.0'}km
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center justify-center mb-1">
                                    <Clock className="w-4 h-4 text-gray-600 mr-1" />
                                </div>
                                <p className="text-xs text-gray-500">시간</p>
                                <p className="font-semibold text-gray-900">
                                    {durationData.formatted}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center justify-center mb-1">
                                    <Target className="w-4 h-4 text-gray-600 mr-1" />
                                </div>
                                <p className="text-xs text-gray-500">점수</p>
                                <p className="font-semibold text-blue-600">{ploggingScore}점</p>
                            </div>
                        </div>
                    </div>

                    {isCourseFlogging ? (
                        <>
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">전체 평점</h4>
                                <div className="flex items-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`w-8 h-8 ${
                                                    star <= rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="text-lg font-semibold text-gray-900 ml-2">
                                        {rating}.0
                                    </span>
                                </div>
                            </div>

                            {/* 리뷰 작성 */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">
                                    상세 리뷰 (선택사항)
                                </h4>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="이 코스에 대한 후기를 자유롭게 작성해주세요..."
                                    className="w-full h-24 p-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    maxLength={500}
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">
                                    {comment.length}/500
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">기록</h4>
                            <input
                                type="text"
                                value={recordTitle}
                                onChange={(e) => setRecordTitle(e.target.value)}
                                placeholder="(예: 한강공원 플로깅, 동네 플로깅)"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                maxLength={50}
                            />
                            <p className="text-xs text-gray-500 mt-1 text-right">
                                {recordTitle.length}/50
                            </p>
                        </div>
                    )}

                    {/* 버튼들 */}
                    <div className="flex space-x-3">
                        <button
                            onClick={onSkip}
                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            건너뛰기
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                        >
                            {isCourseFlogging ? '리뷰 제출' : '기록 저장'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseReviewModal;