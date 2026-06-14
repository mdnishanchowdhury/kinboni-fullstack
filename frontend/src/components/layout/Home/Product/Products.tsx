"use client";

import { motion, Variants } from "framer-motion";
import { LayoutGrid, Loader2 } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { Button } from "../../../ui/button";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Products({ products, isLoading, onLoadMore, hasMore }) {

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="min-h-screen lg:py-10 px-4 lg:px-0 container mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-row items-end justify-between mb-8 gap-4">
        <div className="space-y-2">
          <motion.h2 className="text-xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-green-600">
              <LayoutGrid className="w-6 h-6 md:w-7 md:h-7" />
            </span>
            Our Products
          </motion.h2>
          <motion.p className="text-slate-500 mt-1 text-xs md:text-base">
            Products we picked just for you
          </motion.p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/shop">
            <Button variant="secondary" className="rounded-full px-6 font-bold shadow-sm">
              View All Items
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
      />

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={onLoadMore}
            variant="outline"
            className="rounded-full px-8 font-semibold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && products.length > 0 && (
        <div className="text-center mt-8 text-slate-500">Loading more...</div>
      )}
    </motion.section>
  );
}