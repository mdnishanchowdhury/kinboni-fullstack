"use client";

import React, { useMemo } from 'react';
import { Clock, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../../../../types/product.types';
import { useCountdown } from '../../../../hooks/useCountdown';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '../../../../lib/utils';

interface DiscountProductCardProps {
    product: Product;
}

const DiscountProductCard = ({ product }: DiscountProductCardProps) => {

    const flashDiscount = product.timer?.flashDiscount || 0;
    const oldPrice = product.pricing.oldPrice;
    const currentPrice = flashDiscount > 0
        ? Math.round(oldPrice - (oldPrice * flashDiscount / 100))
        : product.pricing.currentPrice;

    const targetTime = useMemo(
        () => (product.timer?.expiresAt ? new Date(product.timer.expiresAt).getTime() : 0),
        [product.timer?.expiresAt]
    );

    const timeLeft = useCountdown(targetTime);
    const isExpired = useMemo(() => {
        if (!product.timer?.expiresAt) return false;
        return timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
    }, [timeLeft, product.timer?.expiresAt]);

    const isOutOfStock = product.inventory.stock === 0;

    const handleOrder = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isOutOfStock) alert(`${product.name} ordered! Price: $${currentPrice}`);
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="w-1/3 aspect-square flex items-center justify-center bg-[#f8f8f8] rounded-xl overflow-hidden relative">
                <Image
                    src={product.media.thumbnail}
                    alt={product.name}
                    width={200} height={200} unoptimized
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {flashDiscount > 0 && (
                    <div className="absolute top-0 left-0 bg-[#C6002C] text-white text-[9px] font-black px-2 py-1 rounded-br-lg shadow-lg">
                        {flashDiscount}% OFF
                    </div>
                )}
            </div>

            <div className="w-2/3 flex flex-col justify-between h-full py-1">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        {product.timer?.timerLabel && (
                            <Badge variant="outline" className="text-[10px] font-bold text-orange-600 uppercase border-none bg-orange-50 px-2 py-0.5">
                                {product.timer.timerLabel}
                            </Badge>
                        )}
                        <div className="flex items-center gap-1 text-[10px] font-mono font-bold">
                            <Clock size={12} className={isExpired ? "text-gray-400" : "text-[#C6002C]"} />
                            <span className={isExpired ? "text-gray-400" : "text-slate-500"}>
                                {isExpired ? "Expired" : `${timeLeft.days}d:${timeLeft.hours}h:${timeLeft.minutes}m`}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                </div>

                <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-[#007b70]">${currentPrice}</span>
                            <span className="text-xs text-gray-400 line-through font-medium">${oldPrice}</span>
                        </div>
                        <Button size="icon" onClick={handleOrder} disabled={isOutOfStock || isExpired} className={cn("h-8 w-8 rounded-xl", isOutOfStock || isExpired ? "bg-gray-200" : "bg-green-500")}>
                            <ShoppingCart size={14} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountProductCard;