"use client";

import { motion } from "framer-motion";
import { Badge } from "../../../../ui/badge";
import { Product } from "../../../../../types/product.types";

interface PriceStockProps {
    pricing: Product["pricing"];
    inventory: Product["inventory"];
    stockPercent: number;
}

export default function PriceStock({
    pricing,
    inventory,
    stockPercent,
}: PriceStockProps) {
    return (
        <div className="mb-5 lg:mb-6 flex items-center justify-between">
            {/* Price Section */}
            <div className="flex items-center gap-1 lg:gap-3 flex-wrap">
                <span className="text-xl lg:text-xl font-black group-hover:text-white transition-colors">
                    ${pricing.currentPrice}
                </span>
                <span className="text-[11px] lg:text-sm text-gray-400 line-through group-hover:text-gray-300 transition-colors">
                    ${pricing.oldPrice}
                </span>
                {
                    pricing.discountPercent > 0 && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white border-none text-[9px] px-2 py-0">
                            {pricing.discountPercent}% OFF
                        </Badge>
                    )
                }
            </div>

            {/* Stock Section */}
            <div className="flex flex-col items-end min-w-[60px] lg:min-w-[80px] lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                <div className="mb-1 flex justify-between w-full text-[9px] font-bold group-hover:text-white transition-colors">
                    <span>Stock</span>
                    <span>{inventory.stock}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 lg:bg-gray-600/50 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stockPercent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-red-500"
                    />
                </div>
            </div>
        </div>
    );
}