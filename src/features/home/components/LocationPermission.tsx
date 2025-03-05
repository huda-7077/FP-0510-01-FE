import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

interface LocationPermissionProps {
  onLocationUpdate: (coordinates?: { lat: number; lng: number }) => void;
  isUsingLocation: boolean;
}

export const LocationPermission: React.FC<LocationPermissionProps> = ({ 
  onLocationUpdate, 
  isUsingLocation 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          onLocationUpdate({ lat, lng });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          onLocationUpdate(undefined);
          setIsLoading(false);
        }
      );
    } else {
      onLocationUpdate(undefined);
      setIsLoading(false);
    }
  };

  const handleClearLocation = () => {
    onLocationUpdate(undefined);
  };

  return (
    <div className="flex items-center gap-4">
      {!isUsingLocation ? (
        <Button 
          variant="outline" 
          onClick={handleGetLocation} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          {isLoading ? "Finding Location..." : "Use My Location"}
        </Button>
      ) : (
        <div className="flex items-center gap-2 text-[#0A65CC]">
          <MapPin className="h-5 sm:h-6" />
          <span>Nearby Jobs</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearLocation}
            className="text-red-500 hover:text-red-700"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};