import type React from "react";
import { MapPin, Navigation } from "lucide-react";

interface CourseMapSectionProps {
  location: string;
}

const CourseMapSection: React.FC<CourseMapSectionProps> = ({ location }) => {
  return (
    <div className="relative">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src="https://i.ibb.co/LD87ykZh/map.png"
          alt="코스 지도"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <p className="text-white text-sm font-medium">{location}</p>
        </div>
      </div>
      <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
        <Navigation className="w-5 h-5 text-emerald-600" />
      </button>
    </div>
  );
};

export default CourseMapSection;
