export interface Course {
  id: string;
  name: string;
  location: string;
  distance: string;
  difficulty: "쉬움" | "보통" | "어려움";
  estimatedTime: string;
  cleanupSpots: number;
  rating: number;
}

export interface PloggingLocation {
  id: string;
  name: string;
  address: string;
  category: "공원" | "하천" | "산" | "해변" | "문화재" | "시가지";
  rating: number;
  reviewCount: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
  description?: string;
}


export interface User {
  id: string;
  name: string;
  avatar: string;
  stats: {
    distance: number;
    cleanups: number;
    points: number;
  };
  rank: number;
}

// export interface NewsItem {
//   id: string;
//   title: string;
//   summary: string;
//   imageUrl: string;
//   publishedAt: string;
//   source: string;
// }

// export interface WeatherData {
//   temperature: number;
//   condition: string;
//   humidity: number;
//   aqi: number;
//   aqiLevel: '좋음' | '보통' | '나쁨' | '매우나쁨';
// }

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

// 새로운 Achievement 타입 (업적 시스템용)
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  category:
    | "milestone"
    | "distance"
    | "cleanup"
    | "region"
    | "streak"
    | "other";
}

// 기존 Achievement는 Certificate로 이름 변경
// export interface Certificate {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   progress: number;
//   maxProgress: number;
//   isCompleted: boolean;
//   points: number;
//   issueDate?: string;
//   level?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
//   imageUrl?: string;
// }

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "distance" | "cleanup" | "achievement" | "environment" | "special";
  tier: BadgeTier;
  isObtained: boolean;
  obtainedDate?: string;
  progress?: number;
  maxProgress?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  level: number;
  totalDistance: number;
  totalCleanups: number;
  totalPoints: number;
  rank: number;
  badges: Array<{ name: string; tier: BadgeTier }>;
  // 새로운 필드들
  region?: string;
  district?: string;
  preferredTheme?: "sea" | "mountain";
  difficultyLevel?: "easy" | "medium" | "hard";
}

// 지역 데이터 타입
export interface RegionData {
  region: string;
  districts: string[];
}

export interface SubRegion {
  sigunguCode: number;
  name: string;
}

export interface AreaData {
  areaCode: number;
  areaName: string;
  subRegions: SubRegion[];
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  distance: string;
  category: string;
}

export interface CourseDetail {
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

// 그룹 이벤트 타입 추가
export interface GroupEvent {
  id: string;
  name: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  participants: number;
  maxParticipants: number;
  difficulty: "쉬움" | "보통" | "어려움";
  imageUrl: string;
  description?: string;
  meetingPoint?: string;
  meetingPointLat?: number; // 위도 추가
  meetingPointLng?: number; // 경도 추가
  organizer?: {
    id: string;
    name: string;
    avatar: string;
  };
  chatLink?: string;
  status?: "upcoming" | "ongoing" | "completed";
  participantsList?: Participant[];
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
}

export interface KakaoPostcodeData {
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  sido: string;
  sigungu: string;
  bname: string;
  buildingName: string;
}

export interface KakaoPostcodeOptions {
  oncomplete: (data: KakaoPostcodeData) => void;
  onclose: (state: string) => void;
  theme?: {
    bgColor?: string;
    searchBgColor?: string;
    contentBgColor?: string;
    pageBgColor?: string;
    textColor?: string;
    queryTextColor?: string;
  };
}

export interface KakaoPostcode {
  embed: (
    element: HTMLElement,
    options?: { width?: string; height?: string }
  ) => void;
}

// Kakao Maps API 타입 정의
export interface KakaoGeocoderResult {
  x: string; // longitude
  y: string; // latitude
  address_name: string;
  address_type: string;
}

export interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (result: KakaoGeocoderResult[], status: string) => void
  ) => void;
}

export interface KakaoMapsServices {
  Geocoder: new () => KakaoGeocoder;
  Status: {
    OK: string;
  };
}

export interface KakaoLatLngInstance {
  getLat: () => number;
  getLng: () => number;
}

export interface KakaoLatLng {
  new (lat: number, lng: number): KakaoLatLngInstance;
}

export interface KakaoMarkerInstance {
  setMap: (map: KakaoMapInstance | null) => void;
}

export interface KakaoMarker {
  new (options: {
    position: KakaoLatLngInstance;
    map: KakaoMapInstance;
  }): KakaoMarkerInstance;
}

