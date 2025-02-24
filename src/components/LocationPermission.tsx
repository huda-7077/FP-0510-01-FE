"use client";

import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";

interface LocationPermissionProps {
  onLocationUpdate: (coordinates: { lat: number; lng: number } | null) => void;
  isUsingLocation: boolean;
}

export const LocationPermission = ({ 
  onLocationUpdate, 
  isUsingLocation 
}: LocationPermissionProps) => {
  const requestLocationAccess = () => {
    if (isUsingLocation) {
      onLocationUpdate(null);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationUpdate({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  };

  return (
    <Button 
      onClick={requestLocationAccess}
      variant={isUsingLocation ? "destructive" : "outline"}
      className="flex items-center gap-2"
    >
      {isUsingLocation ? (
        <>
          <X className="h-4 w-4" />
          Stop Using Location
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4" />
          Use My Location
        </>
      )}
    </Button>
  );
};
