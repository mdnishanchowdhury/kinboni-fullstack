import { Skeleton } from "../ui/skeleton";

const TopSellingSkeleton = () => {
    return (
        <section className="px-4 lg:px-0 py-12 container mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8 pb-4 border-b border-slate-50">
                {/* Title ]]*/}
                <Skeleton className="h-8 w-64 mb-3 bg-slate-200" />
                {/* Subtitle ]] */}
                <Skeleton className="h-4 w-48 bg-slate-100" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                <div className="lg:w-1/3">
                    {/* Banner ] */}
                    <Skeleton className="h-[520px] w-full rounded-[2rem] bg-slate-100 ring-1 ring-slate-50" />
                </div>

                {/* Right Side Product Lists Skeleton */}
                <div className="lg:w-2/3 grid md:grid-cols-2 gap-10">
                    {/* Top Rated Women Column */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <Skeleton className="h-6 w-40 bg-slate-200" />
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-8 rounded-md bg-slate-100" />
                                <Skeleton className="h-8 w-8 rounded-md bg-slate-100" />
                            </div>
                        </div>
                        {[1, 2, 3].map((i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>

                    {/* Top Rated Men Column */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <Skeleton className="h-6 w-40 bg-slate-200" />
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-8 rounded-md bg-slate-100" />
                                <Skeleton className="h-8 w-8 rounded-md bg-slate-100" />
                            </div>
                        </div>
                        {[1, 2, 3].map((i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProductCardSkeleton = () => (
    <div className="flex gap-4 p-3 border border-slate-50 rounded-2xl bg-white shadow-sm">
        {/* Product Image */}
        <Skeleton className="h-24 w-24 rounded-xl flex-shrink-0 bg-slate-100 ring-1 ring-slate-50" />

        <div className="flex-1 space-y-3">
            <div className="flex justify-between items-start">
                {/* Badge/Tag */}
                <Skeleton className="h-4 w-16 bg-slate-200 rounded" />
                {/* Timer/Small info */}
                <Skeleton className="h-3 w-12 bg-slate-50 rounded" />
            </div>

            {/* Product Title */}
            <Skeleton className="h-5 w-full bg-slate-100 rounded" />

            {/* Rating */}
            <Skeleton className="h-3 w-24 bg-slate-50 rounded" />

            <div className="flex justify-between items-center pt-1">
                {/* Price */}
                <Skeleton className="h-6 w-16 bg-slate-200 rounded" />
                {/* Cart Button */}
                <Skeleton className="h-9 w-9 rounded-full bg-slate-100" />
            </div>
        </div>
    </div>
);

export default TopSellingSkeleton;