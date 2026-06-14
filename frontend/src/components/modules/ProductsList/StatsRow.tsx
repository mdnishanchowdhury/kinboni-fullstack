"use client";

import { Package, Zap, AlertTriangle, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product.types";

interface StatsRowProps {
  products: Product[];
}

export function StatsRow({ products = [] }: StatsRowProps) {
  const safeProducts = products || [];

  const total = safeProducts.length;
  const active = safeProducts.filter((p) => (p.inventory?.stock || 0) > 0 && !p.timer?.isFlashSale).length;
  const flash = safeProducts.filter((p) => p.timer?.isFlashSale).length;
  const outOfStock = safeProducts.filter((p) => (p.inventory?.stock || 0) === 0).length;

  const revenueAmount = safeProducts.reduce((acc, p) => acc + (p.pricing?.currentPrice || 0) * (p.inventory?.sold || 0), 0);
  const formattedRevenue = revenueAmount % 1 === 0 ? revenueAmount.toLocaleString() : revenueAmount.toFixed(2);

  const stats = [
    { label: "Pool Size", value: total, sub: `${active} active instances`, icon: Package, iconBg: "bg-blue-500/10", iconColor: "text-blue-600 dark:text-blue-400" },
    { label: "Flash Triggers", value: flash, sub: "active timelines", icon: Zap, iconBg: "bg-amber-500/10", iconColor: "text-amber-600 dark:text-amber-400" },
    { label: "Depleted Items", value: outOfStock, sub: outOfStock > 0 ? "attention required" : "healthy buffer", icon: AlertTriangle, iconBg: "bg-rose-500/10", iconColor: "text-rose-600 dark:text-rose-400" },
    { label: "Yield Output", value: `$${formattedRevenue}`, sub: "gross metric", icon: DollarSign, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {
        stats.map((s) => (
          <Card key={s.label} className="p-5 border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-all rounded-2xl group">
            <div className="flex items-center justify-between">
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase truncate">{s.label}</p>
                <p className="text-2xl font-bold tracking-tight truncate">{s.value}</p>
                <p className="text-xs text-neutral-400 flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 shrink-0" />
                  {s.sub}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${s.iconBg} group-hover:scale-110 transition-transform shrink-0`}>
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
            </div>
          </Card>
        ))
      }
    </div>
  );
}