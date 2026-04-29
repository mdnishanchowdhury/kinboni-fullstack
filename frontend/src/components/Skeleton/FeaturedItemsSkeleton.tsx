function FeaturedItemsSkeleton() {
    return (
        <section className="py-8 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-start justify-between mb-5">
                    <div className="space-y-2">
                        <div className="h-7 w-44 rounded-lg bg-slate-100 animate-pulse" />
                        <div className="h-4 w-56 rounded bg-slate-100 animate-pulse" />
                    </div>
                    <div className="flex gap-2 mt-1">
                        <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse" />
                        <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse" />
                    </div>
                </div>
                <div className="grid grid-rows-2 grid-flow-col gap-x-4 gap-y-6 overflow-hidden">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 w-[130px] md:w-[150px]">
                            <div className="w-full aspect-square rounded-[20px] bg-slate-100 animate-pulse" />
                            <div className="h-4 w-20 rounded bg-slate-100 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedItemsSkeleton;