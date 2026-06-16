"use client";

import { useMemo } from 'react';
import { motion } from "framer-motion";
import TopSellingBanner from './TopSellingBanner';
import ProductListContainer from './ProductListContainer';
import TopSellingSkeleton from '../../../Skeleton/TopSellingSkeleton';
import { Product } from "@/types/product.types";
import { useProductsList } from '@/hooks/useProductsList';

export default function TopSelling() {
    const { data: products, isLoading } = useProductsList();

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

    const maxDiscount = useMemo(() => {
        if (allProducts.length === 0) return "10";
        const discounts = allProducts.map((p: Product) => p.pricing?.discountPercent || 0);
        return Math.max(...discounts).toString();
    }, [allProducts]);

    const topWomen = useMemo(() =>
        allProducts
            .filter((item: Product) => ["women", "female"].includes(item.gender?.toLowerCase() || ""))
            .sort((a: Product, b: Product) => (b.ratings?.average || 0) - (a.ratings?.average || 0)),
        [allProducts]
    );

    const topMen = useMemo(() =>
        allProducts
            .filter((item: Product) => ["men", "male"].includes(item.gender?.toLowerCase() || ""))
            .sort((a: Product, b: Product) => (b.ratings?.average || 0) - (a.ratings?.average || 0)),
        [allProducts]
    );

    if (isLoading) {
        return <TopSellingSkeleton />;
    }

    if (allProducts.length === 0) return null;

    return (
        <section className="px-4 lg:px-0 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
            >
                <h2 className="text-2xl font-bold text-gray-900 uppercase">Top Selling Products</h2>
                <p className="text-gray-500 text-sm">Flat {maxDiscount}% OFF on latest trends! 🔥</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6">
                <TopSellingBanner maxDiscount={maxDiscount} />

                <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
                    <ProductListContainer title="Top Rated Women" allItems={topWomen} />
                    <ProductListContainer title="Top Rated Men" allItems={topMen} />
                </div>
            </div>
        </section>
    );
}