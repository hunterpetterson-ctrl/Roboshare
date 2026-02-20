"use client";

import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonateTimeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Gift className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Donate Robot Time</h3>
                        <p className="text-sm text-muted-foreground">Help your community get things done</p>
                    </div>
                </div>

                <p className="text-sm text-foreground/80">
                    Donate unused robot hours to community members who need them. Your contribution helps reduce the need for individual robot ownership.
                </p>

                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Hours to Donate</label>
                        <input
                            type="number"
                            defaultValue={1}
                            min={1}
                            max={24}
                            className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Robot Type Preference</label>
                        <select className="w-full border rounded-lg px-3 py-2 text-sm bg-background">
                            <option>Any Robot</option>
                            <option>Humanoid</option>
                            <option>Aerial</option>
                            <option>Quadruped</option>
                            <option>Industrial</option>
                            <option>Agricultural</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Message (optional)</label>
                        <textarea
                            placeholder="Who should this benefit? Any specific task?"
                            className="w-full border rounded-lg px-3 py-2 text-sm bg-background resize-none h-20"
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => {
                        alert("🎉 Thank you for donating robot time to your community!");
                        onClose();
                    }}>
                        Donate Time
                    </Button>
                </div>
            </div>
        </div>
    );
}
