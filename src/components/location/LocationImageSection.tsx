import type React from "react";

interface LocationImageSectionProps {
  imageUrl: string;
  name: string;
  address: string;
}

const LocationImageSection: React.FC<LocationImageSectionProps> = ({ 
  imageUrl, 
  name, 
  address 
}) => {
  return (
    <div className="relative">
      <div className="h-80 bg-gray-200 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <div>
            <p className="text-white text-lg font-semibold">{name}</p>
            <p className="text-white text-sm opacity-90">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationImageSection;
