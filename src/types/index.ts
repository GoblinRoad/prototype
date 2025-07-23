export interface Course {
  id: string;
  name: string;
  location: string;
  distance: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
  aqiLevel: 'Good' | 'Moderate' | 'Poor' | 'Unhealthy';
}

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  points: number;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  issueDate: string;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  imageUrl: string;
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