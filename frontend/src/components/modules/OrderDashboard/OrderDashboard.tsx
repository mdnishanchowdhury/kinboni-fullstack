"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useOrders } from "@/hooks/useOrders";
import { updateOdersStatus } from "@/services/order.services";
import { getNextStatus } from "./utils";
import OrderListPanel from "./OrderListPanel";
import { Loader2 } from "lucide-react";

const OrderDetailPanel = dynamic(() => import("./OrderDetailPanel"), {
  loading: () => (
    <div className="flex items-center justify-center py-20 text-stone-400 text-sm">
      <Loader2 className="animate-spin mr-2" size={16} /> Loading order...
    </div>
  ),
});

export default function OrderDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [mobileShowDetail, setMobileShowDetail] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit: 10,
      searchTerm: search,
      status: status === "ALL" ? undefined : status,
    }),
    [page, search, status],
  );

  const { data: response, isLoading, refetch } = useOrders(queryParams) as any;

  const ORDERS = response?.data || [];
  const meta = response?.meta;
  const selectedOrder =
    ORDERS.find((o: any) => o.id === selectedId) || ORDERS[0];

  const handleStatusUpdate = async (
    newStatus: string,
    kind: "accept" | "reject",
  ) => {
    if (!selectedOrder) return;
    kind === "accept" ? setIsAccepting(true) : setIsRejecting(true);
    setUpdateError(null);

    const result = await updateOdersStatus(selectedOrder.id, {
      status: newStatus,
    });

    kind === "accept" ? setIsAccepting(false) : setIsRejecting(false);

    if (result?.success === false) {
      setUpdateError(result.message || "Failed to update order status");
      return;
    }
    if (typeof refetch === "function") refetch();
  };

  const handleAccept = () => {
    const nextStatus = getNextStatus(selectedOrder?.status);
    if (nextStatus) handleStatusUpdate(nextStatus, "accept");
  };

  const handleReject = () => handleStatusUpdate("CANCELLED", "reject");

  return (
    <div className="min-h-screen text-[#2D2D2D] flex flex-col lg:flex-row gap-4 lg:gap-6 pt-3">
      <div
        className={`${mobileShowDetail ? "hidden" : "flex"} lg:flex w-full lg:w-[350px]`}
      >
        <OrderListPanel
          orders={ORDERS}
          meta={meta}
          page={page}
          setPage={setPage}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={() => {
            setSearch(searchInput);
            setPage(1);
          }}
          status={status}
          setStatus={setStatus}
          selectedOrderId={selectedOrder?.id}
          isLoading={isLoading}
          onSelectOrder={(orderId) => {
            setSelectedId(orderId);
            setMobileShowDetail(true);
            setUpdateError(null);
          }}
        />
      </div>

      <div
        className={`${mobileShowDetail ? "block" : "hidden"} lg:block flex-1`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            <p className="text-sm text-stone-500 font-medium">
              Loading details...
            </p>
          </div>
        ) : selectedOrder ? (
          <OrderDetailPanel
            order={selectedOrder}
            onBack={() => setMobileShowDetail(false)}
            onAccept={handleAccept}
            onReject={handleReject}
            isAccepting={isAccepting}
            isRejecting={isRejecting}
            updateError={updateError}
          />
        ) : (
          <div className="text-center py-20 text-stone-400">
            No order selected
          </div>
        )}
      </div>
    </div>
  );
}
