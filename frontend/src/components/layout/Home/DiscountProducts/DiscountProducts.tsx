"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import BigDiscountBanner from "./BigDiscountBanner";
import DiscountProductCard from "./DiscountProductCard";
import { filterFlashDeals } from "../../../../utils/filterFlashDeals";
import { DiscountHeader } from "./DiscountHeader";
import { NoDealsState } from "./NoDealsState";
import { Product } from "../../../../types/product.types";
import DiscountProductsSkeleton from "../../../Skeleton/DiscountSkeleton";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface TopSellingProps {
    products: Product[];
    isLoading?: boolean;
}


export default function DiscountProducts({ products, isLoading }: TopSellingProps) {

    const allProducts = useMemo(() => products || [], [products]);

    const hotDeals = useMemo(() => filterFlashDeals(allProducts), [allProducts]);

    const maxDiscount = useMemo(() => {
        if (hotDeals.length === 0) return "10";
        const discounts = hotDeals.map((p) => p.pricing?.discountPercent || 0);
        return Math.max(...discounts).toString();
    }, [hotDeals]);

    if (isLoading) {
        return <DiscountProductsSkeleton />;
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