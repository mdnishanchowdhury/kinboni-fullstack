"use client";

import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface OrderAddressCardProps {
  address: any;
}

export default function OrderAddressCard({ address }: OrderAddressCardProps) {
  return (
    <Card className="rounded-2xl border-none shadow-sm ring-1 ring-stone-200/70 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={14} className="text-stone-400" />
        <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          Delivery Address
        </h3>
      </div>
      <p className="font-bold text-sm">{address?.fullName}</p>
      <p className="text-sm text-stone-500 mt-2 leading-relaxed">
        {address?.street}, {address?.city}
      </p>
    </Card>
  );
}
