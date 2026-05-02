import { Skeleton } from "../ui/skeleton";


export default function ProductSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-100 rounded-3xl bg-white shadow-sm">
            {/* Image Skeleton */}
            <Skeleton className="h-48 w-full rounded-2xl bg-slate-100" />

            <div className="space-y-3">
                {/* Category & Badge Skeleton */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20 bg-slate-100" />
                    <Skeleton className="h-5 w-12 rounded-full bg-slate-100" />
                </div>

                {/* Title Skeleton */}
                <Skeleton className="h-6 w-3/4 bg-slate-100" />

                {/* Rating & Stock Skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16 bg-slate-100" />
                    <Skeleton className="h-4 w-24 bg-slate-100" />
                </div>

                {/* Price & Add to Cart Skeleton */}
                <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                        <Skeleton className="h-6 w-16 bg-slate-100" />
                        <Skeleton className="h-4 w-10 bg-slate-100" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full bg-slate-100" />
                </div>
            </div>
        </div>
    );
}