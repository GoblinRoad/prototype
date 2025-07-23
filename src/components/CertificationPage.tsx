import React, { useState } from 'react';
import { Award, Star, Download, Share2, Lock, CheckCircle, Target, Trophy } from 'lucide-react';
import type { Achievement, Certificate } from '../types';

const CertificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'certificates'>('achievements');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first plogging session',
      icon: 'Target',
      progress: 1,
      maxProgress: 1,
      isCompleted: true,
      points: 50
    },
    {
      id: '2',
      title: 'Distance Runner',
      description: 'Run a total of 50km while plogging',
      icon: 'Trophy',
      progress: 45.2,
      maxProgress: 50,
      isCompleted: false,
      points: 200
    },
    {
      id: '3',
      title: 'Cleanup Champion',
      description: 'Collect 100 pieces of trash',
      icon: 'Award',
      progress: 87,
      maxProgress: 100,
      isCompleted: false,
      points: 150
    },
    {
      id: '4',
      title: 'Weekly Warrior',
      description: 'Complete 7 consecutive days of plogging',
      icon: 'Star',
      progress: 5,
      maxProgress: 7,
      isCompleted: false,
      points: 100
    },
    {
      id: '5',
      title: 'Community Leader',
      description: 'Invite 5 friends to join plogging',
      icon: 'Trophy',
      progress: 0,
      maxProgress: 5,
      isCompleted: false,
      points: 300
    },
    {
      id: '6',
      title: 'Marathon Plogger',
      description: 'Complete a 21km plogging session',
      icon: 'Target',
      progress: 0,
      maxProgress: 1,
      isCompleted: false,
      points: 500
    }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Eco Warrior Bronze',
      description: 'Completed 10 plogging sessions with environmental impact',
      issueDate: '2024-01-15',
      level: 'Bronze',
      imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Community Champion Silver',
      description: 'Led 5 community cleanup events and inspired others',
      issueDate: '2024-02-20',
      level: 'Silver',
      imageUrl: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const getAchievementIcon = (iconName: string, isCompleted: boolean) => {
    const className = `w-6 h-6 ${isCompleted ? 'text-emerald-600' : 'text-gray-400'}`;
    
    switch (iconName) {
      case 'Target': return <Target className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Star': return <Star className={className} />;
      default: return <Award className={className} />;
    }
  };

  const getCertificateColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'from-orange-400 to-orange-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Achievements & Certificates</h1>
          
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'achievements'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'certificates'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Certificates
            </button>
          </div>
        </div>

        {activeTab === 'achievements' ? (
          <div className="p-4">
            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Your Progress</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {achievements.filter(a => a.isCompleted).length}
                  </div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-600">
                    {achievements.reduce((sum, a) => sum + (a.isCompleted ? a.points : 0), 0)}
                  </div>
                  <div className="text-xs text-gray-600">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {achievements.filter(a => !a.isCompleted).length}
                  </div>
                  <div className="text-xs text-gray-600">In Progress</div>
                </div>
              </div>
            </div>

            {/* Achievements List */}
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`bg-white rounded-xl p-4 shadow-sm ${
                    achievement.isCompleted ? 'ring-2 ring-emerald-200' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-3 rounded-xl ${
                      achievement.isCompleted ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      {achievement.isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      ) : (
                        getAchievementIcon(achievement.icon, achievement.isCompleted)
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        <span className="text-sm font-medium text-emerald-600">
                          +{achievement.points} pts
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      
                      {!achievement.isCompleted && (
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {achievement.isCompleted && (
                        <div className="flex items-center text-sm text-emerald-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Certificates */}
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className={`h-32 bg-gradient-to-r ${getCertificateColor(certificate.level)} relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{certificate.title}</h3>
                      <p className="text-sm opacity-90">{certificate.level} Level</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">{certificate.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Locked Certificates */}
              <div className="bg-white rounded-xl p-4 shadow-sm opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Eco Warrior Gold</h3>
                    <p className="text-sm text-gray-600">Complete 50 plogging sessions</p>
                    <div className="text-xs text-gray-500 mt-1">
                      Progress: 12/50 sessions
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Platinum Guardian</h3>
                    <p className="text-sm text-gray-600">Achieve top 10 global ranking</p>
                    <div className="text-xs text-gray-500 mt-1">
                      Current rank: #12
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationPage;