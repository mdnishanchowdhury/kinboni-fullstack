"use client";

import { useProducts } from "@/hooks/useProduct";
import BannerSection from "../../components/layout/Home/Banner/BannerSection";
import DiscountProducts from "../../components/layout/Home/DiscountProducts/DiscountProducts";
import FashionBanners from "../../components/layout/Home/Fashion/FashionBanners";
import FeaturedItems from "../../components/layout/Home/Featured-Items/FeaturedItems";
import Products from "../../components/layout/Home/Product/Products";
import Services from "../../components/layout/Home/Services/Services";
import TopSelling from "../../components/layout/Home/TopSelling/TopSelling";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProducts({ limit: 12, page: page });
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (data?.products) {
      if (page === 1) setAllProducts(data.products);
      else setAllProducts(prev => [...prev, ...data.products]);
    }
  }, [data, page]);

  return (
    <div className='max-w-[1440px] mx-auto'>
      <BannerSection />
      <FeaturedItems />
      <Products
        products={allProducts}
        isLoading={isLoading}
        onLoadMore={() => setPage(p => p + 1)}
        hasMore={page < (data?.meta?.totalPages || 0)}
      />
      <DiscountProducts products={allProducts} isLoading={isLoading} />
      <TopSelling products={allProducts} isLoading={isLoading} />

      <FashionBanners />
      <Services />
    </div>
  );
}