import { STATUS_STEPS } from "../../../lib/constants/constants";

// Formats a number as Bangladeshi Taka, e.g. money(1500) -> "৳1,500"
export const money = (n: number) => `৳${n.toLocaleString("en-US")}`;

// Returns up to 2 uppercase initials from a full name, "?" if no name given
export function initials(name?: string) {
  if (!name) return "?";
  return name
    .trim()
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Returns the next status in the sequence, or null if there's no next step
// (already DELIVERED, or status isn't part of the forward sequence e.g. CANCELLED)
export function getNextStatus(currentStatus: string): string | null {
  const idx = STATUS_STEPS.indexOf(currentStatus);
  if (idx === -1 || idx === STATUS_STEPS.length - 1) return null;
  return STATUS_STEPS[idx + 1];
}
