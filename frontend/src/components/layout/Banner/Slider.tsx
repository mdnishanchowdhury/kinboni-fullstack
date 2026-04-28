"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAutoSlide } from "@/hooks/useAutoSlide";

interface Banner {
    image: StaticImageData | string;
    title: string;
    description: string;
}

interface SliderProps {
    banners: Banner[];
}

export default function Slider({ banners }: SliderProps) {
    const [current, setCurrent] = useState<number>(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    useAutoSlide(nextSlide, 10000);

    return (
        <div className="relative rounded-3xl overflow-hidden shadow-sm h-[300px] md:h-[450px] border border-border">

            {/* Background Image Layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={banners[current].image}
                        alt={banners[current].title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1000px"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center px-8 md:px-16 bg-gradient-to-r from-background/40 to-transparent">
                <motion.div
                    key={`${current}-text`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-xl space-y-4 md:space-y-6 text-foreground"
                >
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight whitespace-pre-line drop-shadow-sm">
                        {banners[current].title.replace(", ", "\n")}
                    </h1>

                    <p className="text-sm md:text-lg opacity-90 font-medium max-w-md">
                        {banners[current].description}
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="rounded-full px-8 font-semibold shadow-md">
                            Shop Now
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between px-1 md:px-4 z-20 pointer-events-none">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="pointer-events-auto rounded-full bg-black/5 hover:bg-background/80 backdrop-blur-sm border-none transition-all h-10 w-10"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="pointer-events-auto rounded-full bg-black/5 hover:bg-background/80 backdrop-blur-sm border-none transition-all h-10 w-10"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-300 rounded-full ${current === index
                                ? "w-8 h-2 bg-primary"
                                : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}