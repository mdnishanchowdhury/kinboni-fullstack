"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StickyNote } from "lucide-react";

export default function OrderNoteCard() {
  return (
    <Card className="rounded-2xl border-none shadow-sm ring-1 ring-stone-200/70 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <StickyNote size={14} className="text-stone-400" />
        <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          Quick Note
        </h3>
      </div>
      <Input
        placeholder="Add a note for the delivery man..."
        className="rounded-xl bg-stone-50 border-none ring-1 ring-stone-200 focus-visible:ring-2 focus-visible:ring-orange-300"
      />
    </Card>
  );
}
