"use client";

import { useState } from "react";
import { ShoppingCart, Bolt } from "lucide-react";

export default function ProductActions({
    product, qty, setQty, handleAddToCart, cartAdded
}: any) {

    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

    const total = product.currentPrice * qty;

    const toggleSelectSize = (variantId: string, size: string) => {
        setSelectedVariants(prev => {
            const currentSelected = prev[variantId];
            if (currentSelected === size) {
                const newState = { ...prev };
                delete newState[variantId];
                return newState;
            } else {
                return {
                    ...prev,
                    [variantId]: size
                };
            }
        });
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Variants*/}
            {
                product.variants.map((v: any) => (
                    <div key={v.id}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            {v.name}
                            {selectedVariants[v.id] && (
                                <span className="ml-2 text-indigo-600 font-bold">: {selectedVariants[v.id]}</span>
                            )}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {
                                v.sizes.map((s: string) => (
                                    <button
                                        key={s}
                                        onClick={() => toggleSelectSize(v.id, s)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition ${selectedVariants[v.id] === s
                                                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                                : "border-gray-200 text-gray-700 hover:border-indigo-400"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                ))
            }

            {/* Quantity & Total Price */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 font-medium">Quantity</span>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button onClick={() => setQty((q: number) => Math.max(1, q - 1))} className="w-9 h-9 text-gray-600 hover:bg-gray-100">−</button>

                        <span className="w-10 text-center text-sm font-semibold">{qty}</span>

                        <button onClick={() => setQty((q: number) => Math.min(10, q + 1))} className="w-9 h-9 text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-xs text-gray-500">Total Price</p>
                    <span className="text-lg font-bold text-gray-900">৳{total.toLocaleString()}</span>
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button onClick={handleAddToCart} className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${cartAdded ? "bg-green-500 text-white" : "bg-green-500 text-white hover:bg-black"}`}>
                    <ShoppingCart size={18} />
                    {
                        cartAdded ? "Added to Cart!" : "Add to Cart"
                    }
                </button>

                <button className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-gray-900 text-white hover:bg-green-500 transition">
                    <Bolt size={18} /> Buy Now
                </button>
            </div>
        </div>
    );
}