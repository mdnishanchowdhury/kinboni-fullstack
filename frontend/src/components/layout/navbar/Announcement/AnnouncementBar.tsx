"use client";

import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AnnouncementBarProps {
    isSellerMode: boolean;
}

export default function AnnouncementBar({ isSellerMode }: AnnouncementBarProps) {
    if (isSellerMode) return null;

    return (
        <div className="w-full bg-green-500 font-DM">
            <div className="max-w-[1440px] mx-auto py-2 px-2 md:px-0 flex items-center justify-between text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">

                {/* Left Side */}
                <div className="flex items-center gap-4 flex-1">
                    <span className="italic text-lg tracking-tighter">
                        KINBONI.com
                    </span>
                    <p className="hidden md:block ml-2 opacity-90">
                        Up to 20% off 8M+ hot picks
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-white hover:bg-white/10 hover:text-white p-0 h-auto font-bold uppercase"
                    >
                        <Link href="/explore" className="flex items-center gap-1">
                            Explore now <HiArrowRight className="text-sm" />
                        </Link>
                    </Button>

                    {/* Countdown Timer */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-green-100 font-medium normal-case mr-1">Starts in</span>
                        <div className="flex items-center gap-1">
                            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm tabular-nums">47</span>
                            <span className="animate-pulse">:</span>
                            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm tabular-nums">53</span>
                            <span className="animate-pulse">:</span>
                            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm tabular-nums">42</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}