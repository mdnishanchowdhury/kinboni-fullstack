"use client";
import Image from 'next/image';
import React, { useState } from 'react';

export default function ProductGallery({ product, displayImg, setActiveImg }: any) {
    const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: '0% 0%' });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyle({ transform: 'scale(2)', transformOrigin: `${x}% ${y}%` });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
    };

    return (
        <div className="space-y-4">
            <div
                className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    src={displayImg}
                    alt={product.name}
                    fill
                    style={zoomStyle}
                    className="object-cover transition-transform duration-200 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                {
                    product.discountPercent > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                            -{product.discountPercent}%
                        </span>
                    )
                }
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">

                <div onClick={() => setActiveImg(product.media.thumbnail)} className={`relative flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden cursor-pointer transition ${displayImg === product.media.thumbnail ? "border-indigo-500" : "border-gray-200"}`}>
                    <Image src={product.media.thumbnail} alt="thumbnail" fill className="object-cover" />
                </div>

                {
                    product.media.images.map((img: any, i: number) => (
                        <div key={i} onClick={() => setActiveImg(img.url)} className={`relative flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden cursor-pointer transition ${displayImg === img.url ? "border-indigo-500" : "border-gray-200"}`}>
                            <Image src={img.url} alt="product" fill className="object-cover" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}