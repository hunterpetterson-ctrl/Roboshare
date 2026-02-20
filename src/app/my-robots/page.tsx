"use client";

import { MOCK_ROBOTS } from "@/data/robots";
import { RobotCard } from "@/components/listings/RobotCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MyRobots() {
    // Mock current user
    const currentUser = "user_1";
    const myRobots = MOCK_ROBOTS.filter(r => r.owner_id === currentUser);

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Robots</h1>
                        <p className="text-muted-foreground mt-1">Manage your listed robots and track their earnings.</p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        List a New Robot
                    </Button>
                </div>

                {myRobots.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myRobots.map(robot => (
                            <RobotCard key={robot.id} robot={robot} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed">
                        <h3 className="text-xl font-semibold mb-2">You haven't listed any robots yet</h3>
                        <p className="text-muted-foreground mb-6">Start sharing your robots with the community and earn passive income.</p>
                        <Button>List a Robot</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
