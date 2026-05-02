import { Skeleton } from "../ui/skeleton";


export default function DiscountSkeleton() {
  return (
    <div className="flex flex-row items-center gap-4 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm min-h-[180px]">
      
      {/* Left side: Image & Badge Skeleton */}
      <div className="relative w-1/3 aspect-square rounded-2xl bg-slate-100 overflow-hidden shrink-0">
        <Skeleton className="absolute top-2 left-2 h-5 w-12 rounded-sm bg-slate-100" />
        <Skeleton className="w-full h-full animate-pulse bg-slate-100" />
      </div>

      {/* Right side*/}
      <div className="flex-1 space-y-3">
        
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28 bg-slate-100 rounded" />
          <Skeleton className="h-4 w-20 bg-slate-100 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-full bg-slate-100 rounded" />
          <Skeleton className="h-5 w-2/3 bg-slate-100 rounded" />
        </div>

        {/* Ratings */}
        <Skeleton className="h-3 w-24 bg-slate-100 rounded" />

        {/* Pricing & Cart Button Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-7 w-16 bg-slate-100 rounded" />
            <Skeleton className="h-4 w-10 bg-slate-100 rounded" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full bg-emerald-100" />
        </div>

        {/* Stock Progress Bar */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-20 bg-slate-100 rounded" />
          <Skeleton className="h-1.5 w-full bg-slate-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}