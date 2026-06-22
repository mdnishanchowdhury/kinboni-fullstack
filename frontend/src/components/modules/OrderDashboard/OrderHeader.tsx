"use client";

import { Button } from "@/components/ui/button";
import { Check, X, ChevronLeft, Loader2 } from "lucide-react";
import { initials } from "./utils";
import { OrderHeaderProps } from "@/types/order.types";

export default function OrderHeader({
  order,
  onBack,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
  canAccept,
  acceptLabel,
  updateError,
}: OrderHeaderProps) {
  const isUpdating = isAccepting || isRejecting;

  return (
    <>
      {/* Back button */}
      <button
        onClick={onBack}
        className="lg:hidden flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-700 transition-colors -mt-1"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-stone-900 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
            {initials(order.address?.fullName)}
          </div>
          <div>
            <p className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">
              Order #{order.id.slice(0, 8)} •{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {order.address?.fullName}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onAccept}
            disabled={isUpdating || !canAccept}
            className="flex-1 sm:flex-none rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20"
          >
            {isAccepting ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Check size={16} className="mr-2" />
            )}
            {acceptLabel}
          </Button>
          <Button
            onClick={onReject}
            disabled={
              isUpdating ||
              order.status === "CANCELLED" ||
              order.status === "DELIVERED"
            }
            variant="outline"
            className="flex-1 sm:flex-none rounded-xl border-stone-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          >
            {isRejecting ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <X size={16} className="mr-2" />
            )}
            Reject
          </Button>
        </div>
      </div>

      {updateError && (
        <div className="rounded-xl bg-rose-50 text-rose-600 text-sm font-medium px-4 py-2 ring-1 ring-rose-100">
          {updateError}
        </div>
      )}
    </>
  );
}
