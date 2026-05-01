"use client";

import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";

interface CartDropdownProps {
  isSellerMode: boolean;
}

export default function CartDropdown({ isSellerMode }: CartDropdownProps) {

  if (isSellerMode) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer hover:text-green-600 text-gray-700 outline-none group transition-colors">
          <FiShoppingCart className="text-2xl dark:text-white" />
          {/* Cart Badge */}
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold border-2 border-white tabular-nums">
            0
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 mt-4 p-6 bg-white shadow-2xl rounded-2xl border-gray-100 z-[110] animate-in slide-in-from-top-2"
      >
        <h3 className="text-sm font-extrabold text-gray-800 text-left mb-6 uppercase tracking-tight">
          Shopping cart
        </h3>

        <div className="py-4 text-center">
          <p className="text-gray-500 text-sm mb-6 font-bold">
            Your cart is empty
          </p>

          <Button
            variant="outline"
            asChild
            className="w-full border-2 border-gray-800 text-gray-800 font-bold py-5 rounded-full hover:bg-gray-800 hover:text-white dark:hover:text-black transition-all text-xs dark:border-gray-800"
          >
            <Link href="/cart">GO TO CART</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}