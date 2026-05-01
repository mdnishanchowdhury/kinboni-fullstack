"use client";

import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Product } from "../../../../../types/product.types";

interface CartItemProps {
    item: Product;
}

export default function CartItem({ item }: CartItemProps) {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="flex items-center gap-4 rounded-3xl bg-gray-50 p-4 border border-gray-100 shadow-sm text-black group">
            {/* Product Image */}
            <div className="h-20 w-20 bg-white rounded-2xl p-2 border border-gray-100 shrink-0">
                <img
                    src={item.media.thumbnail}
                    className="h-full w-full object-contain"
                    alt={item.name}
                />
            </div>

            {/* Product Info */}
            <div className="flex-1">
                <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                <p className="text-[10px] text-gray-400 mb-1">Standard Shipping</p>

                <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-[#007b70]">
                        ${(item.pricing.currentPrice * quantity).toFixed(2)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 rounded-full bg-white border px-3 py-1 shadow-sm">
                        <button
                            onClick={decrement}
                            disabled={quantity === 1}
                            className={`transition-colors ${quantity === 1 ? 'text-gray-200' : 'text-gray-400 hover:text-black'}`}
                        >
                            <Minus className="w-3 h-3" />
                        </button>

                        <span className="text-xs font-bold w-4 text-center select-none">
                            {quantity}
                        </span>

                        <button
                            onClick={increment}
                            className="text-gray-400 hover:text-black transition-colors"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Button */}
            <button className="text-gray-300 hover:text-red-500 transition-colors p-1 shrink-0">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}