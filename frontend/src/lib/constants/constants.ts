export const STATUS_STEPS = [
  "PENDING",
  "ACCEPTED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

export const STEP_LABELS = [
  "Pending",
  "Accepted",
  "Processing",
  "Shipped",
  "Delivered",
];

export const STATUS_DOT: Record<string, string> = {
  PENDING: "bg-orange-400",
  ACCEPTED: "bg-blue-400",
  PROCESSING: "bg-amber-400",
  SHIPPED: "bg-purple-400",
  DELIVERED: "bg-emerald-400",
  CANCELLED: "bg-stone-400",
};

export const STATUS_BADGE: Record<string, string> = {
  PENDING: "bg-orange-100 text-orange-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-amber-100 text-amber-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-stone-200 text-stone-600",
};
