"use client";

import { STATUS_STEPS, STEP_LABELS } from "../../../lib/constants/constants";
import { getNextStatus } from "./utils";
import OrderHeader from "./OrderHeader";
import OrderTrackingStepper from "./OrderTrackingStepper";
import OrderItemsCard from "./OrderItemsCard";
import OrderAddressCard from "./OrderAddressCard";
import OrderHistoryCard from "./OrderHistoryCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderNoteCard from "./OrderNoteCard";
import { OrderDetailPanelProps } from "@/types/order.types";

export default function OrderDetailPanel({
  order,
  onBack,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
  updateError,
}: OrderDetailPanelProps) {
  const currentStepIndex = STATUS_STEPS.indexOf(order.status);
  const progressPercent =
    currentStepIndex >= 0
      ? (currentStepIndex / (STATUS_STEPS.length - 1)) * 100
      : 0;

  const nextStatus = getNextStatus(order.status);

  const acceptLabel =
    order.status === "PENDING"
      ? "Accept"
      : nextStatus
        ? STEP_LABELS[STATUS_STEPS.indexOf(nextStatus)]
        : "Accept";

  return (
    <div className="space-y-4 sm:space-y-6">
      <OrderHeader
        order={order}
        onBack={onBack}
        onAccept={onAccept}
        onReject={onReject}
        isAccepting={isAccepting}
        isRejecting={isRejecting}
        canAccept={!!nextStatus}
        acceptLabel={acceptLabel}
        updateError={updateError}
      />

      <OrderTrackingStepper
        status={order.status}
        currentStepIndex={currentStepIndex}
        progressPercent={progressPercent}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <OrderItemsCard
          items={order.orderItems}
          totalAmount={order.totalAmount}
        />
        <OrderAddressCard address={order.address} />
      </div>

      <OrderHistoryCard
        orderId={order.id}
        status={order.status}
        totalAmount={order.totalAmount}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <OrderPaymentCard payment={order.payment} userId={order.userId} />
        <OrderNoteCard />
      </div>
    </div>
  );
}
