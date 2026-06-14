"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShopBanner() {
    return (
        <Card
            className="relative rounded-2xl h-[276px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden border-none shadow-none"
            style={{ backgroundImage: `url("https://i.ibb.co/Hp2Xt99T/banner1.jpg")` }}
        >
            <div className="absolute inset-0 bg-black/10" />

            <CardContent className="relative p-10 z-10 w-full flex flex-col items-start text-left">
                <div className="max-w-md space-y-3">
                    <p className="text-sm text-orange-600 font-bold uppercase tracking-wide">
                        Only This Week
                    </p>

                    <h1 className="text-[21px] font-extrabold text-gray-900 leading-tight">
                        Grocery store with different treasures
                    </h1>

                    <p className="text-gray-700 text-sm md:text-base">
                        We have prepared special discounts for you on grocery products.
                    </p>

                    <Button
                        suppressHydrationWarning
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-4 font-semibold"
                    >
                        Shop Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}