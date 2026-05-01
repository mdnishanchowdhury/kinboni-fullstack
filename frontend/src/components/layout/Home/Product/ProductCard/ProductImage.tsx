"use client";

import { motion } from "framer-motion";

interface ProductImageProps {
    thumbnail: string;
    name: string;
}

export default function ProductImage({ thumbnail, name }: ProductImageProps) {
    return (
        <div className="mb-3 lg:mb-6 mt-4 flex justify-center h-40 lg:h-52">
            <motion.img
                src={thumbnail}
                alt={name}
                initial={{ y: 0 }}
                whileHover={{
                    rotate: -5,
                    scale: 1.1,
                    y: -5
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }}
                className="w-full h-full object-contain drop-shadow-2xl"
            />
        </div>
    );
}