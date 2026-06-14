"use client";

import Image from "next/image";
import { Shirt, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GenderBadge, StatusBadge } from "./ProductBadges";
import { stockBarColor, stockColor, stockPct } from "@/utils/products";
import { Product } from "@/types/product.types";

interface ProductTableProps {
  products: Product[];
  page: number;
  perPage: number;
  totalFiltered: number;
  onPageChange: (p: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({
  products,
  page,
  perPage,
  totalFiltered,
  onPageChange,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalFiltered / perPage));
  const start = totalFiltered === 0 ? 0 : (page - 1) * perPage;

  if (!products.length) {
    return (
      <div className="rounded-xl border bg-card">
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Shirt className="mb-3 h-8 w-8 opacity-30" />
          <p className="text-sm">No products matched current index params.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-12 px-4 py-3" />
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Gender</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Discount</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Stock</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-muted-foreground text-xs uppercase tracking-wider pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {
              products.map((p) => (
                <tr key={p.id} className="align-middle hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3.5">
                    {p.media?.thumbnail ? (
                      <div className="relative h-9 w-9 overflow-hidden rounded-lg border bg-muted">
                        <Image
                          src={p.media.thumbnail}
                          alt={p.name || "Thumbnail"}
                          fill
                          className="object-cover"
                          sizes="36px"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted">
                        <Shirt className="h-4 w-4 text-muted-foreground/60" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3.5 max-w-[220px]">
                    <p className="font-medium leading-tight text-card-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.brand?.name || "Unknown Brand"}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <GenderBadge gender={p.gender as any} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-card-foreground">${p.pricing?.currentPrice || 0}</span>
                    {(p.pricing?.oldPrice || 0) > (p.pricing?.currentPrice || 0) && (
                      <span className="block text-xs text-muted-foreground line-through opacity-70">${p.pricing?.oldPrice}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    {p.pricing?.discountPercent ? (
                      <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">
                        -{p.pricing.discountPercent}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground/60">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn("text-xs font-semibold", stockColor(p.inventory?.stock || 0))}>
                      {p.inventory?.stock || 0}
                    </span>
                    <div className="mt-1.5 h-1 w-12 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-300", stockBarColor(p.inventory?.stock || 0))}
                        style={{ width: `${stockPct(p.inventory?.stock || 0)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge product={p as any} />
                  </td>
                  <td className="px-4 py-3.5 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onEdit(p.id)} aria-label="Edit item">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive" onClick={() => onDelete(p.id)} aria-label="Delete item">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
        <span>
          Showing {totalFiltered === 0 ? 0 : start + 1}–{Math.min(start + perPage, totalFiltered)} of {totalFiltered} products
        </span>

        {
          totalPages > 1 && (
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                Previous
              </Button>
              {
                Array.from({ length: totalPages }, (_, i) => (
                  <Button key={i} variant={i + 1 === page ? "default" : "outline"} size="sm" className="h-7 w-7 p-0 text-xs shadow-none" onClick={() => onPageChange(i + 1)}>
                    {i + 1}
                  </Button>
                ))
              }
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
                Next
              </Button>
            </div>
          )
        }
      </div>
    </div>
  );
}