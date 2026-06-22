"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface OrderPaymentCardProps {
  payment: any;
  userId?: string;
}

export default function OrderPaymentCard({
  payment,
  userId,
}: OrderPaymentCardProps) {
  return (
    <Card className="rounded-2xl border-none shadow-sm ring-1 ring-stone-200/70 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard size={14} className="text-stone-400" />
        <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          Payment
        </h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-stone-500">Provider</span>
          <span className="font-semibold text-sm">{payment?.provider}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-stone-500">Status</span>
          <Badge className="bg-emerald-100 text-emerald-700 rounded-full px-3 font-semibold">
            {payment?.status}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-stone-500">User ID</span>
          <span className="text-xs font-mono text-stone-400">
            {userId?.slice(0, 15)}...
          </span>
        </div>
      </div>
    </Card>
  );
}
