"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import BigDiscountBanner from "./BigDiscountBanner";
import DiscountProductCard from "./DiscountProductCard";
import { useProducts } from "../../../../hooks/useProduct";
import { filterFlashDeals } from "../../../../utils/filterFlashDeals";
import DiscountSkeleton from "../../../Skeleton/DiscountSkeleton";
import { DiscountHeader } from "./DiscountHeader";
import { NoDealsState } from "./NoDealsState";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DiscountProducts() {
    const { data, isLoading } = useProducts();

    const allProducts = useMemo(() => data?.data || [], [data]);
    const hotDeals = useMemo(() => filterFlashDeals(allProducts), [allProducts]);

    const maxDiscount = useMemo(() => {
        if (hotDeals.length === 0) return "10";
        const discounts = hotDeals.map((p) => p.pricing?.discountPercent || 0);
        return Math.max(...discounts).toString();
    }, [hotDeals]);

    if (isLoading) {
        return (
            <section className="bg-white py-12 px-4 lg:px-0 container mx-auto">
                <div className="w-full h-[350px] bg-slate-100 animate-pulse rounded-[3rem] mb-16" />

                <div className="mt-16">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
                        <div className="space-y-3">
                            <div className="h-10 w-48 bg-slate-200 animate-pulse rounded-lg" />
                            <div className="h-4 w-32 bg-slate-100 animate-pulse rounded" />
                        </div>
                        <div className="h-12 w-40 bg-slate-100 animate-pulse rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <DiscountSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-12 px-4 lg:px-0 container mx-auto">
            <BigDiscountBanner
                discountAmount={maxDiscount}
                collectionName="LIMITED FLASH SALE"
                title="Exclusive Summer Fashion Style"
            />

            <div className="mt-16">
                <DiscountHeader
                    label={hotDeals[0]?.timer?.timerLabel || "Limited Offers"}
                />

                {hotDeals.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {hotDeals.map((singleProduct) => (
                            <motion.div key={singleProduct.id} variants={itemVariants}>
                                <DiscountProductCard product={singleProduct} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <NoDealsState />
                )}
            </div>
        </section>
    );
}