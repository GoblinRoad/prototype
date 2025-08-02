export interface Course {
  id: string
  name: string
  location: string
  distance: string
  difficulty: "쉬움" | "보통" | "어려움"
  estimatedTime: string
  cleanupSpots: number
  rating: number
}

export interface User {
  id: string
  name: string
  avatar: string
  stats: {
    distance: number
    cleanups: number
    points: number
  }
  rank: number
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
  id: string
  label: string
  icon: string
  isActive?: boolean
}

// 새로운 Achievement 타입 (업적 시스템용)
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  isUnlocked: boolean
  unlockedAt?: string
  category: "milestone" | "distance" | "cleanup" | "region" | "streak" | "other"
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

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum"

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: "distance" | "cleanup" | "achievement" | "environment" | "special"
  tier: BadgeTier
  isObtained: boolean
  obtainedDate?: string
  progress?: number
  maxProgress?: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  joinDate: string
  level: number
  totalDistance: number
  totalCleanups: number
  totalPoints: number
  rank: number
  badges: Array<{ name: string; tier: BadgeTier }>
  // 새로운 필드들
  region?: string
  district?: string
  preferredTheme?: "sea" | "mountain"
  difficultyLevel?: "easy" | "medium" | "hard"
}

// 지역 데이터 타입
export interface RegionData {
  region: string
  districts: string[]
}

export interface SubRegion {
  sigunguCode: number
  name: string
}

export interface AreaData {
  areaCode: number
  areaName: string
  subRegions: SubRegion[]
}

export interface TouristSpot {
  id: string
  name: string
  description: string
  imageUrl: string
  distance: string
  category: string
}

export interface CourseDetail {
  id: string
  name: string
  location: string
  distance: string
  difficulty: string
  estimatedTime: string
  cleanupSpots: number
  rating: number
  reviewCount: number
  description: string
  highlights: string[]
  startPoint: string
  endPoint: string
  elevation: string
  surface: string
}

// 그룹 이벤트 타입 추가
export interface GroupEvent {
  id: string
  name: string
  location: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  participants: number
  maxParticipants: number
  difficulty: "쉬움" | "보통" | "어려움"
  imageUrl: string
  description?: string
  meetingPoint?: string
  meetingPointLat?: number // 위도 추가
  meetingPointLng?: number // 경도 추가
  organizer?: {
    id: string
    name: string
    avatar: string
  }
  chatLink?: string
  status?: "upcoming" | "ongoing" | "completed"
  participantsList?: Participant[]
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
}

export interface KakaoPostcodeData {
  roadAddress: string
  jibunAddress: string
  zonecode: string
  sido: string
  sigungu: string
  bname: string
  buildingName: string
}

export interface KakaoPostcodeOptions {
  oncomplete: (data: KakaoPostcodeData) => void
  onclose: (state: string) => void
  theme?: {
    bgColor?: string
    searchBgColor?: string
    contentBgColor?: string
    pageBgColor?: string
    textColor?: string
    queryTextColor?: string
  }
}

export interface KakaoPostcode {
  embed: (element: HTMLElement, options?: { width?: string; height?: string }) => void
}

// Kakao Maps API 타입 정의
export interface KakaoGeocoderResult {
  x: string // longitude
  y: string // latitude
  address_name: string
  address_type: string
}

export interface KakaoGeocoder {
  addressSearch: (
      address: string,
      callback: (result: KakaoGeocoderResult[], status: string) => void
  ) => void
}

export interface KakaoMapsServices {
  Geocoder: new () => KakaoGeocoder
  Status: {
    OK: string
  }
}

export interface KakaoLatLngInstance {
  getLat: () => number
  getLng: () => number
}

export interface KakaoLatLng {
  new (lat: number, lng: number): KakaoLatLngInstance
}


export interface KakaoMarkerInstance {
  setMap: (map: KakaoMapInstance | null) => void
}

export interface KakaoMarker {
  new (options: { position: KakaoLatLngInstance }): KakaoMarkerInstance
}


export interface KakaoMapInstance {
  setCenter: (latlng: KakaoLatLngInstance) => void
  setLevel: (level: number) => void
  // 필요시 더 추가 가능
}

export interface KakaoMap {
  new (
      container: HTMLElement,
      options: {
        center: KakaoLatLngInstance
        level: number
      }
  ): KakaoMapInstance
}


export interface KakaoMaps {
  load: (callback: () => void) => void
  services: KakaoMapsServices
  LatLng: KakaoLatLng
  Map: KakaoMap
  Marker: KakaoMarker
}

declare global {
  interface Window {
    kakao: {
      maps: KakaoMaps
    }
    daum: {
      Postcode: new (options: KakaoPostcodeOptions) => KakaoPostcode
    }
  }
}
export {}
