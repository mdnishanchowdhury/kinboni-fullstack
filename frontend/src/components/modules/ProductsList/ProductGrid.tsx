"use client";

import Image from "next/image";
import { Shirt, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product.types";
import { GenderBadge } from "./ProductBadges";
import { stockColor } from "@/utils/products";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || !products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Shirt className="mb-3 h-8 w-8 opacity-30" />
        <p className="text-sm">No items matching index parameters found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {
        products.map((p) => (
          <div
            key={p.id}
            className="group rounded-xl border bg-card overflow-hidden transition-all hover:-translate-y-0.5 hover:border-border/80 hover:shadow-sm flex flex-col justify-between"
          >
            {/* Top Image Hub */}
            <div className="relative flex h-32 w-full items-center justify-center bg-muted overflow-hidden">
              {
                p.timer?.isFlashSale && (
                  <Badge variant="default" className="absolute left-2 top-2 gap-1 text-[10px] py-0.5 bg-amber-500 hover:bg-amber-600 text-white border-transparent z-10">
                    <Zap className="h-2.5 w-2.5 fill-white" />
                    Flash
                  </Badge>
                )
              }

              {
                p.media?.thumbnail ? (
                  <div className="relative h-full w-full p-2 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={p.media.thumbnail}
                      alt={p.name || "Catalog image"}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                ) : (
                  <Shirt className="h-10 w-10 text-muted-foreground/40" />
                )
              }
            </div>

            {/* Bottom Descriptive Hub */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground truncate">
                  {p.brand?.name || "Generic Brand"}
                </p>
                <p className="mt-1 text-sm font-medium leading-tight line-clamp-2 h-10 text-card-foreground">
                  {p.name}
                </p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold">${p.pricing?.currentPrice || 0}</span>
                  {
                    (p.pricing?.oldPrice || 0) > (p.pricing?.currentPrice || 0) && (
                      <span className="text-xs text-muted-foreground line-through opacity-70">
                        ${p.pricing?.oldPrice}
                      </span>
                    )
                  }
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t pt-2">
                <GenderBadge gender={p.gender as any} />
                <span className={cn("text-xs font-medium", stockColor(p.inventory?.stock || 0))}>
                  {p.inventory?.stock || 0} left
                </span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}