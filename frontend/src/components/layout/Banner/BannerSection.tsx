"use client";

import { StaticImageData } from "next/image";

import fashion from "../../../../public/image/banner/electonic.jpg";
import mobile from "../../../../public/image/banner/mobile.jpg";
import electonic from "../../../../public/image/banner/electonic.jpg";
import CategoryMenu from "../navbar/Category/CategoryMenu";
import Slider from "./Slider";
import { useCategories } from "@/hooks/useCategories";

export interface Banner {
    image: StaticImageData | string;
    title: string;
    description: string;
}

function BannerSection() {
    const { data, isLoading } = useCategories();

    const categoriesData = data?.data || [];

    const banners: Banner[] = [
        {
            image: mobile,
            title: "Samsung Galaxy, S26 Ultra",
            description: "Know The Expected Price and Specs",
        },
        {
            image: fashion,
            title: "Latest Fashion Collection",
            description: "Trendy styles at the best prices.",
        },
        {
            image: electonic,
            title: "Smart Home, Essentials",
            description: "Modern appliances and gadgets for a smart home.",
        },
    ];

    return (
        <section className="w-full flex items-center justify-center py-6 px-4 md:px-0">
            <div className="w-full grid grid-cols-12 gap-6">

                <div className="hidden md:block md:col-span-3">
                    {isLoading ? (
                        <div className="space-y-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />
                            ))}
                        </div>
                    ) : (
                        <CategoryMenu categoriesData={categoriesData} />
                    )}
                </div>

                {/* Hero Slider Section */}
                <div className="col-span-12 md:col-span-9">
                    <Slider banners={banners} />
                </div>

            </div>
        </section>
    );
}

export default BannerSection;