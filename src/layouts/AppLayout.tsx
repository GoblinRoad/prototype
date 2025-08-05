import type React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import BottomNavigation from "@/components/global/BottomNavigation";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isCertificationPage = location.pathname === "/certification";

  // 라우트 변경 시 스크롤 초기화
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <main
        ref={mainRef}
        className={`flex-1 max-w-md mx-auto w-full ${
          isCertificationPage ? "overflow-hidden" : "overflow-y-auto pb-20"
        }`}
      >
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
