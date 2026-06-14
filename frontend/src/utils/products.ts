import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stockColor(stock: number): string {
  if (stock === 0) return "text-red-500";
  if (stock < 10) return "text-amber-500";
  return "text-green-600";
}

export function stockBarColor(stock: number): string {
  if (stock === 0) return "bg-red-500";
  if (stock < 10) return "bg-amber-500";
  return "bg-green-600";
}

export function stockPct(stock: number): number {
  return Math.min(100, Math.round((stock / 50) * 100));
}