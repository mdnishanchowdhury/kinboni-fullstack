"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ProductCard } from "./ProductCard/ProductCard";
import CartDrawer from "./Cart/CartDrawer";
import ProductSkeleton from "../../../Skeleton/ProductSkeleton";
import { Product, ProductResponse } from "../../../../types/product.types";

interface ProductGridProps {
    products: ProductResponse;
    isLoading?: boolean;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [activeCartItem, setActiveCartItem] = useState<Product | null>(null);

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12">
                {[...Array(8)].map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!products?.data || products.data.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">No products found.</p>
            </div>
        );
    }

    return (
        <div className="relative">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12"
            >
                {products.data.map((product, index) => (
                    <motion.div key={product.id || index} variants={itemVariants}>
                        <ProductCard
                            productData={product}
                            setIsCartOpen={setIsCartOpen}
                            setActiveCartItem={setActiveCartItem}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                item={activeCartItem}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
}