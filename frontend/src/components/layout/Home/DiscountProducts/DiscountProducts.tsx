"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import BigDiscountBanner from "./BigDiscountBanner";
import DiscountProductCard from "./DiscountProductCard";
import { filterFlashDeals } from "../../../../utils/filterFlashDeals";
import { DiscountHeader } from "./DiscountHeader";
import { NoDealsState } from "./NoDealsState";
import { Product } from "../../../../types/product.types";
import DiscountProductsSkeleton from "../../../Skeleton/DiscountSkeleton";
import { Button } from "../../../ui/button";
import { useProducts } from "@/hooks/useProduct";

export default function DiscountProducts() {
    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const limit = 12;

    const { data, isLoading, isFetching } = useProducts({ page, limit });

    useEffect(() => {
        if (data && (data as any)?.products) {
            const newProducts = (data as any).products;
            setAllProducts((prev) => {
                const combined = page === 1 ? newProducts : [...prev, ...newProducts];
                const unique = Array.from(new Map(combined.map(p => [p.id, p])).values());
                return unique as Product[];
            });
        }
    }, [data, page]);

    const hotDeals = useMemo(() => filterFlashDeals(allProducts), [allProducts]);

    const totalProducts = (data as any)?.meta?.totalProducts || 0;
    const hasMore = allProducts.length < totalProducts;

    const maxDiscount = useMemo(() => {
        if (hotDeals.length === 0) return "0";
        const discounts = hotDeals.map((p) => p.timer?.flashDiscount || 0);
        return Math.max(...discounts).toString();
    }, [hotDeals]);

    if (isLoading && allProducts.length === 0) return <DiscountProductsSkeleton />;

    return (
        <section className="bg-white py-12 px-4 lg:px-0 container mx-auto">
            <BigDiscountBanner
                discountAmount={maxDiscount}
                collectionName="LIMITED FLASH SALE"
                title="Exclusive Summer Fashion Style"
            />

            <div className="mt-16">
                <DiscountHeader label={hotDeals[0]?.timer?.timerLabel || "Limited Offers"} />

                {
                    hotDeals.length > 0 ? (
                        <>
                            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {hotDeals.map((singleProduct) => (
                                    <DiscountProductCard key={singleProduct.id} product={singleProduct} />
                                ))}
                            </motion.div>

                            {
                                hasMore && hotDeals.length >= 12 && (
                                    <div className="flex justify-center mt-12">
                                        <Button
                                            onClick={() => setPage(p => p + 1)}
                                            disabled={isFetching}
                                            className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-black transition-all"
                                        >
                                            {isFetching ? "Searching for more deals..." : "Load More Products"}
                                        </Button>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <NoDealsState />
                    )
                }
            </div>
        </section>
    );
}