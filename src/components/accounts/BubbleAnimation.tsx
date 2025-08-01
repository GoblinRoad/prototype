import React, { useState, useCallback } from "react";
import "./BubbleAnimation.css";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  goblinType: string;
}

const BubbleAnimation: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [nextId, setNextId] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const goblinImages = [
    "/images/purple-goblin.png",
    "/images/red-goblin.png",
    "/images/green-goblin.png",
    "/images/blue-goblin.png",
  ];

  const createBubbles = useCallback(
    (clientX: number, clientY: number) => {
      if (isCreating) return; // 이미 생성 중이면 무시

      setIsCreating(true);
      const bubbleCount = Math.floor(Math.random() * 3) + 3; // 3-5개 버블
      const staggerDelay = 0.05 + Math.random() * 0.1; // 0.05-0.15초 간격
      let currentId = nextId; // 현재 ID를 로컬 변수로 저장
      let createdCount = 0; // 생성된 버블 개수 카운터

      for (let i = 0; i < bubbleCount; i++) {
        setTimeout(
          () => {
            const size = Math.random() * 20 + 15; // 15-35px
            const goblinType =
              goblinImages[Math.floor(Math.random() * goblinImages.length)];

            // 프로필 헤더 영역 내에서만 버블 생성
            const containerWidth = 400;
            const containerHeight = 300;

            const x = Math.max(
              0,
              Math.min(containerWidth, clientX + (Math.random() - 0.5) * 60)
            );
            const y = Math.max(
              0,
              Math.min(containerHeight, clientY + (Math.random() - 0.5) * 40)
            );

            const newBubble: Bubble = {
              id: currentId + i,
              x,
              y,
              size,
              delay: 0, // 개별 버블은 지연 없음
              goblinType,
            };

            setBubbles((prev) => [...prev, newBubble]);
            createdCount++;

            // 3초 후 개별 버블 제거
            setTimeout(() => {
              setBubbles((prev) =>
                prev.filter((bubble) => bubble.id !== newBubble.id)
              );
            }, 3000);
          },
          i === 0 ? 0 : i * staggerDelay * 1000
        ); // 첫 번째는 즉시, 나머지는 순차적 생성
      }

      // 모든 버블 생성 후 nextId 업데이트 및 생성 상태 리셋
      setTimeout(() => {
        setNextId((prev) => prev + bubbleCount);
        setIsCreating(false);
      }, bubbleCount * staggerDelay * 1000);
    },
    [nextId, goblinImages, isCreating]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // 클릭된 요소가 버튼이 아닌 경우에만 버블 생성
      const target = e.target as HTMLElement;
      if (target.closest("button")) {
        return;
      }
      createBubbles(e.clientX, e.clientY);
    },
    [createBubbles]
  );

  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      // 터치된 요소가 버튼이 아닌 경우에만 버블 생성
      const target = e.target as HTMLElement;
      if (target.closest("button")) {
        return;
      }
      const touch = e.touches[0];
      createBubbles(touch.clientX, touch.clientY);
    },
    [createBubbles]
  );

  return (
    <div
      className="absolute inset-0 pointer-events-auto cursor-pointer z-10 overflow-hidden"
      onClick={handleClick}
      onTouchStart={handleTouch}
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute pointer-events-none"
          style={{
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            width: bubble.size,
            height: bubble.size,
            animation: "bubbleFloat 3s ease-out forwards",
          }}
        >
          <img
            src={bubble.goblinType}
            alt="깨비"
            className="w-full h-full object-contain opacity-80"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BubbleAnimation;
