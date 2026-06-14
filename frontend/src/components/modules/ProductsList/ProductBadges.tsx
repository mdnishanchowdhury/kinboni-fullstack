"use client";

import { CheckCircle2, XCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product.types";

export function StatusBadge({ product }: { product: Product }) {
  const stock = product.inventory?.stock || 0;

  if (stock === 0) {
    return (
      <Badge className="gap-1 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900/50 shadow-none hover:bg-red-50">
        <XCircle className="h-3 w-3 shrink-0" />
        Out of stock
      </Badge>
    );
  }

  if (product.timer?.isFlashSale) {
    return (
      <Badge className="gap-1 bg-amber-500 hover:bg-amber-600 text-white border-transparent shadow-none">
        <Zap className="h-3 w-3 shrink-0 fill-white" />
        Flash sale
      </Badge>
    );
  }

  return (
    <Badge className="gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 shadow-none hover:bg-emerald-50">
      <CheckCircle2 className="h-3 w-3 shrink-0" />
      Active
    </Badge>
  );
}

export function GenderBadge({ gender }: { gender: 'MALE' | 'FEMALE' | 'KIDS' }) {
  if (gender === "MALE") {
    return (
      <Badge className="border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400 hover:bg-blue-50 shadow-none">
        Male
      </Badge>
    );
  }

  if (gender === "FEMALE") {
    return (
      <Badge className="border-pink-200 bg-pink-50 text-pink-600 dark:border-pink-900/50 dark:bg-pink-950/30 dark:text-pink-400 hover:bg-pink-50 shadow-none">
        Female
      </Badge>
    );
  }

  return (
    <Badge className="border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-400 hover:bg-purple-50 shadow-none">
      Kids
    </Badge>
  );
}