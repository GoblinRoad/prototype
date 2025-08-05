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
