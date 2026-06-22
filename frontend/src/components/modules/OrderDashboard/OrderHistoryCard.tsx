"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import { STATUS_BADGE } from "../../../lib/constants/constants";
import { money } from "./utils";

interface OrderHistoryCardProps {
  orderId: string;
  status: string;
  totalAmount: number;
}

export default function OrderHistoryCard({
  orderId,
  status,
  totalAmount,
}: OrderHistoryCardProps) {
  return (
    <Card className="rounded-2xl border-none shadow-sm ring-1 ring-stone-200/70 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <History size={15} className="text-stone-400" />
          <h3 className="font-bold text-base">Order History</h3>
        </div>
        <p className="text-sm text-stone-500">
          Total Spent{" "}
          <span className="font-bold text-stone-800">{money(totalAmount)}</span>
        </p>
      </div>
      <div className="bg-stone-50 p-4 rounded-xl flex justify-between items-center gap-2 ring-1 ring-stone-100">
        <p className="font-bold text-sm">#{orderId.slice(0, 8)}</p>
        <Badge
          className={`${STATUS_BADGE[status] || "bg-stone-200 text-stone-600"} rounded-full px-3 font-semibold`}
        >
          {status}
        </Badge>
      </div>
    </Card>
  );
}
