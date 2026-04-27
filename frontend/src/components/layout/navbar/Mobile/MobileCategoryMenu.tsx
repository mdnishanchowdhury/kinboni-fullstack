"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MdOutlineCategory } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SubCategoryGroup } from "./SubCategoryGroup";

export default function MobileCategoryMenu({ categoriesData, setOpen }: { categoriesData: any[], setOpen: (val: boolean) => void }) {
    const pathname = usePathname();
    const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);

    useEffect(() => {
        if (!categoriesData) return;
        categoriesData.forEach((cat) => {
            cat.subCategories?.forEach((sub: any) => {
                sub.items?.forEach((item: any) => {
                    const itemSlug = `/product/${item.slug || item.name.toLowerCase().replace(/\s+/g, '-')}`;
                    if (pathname === itemSlug) {
                        setIsMainMenuOpen(true);
                        setOpenCategory(cat.name);
                        setOpenSubCategory(sub.name);
                    }
                });
            });
        });
    }, [pathname, categoriesData]);

    return (
        <div className="w-full mb-6">
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
                className={cn(
                    "flex w-full items-center justify-between px-5 py-2 rounded-md transition-all duration-300",
                    isMainMenuOpen ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                )}
            >
                <div className="flex items-center gap-3">
                    <MdOutlineCategory className="text-xl" />
                    <span className="text-[15px] font-semibold">Explore Categories</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMainMenuOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isMainMenuOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2">
                        {categoriesData?.map((cat) => (
                            <div key={cat.name} className="mt-1">
                                <div
                                    onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                                    className={cn(
                                        "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all",
                                        openCategory === cat.name ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    <span className="text-sm font-medium">{cat.name}</span>
                                    <ChevronRight className={cn("w-3.5 h-3.5 transition-transform", openCategory === cat.name && "rotate-90")} />
                                </div>

                                <AnimatePresence>
                                    {openCategory === cat.name && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="ml-4 pl-4 border-l border-slate-100 space-y-1 my-1">
                                            {cat.subCategories?.map((sub: any) => (
                                                <SubCategoryGroup
                                                    key={sub.name}
                                                    sub={sub}
                                                    openSubCategory={openSubCategory}
                                                    setOpenSubCategory={setOpenSubCategory}
                                                    pathname={pathname}
                                                    setOpen={setOpen}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}