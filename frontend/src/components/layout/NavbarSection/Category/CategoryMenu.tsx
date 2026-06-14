"use client";

import { useState, useCallback, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../../lib/utils";
import Link from "next/link";

const SubCategoryItems = ({ items }: { items: any[] }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 10 }}
    className="absolute left-full top-0 ml-3 w-[260px] bg-white border border-gray-100 shadow-md p-4 rounded-2xl z-[80] min-h-[220px]"
  >
    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-50 pb-2">
      Featured Items
    </h4>
    <div className="flex flex-col gap-3">
      {
        items.map((item, i) => (
          <Link key={i}
            href={`/shop?itemId=${item.id}`}
            className="flex items-center gap-3 text-[14px] text-gray-600 hover:text-orange-600 cursor-pointer group/item transition-all">
            {item.image && (
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
            )}
            <span className="font-medium group-hover/item:translate-x-1 transition-transform truncate">
              {item.name}
            </span>
          </Link>
        ))
      }
    </div>
  </motion.div>
);

export default function CategoryMenu({ categoriesData }: { categoriesData: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const handleMouseLeave = useCallback(() => {
    setActiveCategory(null);
    setActiveSubCategory(null);
  }, []);

  const categories = useMemo(() => categoriesData, [categoriesData]);

  return (
    <div className="hidden md:block col-span-3 relative" onMouseLeave={handleMouseLeave}>

      {/* Level 1: Main Categories */}
      <nav className="bg-white rounded-2xl shadow-md border border-gray-100 p-2.5 relative z-[60]">
        <div className="px-4 py-3 font-bold text-lg text-gray-900 border-b border-gray-50 mb-2">
          Categories
        </div>
        <div className="flex flex-col gap-0.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onMouseEnter={() => {
                setActiveCategory(cat.name);
                setActiveSubCategory(null);
              }}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer text-[15px] font-medium transition-all duration-200",
                activeCategory === cat.name ? "bg-orange-50 text-orange-600 shadow-sm" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                {cat.icon && <img src={cat.icon} className="w-6 h-6 object-contain" alt="" />}
                <span className="truncate">{cat.name}</span>
              </div>
              {cat.subCategories?.length > 0 && <ChevronRight className="w-4 h-4 opacity-30" />}
            </div>
          ))}
        </div>

        {/* Level 2: Sub-Categories */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              className="absolute left-full top-0 ml-1 w-[280px] bg-white border border-gray-100 shadow-md rounded-2xl z-[70] p-2.5 min-h-full"
            >
              {categories.find(c => c.name === activeCategory)?.subCategories.map((sub: any) => (
                <div
                  key={sub.name}
                  className="relative group"
                  onMouseEnter={() => setActiveSubCategory(sub.name)}
                >
                  <div className={cn(
                    "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer text-[14px] transition-all mb-0.5",
                    activeSubCategory === sub.name ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-600 hover:bg-gray-50"
                  )}>
                    <span className="truncate">{sub.name}</span>
                    {sub.items?.length > 0 && <ChevronRight className="w-4 h-4 opacity-40" />}
                  </div>

                  {/* Level 3: Items */}
                  {activeSubCategory === sub.name && sub.items?.length > 0 && (
                    <SubCategoryItems items={sub.items} />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}