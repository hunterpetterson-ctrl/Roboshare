"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, User, Settings, Globe, Accessibility, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { DonateTimeModal } from "@/components/interface/DonateTimeModal";
import { ListRobotModal } from "@/components/listings/ListRobotModal";

export function TopNav() {
    const pathname = usePathname();
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [showListRobotModal, setShowListRobotModal] = useState(false);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-card sticky top-0 z-30 w-full shadow-sm">
            <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-lg font-bold">R</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">RoboShare</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">Beta</span>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
                <Link
                    href="/"
                    className={`px-2 py-1 transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                    Browse
                </Link>
                <Link
                    href="/my-robots"
                    className={`px-2 py-1 transition-colors hover:text-primary ${pathname === '/my-robots' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                    My Robots
                </Link>
                <Link
                    href="/wallet"
                    className={`px-2 py-1 transition-colors hover:text-primary ${pathname === '/wallet' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                    Wallet
                </Link>

                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => setShowDonateModal(true)}
                >
                    <Gift className="w-3.5 h-3.5" />
                    Donate Time
                </Button>
                <Button size="sm" onClick={() => setShowListRobotModal(true)}>List a Robot</Button>

                <div className="ml-2 pl-4 border-l">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-muted">
                                <User className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Globe className="mr-2 h-4 w-4" />
                                            <span>Language (English)</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Accessibility className="mr-2 h-4 w-4" />
                                            <span>Accessibility Options</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            <DonateTimeModal
                isOpen={showDonateModal}
                onClose={() => setShowDonateModal(false)}
            />
            <ListRobotModal
                isOpen={showListRobotModal}
                onClose={() => setShowListRobotModal(false)}
            />
        </header>
    );
}
