"use client";

import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { STATUS_DOT } from "../../../lib/constants/constants";
import { initials } from "./utils";
import { OrderListPanelProps } from "@/types/order.types";

export default function OrderListPanel({
  orders,
  meta,
  page,
  setPage,
  searchInput,
  setSearchInput,
  onSearch,
  status,
  setStatus,
  selectedOrderId,
  isLoading,
  onSelectOrder,
}: OrderListPanelProps) {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, onSearch]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <div className="relative flex-1 group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-orange-500"
          />
          <Input
            placeholder="Search by name, email..."
            className="bg-white rounded-xl border-none ring-1 ring-stone-200 shadow-sm pl-9 pr-9 text-sm transition-all focus-visible:ring-2 focus-visible:ring-orange-400"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <Select
          value={status}
          disabled={isLoading}
          onValueChange={(val) => {
            setStatus(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="bg-white rounded-xl border-none ring-1 ring-stone-200 shadow-sm w-[140px]">
            {isLoading ? (
              <Loader2 size={14} className="animate-spin text-stone-400" />
            ) : (
              <SelectValue placeholder="All status" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="SHIPPED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[70vh] lg:h-[60vh] bg-white rounded-2xl shadow-sm ring-1 ring-stone-200/70">
        <div className="space-y-2 p-3">
          {orders.map((order: any) => {
            const isSelected = selectedOrderId === order.id;
            return (
              <button
                key={order.id}
                onClick={() => onSelectOrder(order.id)}
                className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-all duration-150 ${
                  isSelected
                    ? "ring-2 ring-orange-400 bg-orange-50/70"
                    : "ring-1 ring-stone-200/70 bg-white hover:ring-stone-300 hover:bg-stone-50"
                }`}
              >
                <div className="h-10 w-10 rounded-full bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {initials(order.address?.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">
                    {order.address?.fullName}
                  </p>
                  <p className="text-xs text-stone-400 font-medium">
                    #{order.id.slice(0, 8)}
                  </p>
                </div>
                <span
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${STATUS_DOT[order.status] || "bg-stone-300"}`}
                />
              </button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm ring-1 ring-stone-200/70">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-lg"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft size={16} />
        </Button>
        <span className="text-xs font-bold text-stone-500">
          Page {page} / {meta?.pageCount || 1}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-lg"
          onClick={() => setPage((p) => Math.min(meta?.pageCount || 1, p + 1))}
          disabled={page >= (meta?.pageCount || 1)}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
