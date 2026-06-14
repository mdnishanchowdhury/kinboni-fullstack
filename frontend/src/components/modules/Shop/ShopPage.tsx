"use client";

import React, { Suspense, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FeaturedItemsSkeleton from "@/components/Skeleton/FeaturedItemsSkeleton";
import ShopSidebar from "./ShopSidebar";
import { useProducts } from "@/hooks/useProduct";
import { ProductCard } from "@/components/layout/Home/Product/ProductCard/ProductCard";
import CartDrawer from "@/components/layout/Home/Product/Cart/CartDrawer";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShopBanner from "./ShopBanner";

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCartItem, setActiveCartItem] = useState<Product | null>(null);

    const currentPage = Number(searchParams.get("page")) || 1;

    const filters = {
        itemId: searchParams.get("itemId") || undefined,
        gender: searchParams.get("gender") || undefined,
        status: searchParams.get("status") || undefined,
        sort: searchParams.get("sort") || undefined,
        min: searchParams.get("min") ? Number(searchParams.get("min")) : undefined,
        max: searchParams.get("max") ? Number(searchParams.get("max")) : undefined,
        page: currentPage,
        limit: 9,
    };

    const { data, isLoading, isError, isFetching } = useProducts(filters);
    const products = data?.products || [];
    const totalPages = data?.meta?.totalPages || 1;

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set("sort", value);
        else params.delete("sort");
        
        startTransition(() => {
            router.push(`/shop?${params.toString()}`, { scroll: false });
        });
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        startTransition(() => {
            router.push(`/shop?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <section className="container mx-auto py-8 px-4">
            <div className="text-sm text-slate-400 mb-6">
                <Link href="/" className="hover:text-slate-800">Home</Link>
                <span className="mx-2 text-slate-300">&gt;</span>
                <span className="font-bold text-slate-900">Shop</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <ShopSidebar />
                </aside>

                <main className="w-full md:w-3/4 space-y-8">
                    <ShopBanner />

                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-slate-800">All Products</h2>
                        <select
                            className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none bg-white"
                            value={searchParams.get("sort") || ""}
                            onChange={(e) => handleSort(e.target.value)}
                        >
                            <option value="">Sort by Default</option>
                            <option value="Price: low → high">Price: low → high</option>
                            <option value="Price: high → low">Price: high → low</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <FeaturedItemsSkeleton />
                    ) : isError ? (
                        <div className="text-center py-20 text-red-500">Error loading products!</div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 text-slate-500">No products found.</div>
                    ) : (
                        <div className={`transition-opacity duration-300 ${(isFetching || isPending) ? "opacity-50" : "opacity-100"}`}>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product: Product) => (
                                    <ProductCard
                                        key={product.id}
                                        productData={product}
                                        setIsCartOpen={setIsCartOpen}
                                        setActiveCartItem={setActiveCartItem}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12 pb-10">
                                    <Button variant="outline" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</Button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    <Button variant="outline" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>

            <CartDrawer
                isOpen={isCartOpen}
                item={activeCartItem}
                onClose={() => setIsCartOpen(false)}
            />
        </section>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<FeaturedItemsSkeleton />}>
            <ShopContent />
        </Suspense>
    );
}