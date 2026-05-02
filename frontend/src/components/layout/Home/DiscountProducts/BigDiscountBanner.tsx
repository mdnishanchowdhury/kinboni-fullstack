"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import { Badge } from '../../../ui/badge';

interface BigDiscountBannerProps {
    discountAmount?: string;
    discountSymbol?: string;
    collectionName?: string;
    title?: string;
    imageSrc?: string;
    className?: string;
}

const bannerVariants = {
    badge: { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    bgText: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 0.4, scale: 1 } },
    model: { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 } }
};

const BigDiscountBanner = ({
    discountAmount = "50",
    discountSymbol = "%",
    collectionName = "NEW COLLECTION",
    title = "Trending Summer Fashion Style",
    imageSrc = "https://i.ibb.co.com/hJWkLkVq/dicount.png",
    className
}: BigDiscountBannerProps) => {
    return (
        <div className={cn(
            "relative flex flex-col md:flex-row h-auto md:h-[220px] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-sm mb-10 mx-auto border border-slate-100 bg-white",
            className
        )}>

            {/* Left Content Section */}
            <div className="w-full md:w-[50%] bg-[#FCEBF2] flex flex-col justify-center px-6 py-10 md:px-12 relative z-20">
                <motion.div
                    initial={bannerVariants.badge.initial}
                    whileInView={bannerVariants.badge.animate}
                    viewport={{ once: true }}
                >
                    <Badge className="bg-[#D81B60] hover:bg-[#ad144d] text-white text-[10px] md:text-[11px] font-bold px-4 py-1 rounded-full mb-4 border-none shadow-sm">
                        {collectionName}
                    </Badge>
                </motion.div>

                <h2 className="text-[#880E4F] text-2xl md:text-3xl lg:text-4xl font-black leading-[1.1] mb-3 tracking-tight">
                    {title.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                            {word}{" "}
                            {i === 1 && <br className="hidden md:block" />}
                        </React.Fragment>
                    ))}
                </h2>

                <p className="text-[#880E4F]/80 text-sm md:text-base font-medium">
                    Flat <span className="text-[#D81B60] font-extrabold">{discountAmount}{discountSymbol} OFF</span> on latest trends!
                </p>
            </div>

            {/* Right Image*/}
            <div className="relative flex-1 bg-gradient-to-r from-[#FCEBF2] to-white flex items-center justify-center overflow-hidden min-h-[200px]">

                {/* Background Big Discount Text */}
                <motion.div
                    initial={bannerVariants.bgText.initial}
                    whileInView={bannerVariants.bgText.animate}
                    transition={{ duration: 1 }}
                    className="absolute left-20 md:left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[70px] md:text-[200px] font-black text-[#f889b7] leading-none select-none tracking-tighter italic pointer-events-none z-0"
                >
                    {discountAmount}{discountSymbol}
                </motion.div>

                {/* Floating Model Image */}
                <div className="absolute inset-0 flex justify-end items-end z-10 pointer-events-none ml-33 md:ml-0">
                    <motion.div
                        initial={bannerVariants.model.initial}
                        whileInView={bannerVariants.model.animate}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative h-full w-full flex justify-end px-4 md:px-0"
                    >
                        <Image
                            src={imageSrc}
                            alt="Fashion Model"
                            width={800}
                            height={600}
                            priority
                            unoptimized
                            className="w-full md:w-auto h-auto object-contain object-bottom transition-transform hover:scale-105 duration-500 origin-bottom"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BigDiscountBanner;