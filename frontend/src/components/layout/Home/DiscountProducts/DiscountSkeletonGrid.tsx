import DiscountSkeleton from "../../../Skeleton/DiscountSkeleton";


export const DiscountSkeletonGrid = () => (
    <div className="mt-16">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => <DiscountSkeleton key={i} />)}
        </div>
    </div>
);