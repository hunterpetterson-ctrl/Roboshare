"use client";

import { useEffect, useState } from "react";
import { type LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Robot } from "@/types";
import { RobotCard } from "@/components/listings/RobotCard";

// Fix for default marker icons in Leaflet with Next.js/Webpack
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    robots: Robot[];
    className?: string;
}

const DEFAULT_CENTER: LatLngTuple = [37.7749, -122.4194]; // San Francisco

function ChangeView({ center, zoom }: { center: LatLngTuple; zoom: number }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function Map({ robots, className }: MapProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-full w-full bg-muted animate-pulse rounded-lg" />;

    return (
        <MapContainer
            center={DEFAULT_CENTER}
            zoom={13}
            scrollWheelZoom={true}
            className={`h-full w-full rounded-lg z-0 relative ${className}`}
            style={{ minHeight: "400px", height: "100%" }}
        >
            <ChangeView center={DEFAULT_CENTER} zoom={13} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {robots.map((robot) => (
                <Marker
                    key={robot.id}
                    position={robot.coordinates as LatLngTuple}
                >
                    <Popup className="min-w-[300px]">
                        <div className="p-1">
                            <h3 className="font-bold text-lg mb-1">{robot.name}</h3>
                            <p className="text-sm mb-2">{robot.description.slice(0, 50)}...</p>
                            <button className="bg-primary text-white px-3 py-1 rounded text-sm w-full">
                                View Details (${robot.hourly_rate}/hr)
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
