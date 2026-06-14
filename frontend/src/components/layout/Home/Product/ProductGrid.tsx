"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard/ProductCard";
import CartDrawer from "./Cart/CartDrawer";
import ProductSkeleton from "../../../Skeleton/ProductSkeleton";
import { Product } from "@/types/product.types";

interface ProductGridProps {
    products: Product[];
    isLoading: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [activeCartItem, setActiveCartItem] = useState<Product | null>(null);
console.log("Products in ProductGrid:", products);
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12">
                {[...Array(8)].map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">No products found.</p>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12 items-stretch">
                {products.map((product) => (
                    <div key={product.id} className="h-full">
                        <ProductCard
                            productData={product}
                            setIsCartOpen={setIsCartOpen}
                            setActiveCartItem={setActiveCartItem}
                        />
                    </div>
                ))}
            </div>

            <CartDrawer
                isOpen={isCartOpen}
                item={activeCartItem}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
}