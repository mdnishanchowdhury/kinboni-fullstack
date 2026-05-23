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

export default function DiscountProducts({ products, isLoading }) {

    const allProducts = useMemo((): Product[] => {
        if (!products) return [];

        if (Array.isArray(products)) return products as Product[];

        if (
            typeof products === "object" &&
            products !== null &&
            "data" in products &&
            Array.isArray((products as any).data)
        ) {
            return (products as any).data as Product[];
        }

        return [];
    }, [products]);

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

                {
                    hotDeals.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {hotDeals.map((singleProduct) => (
                                <div key={singleProduct.id}>
                                    <DiscountProductCard product={singleProduct} />
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <NoDealsState />
                    )
                }
            </div>
        </section>
    );
}