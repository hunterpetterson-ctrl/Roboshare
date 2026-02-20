"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyPlus, UploadCloud, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ListRobotModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);

    if (!isOpen) return null;

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-card rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CopyPlus className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">List a Robot</h3>
                        <p className="text-sm text-muted-foreground">Step {step} of 3</p>
                    </div>
                </div>

                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in">
                        <div className="space-y-2">
                            <Label>Robot Name</Label>
                            <Input placeholder="e.g. Garden Bot 3000" />
                        </div>
                        <div className="space-y-2">
                            <Label>Type / Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="humanoid">Humanoid</SelectItem>
                                    <SelectItem value="aerial">Aerial / Drone</SelectItem>
                                    <SelectItem value="quadruped">Quadruped</SelectItem>
                                    <SelectItem value="industrial">Industrial</SelectItem>
                                    <SelectItem value="agricultural">Agricultural</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder="What does this robot do?" className="h-24 resize-none" />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in">
                        <div className="space-y-2">
                            <Label>Photo</Label>
                            <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                                <UploadCloud className="w-8 h-8 mb-2" />
                                <p className="text-sm font-medium">Click to upload an image</p>
                                <p className="text-xs">PNG, JPG or WEBP (max 5MB)</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Base Location (City/Zip)</Label>
                            <Input placeholder="e.g. San Francisco, CA" />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in">
                        <div className="space-y-2">
                            <Label>Hourly Rental Rate ($)</Label>
                            <Input type="number" placeholder="45.00" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fractional Shares Available</Label>
                            <p className="text-xs text-muted-foreground mb-2">How much of this robot are you offering for cooperative ownership and cost-splitting?</p>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select share percentage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10%</SelectItem>
                                    <SelectItem value="20">20%</SelectItem>
                                    <SelectItem value="30">30%</SelectItem>
                                    <SelectItem value="40">40%</SelectItem>
                                    <SelectItem value="50">50%</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-start gap-3 mt-4">
                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold mb-1">Ready to List!</p>
                                <p>By listing this robot, you agree to the RoboShare terms of service and verify that you are the legal owner.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-3 justify-end mt-8">
                    {step > 1 && (
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                    )}
                    {step < 3 ? (
                        <Button onClick={handleNext}>Next Step</Button>
                    ) : (
                        <Button onClick={() => {
                            alert("🎉 Your robot has been submitted for listing!");
                            setStep(1);
                            onClose();
                        }}>
                            Finish & List
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
