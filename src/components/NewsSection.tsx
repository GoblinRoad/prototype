// import React from 'react';
// import { ExternalLink, Clock } from 'lucide-react';
// import type { NewsItem } from '../types';
//
// const NewsSection: React.FC = () => {
//   const newsItems: NewsItem[] = [
//     {
//       id: '1',
//       title: '전 세계 플라스틱 폐기물 감소량, 기록적 수준 달성',
//       summary: '전 세계적으로 일회용 플라스틱 감소를 위한 새로운 이니셔티브들이 유망한 결과를 보이고 있습니다.',
//       imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
//       publishedAt: '2시간 전',
//       source: '환경뉴스'
//     },
//     {
//       id: '2',
//       title: '바다 정화 프로젝트, 50톤의 폐기물 제거 성공',
//       summary: '최신 기술의 혁신으로 해양 환경에서 플라스틱을 더 빠르게 제거할 수 있게 되었습니다.',
//       imageUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
//       publishedAt: '4시간 전',
//       source: '그린플래닛'
//     },
//     {
//       id: '3',
//       title: '지역 플로깅 행사, 300% 성장세 보여',
//       summary: '더 많은 도시들이 플로깅 프로그램을 채택하면서 피트니스와 환경 활동이 결합되고 있습니다.',
//       imageUrl: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
//       publishedAt: '6시간 전',
//       source: '도시건강'
//     }
//   ];
//
//   return (
//       <section className="bg-white px-4 py-6">
//         <div className="max-w-md mx-auto">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900">환경 뉴스</h2>
//             <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
//               전체보기
//             </button>
//           </div>
//
//           <div className="space-y-4">
//             {newsItems.map((item, index) => (
//                 <article key={item.id} className={`bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${index === 0 ? 'featured' : ''}`}>
//                   {index === 0 ? (
//                       <div className="space-y-4">
//                         <img
//                             src={item.imageUrl}
//                             alt={item.title}
//                             className="w-full h-48 object-cover"
//                         />
//                         <div className="p-4">
//                           <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
//                             <span>{item.source}</span>
//                             <span>•</span>
//                             <div className="flex items-center">
//                               <Clock className="w-3 h-3 mr-1" />
//                               {item.publishedAt}
//                             </div>
//                           </div>
//                           <h3 className="font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
//                           <p className="text-gray-600 text-sm mb-3">{item.summary}</p>
//                           <button className="flex items-center text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
//                             자세히 보기
//                             <ExternalLink className="w-3 h-3 ml-1" />
//                           </button>
//                         </div>
//                       </div>
//                   ) : (
//                       <div className="p-4">
//                         <div className="flex space-x-3">
//                           <img
//                               src={item.imageUrl}
//                               alt={item.title}
//                               className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
//                               <span>{item.source}</span>
//                               <span>•</span>
//                               <div className="flex items-center">
//                                 <Clock className="w-3 h-3 mr-1" />
//                                 {item.publishedAt}
//                               </div>
//                             </div>
//                             <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.title}</h3>
//                             <p className="text-gray-600 text-xs line-clamp-2">{item.summary}</p>
//                           </div>
//                         </div>
//                       </div>
//                   )}
//                 </article>
//             ))}
//           </div>
//         </div>
//       </section>
//   );
// };
//
// export default NewsSection;