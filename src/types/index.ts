export interface Course {
  id: string;
  name: string;
  location: string;
  distance: string;
  difficulty: '쉬움' | '보통' | '어려움';
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

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  aqi: number;
  aqiLevel: '좋음' | '보통' | '나쁨' | '매우나쁨';
}

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
  category: 'milestone' | 'distance' | 'cleanup' | 'region' | 'streak' | 'other';
}

// 기존 Achievement는 Certificate로 이름 변경
export interface Certificate {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  points: number;
  issueDate?: string;
  level?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  imageUrl?: string;
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
  badges: string[];
}