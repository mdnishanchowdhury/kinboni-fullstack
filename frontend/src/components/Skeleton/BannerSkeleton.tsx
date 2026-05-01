import { Skeleton } from "../ui/skeleton";


export function BannerSkeleton() {
    return (
        <div className="flex gap-6 w-full h-[400px] max-w-[1440px] mx-auto p-4 md:p-0 bg-white">

            {/* Left Sidebar Skeleton */}
            <div className="hidden md:flex flex-col gap-3 w-1/4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="h-10 w-full rounded-lg bg-slate-100 animate-pulse"
                    />
                ))}
            </div>

            {/* Main Banner Skeleton */}
            <div className="relative flex-1 h-full overflow-hidden rounded-2xl">
                <Skeleton className="h-full w-full bg-slate-100 animate-pulse" />

                {/* Navigation Buttons (Arrows) */}
                <div className="absolute inset-y-0 left-4 flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <Skeleton className="h-2 w-10 rounded-full bg-slate-100 animate-pulse" />
                    <Skeleton className="h-2.5 w-2.5 rounded-full bg-slate-100 animate-pulse" />
                    <Skeleton className="h-2.5 w-2.5 rounded-full bg-slate-100 animate-pulse" />
                </div>
            </div>
        </div>
    );
}