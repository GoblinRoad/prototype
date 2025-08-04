import type React from "react";
interface CourseMapSectionProps {
  location: string;
}

const CourseMapSection: React.FC<CourseMapSectionProps> = ({ location }) => {
  return (
    <div className="relative">
      <div className="h-80 bg-gray-200 flex items-center justify-center">
        <img
          src="https://i.ibb.co/LD87ykZh/map.png"
          alt="코스 지도"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <p className="text-white text-sm font-medium">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseMapSection;
