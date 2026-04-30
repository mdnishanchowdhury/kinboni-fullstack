"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { cn } from "@/lib/utils";
import FeaturedItemsSkeleton from "@/components/Skeleton/FeaturedItemsSkeleton";

interface CategoryItem {
  name: string;
  image?: string;
  slug?: string;
}

interface SubCategory {
  name: string;
  items: CategoryItem[];
}

interface Category {
  name: string;
  subCategories?: SubCategory[];
}

export default function FeaturedItems() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { data, isLoading } = useCategories();
  const categoriesData: Category[] = data?.data || [];

  const allFinalItems = categoriesData.flatMap(
    (cat: Category) =>
      cat.subCategories?.flatMap((sub: SubCategory) => sub.items) || []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = window.innerWidth < 768 ? 240 : 460;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (isLoading) return <FeaturedItemsSkeleton />;

  return (
    <>
      <style jsx global>{`
        .fi-no-scrollbar::-webkit-scrollbar { display: none; }
        .fi-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fi-item-card {
          transition: border-color 0.18s ease, background-color 0.18s ease;
        }
        .fi-item:hover .fi-item-card {
          border-color: #d1d5db;
          background-color: #fafafa;
        }
        .fi-item-img {
          transition: transform 0.3s ease;
        }
        .fi-item:hover .fi-item-img {
          transform: scale(1.06);
        }
      `}</style>

      <section className="py-1 select-none  overflow-hidden">
        <div className="container mx-auto px-4 md:px-0">

          <div className="flex items-start justify-between mb-5">

            <div>
              <h2 className="flex items-center gap-2.5 text-[20px] md:text-[26px] font-bold text-slate-800 leading-tight dark:text-white">

                <span className="flex-shrink-0 mt-0.5">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="1" y="1" width="8.5" height="8.5" rx="1.5" fill="#22c55e" />
                    <rect x="12.5" y="1" width="8.5" height="8.5" rx="1.5" fill="#22c55e" />
                    <rect x="1" y="12.5" width="8.5" height="8.5" rx="1.5" fill="#22c55e" />
                    <rect x="12.5" y="12.5" width="8.5" height="8.5" rx="1.5" fill="#22c55e" />
                  </svg>
                </span>
                Featured Items
              </h2>
              <p className="text-slate-400 text-[12px] mt-1 font-normal dark:text-white/80">
                Drag with mouse or use buttons to explore
              </p>
            </div>

            {/* Nav buttons top right */}
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-slate-500" strokeWidth={2} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-slate-500" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Slider*/}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={cn(
              "fi-no-scrollbar grid grid-rows-2 grid-flow-col gap-x-4 gap-y-4 md:gap-x-5 md:gap-y-7 overflow-x-auto pb-2 pt-1 scroll-smooth",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            {allFinalItems.map((item: CategoryItem, index: number) => (
              <div
                key={index}
                className="fi-item flex flex-col items-center gap-2 md:gap-3 w-[80px] md:w-[150px]"
              >
                {/* Card rounded square with white bg */}
                <div className="fi-item-card w-full aspect-square rounded-[20px] border border-slate-200 bg-white flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="fi-item-img w-full h-full object-contain"
                    draggable={false}
                  />
                </div>

                {/* Label bold, centered, matches screenshot */}
                <span className="text-[8px] md:text-sm font-bold text-slate-800 text-center leading-snug line-clamp-2 w-full px-1 dark:text-white">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
