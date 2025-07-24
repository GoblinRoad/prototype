import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Target, Star, Heart, Share2, Navigation } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

interface TouristSpot {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    distance: string;
    category: string;
}

interface CourseDetail {
    id: string;
    name: string;
    location: string;
    distance: string;
    difficulty: string;
    estimatedTime: string;
    cleanupSpots: number;
    rating: number;
    reviewCount: number;
    description: string;
    highlights: string[];
    startPoint: string;
    endPoint: string;
    elevation: string;
    surface: string;
}

const CourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'spots' | 'reviews'>('overview');
    const [isLiked, setIsLiked] = useState(false);
    const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // 코스 데이터 (실제로는 API에서 가져올 데이터)
    const coursesData: Record<string, CourseDetail> = {
        '1': {
            id: '1',
            name: '한강공원 플로깅 코스',
            location: '서울 마포구 망원한강공원',
            distance: '3.2 km',
            difficulty: '쉬움',
            estimatedTime: '25분',
            cleanupSpots: 8,
            rating: 4.8,
            reviewCount: 124,
            description: '한강을 따라 걷는 아름다운 플로깅 코스입니다. 평평한 길로 구성되어 있어 초보자도 쉽게 도전할 수 있으며, 강변의 멋진 경치를 감상하며 환경보호에 동참할 수 있습니다.',
            highlights: [
                '한강의 아름다운 일몰 경관',
                '넓은 잔디밭과 휴식 공간',
                '자전거 도로와 분리된 안전한 보행로',
                '충분한 쓰레기통과 화장실 시설'
            ],
            startPoint: '망원한강공원 주차장',
            endPoint: '양화대교 남단',
            elevation: '평지 (고도차 거의 없음)',
            surface: '포장도로 90%, 흙길 10%'
        },
        '2': {
            id: '2',
            name: '올림픽공원 둘레길',
            location: '서울 송파구 올림픽공원',
            distance: '5.1 km',
            difficulty: '보통',
            estimatedTime: '40분',
            cleanupSpots: 12,
            rating: 4.6,
            reviewCount: 87,
            description: '올림픽공원을 둘러싸는 아름다운 둘레길입니다. 다양한 조각품과 녹지를 감상하며 플로깅할 수 있으며, 적당한 언덕이 있어 운동 효과도 좋습니다.',
            highlights: [
                '다양한 야외 조각품 감상',
                '울창한 숲길과 호수 경관',
                '적당한 경사로 운동 효과 증대',
                '깨끗하게 관리된 공원 시설'
            ],
            startPoint: '올림픽공원 평화의 광장',
            endPoint: '몽촌토성 입구',
            elevation: '완만한 언덕 (최대 고도차 30m)',
            surface: '포장도로 70%, 흙길 30%'
        },
        '3': {
            id: '3',
            name: '청계천 산책로',
            location: '서울 중구 청계천',
            distance: '2.8 km',
            difficulty: '쉬움',
            estimatedTime: '20분',
            cleanupSpots: 6,
            rating: 4.5,
            reviewCount: 156,
            description: '도심 속 청계천을 따라 걷는 짧은 플로깅 코스입니다. 직장인들의 점심시간 플로깅이나 가벼운 산책에 적합하며, 도심 속에서 자연을 느낄 수 있습니다.',
            highlights: [
                '도심 속 자연 공간',
                '짧은 거리로 부담 없음',
                '대중교통 접근성 우수',
                '야간 조명으로 저녁 플로깅 가능'
            ],
            startPoint: '청계광장',
            endPoint: '마장동 청계천변',
            elevation: '평지 (고도차 없음)',
            surface: '포장도로 100%'
        },
        // AI 추천 코스들
        'ai1': {
            id: 'ai1',
            name: '🤖 AI 추천: 초보자 친화적 코스',
            location: '서울 마포구',
            distance: '2.5 km',
            difficulty: '쉬움',
            estimatedTime: '18분',
            cleanupSpots: 5,
            rating: 4.6,
            reviewCount: 45,
            description: 'AI가 초보자를 위해 특별히 선별한 코스입니다. 평평한 길과 짧은 거리로 구성되어 플로깅을 처음 시작하는 분들에게 최적화되어 있습니다.',
            highlights: [
                'AI 알고리즘으로 선별된 초보자 맞춤 코스',
                '평평한 길로만 구성',
                '적당한 휴식 공간 배치',
                '안전한 야간 조명 시설'
            ],
            startPoint: 'AI 추천 시작점',
            endPoint: 'AI 추천 도착점',
            elevation: '평지',
            surface: '포장도로 100%'
        }
    };

    // 주변 관광지 정보
    const touristSpots: TouristSpot[] = [
        {
            id: '1',
            name: '망원한강공원',
            description: '한강을 따라 조성된 대표적인 시민공원으로, 넓은 잔디밭과 다양한 레저 시설을 갖추고 있습니다. 특히 일몰 명소로 유명하며, 가족 단위 방문객들에게 인기가 높습니다.',
            imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
            distance: '0m',
            category: '공원'
        },
        {
            id: '2',
            name: '선유도공원',
            description: '한강 위의 작은 섬으로 만들어진 생태공원입니다. 옛 정수장을 재활용한 독특한 건축물과 아름다운 수생식물원이 특징입니다.',
            imageUrl: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
            distance: '800m',
            category: '생태공원'
        },
        {
            id: '3',
            name: '양화대교',
            description: '한강을 가로지르는 아름다운 다리로, 밤에는 조명이 켜져 더욱 아름다운 야경을 자랑합니다. 도보로 건널 수 있어 한강 양쪽을 모두 즐길 수 있습니다.',
            imageUrl: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
            distance: '1.2km',
            category: '랜드마크'
        },
        {
            id: '4',
            name: '홍대거리',
            description: '젊음의 거리로 유명한 홍대 주변에는 다양한 카페, 음식점, 문화공간이 있습니다. 플로깅 후 휴식과 식사를 즐기기 좋은 곳입니다.',
            imageUrl: 'https://images.pexels.com/photos/2901528/pexels-photo-2901528.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
            distance: '1.5km',
            category: '문화거리'
        }
    ];

    useEffect(() => {
        // 실제로는 API 호출
        const fetchCourseDetail = async () => {
            setLoading(true);
            try {
                // API 호출 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 500));

                if (courseId && coursesData[courseId]) {
                    setCourseDetail(coursesData[courseId]);
                } else {
                    // 코스를 찾을 수 없는 경우
                    navigate('/courses');
                }
            } catch (error) {
                console.error('코스 정보를 불러오는데 실패했습니다:', error);
                navigate('/courses');
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseDetail();
        }
    }, [courseId, navigate]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case '쉬움': return 'bg-green-100 text-green-800';
            case '보통': return 'bg-yellow-100 text-yellow-800';
            case '어려움': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case '공원': return 'bg-green-100 text-green-700';
            case '생태공원': return 'bg-emerald-100 text-emerald-700';
            case '랜드마크': return 'bg-blue-100 text-blue-700';
            case '문화거리': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleStartPlogging = () => {
        // 플로깅 시작 로직 (실제 플로깅 페이지로 이동)
        console.log(`코스 ${courseId} 플로깅 시작`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 max-w-md mx-auto flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">코스 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (!courseDetail) {
        return (
            <div className="min-h-screen bg-gray-50 max-w-md mx-auto flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">코스를 찾을 수 없습니다.</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                    >
                        코스 목록으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
            {/* 헤더 */}
            <div className="bg-white px-4 py-3 shadow-sm relative">
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center pr-10">
                        코스 상세정보
                    </h1>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Share2 className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 지도 영역 */}
            <div className="relative">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">코스 지도</p>
                        <p className="text-sm text-gray-400 mt-1">{courseDetail.location}</p>
                    </div>
                </div>
                <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                    <Navigation className="w-5 h-5 text-emerald-600" />
                </button>
            </div>

            {/* 코스 기본 정보 */}
            <div className="bg-white px-4 py-4 border-b">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{courseDetail.name}</h2>
                        <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {courseDetail.location}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold ml-1">{courseDetail.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({courseDetail.reviewCount})</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <Target className="w-4 h-4 text-emerald-500 mr-1" />
                            <span className="text-sm font-medium text-gray-600">거리</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{courseDetail.distance}</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 text-blue-500 mr-1" />
                            <span className="text-sm font-medium text-gray-600">시간</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{courseDetail.estimatedTime}</span>
                    </div>
                    <div className="text-center">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(courseDetail.difficulty)}`}>
              {courseDetail.difficulty}
            </span>
                    </div>
                </div>

                <button
                    onClick={handleStartPlogging}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors font-semibold"
                >
                    플로깅 시작하기
                </button>
            </div>

            {/* 탭 메뉴 */}
            <div className="bg-white px-4 py-3 border-b">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'overview'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        개요
                    </button>
                    <button
                        onClick={() => setActiveTab('spots')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'spots'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        주변 관광지
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'reviews'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        리뷰
                    </button>
                </div>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="pb-20">
                {activeTab === 'overview' && (
                    <div className="p-4 space-y-4">
                        {/* 코스 설명 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-2">코스 소개</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{courseDetail.description}</p>
                        </div>

                        {/* 코스 하이라이트 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">코스 특징</h3>
                            <div className="space-y-2">
                                {courseDetail.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 코스 정보 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">상세 정보</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">출발지</span>
                                    <span className="text-sm font-medium">{courseDetail.startPoint}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">도착지</span>
                                    <span className="text-sm font-medium">{courseDetail.endPoint}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">고도</span>
                                    <span className="text-sm font-medium">{courseDetail.elevation}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">노면 상태</span>
                                    <span className="text-sm font-medium">{courseDetail.surface}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">정리 지점</span>
                                    <span className="text-sm font-medium">{courseDetail.cleanupSpots}개소</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'spots' && (
                    <div className="p-4">
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-900 mb-2">주변 관광지 ({touristSpots.length}곳)</h3>
                            <p className="text-sm text-gray-600">플로깅과 함께 즐길 수 있는 주변 명소들입니다.</p>
                        </div>

                        <div className="space-y-4">
                            {touristSpots.map((spot) => (
                                <div key={spot.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                                    <img
                                        src={spot.imageUrl}
                                        alt={spot.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900">{spot.name}</h4>
                                            <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(spot.category)}`}>
                          {spot.category}
                        </span>
                                                <span className="text-sm text-gray-500">{spot.distance}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{spot.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="p-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <div className="text-center mb-4">
                                <div className="text-3xl font-bold text-gray-900">{courseDetail.rating}</div>
                                <div className="flex items-center justify-center mt-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`w-5 h-5 ${star <= Math.floor(courseDetail.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600">{courseDetail.reviewCount}개의 리뷰</div>
                            </div>
                        </div>

                        {/* 리뷰 목록 */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="flex items-center space-x-3 mb-3">
                                    <img
                                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                                        alt="사용자"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h5 className="font-medium text-gray-900">김플로깅</h5>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">2일 전</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    한강 경치가 정말 아름다워요! 평평한 길이라 걷기도 편하고, 일몰 시간에 플로깅하니 더욱 좋았습니다. 쓰레기통도 곳곳에 있어서 편리해요.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="flex items-center space-x-3 mb-3">
                                    <img
                                        src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                                        alt="사용자"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h5 className="font-medium text-gray-900">환경지킴이</h5>
                                            <div className="flex">
                                                {[1, 2, 3, 4].map((star) => (
                                                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                                                ))}
                                                <Star className="w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">5일 전</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    가족과 함께 즐겁게 플로깅했습니다. 아이들도 쉽게 따라올 수 있는 코스예요. 다만 주말에는 사람이 많아서 조금 복잡할 수 있어요.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <button className="text-emerald-600 font-medium text-sm">
                                더 많은 리뷰 보기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetailPage;