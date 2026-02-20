"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { type Robot } from "@/types";

interface MapComponentProps {
    robots: Robot[];
    className?: string; // allow custom classes for sizing
}

export default function MapComponent({ robots, className }: MapComponentProps) {
    const Map = useMemo(
        () =>
            dynamic(() => import("./Map"), {
                loading: () => <div className="h-full w-full min-h-[400px] bg-muted animate-pulse flex items-center justify-center text-muted-foreground">Loading Map...</div>,
                ssr: false,
            }),
        []
    );

    return <Map robots={robots} className={className} />;
}
