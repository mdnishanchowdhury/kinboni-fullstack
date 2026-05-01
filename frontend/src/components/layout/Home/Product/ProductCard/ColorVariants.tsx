"use client";

import { Product } from "../../../../../types/product.types";

interface ColorVariantsProps {
    variants: Product["variants"];
    selectedColor: string | null;
    setSelectedColor: (id: string) => void;
}

export default function ColorVariants({
    variants,
    selectedColor,
    setSelectedColor,
}: ColorVariantsProps) {
    if (!variants || variants.length === 0) {
        return (
            <span className="text-[10px] text-gray-400 group-hover:text-gray-300 uppercase tracking-tighter">
                Standard Edition
            </span>
        );
    }

    return (
        <div className="flex gap-2 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
            {variants.map((variant) => (
                <button
                    key={variant.id}
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(variant.id);
                    }}
                    style={{ backgroundColor: variant.hex }}
                    title={variant.id}
                    className={`h-3 w-3 lg:h-4 lg:w-4 rounded-full border-2 transition-all shadow-sm
            ${selectedColor === variant.id
                            ? "border-gray-400 ring-2 ring-white ring-offset-1"
                            : "border-transparent hover:scale-110"
                        }`}
                />
            ))}
        </div>
    );
}