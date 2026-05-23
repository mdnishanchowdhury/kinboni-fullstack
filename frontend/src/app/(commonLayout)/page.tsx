"use client";

import BannerSection from "../../components/layout/Home/Banner/BannerSection";
import DiscountProducts from "../../components/layout/Home/DiscountProducts/DiscountProducts";
import FashionBanners from "../../components/layout/Home/Fashion/FashionBanners";
import FeaturedItems from "../../components/layout/Home/Featured-Items/FeaturedItems";
import Products from "../../components/layout/Home/Product/Products";
import Services from "../../components/layout/Home/Services/Services";
import TopSelling from "../../components/layout/Home/TopSelling/TopSelling";
import { useProducts } from "../../hooks/useProduct";

export default function Home() {
  const { data, isLoading } = useProducts();

  return (
    <div className='max-w-[1440px] mx-auto'>
      <BannerSection />
      <FeaturedItems />
      <Products products={data} isLoading={isLoading} />
      <DiscountProducts products={data} isLoading={isLoading} />
      <TopSelling products={data} isLoading={isLoading} />
      <FashionBanners />
      <Services />
    </div>
  );
}
