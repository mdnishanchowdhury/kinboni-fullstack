"use client";

import { motion } from "framer-motion";
import { FaStore } from "react-icons/fa";
import { Button } from '../../../ui/button';

interface TopSellingBannerProps {
    maxDiscount: string;
}

const TopSellingBanner = ({ maxDiscount }: TopSellingBannerProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/3 flex flex-col rounded-2xl overflow-hidden shadow-sm border border-gray-100 min-h-[550px]"
        >
            <div className="h-1/2 bg-[#F8F8F8] overflow-hidden relative group">
                <img
                    src="https://i.ibb.co.com/hJWkLkVq/dicount.png"
                    alt="Feature"
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                        Up to {maxDiscount}% OFF 🔥
                    </span>
                </div>
            </div>

            <div className="h-1/2 bg-[#FDE047] flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-3 leading-tight">
                    Heritage Fashion
                </h2>
                <Button  className="bg-[#006D77] text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold transition-all hover:bg-black group">
                    Shop Now
                    <span className="bg-white text-[#006D77] rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                        <FaStore />
                    </span>
                </Button >
            </div>
        </motion.div>
    );
};

export default TopSellingBanner;