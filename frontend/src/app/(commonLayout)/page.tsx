import BannerSection from "../../components/layout/Home/Banner/BannerSection";
import FeaturedItems from "../../components/layout/Home/Featured-Items/FeaturedItems";
import Products from "../../components/layout/Home/Product/Products";

export default function Home() {
  return (
    <div className='max-w-[1440px] mx-auto'>
      <BannerSection/>
      <FeaturedItems/>
      <Products/>
    </div>
  );
}
