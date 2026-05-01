"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../../../../../types/product.types";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem.tsx";
import CartFooter from "./CartFooter";

interface CartDrawerProps {
  isOpen: boolean;
  item: Product | null;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, item, onClose }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {
        isOpen && item && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative h-full w-full max-w-[400px] bg-white shadow-2xl p-6 lg:p-8 flex flex-col"
            >
              <CartHeader onClose={onClose} />

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <CartItem item={item} />
              </div>

              <CartFooter subtotal={item.pricing.currentPrice} />
            </motion.div>
          </div>
        )
      }
    </AnimatePresence>
  );
}