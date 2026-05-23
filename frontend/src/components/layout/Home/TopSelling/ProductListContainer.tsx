"use client";

import  { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DiscountProductCard from "../DiscountProducts/DiscountProductCard";
import { Product } from "../../../../types/product.types";
import { Button } from "../../../ui/button";

interface ProductListContainerProps {
    title: string;
    allItems: Product[];
}

const ProductListContainer = ({ title, allItems }: ProductListContainerProps) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3;

    const nextItems = () => {
        if (startIndex + itemsPerPage < allItems.length) {
            setStartIndex((prev) => prev + itemsPerPage);
        }
    };

    const prevItems = () => {
        if (startIndex > 0) {
            setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
        }
    };

    const visibleItems = allItems.slice(startIndex, startIndex + itemsPerPage);

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="w-full">

            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                    {title}
                </h3>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevItems}
                        disabled={startIndex === 0}
                        className="h-8 w-8 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ChevronLeft size={16} />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextItems}
                        disabled={startIndex + itemsPerPage >= allItems.length}
                        className="h-8 w-8 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>

            {/* Product List*/}
            <div className="flex flex-col gap-4 min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={startIndex}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="flex flex-col gap-4"
                    >
                        {visibleItems.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                layout
                                transition={{ duration: 0.3 }}
                            >
                                <DiscountProductCard product={item} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {allItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                        <p className="text-sm">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListContainer;