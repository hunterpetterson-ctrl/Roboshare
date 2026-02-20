"use client";

import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FractionalSliderProps {
    totalShares?: number; // default 10
    hourlyRate: number;
    onShareChange: (shares: number) => void;
}

export function FractionalSlider({ totalShares = 10, hourlyRate, onShareChange }: FractionalSliderProps) {
    const [selectedShares, setSelectedShares] = useState(1);

    const cost = useMemo(() => {
        return (hourlyRate / totalShares) * selectedShares;
    }, [hourlyRate, totalShares, selectedShares]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setSelectedShares(val);
        onShareChange(val);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Fractional Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-between text-sm">
                    <span>Target: {selectedShares}/{totalShares} shares</span>
                    <span className="font-bold">${cost.toFixed(2)}/hr</span>
                </div>

                <input
                    type="range"
                    min="1"
                    max={totalShares}
                    step="1"
                    value={selectedShares}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min (10%)</span>
                    <span>Max (100%)</span>
                </div>

                <div className="pt-2">
                    <Button className="w-full">
                        Confirm {selectedShares} Share{selectedShares > 1 ? 's' : ''}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
