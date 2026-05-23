"use client";

import { motion, Variants } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { Button } from "../../../ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Products({ products, isLoading }) {

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
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl font-bold text-slate-800 flex items-center gap-2"
          >
            <span className="text-green-600">
              <LayoutGrid className="w-6 h-6 md:w-7 md:h-7" />
            </span>
            Our Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 mt-1 text-xs md:text-base"
          >
            Products we picked just for you
          </motion.p>
        </div>

        {/* View All Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex gap-4"
        >
          <Button
            variant="secondary"
            className="rounded-full px-6 font-bold shadow-sm"
          >
            View All Items
          </Button>
        </motion.div>
      </div>

      <ProductGrid
        products={products}
        isLoading={isLoading}
      />
    </motion.section>
  );
}