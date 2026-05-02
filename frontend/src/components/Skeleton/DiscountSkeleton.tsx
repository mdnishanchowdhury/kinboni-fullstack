import { Skeleton } from "../ui/skeleton";

export default function DiscountProductsSkeleton() {
  return (
    <section className="bg-white py-12 px-4 lg:px-0 container mx-auto">
      {/* Big Discount Banner Skeleton */}
      <Skeleton className="w-full h-[350px] bg-slate-100 rounded-[3rem] mb-16 ring-1 ring-slate-50" />

      <div className="mt-16">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
          <div className="space-y-3">
            {/* Title - Slate 200 for emphasis */}
            <Skeleton className="h-10 w-48 bg-slate-200 rounded-lg" />
            <Skeleton className="h-4 w-32 bg-slate-100 rounded" />
          </div>
          {/* Timer/Button Placeholder */}
          <Skeleton className="h-12 w-40 bg-slate-100 rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <DiscountCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const DiscountCardSkeleton = () => {
  return (
    <div className="flex flex-row items-center gap-4 bg-white rounded-3xl p-4 border border-slate-50 shadow-sm min-h-[180px]">
      {/* Left side: Image & Badge */}
      <div className="relative w-1/3 aspect-square rounded-2xl bg-slate-100 overflow-hidden shrink-0 ring-1 ring-slate-50">

      </div>

      {/* Right side: Content */}
      <div className="flex-1 space-y-3">

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28 bg-slate-100 rounded" />
          <Skeleton className="h-4 w-16 bg-slate-50 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-full bg-slate-100 rounded" />
          <Skeleton className="h-5 w-2/3 bg-slate-100 rounded" />
        </div>

        {/* Ratings */}
        <Skeleton className="h-3 w-24 bg-slate-50 rounded" />

        {/* Pricing & Cart Button Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-7 w-16 bg-slate-200 rounded" />
            <Skeleton className="h-4 w-10 bg-slate-100 rounded" />
          </div>
          {/* Cart button matches your UI style */}
          <Skeleton className="h-10 w-10 rounded-full bg-slate-100 border border-slate-50" />
        </div>

        {/* Stock Progress Bar */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-20 bg-slate-50 rounded" />
          <Skeleton className="h-1.5 w-full bg-slate-100 rounded-full" />
        </div>
      </div>
    </div>
  );
};