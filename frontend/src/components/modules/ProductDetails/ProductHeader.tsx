"use client";

import { Star } from "lucide-react";

export default function ProductHeader({ product }: { product: any }) {
    return (
        <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
                {product.brand.name}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1 leading-tight">
                {product.name}
            </h1>

            <div className="flex items-center gap-1 mt-2 mb-3">
                {
                    [1, 2, 3, 4].map((s) => (
                        <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                    ))
                }
                <Star size={14} className="fill-gray-200 text-gray-200" />
                <span className="text-sm text-gray-500 ml-1">4.0 (128)</span>
            </div>

            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-gray-900">৳{product.currentPrice.toLocaleString()}</span>
                {
                    product.oldPrice && (
                        <span className="text-base text-gray-400 line-through">৳{product.oldPrice.toLocaleString()}</span>
                    )
                }
                {
                    product.discountPercent > 0 && (
                        <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-md">
                            SAVE {product.discountPercent}%
                        </span>
                    )
                }
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-4">{product.description}</p>
        </div>
    );
}