import React from 'react';
import { ExternalLink, Clock, Leaf } from 'lucide-react';

const news = [
  {
    id: 1,
    title: '서울시, 플라스틱 사용 줄이기 캠페인 확대',
    summary: '서울시가 일회용 플라스틱 사용을 줄이기 위한 다양한 정책을 발표했습니다.',
    time: '2시간 전',
    category: '정책',
    image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: '전국 해안가 정화 활동 참여자 10만 명 돌파',
    summary: '올해 해안가 정화 활동에 참여한 시민들이 10만 명을 넘어섰습니다.',
    time: '4시간 전',
    category: '활동',
    image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: '미세먼지 줄이기 위한 도시 숲 조성 프로젝트',
    summary: '도심 속 미세먼지 저감을 위한 대규모 도시 숲 조성 사업이 시작됩니다.',
    time: '6시간 전',
    category: '환경',
    image: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case '정책':
      return 'bg-blue-100 text-blue-700';
    case '활동':
      return 'bg-emerald-100 text-emerald-700';
    case '환경':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const EnvironmentalNews: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-800">환경 소식</h2>
        </div>
        <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
          더보기
        </button>
      </div>
      
      <div className="space-y-4">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.01]"
          >
            <div className="flex gap-3 p-4">
              <div className="flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded-xl"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{article.time}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                  {article.summary}
                </p>
                
                <button className="flex items-center gap-1 text-emerald-600 text-xs font-medium hover:text-emerald-700 transition-colors">
                  <span>자세히 보기</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl text-white text-center">
        <Leaf className="w-8 h-8 mx-auto mb-2" />
        <h3 className="font-bold mb-1">환경 보호에 동참하세요!</h3>
        <p className="text-sm text-emerald-100 mb-3">
          작은 행동이 큰 변화를 만듭니다
        </p>
        <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
          플로깅 시작하기
        </button>
      </div>
    </div>
  );
};

export default EnvironmentalNews;