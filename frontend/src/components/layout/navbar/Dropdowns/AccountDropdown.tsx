"use client";

import { FiUser, FiHeart } from "react-icons/fi";
import { MdKeyboardArrowDown, MdLogout, MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccountDropdown() {
  return (
    <DropdownMenu>
      
      {/* Trigger*/}
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer hover:text-green-600 text-gray-700 outline-none group">
          <FiUser className="text-2xl" />
          <MdKeyboardArrowDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>

      {/* Content*/}
      <DropdownMenuContent
        align="end"
        className="w-64 mt-2 mr-4 md:mr-0 p-0 bg-white shadow-2xl rounded-2xl border-gray-100 z-[110]"
      >
        {/* User Header */}
        <div className="px-5 py-4 border-b border-gray-50">
          <DropdownMenuLabel className="p-0 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Account
          </DropdownMenuLabel>
          <p className="text-sm font-extrabold text-gray-800">Md Nishan</p>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 cursor-pointer focus:bg-gray-50 focus:text-gray-700 outline-none">
              <FiUser className="text-gray-400 text-lg" /> My Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/orders" className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 cursor-pointer focus:bg-gray-50 focus:text-gray-700 outline-none">
              <MdOutlineShoppingBag className="text-gray-400 text-lg" /> My Orders
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/favorites" className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 cursor-pointer focus:bg-gray-50 focus:text-gray-700 outline-none">
              <FiHeart className="text-gray-400 text-lg" /> Favorites
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-50" />

          {/* Language Section */}
          <DropdownMenuItem className="flex items-center justify-between px-5 py-2.5 text-sm font-bold text-gray-700 cursor-pointer focus:bg-gray-50 focus:text-gray-700 outline-none">
            <span className="flex items-center gap-3">
              <HiOutlineGlobeAlt className="text-gray-400 text-lg" /> Language
            </span>
            <span className="text-[10px] bg-green-500/10 px-2 py-0.5 rounded text-[#088178]">
              EN-BDT
            </span>
          </DropdownMenuItem>
        </div>

        {/* Sign Out Section */}
        <div className="px-5 py-2 border-t border-gray-50">
          <button className="flex items-center gap-3 text-[#088178] font-bold text-sm py-2 hover:opacity-70 transition-opacity w-full">
            <MdLogout className="text-lg" /> Sign out
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}