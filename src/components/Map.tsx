"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapProps {
  position: [number, number] | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

const Map = ({ position, onLocationSelect }: MapProps) => {
  const customIcon = L.icon({
    iconUrl: "/map-pin.svg",
    iconSize: [24, 24], 
    iconAnchor: [12, 24], 
  });

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelect(lat, lng);
      },
    });
    return null;
  };

  return (
    <div id="map-container" style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[-6.2088, 106.8456]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents />
        {position && <Marker position={position} icon={customIcon} />}
      </MapContainer>
    </div>
  );
};

export default Map;