export interface KakaoMapInstance {
  setCenter: (latlng: KakaoLatLngInstance) => void;
  setLevel: (level: number) => void;
  setBounds: (bounds: KakaoLatLngBoundsInstance) => void;
  // 필요시 더 추가 가능
}

export interface KakaoMap {
  new (
    container: HTMLElement,
    options: {
      center: KakaoLatLngInstance;
      level: number;
    }
  ): KakaoMapInstance;
}

export interface KakaoCustomOverlayInstance {
  setMap: (map: KakaoMapInstance | null) => void;
  setPosition: (position: KakaoLatLngInstance) => void;
  getPosition: () => KakaoLatLngInstance;
  setContent: (content: string) => void;
  getContent: () => string;
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
}

export interface KakaoCustomOverlay {
  new (options: {
    map?: KakaoMapInstance;
    position: KakaoLatLngInstance;
    content: string;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
  }): KakaoCustomOverlayInstance;
}

export interface KakaoMaps {
  load: (callback: () => void) => void;
  services: KakaoMapsServices;
  LatLng: KakaoLatLng;
  Map: KakaoMap;
  Marker: KakaoMarker;
  Polyline: KakaoPolyline;
  LatLngBounds: KakaoLatLngBounds;
  CustomOverlay: KakaoCustomOverlay;
}

export interface KakaoPolylineInstance {
  setMap: (map: KakaoMapInstance | null) => void;
}

export interface KakaoPolyline {
  new (options: {
    path: KakaoLatLngInstance[];
    strokeWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeStyle?: string;
  }): KakaoPolylineInstance;
}

export interface KakaoLatLngBoundsInstance {
  extend: (latlng: KakaoLatLngInstance) => void;
}

export interface KakaoLatLngBounds {
  new (): KakaoLatLngBoundsInstance;
}

declare global {
  interface Window {
    kakao: {
      maps: KakaoMaps;
    };
    daum: {
      Postcode: new (options: KakaoPostcodeOptions) => KakaoPostcode;
    };
  }
}
export {};

// 사용자 선호도 관련 타입 정의
export interface UserPreferences {
  // 기본 정보
  preferredThemes: string[]; // 'sea', 'mountain', 'urban', 'park', 'river', 'historic'
  preferredRegions: string[]; // 시/도 목록
  difficultyLevel: string; // 'easy', 'medium', 'hard'

  // 운동 관련
  exerciseIntensity: string; // 'light', 'moderate', 'intense'
  preferredDistance: string; // '1-3km', '3-5km', '5-10km', '10km+'

  // 시간/계절 관련
  preferredTimeSlots: string[]; // 'morning', 'afternoon', 'evening'
  preferredSeasons: string[]; // 'spring', 'summer', 'autumn', 'winter'

  // 사회적 요소
  companionType: string[]; // 'alone', 'friends', 'family', 'couple', 'pet', 'group'

  // 시설/접근성
  importantFacilities: string[]; // 'restroom', 'parking', 'cafe', 'restaurant', 'convenience', 'bench'
  accessibilityPreference: string; // 'public_transport', 'parking_convenience', 'walking_distance'

  // 목적/취향
  activityPurpose: string[]; // 'exercise', 'healing', 'photography', 'environment', 'social', 'exploration'
  courseType: string; // 'circular', 'linear', 'mixed'

  // 추가 선호도 (확장 가능)
  weatherPreference: string[]; // 'sunny', 'cloudy', 'cool', 'warm'
  sceneryPreference: string[]; // 'nature', 'urban', 'historic', 'modern'
}

// 추천 시스템을 위한 가중치 설정
export interface PreferenceWeights {
  theme: number;
  region: number;
  difficulty: number;
  distance: number;
  facilities: number;
  purpose: number;
  // ... 기타 가중치
}

// API 응답을 위한 추천 결과 타입
export interface RecommendationResult {
  courseId: string;
  score: number;
  matchedPreferences: string[];
  reasons: string[];
}

// 환경 뉴스 관련 타입 정의
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: NewsCategory;
  tags: string[];
  readTime: number; // 읽는데 걸리는 시간 (분)
  isBookmarked?: boolean;
  viewCount: number;
  author?: string;
  sourceUrl?: string;
}

export type NewsCategory =
  | "all"
  | "environment"
  | "climate"
  | "ocean"
  | "forest"
  | "energy"
  | "policy"
  | "technology";

export interface NewsFilter {
  category: NewsCategory;
  searchQuery: string;
  sortBy: "latest" | "popular" | "relevant";
}
