"use client";

import { FiUser, FiHeart, FiMoon, FiSun } from "react-icons/fi";
import { MdKeyboardArrowDown, MdLogout, MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu";

export default function AccountDropdown() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const getActiveClasses = (path: string) => {
    return pathname === path
      ? "!text-green-600 !bg-green-50"
      : "!text-gray-700 !bg-transparent";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer hover:text-green-600 text-foreground outline-none group">
          <FiUser className="text-2xl" />
          <MdKeyboardArrowDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 mt-2 mr-4 md:mr-0 p-0 !bg-white shadow-2xl rounded-2xl border border-gray-100 z-[110]"
      >
        <div className="px-5 py-4 border-b border-gray-100">
          <DropdownMenuLabel className="p-0 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Account
          </DropdownMenuLabel>
          <p className="text-sm font-extrabold text-gray-900">Md Nishan</p>
        </div>

        <div className="py-2">
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className={`flex items-center gap-3 px-5 py-2.5 text-sm font-bold cursor-pointer hover:!bg-gray-50 focus:!bg-gray-50 outline-none ${getActiveClasses("/profile")}`}
            >
              <FiUser className={`${pathname === "/profile" ? "text-green-600" : "text-gray-400"} text-lg`} />
              My Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/orders"
              className={`flex items-center gap-3 px-5 py-2.5 text-sm font-bold cursor-pointer hover:!bg-gray-50 focus:!bg-gray-50 outline-none ${getActiveClasses("/orders")}`}
            >
              <MdOutlineShoppingBag className={`${pathname === "/orders" ? "text-green-600" : "text-gray-400"} text-lg`} />
              My Orders
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/favorites"
              className={`flex items-center gap-3 px-5 py-2.5 text-sm font-bold cursor-pointer hover:!bg-gray-50 focus:!bg-gray-50 outline-none ${getActiveClasses("/favorites")}`}
            >
              <FiHeart className={`${pathname === "/favorites" ? "text-green-600" : "text-gray-400"} text-lg`} />
              Favorites
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-between px-5 py-2.5 text-sm font-bold !text-gray-700 cursor-pointer !bg-transparent hover:!bg-gray-50 focus:!bg-gray-50 outline-none"
          >
            <span className="flex items-center gap-3">
              {theme === "dark" ? (
                <><FiSun className="text-gray-400 text-lg" /> Light Mode</>
              ) : (
                <><FiMoon className="text-gray-400 text-lg" /> Dark Mode</>
              )}
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-100" />

          <DropdownMenuItem className="flex items-center justify-between px-5 py-2.5 text-sm font-bold !text-gray-700 cursor-pointer !bg-transparent hover:!bg-gray-50 focus:!bg-gray-50 outline-none">
            <span className="flex items-center gap-3">
              <HiOutlineGlobeAlt className="text-gray-400 text-lg" /> Language
            </span>
            <span className="text-[10px] bg-green-500/10 px-2 py-0.5 rounded text-[#088178]">
              EN-BDT
            </span>
          </DropdownMenuItem>
        </div>

        <div className="px-5 py-2 border-t border-gray-100">
          <button className="flex items-center gap-3 text-[#088178] font-bold text-sm py-2 hover:opacity-70 transition-opacity w-full !bg-transparent">
            <MdLogout className="text-lg" /> Sign out
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}