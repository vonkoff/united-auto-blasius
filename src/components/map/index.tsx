// components/map/index.tsx
"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  pos: LatLngExpression;
  zoom?: number;
}

const defaultSettings = {
  zoom: 14,
};

export default function Map({ pos, zoom = defaultSettings.zoom }: MapProps) {
  // Clean up function to handle map container
  useEffect(() => {
    return () => {
      const mapContainer = document.querySelector(".leaflet-container");
      if (mapContainer) {
        (mapContainer as any)._leaflet_id = null;
      }
    };
  }, []);

  return (
    <MapContainer
      key={Array.isArray(pos) ? `${pos[0]}-${pos[1]}` : `${pos.lat}-${pos.lng}`}
      center={pos}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker
        position={pos}
        eventHandlers={{
          click: () => {
            const lat = Array.isArray(pos) ? pos[0] : pos.lat;
            const lng = Array.isArray(pos) ? pos[1] : pos.lng;
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
              "_blank",
            );
          },
        }}
      />
    </MapContainer>
  );
}
