"use client";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { STEP_LABELS } from "../../../lib/constants/constants";

interface OrderTrackingStepperProps {
  status: string;
  currentStepIndex: number;
  progressPercent: number;
}

export default function OrderTrackingStepper({
  status,
  currentStepIndex,
  progressPercent,
}: OrderTrackingStepperProps) {
  return (
    <Card className="rounded-2xl border-none shadow-sm ring-1 ring-stone-200/70 bg-white p-5 sm:p-6">
      <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-6 sm:mb-8">
        Order Tracking
      </h3>

      {status === "CANCELLED" ? (
        <div className="flex items-center justify-center py-3 rounded-xl bg-rose-50 text-rose-600 font-semibold text-sm">
          This order was cancelled
        </div>
      ) : (
        <div className="overflow-x-auto -mx-1 px-1 pt-2">
          <div className="flex justify-between items-center relative min-w-[340px]">
            <div className="absolute top-4 left-0 w-full h-[3px] bg-stone-100 rounded-full" />
            <div
              className="absolute top-4 left-0 h-[3px] bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
            {STEP_LABELS.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              return (
                <div
                  key={step}
                  className="flex flex-col items-center relative z-10 px-1"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110"
                        : isCompleted
                          ? "bg-orange-500 text-white"
                          : "bg-white text-stone-300 ring-1 ring-stone-200"
                    }`}
                  >
                    {isCompleted ? <Check size={14} /> : index + 1}
                  </div>
                  <p
                    className={`mt-2 text-[10px] sm:text-xs font-bold text-center whitespace-nowrap ${
                      isActive ? "text-orange-600" : "text-stone-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
