"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Loader2 } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { Button } from "../../../ui/button";
import Link from "next/link";
import { useProducts } from "@/hooks/useProduct";

export default function Products() {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const limit = 12;

  const { data, isLoading, isFetching } = useProducts({ page, limit });

  useEffect(() => {
    if (data && (data as any)?.products) {
      const newProducts = (data as any).products;

      setAllProducts((prev) => {
        const combined = page === 1 ? newProducts : [...prev, ...newProducts];
        const uniqueProducts = Array.from(
          new Map(combined.map((item: any) => [item.id, item])).values()
        );
        return uniqueProducts;
      });
    }
  }, [data, page]);

  const meta = (data as any)?.meta;
  const hasMore = page < (meta?.totalPages || 1);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="min-h-screen lg:py-10 px-4 lg:px-0 container mx-auto"
    >
      {/* Header */}
      <div className="flex flex-row items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <LayoutGrid className="text-green-600" /> Our Products
          </h2>
          <p className="text-slate-500">Products we picked just for you</p>
        </div>
        <Link href="/shop">
          <Button variant="secondary" className="rounded-full">View All</Button>
        </Link>
      </div>

      {/* Product Grid */}
      <ProductGrid products={allProducts} isLoading={isLoading && page === 1} />

      {/* Load More Button  */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={isFetching}
            className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-black transition-all flex items-center gap-2"
          >
            {isFetching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Searching for more products...</span>
              </>
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}
    </motion.section>
  );
}