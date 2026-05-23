"use client";

import { useState, useMemo } from "react";
import { Heart, Flame, Loader2 } from "lucide-react";
import { getStockPercent } from "../../../../../utils/utilscalc";
import { Product } from "../../../../../types/product.types";
import { useLoading } from "../../../../../hooks/useLoading";
import { Badge } from "../../../../ui/badge";
import { Button } from "../../../../ui/button";
import ColorVariants from "./ColorVariants";
import ProductImage from "./ProductImage";
import PriceStock from "./PriceStock";
import ProductRatings from "./ProductRatings";

interface ProductCardProps {
  productData: Product;
  setIsCartOpen: (open: boolean) => void;
  setActiveCartItem: (product: Product) => void;
}

export function ProductCard({
  productData,
  setIsCartOpen,
  setActiveCartItem
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    productData.variants?.[0]?.id || null
  );

  const [isLoading, triggerLoading] = useLoading(1500);

  const handleAddToCart = () => {
    triggerLoading(() => {
      setActiveCartItem(productData);
      setIsCartOpen(true);
    });
  };

  const stockPercent = useMemo(() =>
    getStockPercent(productData.inventory.stock, productData.inventory.sold),
    [productData.inventory]
  );

  return (
    <div className="group relative w-full h-full flex flex-col rounded-[24px] lg:rounded-[32px] bg-white p-4 lg:p-7 border border-slate-100 hover:bg-gradient-to-b hover:from-[#9c9c9c] hover:to-[#2d2d2d] transition-all duration-700 shadow-sm overflow-hidden">

      {/* Badge & Wishlist */}
      {productData.timer?.isFlashSale && (
        <Badge variant="secondary" className="absolute left-4 lg:left-6 top-4 lg:top-6 z-20 flex items-center gap-1 rounded-full bg-orange-100 px-2 lg:px-3 py-1 text-[9px] lg:text-[10px] font-bold text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all border-none">
          <Flame size={12} /> {productData.timer.timerLabel || "BEST SELLER"}
        </Badge>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
        className="absolute right-4 lg:right-6 top-4 lg:top-6 z-20 flex h-8 lg:h-10 w-8 lg:w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
      >
        <Heart size={18} className={`${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>

      {/* Product Image */}
      <ProductImage thumbnail={productData.media.thumbnail} name={productData.name} />

      {/* Content Wrapper*/}
      <div className="relative z-10 text-black flex flex-col flex-grow">

        {/* Title*/}
        <h2 className="text-[18px] lg:text-[22px] font-bold group-hover:text-white transition-colors duration-300 line-clamp-1 min-h-[28px] lg:min-h-[32px]">
          {productData.name}
        </h2>

        {/* Color Variants*/}
        <div className="h-6">
          <ColorVariants variants={productData.variants} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>

        {/* Description*/}
        <p className="mb-2 lg:mb-2 text-xs lg:text-sm leading-relaxed text-gray-500 group-hover:text-gray-200 line-clamp-2 min-h-[32px] lg:min-h-[40px]">
          {productData.description}
        </p>

        <div className="mb-auto">
          <ProductRatings
            average={productData.ratings.average}
            count={productData.ratings.count}
            reviews={productData.ratings.reviews}
          />
        </div>

        {/* Price & Stock Section */}
        <div className="shrink-0">
          <PriceStock
            pricing={productData.pricing}
            inventory={productData.inventory}
            stockPercent={stockPercent}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 shrink-0">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex-[2] rounded-full bg-green-500 hover:bg-green-600 lg:group-hover:bg-white lg:group-hover:text-black text-white font-bold h-10 lg:h-12"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-full font-bold h-10 lg:h-12 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/30"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}