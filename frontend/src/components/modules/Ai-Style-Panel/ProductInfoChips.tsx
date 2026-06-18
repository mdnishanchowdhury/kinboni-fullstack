"use client";

import { Truck, ShieldCheck, Tag, Zap } from "lucide-react";

export default function ProductInfoChips({ product }: { product: any }) {
    return (
        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck size={16} className="text-indigo-500" /> Free Delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck size={16} className="text-indigo-500" /> 100% Authentic
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Tag size={16} className="text-indigo-500" /> Origin: {product.brand.origin}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap size={16} className="text-indigo-500" /> Stock: {product.inventory.stock} Left
            </div>
        </div>
    );
}