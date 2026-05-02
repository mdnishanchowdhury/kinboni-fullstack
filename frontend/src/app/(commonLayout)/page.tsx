"use client";

import BannerSection from "../../components/layout/Home/Banner/BannerSection";
import DiscountProducts from "../../components/layout/Home/DiscountProducts/DiscountProducts";
import FeaturedItems from "../../components/layout/Home/Featured-Items/FeaturedItems";
import Products from "../../components/layout/Home/Product/Products";
import TopSelling from "../../components/layout/Home/TopSelling/TopSelling";
import { useProducts } from "../../hooks/useProduct";
import { Product } from "../../types/product.types";

export default function Home() {
  const { data, isLoading } = useProducts();
  
  const products: Product[] = data?.data || [];

  return (
    <div className='max-w-[1440px] mx-auto'>
      <BannerSection />
      <FeaturedItems />
      <Products  products={products} isLoading={isLoading}/>
      <DiscountProducts  products={products} isLoading={isLoading}/>
      <TopSelling products={products} isLoading={isLoading} />
    </div>
  );
}
