"use client";

import { Star, StarHalf } from "lucide-react";
import { Product } from "../../../../../types/product.types";
import { getStarsArray } from "../../../../../utils/utilscalc";
import { useMemo } from "react";

interface ProductRatingsProps {
  average: number;
  count: number;
  reviews: Product["ratings"]["reviews"];
}

export default function ProductRatings({
  average,
  count,
  reviews,
}: ProductRatingsProps) {
  const starsArray = useMemo(() => getStarsArray(average), [average]);

  return (
    <div className="mb-3 lg:mb-4 flex items-center justify-between">
      {/* Stars and Average */}
      <div className="flex items-center gap-1.5">
        <div className="flex text-yellow-400">
          {starsArray.map((star, i) => (
            <span key={i}>
              {star === "full" ? (
                <Star size={14} className="fill-current" />
              ) : star === "half" ? (
                <StarHalf size={14} className="fill-current" />
              ) : (
                <Star size={14} className="text-gray-300" />
              )}
            </span>
          ))}
        </div>
        <span className="ml-0.5 text-xs lg:text-sm font-bold group-hover:text-white transition-colors">
          {average}
        </span>
      </div>

      {/* Reviewer Avatars */}
      <div className="flex -space-x-2.5 lg:opacity-0 lg:translate-x-10 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-500">
        {reviews?.slice(0, 2).map((review) => (
          <img
            key={review.id}
            src={review.user.avatar}
            className="h-6 w-6 lg:h-8 lg:w-8 rounded-full border-2 border-white object-cover shadow-sm"
            alt={review.user.name}
          />
        ))}
        {count > 2 && (
          <div className="flex h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-[8px] lg:text-[10px] font-bold text-gray-600">
            +{count - 2}
          </div>
        )}
      </div>
    </div>
  );
}