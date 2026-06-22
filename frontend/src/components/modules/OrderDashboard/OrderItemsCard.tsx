"use client";

import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";
import { money } from "./utils";

interface OrderItemsCardProps {
  items: any[];
  totalAmount: number;
}

export default function OrderItemsCard({
  items,
  totalAmount,
}: OrderItemsCardProps) {
  return (
    <Card className="rounded-2xl border-none shadow-sm ring-1 ring-stone-200/70 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Package size={14} className="text-stone-400" />
        <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          Items
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-300 flex-shrink-0" />
              <p className="text-sm truncate">
                {item.product.name}{" "}
                <span className="text-stone-400">x{item.quantity}</span>
              </p>
            </div>
            <p className="text-sm font-medium whitespace-nowrap">
              {money(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-stone-100 mt-4 pt-3 font-bold flex justify-between text-sm">
        <span>Total Amount</span>
        <span className="text-amber-600">{money(totalAmount)}</span>
      </div>
    </Card>
  );
}
