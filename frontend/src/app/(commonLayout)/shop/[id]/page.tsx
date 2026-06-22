"use client";

import { useParams, useRouter } from "next/navigation";
import { useProductsById } from "@/hooks/useProductsById";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import AIChat from "@/components/modules/ProductDetails/AIChat";
import ProductGallery from "@/components/modules/ProductDetails/ProductGallery";
import ProductActions from "@/components/modules/ProductDetails/ProductActions";
import ProductInfoChips from "@/components/modules/ProductDetails/ProductInfoChips";
import ProductHeader from "@/components/modules/ProductDetails/ProductHeader";
import ReviewSection from "@/components/modules/ProductReviews/ReviewSection";

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { data, isLoading, error } = useProductsById(id);

    const [activeImg, setActiveImg] = useState<string | null>(null);
    const [activeSize, setActiveSize] = useState<string | null>(null);
    const [qty, setQty] = useState(1);
    const [cartAdded, setCartAdded] = useState(false);

    if (isLoading)
        return (
            <div className="flex justify-center h-screen items-center">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            </div>
        );
    if (error) return <div className="text-center p-10 text-red-500">Error loading product!</div>;

    const product = (data as any)?.data || data;
    if (!product) return <div className="text-center p-20">Product not found!</div>;

    const displayImg = activeImg || product.media.thumbnail;
    const productContext = `${product.name} by ${product.brand.name}, ৳${product.currentPrice}, ${product.inventory.stock} in stock. ${product.description}`;

    const handleAddToCart = () => {
        setCartAdded(true);
        setTimeout(() => setCartAdded(false), 2500);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition mb-6 font-medium"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <ProductGallery product={product} displayImg={displayImg} setActiveImg={setActiveImg} />

                    <div className="flex flex-col gap-5">
                        <ProductHeader product={product} />

                        <div className="text-xs text-gray-500">
                            <span>Only {product.inventory.stock} left in stock</span>
                            <div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-red-400" style={{ width: `${Math.min((product.inventory.stock / 50) * 100, 100)}%` }} />
                            </div>
                        </div>

                        <ProductActions {...{ product, activeSize, setActiveSize, qty, setQty, handleAddToCart, cartAdded }} />

                        <ProductInfoChips product={product} />

                        <AIChat productContext={productContext} product={product} activeSize={activeSize} qty={qty} />
                    </div>
                </div>
                <ReviewSection />
            </div>

        </div>
    );
}