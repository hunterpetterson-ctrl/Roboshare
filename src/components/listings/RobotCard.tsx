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
import { MapPin, Battery, Clock, ChevronLeft } from "lucide-react";
import { FractionalSlider } from "@/components/interface/FractionalSlider";

interface RobotCardProps {
    robot: Robot;
}

export function RobotCard({ robot }: RobotCardProps) {
    const [isBooking, setIsBooking] = useState(false);

    return (
        <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {!isBooking ? (
                <>
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <img
                                src={robot.image_url || "/placeholder-robot.png"}
                                alt={robot.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ${robot.hourly_rate}/hr
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>{robot.name}</span>
                            <span className="text-sm font-normal text-muted-foreground border px-2 py-0.5 rounded-full">
                                {robot.type}
                            </span>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>2.5 miles away</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-foreground/80 line-clamp-2 mb-4">
                            {robot.description}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Battery className="w-3 h-3 text-green-500" />
                                <span>98%</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-500" />
                                <span>Available Now</span>
                            </div>
                            <div className="flex items-center gap-1 font-semibold text-primary">
                                <span>{robot.fractional_availability * 10} shares left</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button className="flex-1" variant="outline">Details</Button>
                        <Button className="flex-1" onClick={() => setIsBooking(true)}>Rent</Button>
                    </CardFooter>
                </>
            ) : (
                <div className="p-6 h-full flex flex-col">
                    <div className="mb-4">
                        <Button variant="ghost" size="sm" onClick={() => setIsBooking(false)} className="-ml-2">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                        <h3 className="text-lg font-bold mt-2">Rent {robot.name}</h3>
                        <p className="text-sm text-muted-foreground">Adjust your share</p>
                    </div>

                    <div className="flex-1">
                        <FractionalSlider
                            totalShares={10}
                            hourlyRate={robot.hourly_rate}
                            onShareChange={(val) => console.log(val)}
                        />
                    </div>
                </div>
            )}
        </Card>
    );
}
