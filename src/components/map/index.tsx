"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

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

const Map = ({ pos, zoom = defaultSettings.zoom }: MapProps) => {
  const latitude = Array.isArray(pos) ? pos[0] : pos.lat;
  const longitude = Array.isArray(pos) ? pos[1] : pos.lng;
  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <MapContainer
      center={pos}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {/* <Marker position={pos}> */}
      {/*   <Popup> */}
      {/*     United Auto Sales & Service */}
      {/*     <br /> */}
      {/*     219 Congress Ave, Waterbury, CT 06708 */}
      {/*   </Popup> */}
      {/* </Marker> */}
      <Marker
        position={pos}
        eventHandlers={{
          click: () => {
            window.open(mapUrl, "_blank");
          },
        }}
      />
    </MapContainer>
  );
};

export default Map;
