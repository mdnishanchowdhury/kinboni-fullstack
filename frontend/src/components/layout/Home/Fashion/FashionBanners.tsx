import Image from "next/image";
import { FaStore } from "react-icons/fa";

import woman from "../../../../../public/image/banner/Women's Clothing.png";
import couple from "../../../../../public/image/banner/Couple Edition.png";
import kids from "../../../../../public/image/banner/Kids & Baby.png";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";

const FashionBanners = () => {
    return (
        <section className="px-4 lg:px-0 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[550px]">

                {/* Couple Edition */}
                <Card className="md:col-span-2 overflow-hidden border-slate-100 rounded-[2rem] shadow-sm group">
                    <CardContent className="p-0 flex flex-col h-full">
                        <div className="h-1/2 relative overflow-hidden">
                            <Image
                                src={couple}
                                alt="Couple Edition"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                        <div className="h-1/2 bg-[#FDE2F3] flex flex-col items-center justify-center p-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-3 leading-tight">
                                Made for Each Other: <br /> Couple Edition
                            </h2>
                            <p className="text-slate-600 text-sm mb-6 max-w-[80%]">
                                Explore our premium matching sets and define your couple goals today.
                            </p>
                            <Button
                                className="bg-green-500 hover:bg-black text-white rounded-full px-6 py-5 flex items-center gap-2 transition-all duration-300"
                            >
                                Shop Now
                                <span className="bg-white text-green-600 rounded-full p-1 text-[10px]">
                                    <FaStore />
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Women's Clothing*/}
                <Card className="md:col-span-1 overflow-hidden border-slate-100 rounded-[2rem] shadow-sm group">
                    <CardContent className="p-0 flex flex-col h-full">
                        <div className="h-1/2 bg-[#FFF4A3] flex flex-col items-center justify-center p-6 text-center order-2 md:order-1">
                            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Women&apos;s Clothing</h2>
                            <p className="text-slate-600 text-xs mb-5">Shop exclusive collections and express style.</p>
                            <Button size="sm" className="bg-green-500 hover:bg-black text-white rounded-full flex items-center gap-2">
                                Shop Now
                                <span className="bg-white text-green-600 rounded-full p-1 text-[8px]">
                                    <FaStore />
                                </span>
                            </Button>
                        </div>
                        <div className="h-1/2 relative overflow-hidden order-1 md:order-2 bg-[#FFFBEB]">
                            <Image
                                src={woman}
                                alt="Women Clothing"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Kids & Baby*/}
                <Card className="md:col-span-1 overflow-hidden border-slate-100 rounded-[2rem] shadow-sm group">
                    <CardContent className="p-0 flex flex-col h-full">
                        <div className="h-1/2 relative overflow-hidden bg-slate-100">
                            <Image
                                src={kids}
                                alt="Kids Clothing"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="h-1/2 bg-[#A7E6E3] flex flex-col items-center justify-center p-6 text-center">
                            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Kids & Baby</h2>
                            <p className="text-slate-600 text-xs mb-5">Best comfort for your little ones with premium fabrics.</p>
                            <Button size="sm" className="bg-green-500 hover:bg-black text-white rounded-full flex items-center gap-2">
                                Shop Now
                                <span className="bg-white text-green-600 rounded-full p-1 text-[8px]">
                                    <FaStore />
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </section>
    );
};

export default FashionBanners;