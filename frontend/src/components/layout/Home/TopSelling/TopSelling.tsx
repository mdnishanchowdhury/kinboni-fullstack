"use client";

import { useMemo } from 'react';
import { motion } from "framer-motion";
import TopSellingBanner from './TopSellingBanner';
import ProductListContainer from './ProductListContainer';
import { Product } from '../../../../types/product.types';
import TopSellingSkeleton from '../../../Skeleton/TopSellingSkeleton';

interface TopSellingProps {
    products: Product[];
    isLoading?: boolean;
}

const TopSelling = ({ products, isLoading }: TopSellingProps) => {

    const maxDiscount = useMemo(() => {
        if (!products || products.length === 0) return "10";
        const discounts = products.map(p => p.pricing?.discountPercent || 0);
        return Math.max(...discounts).toString();
    }, [products]);

    const topWomen = useMemo(() =>
        products
            .filter(item => ["women", "female"].includes(item.gender?.toLowerCase() || ""))
            .sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0)),
        [products]
    );

    const topMen = useMemo(() =>
        products
            .filter(item => ["men", "male"].includes(item.gender?.toLowerCase() || ""))
            .sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0)),
        [products]
    );

    if (isLoading) {
        return <TopSellingSkeleton />;
    }
    if (!products || products.length === 0) return null;

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
};

export default TopSelling;