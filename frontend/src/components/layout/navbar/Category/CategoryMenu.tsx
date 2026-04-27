"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MenuItem {
  name: string;
  image?: string;
}

interface SubCategory {
  name: string;
  items?: MenuItem[];
}

interface Category {
  name: string;
  icon?: string;
  subCategories?: SubCategory[];
}

interface CategoryMenuProps {
  categoriesData: Category[];
}

export default function CategoryMenu({ categoriesData }: CategoryMenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);

  const menuAnimation: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
    transition: { duration: 0.2, ease: "easeOut" },
  };

  return (
    <div
      className="hidden md:block col-span-3 relative"
      onMouseLeave={() => {
        setActiveCategory(null);
        setActiveSubCategory(null);
      }}
    >
      {/* category -1 */}
      <nav className="w-[280px] bg-white rounded-2xl shadow-md border border-gray-100 p-2.5 relative z-[60]">
        <div className="px-4 py-3 font-bold text-lg text-gray-900 border-b border-gray-50 mb-2">
          Categories
        </div>

        <div className="flex flex-col gap-0.5">
          {categoriesData.map((cat) => (
            <div
              key={cat.name}
              onMouseEnter={() => {
                setActiveCategory(cat);
                setActiveSubCategory(null);
              }}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer text-[15px] font-medium transition-all duration-200",
                activeCategory?.name === cat.name
                  ? "bg-orange-50 text-orange-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                {cat.icon && (
                  <img src={cat.icon} className="w-6 h-6 object-contain" alt={cat.name} />
                )}
                <span className="truncate">{cat.name}</span>
              </div>
              {cat.subCategories && cat.subCategories.length > 0 && (
                <ChevronRight className={cn("w-4 h-4 transition-opacity", activeCategory?.name === cat.name ? "opacity-100" : "opacity-30")} />
              )}
            </div>
          ))}
        </div>

        {/* category-2 */}
        <AnimatePresence>
          {activeCategory?.subCategories && activeCategory.subCategories.length > 0 && (
            <motion.div
              {...menuAnimation}
              className="absolute left-full top-0 ml-1 w-[280px] bg-white border border-gray-100 shadow-md rounded-2xl z-[70] p-2.5 min-h-full"
            >
              {activeCategory.subCategories.map((sub) => (
                <div
                  key={sub.name}
                  className="relative group"
                  onMouseEnter={() => setActiveSubCategory(sub)}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer text-[14px] transition-all duration-200 mb-0.5",
                      activeSubCategory?.name === sub.name
                        ? "bg-orange-50 text-orange-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <span className="truncate">{sub.name}</span>
                    {sub.items && sub.items.length > 0 && <ChevronRight className="w-4 h-4 opacity-40" />}
                  </div>

                  {/* category-3 */}
                  <AnimatePresence>
                    {activeSubCategory?.name === sub.name && sub.items && sub.items.length > 0 && (
                      <motion.div
                        {...menuAnimation}
                        className="absolute left-full top-0 ml-3 w-[260px] bg-white border border-gray-100 shadow-md p-4 rounded-2xl z-[80] min-h-[220px]"
                      >
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-50 pb-2">
                          Featured Items
                        </h4>
                        <div className="flex flex-col gap-3">
                          {sub.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 text-[14px] text-gray-600 hover:text-orange-600 cursor-pointer group/item transition-all"
                            >
                              {item.image && (
                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                </div>
                              )}
                              <span className="truncate font-medium group-hover/item:translate-x-1 transition-transform">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}