"use client";

import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Stop = {
  name: string;
  lat: number;
  lng: number;
};

const STOPS: Stop[] = [
  { name: "Madrid", lat: 40.4167279, lng: -3.7032905 },
  { name: "San Sebastián", lat: 43.318237, lng: -1.9817051 },
  { name: "Bilbao", lat: 43.2633799, lng: -2.9348121 },
];

const ACCENT = "#e2451f";

export default function RealMap() {
  const path: [number, number][] = STOPS.map((s) => [s.lat, s.lng]);

  return (
    <div className="border-2 border-[var(--ink)] h-72 sm:h-96 relative z-0">
      <MapContainer
        bounds={path}
        boundsOptions={{ padding: [32, 32] }}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={path} pathOptions={{ color: ACCENT, weight: 3, dashArray: "8 6" }} />
        {STOPS.map((stop) => (
          <CircleMarker
            key={stop.name}
            center={[stop.lat, stop.lng]}
            radius={8}
            pathOptions={{ color: "#faf9f5", weight: 2, fillColor: ACCENT, fillOpacity: 1 }}
          >
            <Tooltip permanent direction="top" offset={[0, -8]} className="!font-heading !font-bold">
              {stop.name}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
