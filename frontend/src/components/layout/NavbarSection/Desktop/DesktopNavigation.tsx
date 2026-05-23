"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineCategory,
  MdKeyboardArrowDown,
  MdOutlineDashboard,
  MdOutlineAddBox
} from "react-icons/md";
import CategoryMenu from "../Category/CategoryMenu";
import { Loader2 } from "lucide-react";
import { Button } from "../../../ui/button";

interface NavLinkItem {
  name: string;
  path: string;
}

interface DesktopNavigationProps {
  navLinks: NavLinkItem[];
  categoriesData: any;
  isSellerMode: boolean;
  isLoading: boolean
}

export default function DesktopNavigation({
  navLinks,
  categoriesData,
  isSellerMode,
  isLoading
}: DesktopNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:block pb-1">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">

        <div className="flex items-center gap-8">

          {/* Explore Categories Dropdown */}
          <div className="relative group">
            <Button
              className="bg-green-500 hover:bg-black text-white px-8 py-5 font-bold flex items-center gap-3 rounded-full transition-all duration-300 "
            >
              <MdOutlineCategory className="text-xl" />
              Explore Categories
              <MdKeyboardArrowDown className="text-xl group-hover:rotate-180 transition-transform duration-300" />
            </Button>

            {/* Category Menu Container */}
            <div className="absolute top-full w-[280px] left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[120] pt-2">
              {
                isLoading ? (
                  <div className="w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col items-center justify-center gap-3">

                    <div className="w-full space-y-2 mt-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                ) : (
                  <CategoryMenu categoriesData={categoriesData} />
                )
              }
            </div>
          </div>

          {/* Main Navigation Links */}
          <nav className="flex gap-2 font-bold text-gray-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 transition-all rounded-md text-sm ${isActive
                    ? "bg-green-500 text-white dark:text-white"
                    : "hover:text-green-600 hover:bg-green-50/50 dark:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side Action Buttons */}
        <div className="flex items-center gap-6">
          {isSellerMode ? (
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                asChild
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all shadow-sm"
              >
                <Link href="/dashboard">
                  <MdOutlineDashboard className="text-xl" /> Dashboard
                </Link>
              </Button>

              <Button
                asChild
                className="flex items-center gap-2 bg-green-500 text-white px-5 py-5 rounded-full font-bold text-sm hover:bg-black transition-all shadow-md"
              >
                <Link href="/add-product">
                  <MdOutlineAddBox className="text-xl" /> Add Product
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-6 font-bold text-sm text-gray-600">
              <Link href="/seller-onboarding" className="cursor-pointer hover:text-[#088178] transition-colors dark:text-white">
                Sell on KINBONi
              </Link>
              <div className="h-4 w-[1px] bg-gray-200" />
              <Link href="/help" className="cursor-pointer hover:text-[#088178] transition-colors dark:text-white">
                Help Center
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}