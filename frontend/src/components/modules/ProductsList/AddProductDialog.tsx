"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddProductForm from "../Add-Product";

export function AddProductDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="gap-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-4 py-4"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl md:max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 bg-transparent border-none shadow-none rounded-[20px] md:rounded-[28px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        <DialogClose asChild>
          <button
            type="button"
            className="absolute top-4 right-6 z-[9999] rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </DialogClose>

        <DialogTitle className="sr-only">Add New Product</DialogTitle>
        <DialogDescription className="sr-only">
          Fill out the form below to add a new product to your inventory.
        </DialogDescription>
        <AddProductForm onSuccess={() => setOpen(false)} />

      </DialogContent>
    </Dialog>
  );
}