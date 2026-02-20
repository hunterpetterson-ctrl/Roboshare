"use client";

import { useState } from "react";
import { Robot } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Battery, Clock, ChevronLeft, Calendar, CreditCard, Check, Heart } from "lucide-react";
import { FractionalSlider } from "@/components/interface/FractionalSlider";

interface RobotCardProps {
    robot: Robot;
}

type CardView = "info" | "booking" | "schedule" | "confirm" | "success";

export function RobotCard({ robot }: RobotCardProps) {
    const [view, setView] = useState<CardView>("info");
    const [selectedShares, setSelectedShares] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDuration, setSelectedDuration] = useState(1);

    const costPerShare = robot.hourly_rate / 10;
    const totalCost = costPerShare * selectedShares * selectedDuration;

    const resetAndClose = () => {
        setView("info");
        setSelectedShares(1);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedDuration(1);
    };

    return (
        <Card className="w-full hover:shadow-lg transition-all duration-300 overflow-hidden">
            {view === "info" && (
                <>
                    <div className="relative h-44 w-full overflow-hidden bg-muted">
                        <img
                            src={robot.image_url || "/placeholder-robot.png"}
                            alt={robot.name}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                            ${robot.hourly_rate}/hr
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <div className="flex items-center gap-1 text-white text-xs">
                                <MapPin className="w-3 h-3" />
                                <span>2.5 miles away</span>
                            </div>
                        </div>
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between items-center text-base">
                            <span>{robot.name}</span>
                            <span className="text-xs font-normal text-muted-foreground border px-2 py-0.5 rounded-full">
                                {robot.type}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                        <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
                            {robot.description}
                        </p>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Battery className="w-3 h-3 text-green-500" />
                                <span>98%</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-500" />
                                <span>Available Now</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-0">
                        <Button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80" size="sm" onClick={() => setView("booking")}>
                            Share Cost
                        </Button>
                        <Button className="flex-1" size="sm" onClick={() => { setSelectedShares(10); setView("schedule"); }}>
                            Rent Whole
                        </Button>
                    </CardFooter>
                </>
            )}

            {view === "booking" && (
                <div className="p-5 space-y-4">
                    <div>
                        <Button variant="ghost" size="sm" onClick={resetAndClose} className="-ml-2 -mt-1">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                        <h3 className="text-lg font-bold mt-1">{robot.name}</h3>
                        <p className="text-sm text-muted-foreground">Select your share amount</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{selectedShares}/10 shares</span>
                            <span className="font-bold text-primary">${(costPerShare * selectedShares).toFixed(2)}/hr</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={selectedShares}
                            onChange={(e) => setSelectedShares(parseInt(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1/10 (10%)</span>
                            <span>10/10 (100%)</span>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                            <p>💡 <strong>Fractional sharing</strong>: You only pay for the capacity you need. {selectedShares === 1 ? "Perfect for small, occasional tasks." : selectedShares < 5 ? "Good balance of cost and capability." : "Maximum power for demanding jobs."}</p>
                        </div>
                    </div>

                    <Button className="w-full" onClick={() => setView("schedule")}>
                        <Calendar className="w-4 h-4 mr-2" /> Pick a Time
                    </Button>
                </div>
            )}

            {view === "schedule" && (
                <div className="p-5 space-y-4">
                    <div>
                        <Button variant="ghost" size="sm" onClick={() => setView("booking")} className="-ml-2 -mt-1">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                        <h3 className="text-lg font-bold mt-1">Schedule</h3>
                        <p className="text-sm text-muted-foreground">{selectedShares}/10 shares of {robot.name}</p>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Start Time</label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                            >
                                <option value="">Select a time</option>
                                {Array.from({ length: 12 }, (_, i) => {
                                    const hour = i + 7;
                                    const label = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 ${hour === 12 ? "PM" : "AM"}`;
                                    return <option key={hour} value={`${hour}:00`}>{label}</option>;
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Duration (hours)</label>
                            <div className="flex gap-2">
                                {[1, 2, 4, 8].map((d) => (
                                    <Button
                                        key={d}
                                        variant={selectedDuration === d ? "default" : "outline"}
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => setSelectedDuration(d)}
                                    >
                                        {d}h
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setView("confirm")}
                    >
                        <CreditCard className="w-4 h-4 mr-2" /> Review & Pay
                    </Button>
                </div>
            )}

            {view === "confirm" && (
                <div className="p-5 space-y-4">
                    <div>
                        <Button variant="ghost" size="sm" onClick={() => setView("schedule")} className="-ml-2 -mt-1">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                        <h3 className="text-lg font-bold mt-1">Confirm Booking</h3>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Robot</span>
                            <span className="font-medium">{robot.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shares</span>
                            <span className="font-medium">{selectedShares}/10</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Time</span>
                            <span className="font-medium">{selectedTime} ({selectedDuration}h)</span>
                        </div>
                        <hr className="my-2 border-border" />
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Rate per hour</span>
                            <span>${(costPerShare * selectedShares).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base">
                            <span>Total</span>
                            <span className="text-primary">${totalCost.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setView("schedule")}>Edit</Button>
                        <Button className="flex-1" onClick={() => setView("success")}>
                            Pay ${totalCost.toFixed(2)}
                        </Button>
                    </div>
                </div>
            )}

            {view === "success" && (
                <div className="p-5 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Booking Confirmed!</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {robot.name} is reserved for you on {selectedDate} at {selectedTime}
                        </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                        <p>🤖 You&apos;re using <strong>{selectedShares}/10 shares</strong> — saving {100 - selectedShares * 10}% vs renting the full robot!</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={resetAndClose}>
                        Browse More Robots
                    </Button>
                </div>
            )}
        </Card>
    );
}
